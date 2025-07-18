// context/CurrencyContext.tsx
"use client";

import { createContext, useContext, useState } from "react";


interface CurrencyContextProps {
  currencyIndex: number;
  setCurrencyIndex: (index: number) => void;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencyIndex, setCurrencyIndex] = useState<number>(0); // Default: USD

  return (
    <CurrencyContext.Provider value={{ currencyIndex, setCurrencyIndex }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
};
