"use client";
import { memo, useEffect, useState } from "react";

type Extra = {
  display_name: string;
  price: number;
};

interface ExtrasCardProps {
  increase: (type: string) => void;
  decrease: (type: string) => void;
  childSeatNumber: number;
  flowersNumber: number;
  airportAssistance: boolean;
  wait: boolean;
  handleAirportAssistance: () => void;
  handleWait: () => void;
  extras: Extra[];
  symbol: string;
  convertPrice: (price: number, base?: string) => Promise<number>;
}

const ExtrasCard = memo(function ExtrasCard({
  increase,
  decrease,
  childSeatNumber,
  flowersNumber,
  airportAssistance,
  wait,
  handleAirportAssistance,
  handleWait,
  extras,
  symbol,
  convertPrice,
}: ExtrasCardProps) {
  const [convertedPrices, setConvertedPrices] = useState<number[]>([]);

  // === Convert all prices safely on mount ===
  useEffect(() => {
    let active = true;
    if (!extras || extras.length === 0) {
      setConvertedPrices([]);
      return;
    }
    (async () => {
      try {
        const prices = await Promise.all(extras.map((extra) => convertPrice(extra.price)));
        if (active) setConvertedPrices(prices.map((p) => Math.round(p)));
      } catch (err) {
        console.error("Price conversion error:", err);
      }
    })();
    return () => {
      active = false;
    };
  }, [extras, convertPrice]);

  return (
    <article className="bg-base-300 rounded-box shadow-md flex gap-4 flex-col px-3 py-4 ">
      {/* === Header Section === */}
      <figure className="flex gap-2 lg:gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7 md:size-10 text-warning"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        <figcaption className="text-[clamp(1.25rem,1.1427rem+0.4577vw,1.875rem)] font-bold">
          Extras Options
        </figcaption>
      </figure>

      <div className="divider my-1 md:hidden"></div>

      {/* === Mobile Form Section === */}
      <form className="flex flex-col md:hidden justify-between gap-8">
        <ExtrasFieldset
          title={`${extras[0]?.display_name} ${convertedPrices[0] ?? ""} ${symbol}`}
          desc="Baby car seat for children aged 0-36 months (max-2)"
          count={childSeatNumber}
          type="child-seat"
          increase={increase}
          decrease={decrease}
        />

        <ExtrasFieldset
          title={`${extras[1]?.display_name} ${convertedPrices[1] ?? ""} ${symbol}`}
          desc="A bouquet of seasonal flowers prepared by a local florist (max-3)"
          count={flowersNumber}
          type="flowers"
          increase={increase}
          decrease={decrease}
        />

        <SelectFieldset
          title={`${extras[2]?.display_name} ${convertedPrices[2] ?? ""} ${symbol}`}
          desc="One of our hostesses will accompany you throughout your stay at the airport until the departure of your aircraft"
          active={airportAssistance}
          onClick={handleAirportAssistance}
        />

        <SelectFieldset
          title={`${extras[3]?.display_name} ${convertedPrices[3] ?? ""} ${symbol}`}
          desc="Our vehicle and staff will be on site before you arrive to make sure you don't wait - for the customers don't want to lose time via traffic."
          active={wait}
          onClick={handleWait}
        />
      </form>

      {/* === Desktop Form Section === */}
      <form className="hidden md:flex md:flex-col justify-between gap-8">
        <DesktopFieldset
          title={`${extras[0]?.display_name} ${convertedPrices[0] ?? ""} ${symbol}`}
          desc="Baby car seat for children aged 0-36 months (max-2)"
          count={childSeatNumber}
          type="child-seat"
          increase={increase}
          decrease={decrease}
        />

        <DesktopFieldset
          title={`${extras[1]?.display_name} ${convertedPrices[1] ?? ""} ${symbol}`}
          desc="A bouquet of seasonal flowers prepared by a local florist (max-3)"
          count={flowersNumber}
          type="flowers"
          increase={increase}
          decrease={decrease}
        />

        <DesktopSelectFieldset
          title={`${extras[2]?.display_name} ${convertedPrices[2] ?? ""} ${symbol}`}
          desc="One of our hostesses will accompany you throughout your stay at the airport until the departure of your aircraft"
          active={airportAssistance}
          onClick={handleAirportAssistance}
        />

        <DesktopSelectFieldset
          title={`${extras[3]?.display_name} ${convertedPrices[3] ?? ""} ${symbol}`}
          desc="Our vehicle and staff will be on site before you arrive to make sure you don't wait - for the customers don't want to lose time via traffic."
          active={wait}
          onClick={handleWait}
        />
      </form>
    </article>
  );
});

