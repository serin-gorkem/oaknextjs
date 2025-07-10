"use client";

import { get } from "http";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PriceEntry {
  id: number;
  currency: string;
  amount: number | null;
}

async function getPrices(setPrices: any) {
  fetch("/api/get-prices")
    .then((res) => res.json())
    .then((data) => setPrices(data))
    .catch((err) => console.error("Veri alınamadı:", err));
}

async function getVehicles(setVehicles: any) {
  fetch("/api/get-vehicles")
    .then((res) => res.json())
    .then((data) => setVehicles(data))
    .catch((err) => console.error("Veri alınamadı:", err));
}
const handleLogout = async () => {
  await fetch('/api/admin/logout', { method: 'POST' });
  window.location.href = '/admin';
};
function getCurrencySymbol(currency: string): string {
  switch (currency) {
    case "EUR": return "€";
    case "USD": return "$";
    case "GBP": return "£";
    case "TRY": return "₺";
    default: return "";
  }
}

export default function AdminDashboard() {
  const [prices, setPrices] = useState<PriceEntry[]>([]);
  const [status, setStatus] = useState("");
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getPrices(setPrices);
    getVehicles(setVehicles);
  }, []);

    const handleAmountChange = (index: number, newAmount: number) => {
      const updated = prices.map((price, i) =>
        i === index ? { ...price, amount: newAmount } : price
      );
      setPrices(updated);
    };


  const handleUpdate = async (price: PriceEntry) => {
    setStatus("Güncelleniyor...");

    try {
      const res = await fetch("/api/update-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: price.id, amount: price.amount }),
      });

      if (res.ok) {
        setStatus(`✔ ${price.currency} güncellendi`);
        getPrices(setPrices);
      } else {
        setStatus(`❌ ${price.currency} güncellenemedi`);
      }
    } catch (err) {
      setStatus("Sunucu hatası.");
    }
  };

  return (
    <main className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">Admin Paneline Hoş Geldiniz.</h1>
      <button onClick={handleLogout} className="btn btn-primary absolute right-10 top-10 hover:btn-warning text-base-100">Çıkış Yap.</button>
      <article className="flex gap-4 flex-col justify-between w-full flex-wrap sm:flex-row">
          {vehicles.map((vehicle: any) => (
            <figure key={vehicle.id} className="bg-base-300 rounded-box shadow-md lg:w-fit flex flex-col gap-4 p-2 py-4">
              <h2 className="text-xl font-bold"> {vehicle.name} </h2>
              <Image
                src={"/images/vito.webp"}
                width={300}
                height={300}
                alt="Mercedes Vito"
              ></Image>
              <h3 className="text-lg font-semibold">Güncel Fiyatlar</h3>
              
              {prices.map((price: any) => {
                if (price.vehicle_id === vehicle.id) {
                  return (
                    <div key={price.id} className="flex bg-base-100 py-3 px-2 items-center justify-between ">
                      <span>{price.currency}</span>
                      <span className="flex items-center gap-2">
                        <p>{price.amount}</p>
                        <p>{getCurrencySymbol(price.currency)} </p>
                      </span>
                    </div>
                  );
                }})}
              <h3 className="text-lg font-semibold">Fiyatları Güncelle</h3>
              {prices.map((price: any, i) => {
                if (price.vehicle_id === vehicle.id) {
                  return (
                <div key={price.id} className="flex items-center gap-4">
                  <span className="w-20">{price.currency}</span>
                    <input
                      type="number"
                      value={
                        price.amount !== undefined && price.amount !== null
                          ? price.amount
                          : ""
                      }
                      className="input input-bordered"
                      onChange={(e) => {
                        const value = e.target.value;
                        const parsed = parseFloat(value);
                        handleAmountChange(i, !isNaN(parsed) ? parsed : 0);
                      }}
                    />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleUpdate(price)}
                  >
                    Güncelle
                  </button>
                </div>
                  );
                }
              })}
            </figure>
          ))}

      </article>
      {status && <p className="text-info text-xl mt-4">{status}</p>}

    </main>
  );
}
