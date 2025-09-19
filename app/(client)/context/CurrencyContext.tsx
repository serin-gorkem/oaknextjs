"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Converter } from "easy-currencies";
const converter = new Converter();

type Currency = {
  id: number;
  name: string; // "USD", "EUR", "GBP", "TRY"
  svg: React.ReactNode;
  symbol: string; // "$", "€", "£", "₺"
};

type CurrencyContextType = {
  currencyIndex: number;
  setCurrencyIndex: (id: number) => void;
  currencyList: Currency[];
  convertPrice: (price: number, base?: string) => Promise<number>;
  symbol: string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const currencyList: Currency[] = [
    {
      id: 0,
      name: "USD",
      symbol: "$",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="size-10 aspect-square p-1 rounded-full"
        >
          <g id="Outline">
            <g id="Outline-2" data-name="Outline">
              <path d="M39 36.852a6.8 6.8 0 0 0-6.793-6.793h-.319a3.716 3.716 0 1 1 3.712-3.715 1 1 0 0 0 2 0 5.725 5.725 0 0 0-4.561-5.6V18.09a1 1 0 0 0-2 0v2.61a5.712 5.712 0 0 0 .846 11.361h.319a4.793 4.793 0 1 1-4.793 4.793 1 1 0 0 0-2 0 6.8 6.8 0 0 0 6.04 6.746v2.947a1 1 0 0 0 2 0v-3.021A6.8 6.8 0 0 0 39 36.852"></path>
              <path d="M32 2a30 30 0 1 0 30 30A30.034 30.034 0 0 0 32 2m0 58a28 28 0 1 1 28-28 28.03 28.03 0 0 1-28 28"></path>
              <path d="M49.655 16.793a3.172 3.172 0 1 0-3.172 3.172 3.1 3.1 0 0 0 1.263-.266 19.994 19.994 0 0 1-25.054 30.008 1 1 0 0 0-.933 1.769 21.986 21.986 0 0 0 27.47-33.124 3.14 3.14 0 0 0 .426-1.559m-4.344 0a1.172 1.172 0 1 1 1.172 1.172 1.17 1.17 0 0 1-1.172-1.172M16.793 44.035a3.2 3.2 0 0 0-.692.081A19.78 19.78 0 0 1 12 32a20.023 20.023 0 0 1 20-20 19.8 19.8 0 0 1 8.463 1.874 1 1 0 0 0 .848-1.812A21.989 21.989 0 0 0 14.39 45.16a3.14 3.14 0 0 0-.769 2.047 3.172 3.172 0 1 0 3.172-3.172m0 4.344a1.172 1.172 0 1 1 1.172-1.172 1.17 1.17 0 0 1-1.172 1.172"></path>
            </g>
          </g>
        </svg>
      ),
    },
    {
      id: 1,
      name: "EUR",
      symbol: "€",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="size-10 aspect-square p-1 rounded-full"
        >
          <g id="Outline">
            <g id="Outline-2" data-name="Outline">
              <path d="M21.818 29H19.75a1 1 0 0 0 0 2h1.743c-.026.331-.051.662-.051 1s.025.669.051 1H19.75a1 1 0 0 0 0 2h2.068a12.592 12.592 0 0 0 21.139 5.912 1 1 0 0 0-1.414-1.412A10.6 10.6 0 0 1 23.881 35h5.869a1 1 0 0 0 0-2h-6.257c-.031-.33-.051-.662-.051-1s.02-.67.051-1h6.257a1 1 0 0 0 0-2h-5.869a10.6 10.6 0 0 1 17.662-4.5 1 1 0 1 0 1.414-1.414A12.592 12.592 0 0 0 21.818 29"></path>
              <path d="M32 2a30 30 0 1 0 30 30A30.034 30.034 0 0 0 32 2m0 58a28 28 0 1 1 28-28 28.03 28.03 0 0 1-28 28"></path>
              <path d="M49.655 16.793a3.172 3.172 0 1 0-3.173 3.172 3.1 3.1 0 0 0 1.264-.266 19.994 19.994 0 0 1-25.055 30.008 1 1 0 1 0-.931 1.769 21.986 21.986 0 0 0 27.469-33.125 3.1 3.1 0 0 0 .426-1.558m-4.344 0a1.172 1.172 0 1 1 1.171 1.172 1.17 1.17 0 0 1-1.171-1.172M16.793 44.035a3.2 3.2 0 0 0-.692.081A19.78 19.78 0 0 1 12 32a20.023 20.023 0 0 1 20-20 19.8 19.8 0 0 1 8.463 1.874 1 1 0 0 0 .848-1.812A21.989 21.989 0 0 0 14.39 45.16a3.14 3.14 0 0 0-.769 2.047 3.173 3.173 0 1 0 3.172-3.172m0 4.344a1.172 1.172 0 1 1 1.173-1.172 1.17 1.17 0 0 1-1.173 1.172"></path>
            </g>
          </g>
        </svg>
      ),
    },
    {
      id: 2,
      name: "GBP",
      symbol: "£",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-10 aspect-square p-1 rounded-full"
          viewBox="0 0 64 64"
        >
          <g id="Outline">
            <g id="Outline-2" data-name="Outline">
              <path d="M34.042 22a5.006 5.006 0 0 1 5 5 1 1 0 0 0 2 0 7 7 0 0 0-14 0v6h-3.084a1 1 0 0 0 0 2h3.084v6h-3.084a1 1 0 0 0 0 2h16.084a1 1 0 0 0 1-1v-4a1 1 0 0 0-2 0v3h-10v-6h6.916a1 1 0 0 0 0-2h-6.916v-6a5.006 5.006 0 0 1 5-5"></path>
              <path d="M32 2a30 30 0 1 0 30 30A30.034 30.034 0 0 0 32 2m0 58a28 28 0 1 1 28-28 28.03 28.03 0 0 1-28 28"></path>
              <path d="M49.655 16.793a3.172 3.172 0 1 0-3.172 3.172 3.1 3.1 0 0 0 1.263-.266 19.994 19.994 0 0 1-25.054 30.008 1 1 0 0 0-.933 1.769 21.986 21.986 0 0 0 27.47-33.124 3.14 3.14 0 0 0 .426-1.559m-4.344 0a1.172 1.172 0 1 1 1.172 1.172 1.17 1.17 0 0 1-1.172-1.172M16.793 44.035a3.2 3.2 0 0 0-.692.081A19.78 19.78 0 0 1 12 32a20.023 20.023 0 0 1 20-20 19.8 19.8 0 0 1 8.463 1.874 1 1 0 0 0 .848-1.812A21.989 21.989 0 0 0 14.39 45.16a3.14 3.14 0 0 0-.769 2.047 3.172 3.172 0 1 0 3.172-3.172m0 4.344a1.172 1.172 0 1 1 1.172-1.172 1.17 1.17 0 0 1-1.172 1.172"></path>
            </g>
          </g>
        </svg>
      ),
    },
    {
      id: 3,
      name: "TRY",
      symbol: "₺",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="size-10 aspect-square p-1 rounded-full"
        >
          <g id="Outline">
            <g id="Outline-2" data-name="Outline">
              <path d="M29.084 45h.416A11.513 11.513 0 0 0 41 33.5a1 1 0 0 0-2 0 9.51 9.51 0 0 1-8.916 9.482v-9.81l5.7-5.382a1 1 0 0 0-1.373-1.455l-4.331 4.087V27.4l5.285-4.987A1 1 0 1 0 34 20.955l-3.912 3.691V21.18a1 1 0 0 0-2 0v5.354l-3.469 3.273a1 1 0 0 0 1.373 1.455l2.1-1.978v3.025l-3.05 2.878a1 1 0 0 0 1.373 1.455l1.677-1.583V44a1 1 0 0 0 .992 1"></path>
              <path d="M32 2a30 30 0 1 0 30 30A30.034 30.034 0 0 0 32 2m0 58a28 28 0 1 1 28-28 28.03 28.03 0 0 1-28 28"></path>
              <path d="M49.655 16.793a3.172 3.172 0 1 0-3.173 3.172 3.1 3.1 0 0 0 1.264-.266 19.994 19.994 0 0 1-25.055 30.008 1 1 0 1 0-.931 1.769 21.986 21.986 0 0 0 27.469-33.125 3.1 3.1 0 0 0 .426-1.558m-4.344 0a1.172 1.172 0 1 1 1.171 1.172 1.17 1.17 0 0 1-1.171-1.172M16.793 44.035a3.2 3.2 0 0 0-.692.081A19.78 19.78 0 0 1 12 32a20.023 20.023 0 0 1 20-20 19.8 19.8 0 0 1 8.463 1.874 1 1 0 0 0 .848-1.812A21.989 21.989 0 0 0 14.39 45.16a3.14 3.14 0 0 0-.769 2.047 3.173 3.173 0 1 0 3.172-3.172m0 4.344a1.172 1.172 0 1 1 1.173-1.172 1.17 1.17 0 0 1-1.173 1.172"></path>
            </g>
          </g>
        </svg>
      ),
    },
  ];

  const [currencyIndex, setCurrencyIndex] = useState(0);

  async function convertPrice(price: number, base: string = "USD") {
    const target = currencyList[currencyIndex].name;
    if (target === base) return price; // no conversion needed
    try {
      return await converter.convert(price, base, target);
    } catch (err) {
      console.error("Currency conversion failed:", err);
      return price;
    }
  }

  return (
    <CurrencyContext.Provider
      value={{
        currencyIndex,
        setCurrencyIndex,
        currencyList,
        convertPrice,
        symbol: currencyList[currencyIndex].symbol,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
};
