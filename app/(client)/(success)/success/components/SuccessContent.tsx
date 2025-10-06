"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { useCurrency } from "../../../context/CurrencyContext";
import GetFinalPrice from "@/app/(client)/components/GetFinalPrice";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { symbol } = useCurrency();  

  const encoded = searchParams.get("data");
  const clientData = encoded ? JSON.parse(decodeURIComponent(encoded)) : null;

  if (!clientData) return <p>Invalid payment data.</p>;

  console.log(clientData);
  

  const isCash = clientData.payment_method === "cash";
  const isCard = clientData.payment_method === "credit";

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
          You choose cash payment. Please pay the driver or at the airport counter.
        </p>
      )}

      <div className="w-full max-w-md bg-base-100 rounded-box shadow p-6 mt-4 text-left">
        <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <strong>Name:</strong> {clientData?.details?.name} {clientData?.details?.lastName}
          </li>
          <li>
            <strong>Email:</strong> {clientData?.details?.email}
          </li>
          <li>
            <strong>Phone:</strong> {clientData?.details?.phone}
          </li>
          <li>
            <strong>Pickup Location:</strong> {clientData?.pickup_location?.name}
          </li>
          <li>
            <strong>Drop Off location:</strong> {clientData?.drop_off_location?.name}
          </li>
          <li>
            <strong>Pickup Date:</strong> {clientData?.pickup_date}
          </li>
          <li>
            <strong>Pickup Hour:</strong> {clientData?.pickup_hour}
          </li>
          <li>
            <strong>Payment Method:</strong>{" "}
            {isCard ? "Credit Card" : "Cash"}
          </li>
          <li>
            <strong>Price: {GetFinalPrice(clientData)} {symbol} </strong>
          </li>
          
        </ul>
      </div>

      <button
        onClick={() => router.push("/")}
        className="btn btn-primary mt-8"
      >
        Back to Homepage
      </button>
    </div>
  );
};

export default SuccessPage;
