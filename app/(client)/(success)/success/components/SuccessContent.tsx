"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useCurrency } from "../../../context/CurrencyContext";

function useFinalPrice(clientData: any) {
  const { convertPrice } = useCurrency();
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchConvertedPrice = async () => {
      const basePrice = clientData?.booking?.total_price ?? clientData?.price;
      if (basePrice) {
        const converted = await convertPrice(basePrice);
        setFinalPrice(Math.round(converted));
      }
    };
    if (clientData) fetchConvertedPrice();
  }, [clientData, convertPrice]);

  return finalPrice;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { symbol } = useCurrency();
  const [sending, setSending] = useState(false);
  const [clientData, setClientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get("order");
  const status = searchParams.get("status");

  useEffect(() => {
    if (!orderId) return;

    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/get-booking?uuid=${orderId}`);
        if (!res.ok) throw new Error("Booking not found");
        const data = await res.json();
        setClientData(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [orderId]);

  const finalPrice = useFinalPrice(clientData);

  if (loading) return <p>Loading booking details...</p>;
  if (!clientData) return <p>Invalid or expired booking data.</p>;

  const isCard = status === "paid" || clientData.payment_method === "credit";

  const handleConfirm = async () => {
    setSending(true);
    try {
      const res = await fetch("/api/send-booking-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...clientData, price: finalPrice, symbol }),
      });
      const result = await res.json();
      console.log("Mail sent:", result);
    } catch (err) {
      console.error("Mail error:", err);
    }
    router.push("/");
  };

  const extrasList =
    clientData?.extras &&
    Object.entries(clientData.extras)
      .filter(([_, v]) => v && v !== 0)
      .map(([key, value]) => {
        if (key === "airportAssistance") return "Airport Assistance";
        if (key === "flowers") return "Flowers";
        if (key === "wait") return "Waiting Service";
        if (key === "childSeat") return `Child Seat (${value})`;
        return key;
      })
      .join(", ");

  return (
    <div className="min-h-[70vh] my-24 lg:m-0 flex flex-col items-center justify-center bg-base-200 rounded-box shadow-md p-8 text-center">
      <h1 className="text-2xl font-semibold mb-4">
        Payment {isCard ? "Confirmed" : "Pending"}
      </h1>

      <p className="text-gray-700 mb-4">
        {isCard
          ? "Your credit card payment has been confirmed. Thank you for your trust."
          : "You chose cash payment. Please pay the driver or at the counter.\nClick “Confirm & Send Mail” below to finalize your booking."}
      </p>

      <div className="w-full max-w-md bg-base-100 rounded-box shadow p-6 mt-4 text-left">
        <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
        <ul className="space-y-2 text-sm">
          <li><strong>Name:</strong> {clientData.details?.name} {clientData.details?.lastName}</li>
          <li><strong>Email:</strong> {clientData.details?.email}</li>
          <li><strong>Phone:</strong> {clientData.details?.phone}</li>
          {clientData.details?.flightNumber && (
            <li><strong>Flight Number:</strong> {clientData.details.flightNumber}</li>
          )}
          {clientData.details?.message && (
            <li><strong>Message:</strong> {clientData.details.message}</li>
          )}
          <li><strong>Passengers:</strong> {clientData.passenger_count}</li>
          <li><strong>Pickup:</strong> {clientData.pickup_location?.name}</li>
          <li><strong>Drop Off:</strong> {clientData.drop_off_location?.name}</li>
          <li><strong>Pickup Date:</strong> {clientData.pickup_date}</li>
          <li><strong>Pickup Hour:</strong> {clientData.pickup_hour}</li>
          <li><strong>Vehicle:</strong> {clientData.booking?.vehicle_name}</li>
          {extrasList && <li><strong>Extras:</strong> {extrasList}</li>}
          {clientData.return_data?.return_trip && (
            <li>
              <strong>Return Trip:</strong> {clientData.return_data.return_date || "N/A"}{" "}
              {clientData.return_data.return_hour
                ? `at ${clientData.return_data.return_hour}`
                : ""}
              {clientData.return_data.return_count
                ? ` — Passengers: ${clientData.return_data.return_count}`
                : ""}
            </li>
          )}
          <li><strong>Payment:</strong> {isCard ? "Credit Card" : "Cash"}</li>
          <li><strong>Price:</strong> {finalPrice ?? "..."} {symbol}</li>
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
}