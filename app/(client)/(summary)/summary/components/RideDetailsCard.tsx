import { useCurrency } from "@/app/(client)/context/CurrencyContext";
import { useVehicle } from "@/app/(client)/context/VehicleContext";
import { memo } from "react";
type RideDetailsProps = {
  clientData: any;
  navigateToDetails: () => void;
};
const RideDetails = memo(function ({
  clientData,
  navigateToDetails,
}: RideDetailsProps) {
  //Get local variables
  const { currencyIndex } = useCurrency();
  const { vehicles } = useVehicle();

  return (
    <article className="flex flex-col relative gap-4 rounded-box p-6 bg-base-300 w-full md:flex-1/2 lg:flex-1/4 card-xl shadow-xl">
      <div className="map"></div>
      <div className="relative">
        <div className="right-0 top-5 absolute flex flex-col gap-2">
          <button onClick={navigateToDetails} className="btn w-24 btn-primary">
            Edit
          </button>
        </div>
        <h1 className="text-xl md:text-4xl my-3"> Transfer Details </h1>
        <div className="flex flex-col">
          <h2 className="title mb-1">VEHICLE</h2>
          <p className="section-text font-bold">
            {clientData?.booking?.vehicle_name}
          </p>
        </div>
        <div className="divider my-1"></div>
        <div className="flex flex-col">
          <h2 className="title mb-1">TYPE</h2>
          <p className="section-text font-bold">
            {clientData?.return_data?.return_trip ? "Return Trip" : "One Way"}
          </p>
        </div>
        <div className="divider my-1"></div>
        <div className="flex flex-col">
          <h2 className="title mb-1">PICKUP LOCATION</h2>
          <p className="section-text font-bold">
            {clientData?.pickup_location?.name ?? ""}
          </p>
        </div>
        <div className="divider my-1"></div>
        <div className="flex flex-col">
          <h2 className="title mb-1">DROP OFF LOCATION</h2>
          <p className="section-text font-bold">
            {clientData?.drop_off_location?.name ?? ""}
          </p>
        </div>
        <div className="divider my-1"></div>
        <div className="flex flex-col">
          <h2 className="title mb-1">PICKUP DATE, TIME</h2>
          <div className="flex flex-wrap gap-2">
            <p className="section-text font-bold">
              {clientData?.pickup_date ?? ""}
            </p>
            <p className="section-text font-bold">
              {clientData?.pickup_hour ?? ""}
            </p>
            <p className="section-text font-bold">
              {clientData?.passenger_count} Person
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          {clientData?.extras && Object.keys(clientData?.extras).length > 0 ? (
            <>
            <div className="divider my-1"></div>
              <div className="flex flex-col">
                <h2 className="title mb-1">Extras</h2>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(clientData?.extras).map(
                    ([key, value]: [string, unknown], index: number) => {
                      const labelMap: Record<string, string> = {
                        childSeatNumber: "Child Seat",
                        flowersNumber: "Bouquet of Flowers",
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
        </div>
        <div className="divider my-1"></div>
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col w-1/2">
            <h2 className="title mb-1">TOTAL DISTANCE</h2>
            <p className="section-text font-bold">
              {clientData?.booking.route_info.distanceKm}
            </p>
            <div className="divider my-1"></div>
          </div>
          <div className="flex w-1/2 flex-col">
            <h2 className="title mb-1">TOTAL TIME</h2>
            <p className="section-text font-bold">
              {clientData?.booking.route_info.durationHours} h {clientData?.booking.route_info.durationMinutes} min
            </p>
            <div className="divider my-1"></div>
          </div>
        </div>
        <div className="flex justify-between">
          <h2 className="title text-2xl mb-1">TOTAL PRICE</h2>
          {/* <p className="section-text text-xl font-bold">
            {vehicles?.[currencyIndex]?.prices[currencyIndex]?.amount}
            {vehicles?.[currencyIndex]?.prices[currencyIndex]?.currency_symbol}
          </p> */}
        </div>
      </div>
    </article>
  );
});

export default RideDetails;
