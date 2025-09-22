// components/CurrencyWrapper.tsx
"use client";
import { CurrencyProvider } from "../context/CurrencyContext";

export default function CurrencyWrapper({ children }: { children: React.ReactNode }) {
  return <CurrencyProvider>{children}</CurrencyProvider>;
}
