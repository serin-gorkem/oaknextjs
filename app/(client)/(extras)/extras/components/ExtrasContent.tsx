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

{
  /* On Form.jsx, there is a submit button and it will push form information to this jsx file and it will be used in Transfer Card  */
}
async function getExtras(setExtras: any, convertPrice: any) {
  const res = await fetch(`/api/get-extras-data`, { method: "GET" });
  if (res.ok) {
    const data = await res.json();

    // Convert all extra prices to current currency
    const convertedExtras = await Promise.all(
      data.map(async (extra: any) => {
        const convertedPrice = await convertPrice(extra.price);
        return { ...extra, price: Math.round(convertedPrice) };
      })
    );

    setExtras(convertedExtras);
  } else {
    const error = await res.json();
    console.error("Veri çekme hatası:", error);
  }
}
const Extras = memo(function () {
  //Get local variables
  const { clientData, setClientData, error } = useGetData();
  const { symbol, convertPrice } = useCurrency();


  type Extra = {
    display_name: string;
    price: number;
    // add other properties if needed
  };

  const [extras, setExtras] = useState<Extra[]>([]);
  const [childSeatNumber, setChildSeatNumber] = useState(0);
  const [flowersNumber, setFlowersNumber] = useState(0);
  const [airportAssistance, setAirportAssistance] = useState(false);
  const [wait, setWait] = useState(false);

  console.log(clientData);
  
  
  useEffect(() => {
    getExtras(setExtras, convertPrice);
  }, [convertPrice]);

  useEffect(() => {
    if (clientData !== null) {
      updateClientData({ airportAssistance });
    }
  }, [airportAssistance]);

  useEffect(() => {
    if (clientData !== null) {
      updateClientData({ wait });
    }
  }, [wait]);

  function updateClientData(changes: Partial<typeof clientData> = {}) {
    if (clientData === null) {
      setChildSeatNumber(0);
      setFlowersNumber(0);
      setAirportAssistance(false);
      setWait(false);
      return;
    }
    setClientData((prev: any) => {
      const base = prev || {};
      return {
        ...base,
        extras: {
          ...(base.extras || {}),
          ...changes,
        },
      };
    });
    UpdateData({ clientData });
  }

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
        updateClientData({ childSeatNumber: childSeatNumber + 1 });
        break;

      case type === "flowers" && flowersNumber < 3:
        setFlowersNumber(flowersNumber + 1);
        updateClientData({ flowersNumber: flowersNumber + 1 });
        break;

      default:
        break;
    }
  }
  function decrease(type: string) {
    switch (true) {
      case type === "child-seat" && childSeatNumber > 0:
        setChildSeatNumber(childSeatNumber - 1);
        updateClientData({ childSeatNumber: childSeatNumber - 1 });
        break;

      case type === "flowers" && flowersNumber > 0:
        setFlowersNumber(flowersNumber - 1);
        updateClientData({ flowersNumber: flowersNumber - 1 });
        break;

      default:
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
            {/* Use switch case to change the page indicator */}
            <PageIndicator activeStep="extras" />
            <ExtrasCard
              increase={increase}
              decrease={decrease}
              updateClientData={updateClientData}
              childSeatNumber={childSeatNumber}
              flowersNumber={flowersNumber}
              airportAssistance={airportAssistance}
              wait={wait}
              extras={extras}
              symbol={symbol}
              handleAirportAssistance={handleAirportAssistance}
              handleWait={handleWait}
            />
          </div>
          <aside className="flex flex-col gap-3 xl:w-4/12 lg:w-5/12">
            <SummaryCard clientData={clientData} />
            {/* Navigation Buttons */}
            <div className="flex md:flex-wrap gap-2 justify-between w-full">
              <button
                onClick={handleNavigateBooking}
                className="btn w-5/12 px-0 md:w-full btn-gray"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                  />
                </svg>
                Booking
              </button>
              <button
                onClick={handleNavigateToDetails}
                className="btn w-5/12 px-0 md:w-full btn-warning text-base-100"
              >
                Personal Details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </aside>
          <div className="lg:w-full flex flex-col gap-4">
            <div className="hidden lg:flex lg:flex-col lg:gap-4">
              {/*For page indicator active functionality, later.*/}
              <PageIndicator activeStep="extras" />
              <ExtrasCard
                increase={increase}
                decrease={decrease}
                updateClientData={updateClientData}
                childSeatNumber={childSeatNumber}
                flowersNumber={flowersNumber}
                airportAssistance={airportAssistance}
                wait={wait}
                extras={extras}
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
