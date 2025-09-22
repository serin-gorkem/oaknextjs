// components/CurrencyWrapper.tsx
"use client";
import { VehicleProvider } from "../context/VehicleContext";

export default function CurrencyWrapper({ children }: { children: React.ReactNode }) {
  return <VehicleProvider>{children}</VehicleProvider>;
}
