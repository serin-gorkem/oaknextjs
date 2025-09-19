"use client";
import React from "react";
import { useCurrency } from "../context/CurrencyContext";

const CurrencyDropdown = () => {
  const { currencyIndex, setCurrencyIndex, currencyList } = useCurrency();

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        {currencyList[currencyIndex].svg} {currencyList[currencyIndex].name}
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-300 rounded-box w-32 shadow"
      >
        {currencyList.map((currency) => (
          <li key={currency.id} onClick={() => setCurrencyIndex(currency.id)}>
            <a>
              {currency.svg} {currency.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyDropdown;
