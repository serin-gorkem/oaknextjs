"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

const FailedPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const uuid = searchParams.get("uuid");
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const status = searchParams.get("status");

  // Anlamlı mesaj üret
  const readableError = (() => {
    if (!code) return "An unexpected error occurred during payment.";
    if (code.startsWith("MD_")) return "3D Secure authentication was not completed successfully.";
    if (code.startsWith("PRC_")) return "The payment provider declined the transaction.";
    return "Payment could not be processed.";
  })();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-base-200 rounded-box shadow-md p-8 text-center">
      <h1 className="text-2xl font-semibold text-error mb-3">
        Payment Failed
      </h1>

      <p className="text-gray-700 mb-4 max-w-md">
        {readableError}
      </p>

      <div className="bg-error/10 border border-error/40 text-error text-sm rounded-lg p-4 mb-6 w-full max-w-md text-left">
        <p className="font-semibold mb-1">Technical details:</p>
        <p className="text-error-content break-words">
          <strong>Code:</strong> {code || "N/A"}
          <br />
          <strong>Message:</strong> {error || "No error message provided."}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => router.push(`/summary${uuid ? `?uuid=${uuid}` : ""}`)}
          className="btn btn-outline btn-error"
        >
          Try Again
        </button>

        <button onClick={() => router.push("/")} className="btn btn-primary">
          Return Home
        </button>
      </div>

      {status && (
        <p className="mt-4 text-xs text-gray-400">
          Status: {status}
        </p>
      )}
    </div>
  );
};

export default FailedPage;