"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetData } from "@/app/(client)/components/GetData";
import { useCurrency } from "@/app/(client)/context/CurrencyContext";

const onlyDigits = (s: string) => s.replace(/\D/g, "");

export default function Payment() {
  const router = useRouter();
  const { clientData } = useGetData();
  const { symbol } = useCurrency();

  const [selectedMethod, setSelectedMethod] = useState<"card" | "cash" | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [cardData, setCardData] = useState({ number: "", month: "", year: "", cvv: "" });

  const years = useMemo(() => {
    const y = new Date().getFullYear();
    return Array.from({ length: 13 }, (_, i) => String(y + i).slice(-2));
  }, []);

  const months = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    []
  );

  const formatCardNumber = (value: string) =>
    onlyDigits(value).slice(0, 19).replace(/(.{4})/g, "$1 ").trim();

  const validateCardInputs = () => {
    const digits = onlyDigits(cardData.number);
    return (
      digits.length >= 12 &&
      digits.length <= 19 &&
      cardData.month &&
      cardData.year &&
      cardData.cvv.length >= 3
    );
  };

  const navigateToFailed = (data: any) =>
    router.push(`/failed?data=${encodeURIComponent(JSON.stringify(data))}`);

  const handlePayment = async () => {
    setMessage(null);

    if (!selectedMethod || !termsAccepted) {
      setMessage({ type: "error", text: "Please select a payment method and accept terms." });
      return;
    }

    if (selectedMethod === "card" && !validateCardInputs()) {
      setMessage({ type: "error", text: "Please fill card fields correctly." });
      return;
    }

    try {
      const payload = {
        uuid: clientData.uuid,
        payment_method: selectedMethod,
        symbol,
        email: clientData.details.email,
        number: clientData.details.phone,
        cardData: {
          number: onlyDigits(cardData.number),
          month: cardData.month,
          year: cardData.year,
          cvv: cardData.cvv,
        },
      };

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        navigateToFailed(clientData);
        return;
      }

      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const json = await res.json();
        router.push(json.redirect ?? `/success?order=${clientData.uuid}&status=${selectedMethod}`);
        return;
      }

      if (contentType.includes("text/html")) {
        const html = await res.text();
        document.open();
        document.write(html);
        document.close();
        setTimeout(() => document.forms?.[0]?.submit(), 1000);
        return;
      }

      navigateToFailed(clientData);
    } catch (err) {
      console.error("Payment error:", err);
      navigateToFailed(clientData);
    }
  };

  return (
    <article className="relative flex flex-col gap-5 px-3 py-5 sm:w-full rounded-box bg-base-300 shadow-md transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-base-content/20 pb-3">
        <h1 className="text-xl font-bold">Payment Method</h1>
      </header>

      {/* Payment Options */}
      <div className="flex flex-col gap-3">
        <PaymentOption
          icon="💳"
          label="Credit / Debit Card (3D Secure)"
          active={selectedMethod === "card"}
          onClick={() => setSelectedMethod("card")}
        />
        <PaymentOption
          icon="💵"
          label="Cash on Arrival"
          active={selectedMethod === "cash"}
          onClick={() => setSelectedMethod("cash")}
        />
      </div>

      {/* Card Details */}
      {selectedMethod === "card" && (
        <div className="mt-3 bg-base-200/40 p-4 rounded-box border border-base-content/10 space-y-4">
          <label className="block text-sm font-semibold mb-1">Card Number</label>
          <input
            inputMode="numeric"
            autoComplete="cc-number"
            value={cardData.number}
            onChange={(e) =>
              setCardData((s) => ({ ...s, number: formatCardNumber(e.target.value) }))
            }
            placeholder="1234 5678 9012 3456"
            className="input input-bordered w-full"
          />

          <div className="flex flex-wrap gap-4">
            <SelectField
              label="Expiry Month"
              value={cardData.month}
              onChange={(v) => setCardData((s) => ({ ...s, month: v }))}
              options={months}
              placeholder="MM"
            />
            <SelectField
              label="Expiry Year"
              value={cardData.year}
              onChange={(v) => setCardData((s) => ({ ...s, year: v }))}
              options={years}
              placeholder="YY"
            />
            <div className="flex-[0.7] min-w-[90px]">
              <label className="block text-sm font-semibold mb-1">CVV</label>
              <input
                inputMode="numeric"
                value={cardData.cvv}
                onChange={(e) =>
                  setCardData((s) => ({
                    ...s,
                    cvv: onlyDigits(e.target.value).slice(0, 4),
                  }))
                }
                placeholder="CVV"
                maxLength={4}
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Terms */}
      <label className="flex items-start gap-3 mt-2 cursor-pointer">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="checkbox checkbox-primary mt-1"
        />
        <div className="text-sm leading-tight">
          I agree to the{" "}
          <strong>Service Delivery</strong>,{" "}
          <strong>Pre-Information Form</strong>,{" "}
          <strong>Cancellation & Refund Policy</strong> and{" "}
          <strong>Distance Sales Agreement</strong>.
          <br />
          <a
            href="/policy"
            target="_blank"
            rel="noreferrer"
            className="text-xs underline text-primary"
          >
            View Terms & Policies
          </a>
        </div>
      </label>

      <button
        className="btn btn-primary w-full mt-3"
        disabled={!selectedMethod || !termsAccepted}
        onClick={handlePayment}
      >
        Confirm & Continue
      </button>

      {message && (
        <div
          className={`mt-3 text-center rounded-lg py-2 text-sm font-medium border ${
            message.type === "error"
              ? "bg-red-100 text-red-700 border-red-400"
              : "bg-green-100 text-green-700 border-green-400"
          }`}
        >
          {message.text}
        </div>
      )}
    </article>
  );
}

/* ------------------------- Sub Components ------------------------- */

function PaymentOption({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex justify-between items-center h-16 px-4 rounded-box border-2 transition-all duration-300 ${
        active
          ? "border-primary bg-base-200 text-primary"
          : "border-base-content/10 hover:border-primary/50"
      }`}
    >
      <div className="flex items-center gap-3 text-base">
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </div>
      {active && <span className="text-xl">✓</span>}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="flex-1 min-w-[100px]">
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select select-bordered w-full"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}