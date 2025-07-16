"use client";
import React, { useEffect, useState } from "react";
import { UpdateData } from "./UpdateData";
import { GetData } from "./GetData";

const CurrencyDropdown = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencyList[0]);
  const [clientData, setClientData] = useState<any>(null);
  console.log(clientData);
  
  
async function updateCurrency(currency: any) {
  setSelectedCurrency(currency);

  if (!clientData || !clientData.uuid) return;

  const updatedData = {
    ...clientData,
    price_id: currency.id,
  };

  setClientData(updatedData);

  await UpdateData({ clientData: updatedData });
}

  const renderCurrencyList = currencyList.map((currency) => (
    <li key={currency.id} className="w-full" onClick={() =>updateCurrency(currency)} >
      <a className="p-2 px-1 w-full">
        {currency.svg}
        <p>{currency.name}</p>
      </a>
    </li>
  ));

  GetData({ clientData, setClientData });


  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className=" m-1">
        {selectedCurrency.svg}
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content mt-2 bg-base-300 right-1/2 left-1/2 -translate-x-1/2 rounded-box w-32 flex justify-center items-center shadow-sm"
      >
        {renderCurrencyList}
      </ul>
    </div>
  );
};
const currencyList = [
  {
    id: "0",
    name: "USD",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-10 aspect-square p-1 bg-white rounded-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    id: "1",
    name: "EUR",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-10 aspect-square p-1 rounded-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    id: "2",
    name: "GBP",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-10 aspect-square p-1 rounded-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.121 7.629A3 3 0 0 0 9.017 9.43c-.023.212-.002.425.028.636l.506 3.541a4.5 4.5 0 0 1-.43 2.65L9 16.5l1.539-.513a2.25 2.25 0 0 1 1.422 0l.655.218a2.25 2.25 0 0 0 1.718-.122L15 15.75M8.25 12H12m9 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    id: "3",
    name: "TRY",
    svg: (
      <svg
        fill="#1E272E"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 440 440"
        xmlSpace="preserve"
        stroke="#1E272E"
        className="size-[1.75rem] aspect-square mx-[0.40rem]  p-1 border-2 bg-white rounded-full"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M344.33,212.5c0,103.857-80.577,189.248-182.5,196.936V197.361l151.76-55.236l-10.26-28.191l-141.5,51.502V121.38 l151.76-55.236l-10.26-28.191l-141.5,51.502V0h-30v100.374l-66.16,24.08l10.261,28.191L131.83,132.3v44.055l-66.16,24.08 l10.261,28.191l55.899-20.346V440h15c60.813,0,117.957-23.651,160.902-66.597c42.946-42.946,66.598-100.089,66.598-160.903H344.33z"></path>{" "}
        </g>
      </svg>
    ),
  },
];
export default CurrencyDropdown;
