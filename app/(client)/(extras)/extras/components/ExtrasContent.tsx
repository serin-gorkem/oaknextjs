"use client";
import { lazy, memo, Suspense, useEffect, useState } from "react";

{
  /* Lazy Loadings */
}
const Steps = lazy(() => import("../../../components/Steps"));
const PageIndicator = lazy(() => import("../../../components/PageIndicator"));
const SummaryCard = lazy(() => import("../../../components/SummaryCard"));

{
  /* API Keys and images import */
}
import ExtrasCard from "./ExtrasCard";
import { useGetData } from "../../../components/GetData";
import { UpdateData } from "../../../components/UpdateData";
import { useRouter } from "next/navigation";
import SessionExpiredFallback from "@/app/(client)/components/SessionExpiredFallback";
import { useCurrency } from "@/app/(client)/context/CurrencyContext";

async function getExtras(setExtras: any) {
  const res = await fetch(`/api/get-extras-data`, { method: "GET" });
  if (res.ok) {
    const data = await res.json();
    setExtras(data); // raw değerler
  } else {
    const error = await res.json();
    console.error("Veri çekme hatası:", error);
  }
}

type Extra = {
  display_name: string;
  price: number;
};

interface ExtrasData {
  childSeat: number;
  flowers: number;
  airportAssistance: boolean;
  wait: boolean;
}

