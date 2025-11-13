"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useMemo } from "react";

/**
 * Payment failure page
 * Parses redirect params from /api/payment/callback
 * Supports both standard query params and encoded error messages from Garanti
 */
export default function FailedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const uuid = searchParams.get("uuid");
  const status = searchParams.get("status");
  const code = searchParams.get("code");
  const rawError = searchParams.get("error");

  // ✅ decodeURIComponent to fix Turkish characters like "İşleminizi gerçekleştiremiyoruz"
  const decodedError = useMemo(() => {
    try {
      return rawError ? decodeURIComponent(rawError) : null;
    } catch {
      return rawError;
    }
  }, [rawError]);

  // ✅ Generate human-readable explanation
  const readableError = useMemo(() => {
    if (!code && !decodedError)
      return "An unexpected error occurred during payment.";

    const err = (decodedError || "").toLowerCase();

    if (err.includes("yurtici") || err.includes("yp"))
      return "Domestic cards cannot be used for foreign currency transactions.";
    if (err.includes("declined"))
      return "Your transaction was declined by the bank.";
    if (err.includes("guvenlik") || err.includes("3d"))
      return "3D Secure verification failed. Please try again.";
    if (code?.startsWith("MD_"))
      return "3D authentication could not be completed successfully.";
    if (code?.startsWith("PRC_"))
      return "The payment provider declined the transaction.";
    return decodedError || "Payment could not be processed.";
  }, [code, decodedError]);

  return (
    <main className="min-h-[75vh] flex flex-col items-center justify-center bg-base-200 rounded-box shadow-md p-8 text-center">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-error mb-4">
        Payment Failed
      </h1>

      {/* Readable message */}
      <p className="text-base-content/80 mb-6 max-w-lg leading-relaxed">
        {readableError}
      </p>

      {/* Technical details */}
      <div className="bg-error/10 border border-error/40 text-error text-sm rounded-lg p-4 mb-6 w-full max-w-lg text-left">
        <p className="font-semibold mb-2">Technical details:</p>
        <div className="space-y-1 text-error-content break-words">
          <p><strong>Code:</strong> {code || "N/A"}</p>
          <p><strong>Message:</strong> {decodedError || "No error message provided."}</p>
          <p><strong>Status:</strong> {status || "unknown"}</p>
          {uuid && <p><strong>Order ID:</strong> {uuid}</p>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-center flex-wrap">
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
    </main>
  );
}