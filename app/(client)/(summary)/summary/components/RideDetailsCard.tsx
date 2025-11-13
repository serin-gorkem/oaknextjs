import GetFinalPrice from "@/app/(client)/components/GetFinalPrice";
import { useCurrency } from "@/app/(client)/context/CurrencyContext";
import { memo } from "react";

/* ------------------------- Types ------------------------- */
interface RideDetailsProps {
  clientData: {
    booking?: {
      vehicle_name?: string;
      route_info?: {
        distanceKm?: number;
        durationHours?: number;
        durationMinutes?: number;
      };
    };
    pickup_location?: { name?: string };
    drop_off_location?: { name?: string };
    pickup_date?: string;
    pickup_hour?: string;
    passenger_count?: number;
    extras?: Record<string, boolean | number>;
    return_data?: { return_trip?: boolean };
  };
  navigateToDetails: () => void;
}

/**
 * RideDetails Component
 * ------------------------------------------------------------
 * Displays detailed information about the selected transfer,
 * including locations, pickup time, extras, and total cost.
 */
const RideDetails = memo(function RideDetails({
  clientData,
  navigateToDetails,
}: RideDetailsProps) {
  const { symbol } = useCurrency();

  const route = clientData?.booking?.route_info || {};

  return (
    <article className="relative flex flex-col gap-4 rounded-box p-6 bg-base-300 w-full shadow-xl card-xl">
      {/* Header */}
      <header className="flex justify-between items-start mb-2">
        <h1 className="text-xl md:text-4xl my-3 font-bold">Transfer Details</h1>
        <button onClick={navigateToDetails} className="btn btn-primary w-24">
          Edit
        </button>
      </header>

      {/* Vehicle Info */}
      <InfoBlock label="VEHICLE" value={clientData?.booking?.vehicle_name} />
      <Divider />

      <InfoBlock
        label="TYPE"
        value={clientData?.return_data?.return_trip ? "Return Trip" : "One Way"}
      />
      <Divider />

      <InfoBlock
        label="PICKUP LOCATION"
        value={clientData?.pickup_location?.name}
      />
      <Divider />

      <InfoBlock
        label="DROP OFF LOCATION"
        value={clientData?.drop_off_location?.name}
      />
      <Divider />

      {/* Pickup Date & Time */}
      <section className="flex flex-col">
        <h2 className="title mb-1">PICKUP DATE, TIME</h2>
        <div className="flex flex-wrap gap-2">
          <p className="section-text font-bold">{clientData?.pickup_date}</p>
          <p className="section-text font-bold">{clientData?.pickup_hour}</p>
          <p className="section-text font-bold">
            {clientData?.passenger_count} Person
          </p>
        </div>
      </section>

      {/* Extras Section */}
      {clientData?.extras && Object.keys(clientData.extras).length > 0 && (
        <>
          <Divider />
          <section>
            <h2 className="title mb-1">EXTRAS</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(clientData.extras).map(([key, value], i) => {
                const labels: Record<string, string> = {
                  childSeat: "Child Seat",
                  flowers: "Bouquet of Flowers",
                  airportAssistance: "Airport Assistance",
                  wait: "Extra Wait",
                };

                const isValid =
                  (typeof value === "boolean" && value) ||
                  (typeof value === "number" && value > 0);

                if (!isValid) return null;

                return (
                  <p key={i} className="section-text font-bold">
                    {labels[key] || key}
                    {typeof value === "number" ? `: ${value}` : ""}
                  </p>
                );
              })}
            </div>
          </section>
        </>
      )}

      <Divider />

      {/* Distance & Duration */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <InfoBlock
          label="TOTAL DISTANCE"
          value={
            route.distanceKm ? `${route.distanceKm.toFixed(2)} km` : undefined
          }
        />
        <InfoBlock
          label="TOTAL TIME"
          value={
            route.durationHours !== undefined && route.durationMinutes !== undefined
              ? `${route.durationHours} h ${route.durationMinutes} min`
              : undefined
          }
        />
      </div>

      <Divider />

      {/* Total Price */}
      <div className="flex justify-between items-center">
        <h2 className="title text-2xl mb-1 font-bold">TOTAL PRICE</h2>
        <p className="section-text text-xl font-bold">
          {GetFinalPrice(clientData)} {symbol}
        </p>
      </div>
    </article>
  );
});

/* ------------------------- Subcomponents ------------------------- */

interface InfoBlockProps {
  label: string;
  value?: string | number;
}

function InfoBlock({ label, value }: InfoBlockProps) {
  return (
    <div className="flex flex-col">
      <h2 className="title mb-1 uppercase">{label}</h2>
      <p className="section-text font-bold">{value || "—"}</p>
    </div>
  );
}

function Divider() {
  return <div className="divider my-1" />;
}

export default RideDetails;