export default ExtrasCard;

//
// === Helper Components (Logic only, style untouched) ===
//

function ExtrasFieldset({
  title,
  desc,
  count,
  type,
  increase,
  decrease,
}: {
  title: string;
  desc: string;
  count: number;
  type: string;
  increase: (type: string) => void;
  decrease: (type: string) => void;
}) {
  return (
    <fieldset className="flex flex-col md:justify-between md:items-center md:w-full md:flex-row gap-3">
      <legend className="font-bold text-[clamp(1rem,0.9142rem+0.3661vw,1.5rem)] ">{title}</legend>
      <label className="md:text-lg">{desc}</label>
      <div className="flex flex-col md:flex-row gap-2 md:w-fit justify-between md:items-center">
        <div className="flex justify-between w-full md:w-64 rounded-box h-fit border-2 border-[#B9B9B9]">
          <div className="p-3">
            <h3>Number</h3>
            <p>{count}</p>
          </div>
          <div>
            <div
              onClick={() => increase(type)}
              className="border-l-2 cursor-pointer border-b-2 active:bg-base-100 border-[#B9B9B9] p-2"
            >
              <PlusIcon />
            </div>
            <div
              onClick={() => decrease(type)}
              className="border-l-2 cursor-pointer active:bg-base-100 border-[#B9B9B9] p-2"
            >
              <MinusIcon />
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
}

function SelectFieldset({
  title,
  desc,
  active,
  onClick,
}: {
  title: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <fieldset className="flex flex-col md:justify-between md:items-center md:w-full md:flex-row gap-3">
      <legend className="font-bold text-[clamp(1rem,0.9142rem+0.3661vw,1.5rem)] ">{title}</legend>
      <label className="md:text-lg">{desc}</label>
      <div className="flex flex-col md:flex-row gap-2 md:w-fit justify-between md:items-center">
        <button
          type="button"
          onClick={onClick}
          className={`btn btn-primary w-1/2 md:w-3/12 px-16 ${active ? "btn-active" : ""}`}
        >
          {active ? "Selected" : "Select"}
          <input type="checkbox" checked={active} readOnly className="hidden" />
        </button>
      </div>
    </fieldset>
  );
}

function DesktopFieldset({
  title,
  desc,
  count,
  type,
  increase,
  decrease,
}: {
  title: string;
  desc: string;
  count: number;
  type: string;
  increase: (type: string) => void;
  decrease: (type: string) => void;
}) {
  return (
    <fieldset className="flex border-y-2 border-[#B9B9B9] items-center justify-between w-full">
      <div>
        <h1 className="font-bold text-[clamp(1rem,0.9142rem+0.3661vw,1.5rem)] ">{title}</h1>
        <label className="text-[clamp(0.75rem,0.7071rem+0.1831vw,1rem))]">{desc}</label>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="border-x-2 border-[#B9B9B9] flex h-full ">
          <div className="p-3">
            <h3 className="text-base opacity-70">Number</h3>
            <p className="text-lg">{count}</p>
          </div>
          <div className="flex flex-col justify-between">
            <div
              onClick={() => increase(type)}
              className="border-l-2 cursor-pointer hover:bg-base-100 border-b-2 border-[#B9B9B9] p-2"
            >
              <PlusIcon />
            </div>
            <div
              onClick={() => decrease(type)}
              className="border-l-2 cursor-pointer hover:bg-base-100 border-[#B9B9B9] p-2"
            >
              <MinusIcon />
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
}

function DesktopSelectFieldset({
  title,
  desc,
  active,
  onClick,
}: {
  title: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <fieldset className="flex border-y-2 py-4 border-[#B9B9B9] items-center justify-between w-full">
      <div>
        <h1 className="font-bold text-[clamp(1rem,0.9142rem+0.3661vw,1.5rem)] ">{title}</h1>
        <label className="text-[clamp(0.75rem,0.7071rem+0.1831vw,1rem))]">{desc}</label>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="divider divider-horizontal"></div>
        <button
          type="button"
          onClick={onClick}
          className={`btn btn-primary hover:bg-base-300 hover:text-primary w-2/12 px-16 ${
            active ? "btn-active" : ""
          }`}
        >
          {active ? "Selected" : "Select"}
          <input type="checkbox" checked={active} readOnly className="hidden" />
        </button>
      </div>
    </fieldset>
  );
}

// === Icon Components ===
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-success-content">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-warning">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
  </svg>
);