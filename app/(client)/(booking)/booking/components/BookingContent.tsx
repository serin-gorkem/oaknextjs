"use client";

import { lazy, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import VehicleFeaturesCard from "./VehicleFeaturesCard";
import DirectionsMap from "./DirectionsMap";
import SessionExpiredFallback from "@/app/(client)/components/SessionExpiredFallback";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { motion } from "framer-motion"; // ✅ sadece bu eklendi

import { useGetData } from "../../../components/GetData";
import { UpdateData } from "../../../components/UpdateData";
import { useCurrency } from "../../../context/CurrencyContext";
import { useVehicle } from "../../../context/VehicleContext";

// Lazy imports
const PageIndicator = lazy(() => import("../../../components/PageIndicator"));
const TransferSummaryCard = lazy(() => import("./TransferSummaryCard"));
const Steps = lazy(() => import("../../../components/Steps"));

// Types
interface VehiclePrice {
  vehicle_id: number;
  vehicle_name: string;
  base_price: number;
  km_rate: number;
  total_price?: number;
}

interface RouteInfo {
  distanceKm: number;
  distanceMi: number;
  durationHours: number;
  durationMinutes: number;
}

export default function BookingContent() {
  const { clientData, setClientData, error } = useGetData();
  const { currencyIndex, symbol, convertPrice } = useCurrency();
  const { vehicles } = useVehicle();

  const [perPage, setPerPage] = useState(2);

  const [vehiclePrices, setVehiclePrices] = useState<VehiclePrice[]>([]);
  const [mergedVehicles, setMergedVehicles] = useState<any[]>([]);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);

  const router = useRouter();

  // Fetch airport rates
  async function fetchAirportRates(airportId: string, distanceKm: number) {
    const res = await fetch(
      `/api/prices?airportId=${airportId}&distanceKm=${distanceKm}`
    );
    if (!res.ok) throw new Error("Failed to fetch airport rates");
    const data = await res.json();
    console.log("⬅️ API response:", data);
    return data;
  }

  useEffect(() => {
    const airportId = clientData?.pickup_location?.id;
    if (!airportId || !routeInfo) return; // exit early if route info not ready

    fetchAirportRates(airportId, routeInfo.distanceKm)
      .then((data) => setVehiclePrices(data.rows))
      .catch((err) => console.error(err));
  }, [clientData?.pickup_location?.id, routeInfo]);

  // Merge vehicles with fetched prices

  useEffect(() => {
    if (!vehicles || !vehiclePrices) return;

    async function updateVehicles() {
      const merged = await Promise.all(
        vehicles.map(async (vehicle: any) => {
          const price = vehiclePrices.find(
            (p: VehiclePrice) => Number(p.vehicle_id) === Number(vehicle.id)
          );

          if (!price) return null; // Fiyat yoksa null döndür

          let rawPrice = price.total_price ?? 0;

          if (clientData?.return_data?.return_trip === true) {
            rawPrice *= 2;
          }

          // rawPrice USD (DB’den geldiği gibi); sadece ekranda çevireceğiz
          const display = await convertPrice(rawPrice);
          return {
            ...vehicle,
            total_price: display.toFixed(2), // sadece gösterim
            total_price_usd: rawPrice, // state/flow için KANONİK değer (USD)
          };
        })
      );

      // null olanları filtrele
      setMergedVehicles(merged.filter((v) => v !== null));
    }

    updateVehicles();
  }, [vehicles, vehiclePrices, currencyIndex, clientData]);

  // Sync client data
  useEffect(() => {
    if (clientData?.uuid) {
      UpdateData({ clientData });
    }
  }, [clientData]);

  useEffect(() => {
    const updatePerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPerPage(1); // mobile: <640px
      } else if (width < 1024) {
        setPerPage(2); // tablet: 640px–1023px
      } else {
        setPerPage(2); // desktop: >=1024px
      }
    };
    updatePerPage(); // Run once on mount
    window.addEventListener("resize", updatePerPage);

    return () => {
      window.removeEventListener("resize", updatePerPage);
    };
  }, []);
  // Navigate to extras page
  function loadExtrasPage(
    vehicleName: string,
    vehicleId: number,
    priceUSD: number,
    imageURL: string
  ) {
    if (!clientData) return;

    if (!clientData.return_data) {
      setClientData((prev: any) => ({
        ...prev,
        return_data: {
          return_date: null,
          return_hour: null,
          return_count: null,
          return_trip: false,
        },
      }));
    }
    setClientData((prev: any) => ({
      ...prev,
      booking: {
        route_info: routeInfo,
        vehicle_name: vehicleName,
        vehicle_id: vehicleId,
        image_url: imageURL,
      },
      price: priceUSD,
      base_price: priceUSD,
      extras: {
        childSeat: 0,
        flowers: 0,
        airportAssistance: false,
        wait: false,
      },
    }));

    router.push(`/extras?uuid=${clientData.uuid}`);
  }

  if (error || !clientData) {
    return <SessionExpiredFallback error={error} clientData={clientData} />;
  }

  return (
    <main className="flex relative flex-col mt-30 justify-between lg:block xl:max-w-9/12 lg:max-w-11/12 mx-auto">
      {/* === Ana Bölüm === */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex p-2 md:p-6 lg:p-2 lg:justify-between flex-col lg:flex-row-reverse gap-4"
      >
        {/* === Sidebar === */}
        <aside className="flex flex-col gap-3 xl:w-4/12 lg:w-3/12">
          <div className="lg:hidden block">
            <PageIndicator activeStep="booking" />
          </div>
          <TransferSummaryCard
            clientData={clientData}
            updateClientData={setClientData}
            totalDistanceKM={routeInfo?.distanceKm.toFixed(0)}
            drivingDuration={`${routeInfo?.durationHours}h ${routeInfo?.durationMinutes}m`}
          />
        </aside>

        {/* === Main Content === */}
        <div className="lg:w-3/4 flex flex-col gap-4">
          <div className="hidden lg:block">
            <PageIndicator activeStep="booking" />
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full h-96 mb-10"
          >
            <DirectionsMap
              origin={clientData?.pickup_location}
              destination={clientData?.drop_off_location}
              onRouteInfo={setRouteInfo}
            />
          </motion.div>

          {/* Vehicles Carousel */}
          {mergedVehicles?.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Splide
                aria-label="Vehicle Carousel"
                options={{
                  type: "loop",
                  gap: "1rem",
                  autoplay: false,
                  pauseOnHover: true,
                  perPage,
                  speed: 800,
                  rewind: true,
                  height: "100%",
                }}
              >
                {mergedVehicles.map((vehicle, index) => (
                  <SplideSlide key={index}>
                    <VehicleFeaturesCard
                      key={`${vehicle.id}-${currencyIndex}`}
                      img={vehicle.image_url}
                      vehicleName={vehicle.name}
                      person={vehicle.capacity_person}
                      bags={vehicle.capacity_bags}
                      features={vehicle.features}
                      totalPrice={vehicle.total_price}
                      currency={symbol}
                      loadExtrasPage={() =>
                        loadExtrasPage(
                          vehicle.name,
                          vehicle.id,
                          vehicle.total_price_usd,
                          vehicle.image_url
                        )
                      }
                    />
                  </SplideSlide>
                ))}
              </Splide>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Steps Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
        className="[&>section]:max-w-full"
      >
        <Steps />
      </motion.div>
    </main>
  );
}