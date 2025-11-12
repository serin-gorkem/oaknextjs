"use client";
import { memo } from "react";

interface VehicleFeaturesCardProps {
  features: string[];
  img: string;
  vehicleName: string;
  person: number;
  bags: number;
  totalPrice: string | number;
  currency: string;
  loadExtrasPage: () => void;
}

const VehicleFeaturesCard = memo(function VehicleFeaturesCard({
  features,
  img,
  vehicleName,
  person,
  bags,
  totalPrice,
  currency,
  loadExtrasPage,
}: VehicleFeaturesCardProps) {
  return (
    <article className="bg-base-300 rounded-box mb-8 shadow-md flex flex-col gap-4 p-2">
      {/* === Vehicle Image === */}
      <img
        src={img}
        alt={`${vehicleName} image`}
        className="w-1/2 lg:w-1/3 rounded-box object-cover"
        loading="lazy"
        decoding="async"
      />

      {/* === Title === */}
      <div className="flex items-center gap-6 lg:gap-10">
        <h1 className="text-2xl md:text-4xl font-semibold">{vehicleName}</h1>
      </div>

      {/* === Capacity Info === */}
      <div className="flex gap-5">
        {/* Person Count */}
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-warning"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 
              20.118a7.5 7.5 0 0 1 14.998 0A17.933 
              17.933 0 0 1 12 21.75c-2.676 
              0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <p className="text-sm">{person} Person</p>
        </div>

        {/* Bag Count */}
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-warning"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 
              0-7.5 0v4.5m11.356-1.993 1.263 
              12c.07.665-.45 1.243-1.119 
              1.243H4.25a1.125 1.125 0 0 
              1-1.12-1.243l1.264-12A1.125 
              1.125 0 0 1 5.513 7.5h12.974c.576 
              0 1.059.435 1.119 1.007ZM8.625 
              10.5a.375.375 0 1 1-.75 0 
              .375.375 0 0 1 .75 0Zm7.5 
              0a.375.375 0 1 1-.75 0 
              .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <p className="text-sm">{bags} Bags</p>
        </div>
      </div>

      <hr className="w-full" />

      {/* === Features === */}
      <ul className="flex flex-wrap gap-2">
        {features?.map((feature, i) => (
          <li key={i} className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-success-content"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 
                12a9 9 0 1 1-18 0 9 9 0 0 1 
                18 0Z"
              />
            </svg>
            <p className="text-sm">{feature}</p>
          </li>
        ))}
      </ul>

      <hr className="w-full" />

      {/* === Pricing === */}
      <div className="flex flex-col gap-2">
        <p>Total one-way price</p>
        <h2 className="text-2xl lg:text-4xl font-bold">
          {totalPrice} {currency}
        </h2>

        {/* === Free Cancellation === */}
        <div className="flex items-center gap-2 bg-[#C2E6D2] text-success-content rounded-box p-1 font-bold w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 
              9.75M21 12c0 1.268-.63 2.39-1.593 
              3.068a3.745 3.745 0 0 1-1.043 
              3.296 3.745 3.745 0 0 1-3.296 
              1.043A3.745 3.745 0 0 1 12 
              21c-1.268 0-2.39-.63-3.068-1.593a3.746 
              3.746 0 0 1-3.296-1.043 3.745 
              3.745 0 0 1-1.043-3.296A3.745 
              3.745 0 0 1 3 12c0-1.268.63-2.39 
              1.593-3.068a3.745 3.745 0 0 
              1 1.043-3.296 3.746 3.746 0 0 
              1 3.296-1.043A3.746 3.746 0 0 
              1 12 3c1.268 0 2.39.63 3.068 
              1.593a3.746 3.746 0 0 1 3.296 
              1.043 3.746 3.746 0 0 1 
              1.043 3.296A3.745 3.745 0 0 
              1 21 12Z"
            />
          </svg>
          <p>Free Cancellation</p>
        </div>
      </div>

      {/* === Button === */}
      <button
        onClick={loadExtrasPage}
        className="btn btn-warning w-36 text-base-100 font-semibold hover:brightness-110 transition"
      >
        SELECT
      </button>
    </article>
  );
});

export default VehicleFeaturesCard;