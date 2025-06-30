import { memo } from "react";

type LocalData = {
  pickupLocation: { name: string };
  dropOffLocation: { name: string };
  passengerCount: number;
  pickupDate: string;
  pickupHour: string;
  returnDate?: string;
  returnHour?: string;
  shouldShowReturnUI?: boolean;
  extras?: Record<string, unknown>;
};

type SummaryCardProps = {
  localData: LocalData | false;
  pickupLocation: string;
  vehicleType: string;
  transferType: string;
  img: string;
  totalDistance: string;
  totalTime: string;
  totalPrice: string;
  extras: Record<string, unknown>;
  navigateToVehicleFeatures: () => void;
  bags?: number;
};

const SummaryCard = memo(function (props: SummaryCardProps) {
  return (
    <article className="bg-base-300 rounded-box shadow-md flex gap-4 flex-col px-3 py-4 ">
      <img src={props.img} className="w-full"></img>
      <div>
        {props.localData ? (
          <>
            <h1 className="text-2xl md:text-4xl my-3">Transfer Details</h1>
            <div className="flex flex-col">
              <h2 className="title mb-1">TRANSFER TYPE</h2>
              <p className="section-text font-bold">{props.transferType}</p>
            </div>
            <div className="divider my-1"></div>
            <div className="flex flex-col">
              <h2 className="title mb-1">VEHICLE</h2>
              <p className="section-text font-bold">{props.vehicleType}</p>
            </div>
            <div className="divider my-1"></div>
            <div className="flex flex-col">
              <h2 className="title mb-1">PICKUP LOCATION</h2>
              <p className="section-text font-bold">
                {props.localData.pickupLocation.name}
              </p>
            </div>
            <div className="divider my-1"></div>
            <div className="flex flex-col">
              <h2 className="title mb-1">DROP OFF LOCATION</h2>
              <p className="section-text font-bold">
                {props.localData.dropOffLocation.name}
              </p>
            </div>
            <div className="divider my-1"></div>
            <div className="flex flex-col">
              <h2 className="title mb-1">PICKUP DATE, TIME</h2>
              <div className="flex flex-wrap gap-2">
                <p className="section-text font-bold">
                  {props.localData.passengerCount} Person /
                </p>
                <p className="section-text font-bold">
                  {props.localData.pickupDate} /{" "}
                </p>
                <p className="section-text font-bold">
                  {props.localData.pickupHour}
                </p>
              </div>
            </div>
            {props.localData.shouldShowReturnUI == true && (
              <>
                <div className="divider my-1"></div>
                <div className="flex flex-col">
                  <h2 className="title mb-1">RETURN DATE, TIME</h2>
                  <div className="flex flex-wrap gap-2">
                    <p className="section-text font-bold">
                      {props.localData.passengerCount} Person /
                    </p>
                    <p className="section-text font-bold">
                      {props.localData.returnDate} /{" "}
                    </p>
                    <p className="section-text font-bold">
                      {props.localData.returnHour}
                    </p>
                  </div>
                </div>
              </>
            )}
            {props.localData.extras &&
            Object.keys(props.localData.extras).length > 0 ? (
              <>
                <div className="divider my-1"></div>
                <div className="flex flex-col">
                  <h2 className="title mb-1">Extras</h2>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(props.localData.extras).map(
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
              <h2 className="title text-2xl mb-1">TOTAL</h2>
              <p className="section-text text-xl font-bold">
                {props.totalPrice}
              </p>
            </div>
          </>
        ) : (
          // If showItems is false, render summary page card.
          <div className="relative">
            <h1 className="text-xl md:text-3xl my-3">Vehicle Info</h1>
            <h2>{props.vehicleType}</h2>
            <div className="divider my-1"></div>
            <div onClick={props.navigateToVehicleFeatures} className="border-2 border-gray rounded-box p-1 px-8 cursor-pointer right-0 top-0 absolute flex flex-col gap-2">
              <p>Edit</p>
            </div>
            <p className="text-sm"> {props.bags} Bags</p>
          </div>
        )}
      </div>
    </article>
  );
});
export default SummaryCard;
