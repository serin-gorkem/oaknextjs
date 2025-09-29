"use client";

import { useEffect, useState } from "react";

interface AirportRate {
  airport_id: string;
  airport_name: string;
  vehicle_id: number;
  vehicle_name: string;
  base_price: number;
  km_rate: number;
}

interface AirportGrouped {
  airport_name: string;
  rates: AirportRate[];
}

interface Extra {
  id: number;
  display_name: string;
  price: number;
}

export default function AirportRatesUI() {
  const [data, setData] = useState<AirportGrouped[]>([]);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [openAirport, setOpenAirport] = useState<string | null>(null);
  const [savingAirport, setSavingAirport] = useState<string | null>(null);
  const [savingExtras, setSavingExtras] = useState(false);
  const [messages, setMessages] = useState<Record<string, string>>({});

  // Fetch airports
  useEffect(() => {
    fetch("/api/airport-rates")
      .then((res) => res.json())
      .then((rows: AirportRate[]) => {
        const grouped: Record<string, AirportRate[]> = {};
        rows.forEach((r) => {
          if (!grouped[r.airport_name]) grouped[r.airport_name] = [];
          grouped[r.airport_name].push(r);
        });
        const formatted = Object.keys(grouped).map((k) => ({
          airport_name: k,
          rates: grouped[k],
        }));
        setData(formatted);
      });
  }, []);

  // Fetch extras
  useEffect(() => {
    fetch("/api/get-extras")
      .then((res) => res.json())
      .then((rows: Extra[]) =>
        setExtras(
          rows.map((e) => ({ ...e, price: e.price !== null ? Number(e.price) : 0 }))
        )
      )
      .catch((err) => console.error(err));
  }, []);

  const toggleAccordion = (name: string) => {
    setOpenAirport((prev) => (prev === name ? null : name));
  };

  // Airport handlers
  const handleChange = (
    airportName: string,
    vehicleId: number,
    field: "base_price" | "km_rate",
    value: number
  ) => {
    setData((prev) =>
      prev.map((airport) =>
        airport.airport_name === airportName
          ? {
              ...airport,
              rates: airport.rates.map((rate) =>
                rate.vehicle_id === vehicleId ? { ...rate, [field]: value } : rate
              ),
            }
          : airport
      )
    );
  };

  const handleSubmit = async (airportName: string) => {
    const airportData = data.find((a) => a.airport_name === airportName);
    if (!airportData) return;

    setSavingAirport(airportName);
    setMessages((prev) => ({ ...prev, [airportName]: "" }));

    try {
      const updates = airportData.rates.map((rate) => ({
        airport_id: rate.airport_id,
        vehicle_id: rate.vehicle_id,
        base_price: rate.base_price,
        km_rate: rate.km_rate,
      }));

      const res = await fetch("/api/update-airport-rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });

      const json = await res.json();
      if (res.ok) setMessages((prev) => ({ ...prev, [airportName]: "Changes saved successfully!" }));
      else setMessages((prev) => ({ ...prev, [airportName]: "Error saving changes: " + json.error }));
    } catch (err) {
      console.error(err);
      setMessages((prev) => ({ ...prev, [airportName]: "Unexpected error" }));
    }

    setSavingAirport(null);
  };

  // Extras handlers
  const handleChangeExtra = (id: number, field: "display_name" | "price", value: string | number) => {
    setExtras((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const handleSubmitExtras = async () => {
    setSavingExtras(true);
    setMessages((prev) => ({ ...prev, extras: "" }));

    try {
      const res = await fetch("/api/update-extras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates: extras }),
      });

      const json = await res.json();
      if (res.ok) setMessages((prev) => ({ ...prev, extras: "Extras saved successfully!" }));
      else setMessages((prev) => ({ ...prev, extras: "Error: " + json.error }));
    } catch (err) {
      console.error(err);
      setMessages((prev) => ({ ...prev, extras: "Unexpected error" }));
    }

    setSavingExtras(false);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin";
  };

  return (
    <div className="w-full max-w-3xl mx-auto lg:mt-8 mt-32">
      <button
        onClick={handleLogout}
        className="btn btn-primary absolute right-5 top-10 hover:btn-warning text-base-100"
      >
        Çıkış Yap
      </button>

      {/* Airport rates */}
      {data.map((airport) => (
        <div key={airport.airport_name} className="mb-4 rounded-lg shadow-sm">
          <button
            className="w-full flex cursor-pointer justify-between items-center p-4 bg-gray-100 hover:bg-gray-200"
            onClick={() => toggleAccordion(airport.airport_name)}
          >
            <span className="font-semibold">{airport.airport_name}</span>
            <span>{openAirport === airport.airport_name ? "-" : "+"}</span>
          </button>

          {openAirport === airport.airport_name && (
            <div className="p-4 bg-white space-y-3">
              {airport.rates.map((rate) => (
                <div
                  key={rate.vehicle_id}
                  className="flex flex-col sm:flex-row justify-between border p-3 rounded-md shadow-sm items-center"
                >
                  <span className="font-medium">{rate.vehicle_name}</span>

                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      className="input input-bordered w-24"
                      value={rate.base_price}
                      onChange={(e) => handleChange(airport.airport_name, rate.vehicle_id, "base_price", parseFloat(e.target.value))}
                    />
                    <span>₺ base</span>

                    <input
                      type="number"
                      className="input input-bordered w-24"
                      value={rate.km_rate}
                      onChange={(e) => handleChange(airport.airport_name, rate.vehicle_id, "km_rate", parseFloat(e.target.value))}
                    />
                    <span>₺/km</span>
                  </div>
                </div>
              ))}

              <button
                className="btn btn-primary w-full mt-2"
                onClick={() => handleSubmit(airport.airport_name)}
                disabled={savingAirport === airport.airport_name}
              >
                {savingAirport === airport.airport_name ? "Saving..." : "Save Changes"}
              </button>

              {messages[airport.airport_name] && <p className="mt-2 text-green-600">{messages[airport.airport_name]}</p>}
            </div>
          )}
        </div>
      ))}

      {/* Extras */}
      <div className="mb-4 rounded-lg shadow-sm">
        <button
          className="w-full flex cursor-pointer justify-between items-center p-4 bg-gray-100 hover:bg-gray-200"
          onClick={() => toggleAccordion("extras")}
        >
          <span className="font-semibold">Extras</span>
          <span>{openAirport === "extras" ? "-" : "+"}</span>
        </button>

        {openAirport === "extras" && (
          <div className="p-4 bg-white space-y-3">
            {extras.map((extra) => (
              <div key={extra.id} className="flex flex-col sm:flex-row justify-between border p-3 rounded-md shadow-sm items-center">
                <input
                  type="text"
                  className="input input-bordered w-1/2"
                  value={extra.display_name}
                  onChange={(e) => handleChangeExtra(extra.id, "display_name", e.target.value)}
                />
                <input
                  type="number"
                  className="input input-bordered w-24"
                  value={extra.price ?? 0}
                  onChange={(e) => handleChangeExtra(extra.id, "price", parseFloat(e.target.value))}
                />
              </div>
            ))}

            <button
              className="btn btn-primary w-full mt-2"
              onClick={handleSubmitExtras}
              disabled={savingExtras}
            >
              {savingExtras ? "Saving..." : "Save Extras"}
            </button>

            {messages["extras"] && <p className="mt-2 text-green-600">{messages["extras"]}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
