"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

const FailedPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const encoded = searchParams.get("data");
  const clientData = encoded ? JSON.parse(decodeURIComponent(encoded)) : null;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-base-200 rounded-box shadow-md p-8 text-center">
      <h1 className="text-2xl font-semibold text-error mb-4">
        Payment Failed
      </h1>
      <p className="text-gray-700 mb-6">
        We couldn’t process your payment. Please try again or choose another
        method.
      </p>

      <button onClick={() => router.push("/")} className="btn btn-primary">
        Back to Homepage
      </button>
    </div>
  );
};

export default FailedPage;
