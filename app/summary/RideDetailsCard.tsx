"use client";
import { memo } from "react";
import useFormVariables from "../(home)/components/useGetLocalVariables";

type RideDetailsProps = {
  navigateToHome: () => void;
  vehicleType?: string;
  totalDistance?: string;
  totalTime?: string;
  totalPrice?: string;
};

const RideDetails = memo(function (props: RideDetailsProps) {
  //Get local variables
  const { getFormVariables } = useFormVariables();
  const localData = getFormVariables();
  console.log(localData);

  return (
    <article className="flex flex-col relative gap-4 rounded-box p-6 bg-base-300 w-full md:flex-1/2 lg:flex-1/4 card-xl shadow-xl">
      <div className="map"></div>
      <div className="relative">
        <div onClick={props.navigateToHome} className="border-2 border-gray rounded-box p-1 px-8 cursor-pointer right-0 top-5 absolute flex flex-col gap-2">
          <p>Edit</p>
        </div>
        <h1 className="text-xl md:text-4xl my-3"> Transfer Details </h1>
        <div className="flex flex-col">
          <h2 className="title mb-1">VEHICLE</h2>
          <p className="section-text font-bold">{props.vehicleType}</p>
        </div>
        <div className="divider my-1"></div>
        <div className="flex flex-col">
          <h2 className="title mb-1">PICKUP LOCATION</h2>
          <p className="section-text font-bold">
            {localData?.pickupLocation.name ?? ""}
          </p>
        </div>
        <div className="divider my-1"></div>
        <div className="flex flex-col">
          <h2 className="title mb-1">DROP OFF LOCATION</h2>
          <p className="section-text font-bold">
            {localData?.dropOffLocation.name ?? ""}
          </p>
        </div>
        <div className="divider my-1"></div>
        <div className="flex flex-col">
          <h2 className="title mb-1">PICKUP DATE, TIME</h2>
          <div className="flex flex-wrap gap-2">
            <p className="section-text font-bold">
              {localData?.pickupDate ?? ""}
            </p>
            <p className="section-text font-bold">
              {localData?.pickupHour ?? ""}
            </p>
            <p className="section-text font-bold">
              {localData?.passengerCount} Person
            </p>
          </div>
        </div>
        <div className="divider my-1"></div>
        <div className="flex flex-col">
          <h2 className="title mb-1">Extras</h2>
          {localData?.extras && Object.keys(localData?.extras).length > 0 ? (
            <>
              <div className="flex flex-col">
                <div className="flex flex-wrap gap-2">
                {localData.extras &&
            Object.keys(localData.extras).length > 0 ? (
              <>
                <div className="divider my-1"></div>
                <div className="flex flex-col">
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(localData.extras).map(
                      ([key, value], index) => {
                        const labelMap = {
                          childSeatNumber: "Child Seat",
                          flowersNumber: "Bouquet of Flowers",
                          airportAssistance: "Airport Assistance",
                          wait: "Extra Wait",
                        };

                        // Şart: Sadece true boolean ya da pozitif sayı olanlar gösterilecek
                        const isTrueBoolean =
                          typeof value === "boolean" && value;
                        const isPositiveNumber =
                          typeof value === "number" && value > 0;

                        if (!isTrueBoolean && !isPositiveNumber) return null;

                        return (
                          <div key={index} className="section-text font-bold">
                            {labelMap[key as keyof typeof labelMap] || key}
                            {isPositiveNumber ? `: ${value}` : ""}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </>
            ) : null}
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div className="divider my-1"></div>
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col w-1/2">
            <h2 className="title mb-1">TOTAL DISTANCE</h2>
            <p className="section-text font-bold">{props.totalDistance}</p>
            <div className="divider my-1"></div>
          </div>
          <div className="flex w-1/2 flex-col">
            <h2 className="title mb-1">TOTAL TIME</h2>
            <p className="section-text font-bold">{props.totalTime}</p>
            <div className="divider my-1"></div>
          </div>
        </div>
        <div className="flex justify-between">
          <h2 className="title text-2xl mb-1">TOTAL PRICE</h2>
          <p className="section-text text-xl font-bold">{props.totalPrice}</p>
        </div>
      </div>
    </article>
  );
});

export default RideDetails;