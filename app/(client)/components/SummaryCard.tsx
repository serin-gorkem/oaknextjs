import { memo } from "react";
import { useCurrency } from "../context/CurrencyContext";
import GetFinalPrice from "./GetFinalPrice";

const SummaryCard = memo(function ({ clientData }: any) {
  const { symbol } = useCurrency();

  
  return (
    <article className="bg-base-300 rounded-box shadow-md flex gap-4 flex-col px-3 py-4 ">
      <img src={clientData?.booking?.image_url} className="w-full"></img>
      <div>
        <>
          <h1 className="text-2xl md:text-4xl my-3">Transfer Details</h1>
          <div className="flex flex-col">
            <h2 className="title mb-1">TRANSFER TYPE</h2>
            <p className="section-text font-bold">
              {clientData?.return_data?.return_trip ? "Return Trip" : "One Way"}
            </p>
          </div>
          <div className="divider my-1"></div>
          <div className="flex flex-col">
            <h2 className="title mb-1">VEHICLE</h2>
            <p className="section-text font-bold">
              {clientData?.booking.vehicle_name}
            </p>
          </div>
          <div className="divider my-1"></div>
          <div className="flex flex-col">
            <h2 className="title mb-1">PICKUP LOCATION</h2>
            <p className="section-text font-bold">
              {clientData?.pickup_location.name}
            </p>
          </div>
          <div className="divider my-1"></div>
          <div className="flex flex-col">
            <h2 className="title mb-1">DROP OFF LOCATION</h2>
            <p className="section-text font-bold">
              {clientData?.drop_off_location.name}
            </p>
          </div>
          <div className="divider my-1"></div>
          <div className="flex flex-col">
            <h2 className="title mb-1">PICKUP DATE, TIME</h2>
            <div className="flex flex-wrap gap-2">
              <p className="section-text font-bold">
                {clientData?.passenger_count} Person /
              </p>
              <p className="section-text font-bold">
                {clientData?.pickup_date} /{" "}
              </p>
              <p className="section-text font-bold">
                {clientData?.pickup_hour}
              </p>
            </div>
          </div>
          {clientData?.return_data.return_trip == true && (
            <>
              <div className="divider my-1"></div>
              <div className="flex flex-col">
                <h2 className="title mb-1">RETURN DATE, TIME</h2>
                <div className="flex flex-wrap gap-2">
                  <p className="section-text font-bold">
                    {clientData?.return_data.return_count} Person /
                  </p>
                  <p className="section-text font-bold">
                    {clientData?.return_data.return_date} /{" "}
                  </p>
                  <p className="section-text font-bold">
                    {clientData?.return_data.return_hour}
                  </p>
                </div>
              </div>
            </>
          )}
          {clientData?.extras && Object.keys(clientData?.extras).length > 0 ? (
            <>
              <div className="divider my-1"></div>
              <div className="flex flex-col">
                <h2 className="title mb-1">Extras</h2>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(clientData?.extras).map(
                    ([key, value]: [string, unknown], index: number) => {
                      const labelMap: Record<string, string> = {
                        childSeat: "Child Seat",
                        flowers: "Bouquet of Flowers",
                        airportAssistance: "Airport Assistance",
                        wait: "Extra Wait",
                      };

                      // Şart: Sadece true boolean ya da pozitif sayı olanlar gösterilecek
                      const isTrueBoolean = typeof value === "boolean" && value;
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
              <p className="section-text font-bold">
                {clientData?.booking.route_info.distanceKm.toFixed(0)} km
              </p>
              <div className="divider my-1"></div>
            </div>
            <div className="flex w-1/2 flex-col">
              <h2 className="title mb-1">TOTAL TIME</h2>
              <p className="section-text font-bold">
                {clientData?.booking.route_info.durationHours} h{" "}
                {clientData?.booking.route_info.durationMinutes} min
              </p>
              <div className="divider my-1"></div>
            </div>
          </div>
          <div className="flex justify-between">
            <h2 className="title text-2xl mb-1">TOTAL</h2>
            <p className="section-text text-xl font-bold">
              {GetFinalPrice(clientData)} {symbol}
            </p>
          </div>
        </>
      </div>
    </article>
  );
});
export default SummaryCard;