"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useMemo } from "react";

/**
 * Payment failure page
 * Parses redirect params from /api/payment/callback
 * Displays user-friendly + raw Garanti error messages (errmsg, hostmsg)
 */
export default function FailedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const uuid = searchParams.get("uuid");
  const status = searchParams.get("status");
  const code = searchParams.get("code");
  const rawError = searchParams.get("error");

  // ✅ Decode safely (handles Turkish chars)
  const decodedError = useMemo(() => {
    try {
      return rawError ? decodeURIComponent(rawError) : null;
    } catch {
      return rawError;
    }
  }, [rawError]);

  // ✅ Eğer error JSON formatında geldiyse parse et
  const parsedError = useMemo(() => {
    if (!decodedError) return null;
    try {
      return JSON.parse(decodedError);
    } catch {
      return null;
    }
  }, [decodedError]);

  // ✅ Garanti'den gelen ham alanlar
  const errmsg =
    parsedError?.errmsg || parsedError?.ErrMsg || parsedError?.mderrormessage;
  const hostmsg =
    parsedError?.hostmsg || parsedError?.HostMsg || parsedError?.mderrormessage;

  // ✅ Kullanıcı dostu açıklama
  const readableError = useMemo(() => {
    const errText =
      (errmsg || hostmsg || decodedError || "").toLowerCase();

    if (errText.includes("farklı döviz"))
      return "This terminal is not authorized for foreign currency transactions.";
    if (errText.includes("declined"))
      return "Your payment was declined by the bank.";
    if (errText.includes("guvenlik") || errText.includes("3d"))
      return "3D Secure authentication failed. Please try again.";
    if (errText.includes("para birimi"))
      return "Invalid or unsupported currency code for this terminal.";
    if (errText.includes("issuer"))
      return "The card issuer could not process this transaction.";
    if (code?.startsWith("PRC_"))
      return "The payment provider rejected the transaction.";

    return "We could not process your payment. Please try again later.";
  }, [errmsg, hostmsg, decodedError, code]);

  return (
    <main className="min-h-[75vh] flex flex-col items-center justify-center bg-base-200 rounded-box shadow-md p-8 text-center">
      <h1 className="text-3xl font-bold text-error mb-4">
        Payment Failed
      </h1>

      {/* Readable summary */}
      <p className="text-base-content/80 mb-6 max-w-lg leading-relaxed">
        {readableError}
      </p>

      {/* Technical block */}
      <div className="bg-error/10 border border-error/40 text-error text-sm rounded-lg p-4 mb-6 w-full max-w-lg text-left">
        <p className="font-semibold mb-2">Technical details:</p>
        <div className="space-y-1 text-error-content break-words">
          <p><strong>Code:</strong> {code || "N/A"}</p>
          <p><strong>Garanti Error (errmsg):</strong> {errmsg || "N/A"}</p>
          <p><strong>Host Message:</strong> {hostmsg || "N/A"}</p>
          <p><strong>Status:</strong> {status || "unknown"}</p>
          {uuid && <p><strong>Order ID:</strong> {uuid}</p>}
        </div>
      </div>

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