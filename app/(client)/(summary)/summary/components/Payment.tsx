"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetData } from "@/app/(client)/components/GetData";

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState<
    "credit" | "cash" | null
  >(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const router = useRouter();
  const {clientData} = useGetData();

const navigateToSuccess = (clientData:any) => {
  const encoded = encodeURIComponent(JSON.stringify(clientData));
  router.push(`/success?data=${encoded}`);
};

const navigateToFailed = (clientData:any) => {
  const encoded = encodeURIComponent(JSON.stringify(clientData));
  router.push(`/failed?data=${encoded}`);
};

  const handlePaymentSelect = (method: "credit" | "cash") => {
    setSelectedMethod(method);
    setMessage(null); // yeni seçimde mesajı sıfırla
  };

  const sendPaymentRequest = async (updatedClientData: any) => {
  // Örnek: kredi kartı ise başarı, nakit ise sadece booking kabul
  if (updatedClientData.payment_method === "credit") {
    return { success: true };
  } else if (updatedClientData.payment_method === "cash") {
    return { success: true }; // nakit de başarılı kabul ediyoruz
  } else {
    return { success: false };
  }
};
  const handlePayment = async () => {
  try {
    // Ödeme methodu nakit veya kredi kartı
    const paymentMethod = selectedMethod; // örn: "cash" veya "credit"

    const updatedClientData = {
      ...clientData,
      payment_method: paymentMethod,
    };

    // Ödeme işlemi veya API çağrısı
    const result = await sendPaymentRequest(updatedClientData);

    if (result.success) {
      // ✅ Başarılı işlem
      navigateToSuccess(updatedClientData);
    } else {
      // ❌ Başarısız işlem
      navigateToFailed(updatedClientData);
    }
  } catch (error) {
    console.error(error);
    navigateToFailed(clientData);
  }
};
  const renderCheckIcon = (method: "credit" | "cash") => {
    return selectedMethod === method ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-10 text-success"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ) : null;
  };

  return (
    <div className="bg-base-300 relative sm:w-full rounded-box shadow-md flex gap-4 flex-col px-3 py-4">
      <h1 className="text-md font-semibold">Choose payment method</h1>

      {/* CREDIT CARD */}
      <div
        className={`w-full cursor-pointer flex justify-between items-center h-24 p-4 rounded-lg transition-all ${
          selectedMethod === "credit"
            ? "bg-primary/20 border-2 border-primary"
            : "hover:bg-primary-content"
        }`}
        onClick={() => handlePaymentSelect("credit")}
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
            />
          </svg>
          <p className="text-lg">Credit Card (PayTR)</p>
        </div>
        {renderCheckIcon("credit")}
      </div>

      {/* CASH */}
      <div
        className={`w-full cursor-pointer flex justify-between items-center h-24 p-4 rounded-lg transition-all ${
          selectedMethod === "cash"
            ? "bg-primary/20 border-2 border-primary"
            : "hover:bg-primary-content"
        }`}
        onClick={() => handlePaymentSelect("cash")}
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>
          <p className="text-lg">Cash</p>
        </div>
        {renderCheckIcon("cash")}
      </div>

      {/* TERMS */}
      <label className="flex items-center">
        <input
          className="mx-2"
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => {
            setTermsAccepted(e.target.checked);
            setMessage(null);
          }}
        />
        <span>
          I have read and agree to the <strong>Pre-Information Form</strong> and{" "}
          <strong>Cancellation & Refund Policy</strong>.
        </span>
      </label>
      <p className="text-sm text-gray-500">
        <a href="/policy" target="_blank" className="underline">
          View Terms
        </a>
      </p>

      {/* SUBMIT BUTTON */}
        <button
        className="btn btn-primary w-full mt-2"
        disabled={!selectedMethod || !termsAccepted}
        onClick={handlePayment} // handleSubmit değil
        >
        Confirm & Continue
        </button>

      {/* MESSAGE BOX */}
      {message && (
        <div
          className={`mt-2 text-center rounded-md p-2 text-sm font-medium ${
            message.type === "error"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Payment;
