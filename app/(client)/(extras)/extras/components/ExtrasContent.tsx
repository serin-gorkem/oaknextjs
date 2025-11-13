"use client";

import { lazy, memo, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ExtrasCard from "./ExtrasCard";

import { useGetData } from "../../../components/GetData";
import { UpdateData } from "../../../components/UpdateData";
import { useCurrency } from "@/app/(client)/context/CurrencyContext";
import SessionExpiredFallback from "@/app/(client)/components/SessionExpiredFallback";
import FallbackLoader from "@/app/(client)/components/FallbackLoader";

const Steps = lazy(() => import("../../../components/Steps"));
const PageIndicator = lazy(() => import("../../../components/PageIndicator"));
const SummaryCard = lazy(() => import("../../../components/SummaryCard"));

// === Types ===
interface Extra {
  display_name: string;
  price: number;
}

interface ExtrasData {
  childSeat: number;
  flowers: number;
  airportAssistance: boolean;
  wait: boolean;
}

// === Utility: fetch extras with filtering ===
async function fetchExtras(vehicleId: number): Promise<Extra[]> {
  try {
    const res = await fetch(`/api/get-extras-data`);
    if (!res.ok) throw new Error("Extras API error");
    const data: Extra[] = await res.json();

    if (vehicleId >= 1 && vehicleId <= 4) return data.slice(0, 4);
    if (vehicleId === 5 || vehicleId === 6) return data.slice(4, 8);
    return data;
  } catch (err) {
    console.error("Extras fetch failed:", err);
    return [];
  }
}

// === Utility: Debounce hook ===
function useDebouncedEffect(callback: () => void, delay: number, deps: any[]) {
  useEffect(() => {
    const handler = setTimeout(callback, delay);
    return () => clearTimeout(handler);
  }, deps);
}

const Extras = memo(function Extras() {
  const router = useRouter();
  const { clientData, setClientData, error } = useGetData();
  const { symbol, convertPrice } = useCurrency();

  const [extras, setExtras] = useState<Extra[]>([]);
  const [childSeatNumber, setChildSeatNumber] = useState(0);
  const [flowersNumber, setFlowersNumber] = useState(0);
  const [airportAssistance, setAirportAssistance] = useState(false);
  const [wait, setWait] = useState(false);

  // === Fetch extras once vehicle selected ===
  useEffect(() => {
    if (clientData?.booking?.vehicle_id)
      fetchExtras(clientData.booking.vehicle_id).then(setExtras);
  }, [clientData?.booking?.vehicle_id]);

  // === Sync existing extras from clientData ===
  useEffect(() => {
    const e = clientData?.extras;
    if (!e) return;
    setChildSeatNumber(e.childSeat ?? 0);
    setFlowersNumber(e.flowers ?? 0);
    setAirportAssistance(!!e.airportAssistance);
    setWait(!!e.wait);
  }, [clientData?.extras]);

  // === Ensure base_price consistency ===
  useEffect(() => {
    if (!clientData || extras.length === 0) return;

    const totalPrice = Number(clientData.price ?? 0);
    const currentBase = Number(clientData.base_price ?? 0);
    const existing = clientData.extras ?? {};

    const extrasTotal =
      (existing.childSeat ?? 0) * Math.round(extras[0]?.price ?? 0) +
      (existing.flowers ?? 0) * Math.round(extras[1]?.price ?? 0) +
      (existing.airportAssistance ? Math.round(extras[2]?.price ?? 0) : 0) +
      (existing.wait ? Math.round(extras[3]?.price ?? 0) : 0);

    const derivedBase = Math.max(0, Math.round(totalPrice - extrasTotal));
    if (Math.abs(currentBase - derivedBase) > 1) {
      setClientData((prev: any) => ({ ...prev, base_price: derivedBase }));
    }
  }, [extras]);

  // === Debounced price recalculation ===
  useDebouncedEffect(
    () => {
      if (!clientData || extras.length === 0 || clientData.base_price == null) return;

      const basePrice = Number(clientData.base_price);
      const extrasTotal =
        childSeatNumber * Math.round(extras[0]?.price ?? 0) +
        flowersNumber * Math.round(extras[1]?.price ?? 0) +
        (airportAssistance ? Math.round(extras[2]?.price ?? 0) : 0) +
        (wait ? Math.round(extras[3]?.price ?? 0) : 0);

      const newPrice = Math.max(0, Math.round(basePrice + extrasTotal));
      const newExtras: ExtrasData = {
        childSeat: childSeatNumber,
        flowers: flowersNumber,
        airportAssistance,
        wait,
      };

      const extrasChanged =
        clientData.extras?.childSeat !== childSeatNumber ||
        clientData.extras?.flowers !== flowersNumber ||
        clientData.extras?.airportAssistance !== airportAssistance ||
        clientData.extras?.wait !== wait;

      if (clientData.price !== newPrice || extrasChanged) {
        const updated = { ...clientData, price: newPrice, extras: newExtras };
        setClientData(updated);
        UpdateData({ clientData: updated });
      }
    },
    300,
    [childSeatNumber, flowersNumber, airportAssistance, wait]
  );

  // === Handlers ===
  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => setter((v) => !v);
  const handleIncrease = (type: "child" | "flowers") => {
    if (type === "child" && childSeatNumber < 2) setChildSeatNumber((v) => v + 1);
    if (type === "flowers" && flowersNumber < 3) setFlowersNumber((v) => v + 1);
  };
  const handleDecrease = (type: "child" | "flowers") => {
    if (type === "child" && childSeatNumber > 0) setChildSeatNumber((v) => v - 1);
    if (type === "flowers" && flowersNumber > 0) setFlowersNumber((v) => v - 1);
  };

  if (error || !clientData)
    return <SessionExpiredFallback error={error} clientData={clientData} />;

  return (
    <Suspense fallback={<FallbackLoader />}>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="flex flex-col relative mt-30 justify-between lg:block xl:max-w-9/12 lg:max-w-11/12 mx-auto"
      >
        {/* === Content === */}
        <section className="p-4 lg:p-0 flex flex-col lg:flex-row-reverse gap-4 w-full">
          {/* === Left Sidebar === */}
          <aside className="flex flex-col gap-3 xl:w-4/12 lg:w-5/12">
            <SummaryCard clientData={clientData} />
            <div className="flex flex-wrap gap-2 justify-between w-full">
              <button
                onClick={() => router.push(`/booking?uuid=${clientData.uuid}`)}
                className="btn w-5/12 md:w-full btn-gray"
              >
                Booking
              </button>
              <button
                onClick={() => router.push(`/details?uuid=${clientData.uuid}`)}
                className="btn w-5/12 md:w-full btn-warning text-base-100"
              >
                Personal Details
              </button>
            </div>
          </aside>

          {/* === Main Extras Section === */}
          <div className="lg:w-full flex flex-col gap-4">
            <PageIndicator activeStep="extras" />
            <ExtrasCard
              increase={(type) => handleIncrease(type === "child-seat" ? "child" : "flowers")}
              decrease={(type) => handleDecrease(type === "child-seat" ? "child" : "flowers")}
              childSeatNumber={childSeatNumber}
              flowersNumber={flowersNumber}
              airportAssistance={airportAssistance}
              wait={wait}
              extras={extras}
              convertPrice={convertPrice}
              symbol={symbol}
              handleAirportAssistance={handleToggle(setAirportAssistance)}
              handleWait={handleToggle(setWait)}
            />
          </div>
        </section>

        {/* === Footer === */}
        <div className="[&>section]:max-w-full">
          <Steps />
        </div>
      </motion.main>
    </Suspense>
  );
});

export default Extras;