const Extras = memo(function () {
  const { clientData, setClientData, error } = useGetData();
  const { symbol, convertPrice } = useCurrency();

  const [extras, setExtras] = useState<Extra[]>([]);
  const [childSeatNumber, setChildSeatNumber] = useState(0);
  const [flowersNumber, setFlowersNumber] = useState(0);
  const [airportAssistance, setAirportAssistance] = useState(false);
  const [wait, setWait] = useState(false);
  const [isPriceUpdated, setIsPriceUpdated] = useState(false);

  console.log("Client Data: ", clientData);

  useEffect(() => {
    getExtras(setExtras);
  }, [convertPrice]);

  // Populate local state from clientData.extras on load
  useEffect(() => {
    if (clientData?.extras) {
      setChildSeatNumber(clientData.extras.childSeat || 0);
      setFlowersNumber(clientData.extras.flowers || 0);
      setAirportAssistance(Boolean(clientData.extras.airportAssistance));
      setWait(Boolean(clientData.extras.wait));
    }
  }, [clientData]);

  // Derive basePrice only once (exclude extras if already included)
  useEffect(() => {
    if (!clientData || clientData.basePrice != null || extras.length === 0) return;

    const existingExtras = clientData.extras ?? {};
    const extrasTotal =
      (existingExtras.childSeat || 0) * Math.round(extras[0]?.price || 0) +
      (existingExtras.flowers || 0) * Math.round(extras[1]?.price || 0) +
      (existingExtras.airportAssistance ? Math.round(extras[2]?.price || 0) : 0) +
      (existingExtras.wait ? Math.round(extras[3]?.price || 0) : 0);

    const derivedBase = Number(clientData.price ?? 0) - extrasTotal;

    setClientData((prev: any) => ({
      ...prev,
      basePrice: Math.max(0, Math.round(derivedBase)),
    }));
  }, [clientData, extras, setClientData]);

  // Recalculate price whenever extras selection changes
  useEffect(() => {
    if (!clientData || extras.length === 0 || clientData.base_price == null) return;

    const basePrice = Number(clientData.base_price);

    const extrasTotal =
      childSeatNumber * Math.round(extras[0]?.price || 0) +
      flowersNumber * Math.round(extras[1]?.price || 0) +
      (airportAssistance ? Math.round(extras[2]?.price || 0) : 0) +
      (wait ? Math.round(extras[3]?.price || 0) : 0);

    const newPrice = Math.max(0, Math.round(basePrice + extrasTotal));

    const newExtras: ExtrasData = {
      childSeat: childSeatNumber,
      flowers: flowersNumber,
      airportAssistance,
      wait,
    };

    setIsPriceUpdated(newPrice !== basePrice);

    // Only update if something really changed
    if (
      clientData.price !== newPrice ||
      JSON.stringify(clientData.extras ?? {}) !== JSON.stringify(newExtras)
    ) {
      const newClientData = {
        ...clientData,
        basePrice,
        price: newPrice,
        extras: newExtras,
      };

      setClientData(newClientData);
      UpdateData({ clientData: newClientData });
    }
  }, [childSeatNumber, flowersNumber, airportAssistance, wait, extras, clientData, setClientData]);

  function handleAirportAssistance() {
    setAirportAssistance((prev) => !prev);
  }
  function handleWait() {
    setWait((prev) => !prev);
  }

  const router = useRouter();
  function handleNavigateBooking() {
    router.push(`/booking?uuid=${clientData.uuid}`);
  }
  function handleNavigateToDetails() {
    router.push(`/details?uuid=${clientData.uuid}`);
  }

  function increase(type: string) {
    switch (true) {
      case type === "child-seat" && childSeatNumber < 2:
        setChildSeatNumber(childSeatNumber + 1);
        break;
      case type === "flowers" && flowersNumber < 3:
        setFlowersNumber(flowersNumber + 1);
        break;
    }
  }
  function decrease(type: string) {
    switch (true) {
      case type === "child-seat" && childSeatNumber > 0:
        setChildSeatNumber(childSeatNumber - 1);
        break;
      case type === "flowers" && flowersNumber > 0:
        setFlowersNumber(flowersNumber - 1);
        break;
    }
  }

  if (error || !clientData) {
    return <SessionExpiredFallback error={error} clientData={clientData} />;
  }
  if (!clientData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-center mt-20">Loading Data...</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex relative flex-col mt-30 justify-between lg:block xl:max-w-9/12 lg:max-w-11/12 mx-auto">
        <section className="p-4 md:px-4 flex justify-between flex-col lg:flex-row-reverse gap-4 w-full lg:px-0 ">
          <div className="lg:hidden block">
            <PageIndicator activeStep="extras" />
            <ExtrasCard
              increase={increase}
              decrease={decrease}
              childSeatNumber={childSeatNumber}
              flowersNumber={flowersNumber}
              airportAssistance={airportAssistance}
              wait={wait}
              extras={extras}
              convertPrice={convertPrice}
              symbol={symbol}
              handleAirportAssistance={handleAirportAssistance}
              handleWait={handleWait}
            />
          </div>
          <aside className="flex flex-col gap-3 xl:w-4/12 lg:w-5/12">
            <SummaryCard clientData={clientData} />
            <div className="flex md:flex-wrap gap-2 justify-between w-full">
              <button
                onClick={handleNavigateBooking}
                className="btn w-5/12 px-0 md:w-full btn-gray"
              >
                Booking
              </button>
              <button
                onClick={handleNavigateToDetails}
                className="btn w-5/12 px-0 md:w-full btn-warning text-base-100"
              >
                Personal Details
              </button>
            </div>
          </aside>
          <div className="lg:w-full flex flex-col gap-4">
            <div className="hidden lg:flex lg:flex-col lg:gap-4">
              <PageIndicator activeStep="extras" />
              <ExtrasCard
                increase={increase}
                decrease={decrease}
                childSeatNumber={childSeatNumber}
                flowersNumber={flowersNumber}
                airportAssistance={airportAssistance}
                wait={wait}
                extras={extras}
                convertPrice={convertPrice}
                symbol={symbol}
                handleAirportAssistance={handleAirportAssistance}
                handleWait={handleWait}
              />
            </div>
          </div>
        </section>
        <div className="[&>section]:max-w-full">
          <Steps />
        </div>
      </div>
    </Suspense>
  );
});

export default Extras;
