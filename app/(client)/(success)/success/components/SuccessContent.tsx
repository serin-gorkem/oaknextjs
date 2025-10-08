import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCurrency } from "../../../context/CurrencyContext";
import GetFinalPrice from "@/app/(client)/components/GetFinalPrice";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { symbol } = useCurrency();
  const [sending, setSending] = useState(false);

  const encoded = searchParams.get("data");
  const clientData = encoded ? JSON.parse(decodeURIComponent(encoded)) : null;
  const finalPrice = GetFinalPrice(clientData);

  if (!clientData) return <p>Invalid payment data.</p>;

  const isCash = clientData.payment_method === "cash";
  const isCard = clientData.payment_method === "credit";

  const handleConfirm = async () => {
    setSending(true);

    try {
      const res = await fetch("/api/sendBookingMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...clientData,
          price: finalPrice,
          symbol,
        }),
      });

      const result = await res.json();
      console.log("Mail sent:", result);
    } catch (err) {
      console.error("Mail error:", err);
    }

    // Mail gönderildikten sonra anasayfaya yönlendir
    router.push("/");
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-base-200 rounded-box shadow-md p-8 text-center">
      <h1 className="text-2xl font-semibold mb-4">
        Payment {isCard ? "Confirmed" : "Pending "}
      </h1>

      {isCard && (
        <p className="text-gray-700 mb-4">
          Your credit card payment has been confirmed. Thank you for your trust.
        </p>
      )}

      {isCash && (
        <p className="text-gray-700 mb-4">
          You choose cash payment. Please pay the driver or at the airport
          counter.
        </p>
      )}

      <div className="w-full max-w-md bg-base-100 rounded-box shadow p-6 mt-4 text-left">
        <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <strong>Name:</strong> {clientData?.details?.name}{" "}
            {clientData?.details?.lastName}
          </li>
          <li>
            <strong>Email:</strong> {clientData?.details?.email}
          </li>
          <li>
            <strong>Phone:</strong> {clientData?.details?.phone}
          </li>
          <li>
            <strong>Passengers Count:</strong> {clientData?.passenger_count}
          </li>
          {clientData?.details?.message && (
            <li>
              <strong>Message:</strong> {clientData.details.message}
            </li>
          )}
          <li>
            <strong>Pickup Location:</strong> {clientData?.pickup_location?.name}
          </li>
          {clientData?.details?.flightNumber && (
            <li>
              <strong>Flight Number:</strong> {clientData.details.flightNumber}
            </li>
          )}
          {clientData?.extras && Object.keys(clientData.extras).length > 0 && (
            <li>
              <strong>Extras:</strong>{" "}
              {Object.entries(clientData.extras)
                .filter(([_, value]) => value && value !== 0)
                .map(([key, value], index, arr) => (
                  <span key={key}>
                    {key === "airportAssistance" && "Airport Assistance"}
                    {key === "childSeat" && `Child Seat (${value})`}
                    {key === "flowers" && "Flowers"}
                    {key === "wait" && "Waiting Service"}
                    {index < arr.length - 1 ? ", " : ""}
                  </span>
                ))}
            </li>
          )}
          <li>
            <strong>Drop Off Location:</strong>{" "}
            {clientData?.drop_off_location?.name}
          </li>
          <li>
            <strong>Pickup Date:</strong> {clientData?.pickup_date}
          </li>
          <li>
            <strong>Pickup Hour:</strong> {clientData?.pickup_hour}
          </li>
          {clientData?.return_data?.return_trip && (
            <li>
              <strong>Return Trip:</strong>{" "}
              {clientData.return_data.return_date
                ? clientData.return_data.return_date
                : "No date specified"}
              {clientData.return_data.return_hour
                ? ` at ${clientData.return_data.return_hour}`
                : ""}
              {clientData.return_data.return_count
                ? ` — Passengers: ${clientData.return_data.return_count}`
                : ""}
            </li>
          )}
          <li>
            <strong>Vehicle Type:</strong> {clientData?.booking?.vehicle_name}
          </li>
          <li>
            <strong>Payment Method:</strong> {isCard ? "Credit Card" : "Cash"}
          </li>
          <li>
            <strong>
              Price: {finalPrice} {symbol}
            </strong>
          </li>
        </ul>
      </div>

      <button
        onClick={handleConfirm}
        className="btn btn-primary mt-8"
        disabled={sending}
      >
        {sending ? "Sending..." : "Confirm & Send Mail"}
      </button>
    </div>
  );
};

export default SuccessPage;
