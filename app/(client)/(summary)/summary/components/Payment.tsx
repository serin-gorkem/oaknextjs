"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetData } from "@/app/(client)/components/GetData";

const onlyDigits = (s: string) => s.replace(/\D/g, "");

export default function Payment() {
  const router = useRouter();
  const { clientData } = useGetData();
  const [selectedMethod, setSelectedMethod] = useState<"credit" | "cash" | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const [cardData, setCardData] = useState({ number: "", month: "", year: "", cvv: "" });

  const years = useMemo(() => {
    const y = new Date().getFullYear();
    return Array.from({ length: 13 }, (_, i) => String((y + i)).slice(-2));
  }, []);
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")), []);

  const formatCardNumber = (value: string) => {
    const digits = onlyDigits(value).slice(0, 19);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const validateCardInputs = () => {
    const digits = onlyDigits(cardData.number);
    return !(digits.length < 12 || digits.length > 19 || !cardData.month || !cardData.year || cardData.cvv.length < 3);
  };

  const navigateToSuccess = (data: any) => router.push(`/success?data=${encodeURIComponent(JSON.stringify(data))}`);
  const navigateToFailed  = (data: any) => router.push(`/failed?data=${encodeURIComponent(JSON.stringify(data))}`);

  const handlePayment = async () => {
    setMessage(null);
    if (!selectedMethod || !termsAccepted) {
      setMessage({ type: "error", text: "Please select a payment method and accept terms." });
      return;
    }

    if (selectedMethod === "cash") {
      router.push(`/success?order=${clientData.uuid}&status=cash`);
      return;
    }

    if (!validateCardInputs()) {
      setMessage({ type: "error", text: "Please fill card fields correctly." });
      return;
    }

    try {
      const payload = {
        uuid: clientData.uuid,
        cardData: {
          number: onlyDigits(cardData.number),
          month: cardData.month,
          year: cardData.year, // YY bekliyoruz; aşağıda backend normalize ediyor yine de
          cvv: cardData.cvv,
        },
      };

      console.log("POST /api/payment payload:", {
        uuid: payload.uuid,
        cardNumberPreview: payload.cardData.number.replace(/\d{4}(?=\d)/g, "$& ").slice(0, 19),
      });

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "Payment request failed");
        console.error("Payment route error:", errText);
        navigateToFailed(clientData);
        return;
      }

      const html = await res.text();
      console.log("Received HTML length:", html.length);

      document.open();
      document.write(html);
      document.close();

      setTimeout(() => {
        try {
          const form = document.forms?.[0];
          if (form) {
            // @ts-ignore
            form.submit();
          }
        } catch {}
      }, 1000);
    } catch (err) {
      console.error(err);
      navigateToFailed(clientData);
    }
  };

  return (
    <div className="bg-base-300 relative sm:w-full rounded-box shadow-md flex gap-4 flex-col px-3 py-4">
      <h1 className="text-md font-semibold">Choose payment method</h1>

      {/* CREDIT */}
      <div
        onClick={() => setSelectedMethod("credit")}
        className={`w-full cursor-pointer flex justify-between items-center h-24 p-4 rounded-lg transition-all ${
          selectedMethod === "credit" ? "bg-primary/20 border-2 border-primary" : "hover:bg-primary-content"
        }`}
      >
        <div className="flex items-center gap-2">
          <div aria-hidden>💳</div>
          <h3>Pay with Credit Card (3D Secure)</h3>
        </div>
        {selectedMethod === "credit" && <div aria-hidden>✅</div>}
      </div>

      {/* CASH */}
      <div
        onClick={() => setSelectedMethod("cash")}
        className={`w-full cursor-pointer flex justify-between items-center h-24 p-4 rounded-lg transition-all ${
          selectedMethod === "cash" ? "bg-primary/20 border-2 border-primary" : "hover:bg-primary-content"
        }`}
      >
        <div className="flex items-center gap-2">
          <div aria-hidden>💵</div>
          <p className="text-lg">Cash</p>
        </div>
        {selectedMethod === "cash" && <div aria-hidden>✅</div>}
      </div>

      {/* Card inputs */}
      {selectedMethod === "credit" && (
        <div className="mt-2">
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input
            inputMode="numeric"
            autoComplete="cc-number"
            value={cardData.number}
            onChange={(e) => setCardData((s) => ({ ...s, number: formatCardNumber(e.target.value) }))}
            placeholder="1234 5678 9012 3456"
            className="input input-bordered w-full"
            aria-label="Card number"
          />

          <div className="flex gap-2 mt-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Expiry Month</label>
              <select
                value={cardData.month}
                onChange={(e) => setCardData((s) => ({ ...s, month: e.target.value }))}
                className="input input-bordered w-full"
                aria-label="Expiry month"
                autoComplete="cc-exp-month"
              >
                <option value="">MM</option>
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Expiry Year</label>
              <select
                value={cardData.year}
                onChange={(e) => setCardData((s) => ({ ...s, year: e.target.value }))}
                className="input input-bordered w-full"
                aria-label="Expiry year"
                autoComplete="cc-exp-year"
              >
                <option value="">YY</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="w-28">
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                inputMode="numeric"
                value={cardData.cvv}
                onChange={(e) => setCardData((s) => ({ ...s, cvv: onlyDigits(e.target.value).slice(0, 4) }))}
                placeholder="CVV"
                maxLength={4}
                className="input input-bordered w-full"
                aria-label="Card CVV"
                autoComplete="cc-csc"
              />
            </div>
          </div>
        </div>
      )}

      {/* TERMS */}
      <label className="flex items-start gap-2 mt-4">
        <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1" />
        <div>
          <div className="text-sm">
            I have read and agree to the <strong>Service Delivery</strong>, <strong>Pre-Information Form</strong>,{" "}
            <strong>Cancellation & Refund Policy</strong> and <strong>Distance Sales Agreement</strong>.
          </div>
          <a href="/policy" target="_blank" rel="noreferrer" className="text-xs underline">View Terms & Policies</a>
        </div>
      </label>

      <button className="btn btn-primary w-full mt-2" disabled={!selectedMethod || !termsAccepted} onClick={handlePayment}>
        Confirm & Continue
      </button>

      {message && (
        <div className={`mt-2 text-center rounded-md p-2 text-sm font-medium ${message.type === "error" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}