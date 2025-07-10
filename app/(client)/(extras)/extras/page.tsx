"use client";
import { lazy, memo, useEffect, useState } from "react";

{
  /* Lazy Loadings */
}
const Steps = lazy(() => import("../../components/Steps"));
const PageIndicator = lazy(() => import("../../components/PageIndicator"));
const SummaryCard = lazy(() => import("./components/SummaryCard"));

{
  /* API Keys and images import */
}
import ExtrasCard from "./components/ExtrasCard";
import { GetData } from "../../components/GetData";
import { UpdateData } from "../../components/UpdateData";

{
  /* On Form.jsx, there is a submit button and it will push form information to this jsx file and it will be used in Transfer Card  */
}

const Extras = memo(function () {
  //Get local variables
  const [clientData, setClientData] = useState<any>(null);
  GetData({ clientData, setClientData });

  const [childSeatNumber, setChildSeatNumber] = useState(0);
  const [flowersNumber, setFlowersNumber] = useState(0);
  const [airportAssistance, setAirportAssistance] = useState(false);
  const [wait, setWait] = useState(false);

  console.log(clientData);

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
  }

  function handleAirportAssistance() {
    setAirportAssistance((prev) => !prev);
  }

  function handleWait() {
    setWait((prev) => !prev);
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

  return (
    <>
      <div className="flex relative flex-col mt-30 justify-between lg:block xl:max-w-9/12 lg:max-w-11/12 mx-auto">
        <section className="p-4 md:px-4 flex justify-between flex-col lg:flex-row-reverse gap-4 w-full lg:px-0 ">
          <div className="lg:hidden block">
            {/* Use switch case to change the page indicator */}
            <PageIndicator />
            <ExtrasCard
              increase={increase}
              decrease={decrease}
              updateClientData={updateClientData}
              childSeatNumber={childSeatNumber}
              flowersNumber={flowersNumber}
              airportAssistance={airportAssistance}
              wait={wait}
              handleAirportAssistance={handleAirportAssistance}
              handleWait={handleWait}
            />
          </div>
          <aside className="flex flex-col gap-3 xl:w-4/12 lg:w-5/12">
            <SummaryCard clientData={clientData} />
            {/* Navigation Buttons */}
            <div className="flex md:flex-wrap gap-2 justify-between w-full">
              <button className="btn w-5/12 px-0 md:w-full btn-gray">
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
                Vehicle Features
              </button>
              <button className="btn w-5/12 px-0 md:w-full btn-warning text-base-100">
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
              <PageIndicator />
              <ExtrasCard
                increase={increase}
                decrease={decrease}
                updateClientData={updateClientData}
                childSeatNumber={childSeatNumber}
                flowersNumber={flowersNumber}
                airportAssistance={airportAssistance}
                wait={wait}
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
    </>
  );
});

export default Extras;
