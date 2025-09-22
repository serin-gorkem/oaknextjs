"use client";

import { lazy, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import VehicleFeaturesCard from "./VehicleFeaturesCard";
import DirectionsMap from "./DirectionsMap";
import SessionExpiredFallback from "@/app/(client)/components/SessionExpiredFallback";

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

  const [vehiclePrices, setVehiclePrices] = useState<VehiclePrice[]>([]);
  const [mergedVehicles, setMergedVehicles] = useState<any[]>([]);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);

  const router = useRouter();

  // Fetch airport rates
  async function fetchAirportRates(airportId: string, distanceKm: number) {
    const res = await fetch(`/api/prices?airportId=${airportId}&distanceKm=${distanceKm}`);
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
        const rawPrice = price?.total_price ?? 0;

        // Convert here using context
        const converted = await convertPrice(rawPrice, "USD");

        return {
          ...vehicle,
          total_price: converted.toFixed(2),
        };
      })
    );
    setMergedVehicles(merged);
  }

  updateVehicles();
}, [vehicles, vehiclePrices, currencyIndex]);

  // Sync client data
  useEffect(() => {
    if (clientData?.uuid) {
      UpdateData({ clientData });

    }
  }, [clientData]);

  // Navigate to extras page
  function loadExtrasPage(
    vehicleName: string,
    price: number,
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
        image_url: imageURL,
      },
      price: price
    }));

    router.push(`/extras?uuid=${clientData.uuid}`);
  }

  if (error || !clientData) {
    return <SessionExpiredFallback error={error} clientData={clientData} />;
  }

  return (
    <main className="flex relative flex-col mt-30 justify-between lg:block xl:max-w-9/12 lg:max-w-11/12 mx-auto">
      <section className="p-4 flex flex-col lg:flex-row-reverse gap-4 w-full">
        {/* Right Sidebar */}
        <aside className="flex flex-col gap-3 xl:w-3/12 lg:w-5/12">
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

        {/* Main Content */}
        <div className="lg:w-full flex flex-col gap-4">
          <div className="hidden lg:block">
            <PageIndicator activeStep="booking" />
          </div>

          {/* Map */}
          <div className="w-full h-96 mb-10">
            <DirectionsMap
              origin={clientData?.pickup_location}
              destination={clientData?.drop_off_location}
              onRouteInfo={setRouteInfo}
            />
          </div>

          {/* Vehicle Cards */}
          {mergedVehicles.map((vehicle: any) => (
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
                loadExtrasPage(vehicle.name, vehicle.total_price, vehicle.image_url)
              }
            />
          ))}
        </div>
      </section>

      {/* Steps Footer */}
      <div className="[&>section]:max-w-full">
        <Steps />
      </div>
    </main>
  );
}
