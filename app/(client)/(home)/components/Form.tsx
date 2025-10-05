"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { v4 as uuidv4 } from "uuid";
import AutocompleteInput from "./AutocompleteInput";
import LoadGoogleMaps from "@/components/LoadGoogleMaps";
import { getDrivingDistance } from "./CalculateDistance";

interface Location {
  lat: number;
  lng: number;
  address: string;
  name: string;
  placeId: string;
}

export default function Form() {
  const [clientData, setClientData] = useState({});
  const [pickupLocation, setPickupLocation] = useState<any>("");
  const [isPickupLocationValid, setIsPickupLocationValid] = useState(false);
  const [dropOffLocation, setDropOffLocation] = useState<any>("");
  const [dropOffInput, setDropOffInput] = useState("");
  const [isDropOffLocationValid, setIsDropOffLocationValid] = useState(false);
  const [passengerCount, setPassengerCount] = useState(1);
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [pickupHour, setPickupHour] = useState("00:00");
  const [isPickupOpen, setIsPickupOpen] = useState(false);
  const [message, setMessage] = useState("");

  const uuid = uuidv4();
  const router = useRouter();

  const airports = [
    { id: "IST", name: "Istanbul Airport", query: "Istanbul Airport, Turkey" },
    { id: "SAW", name: "Sabiha Gökçen International Airport", query: "Sabiha Gökçen International Airport, Turkey" },
    { id: "ADB", name: "Izmir Adnan Menderes Airport", query: "Izmir Adnan Menderes Airport, Turkey" },
    { id: "BJV", name: "Milas–Bodrum Airport", query: "Milas–Bodrum Airport, Turkey" },
    { id: "DLM", name: "Dalaman Airport", query: "Dalaman Airport, Turkey" },
    { id: "AYT", name: "Antalya Airport", query: "Antalya Airport, Turkey" },
    { id: "ASR", name: "Kayseri Erkilet Airport", query: "Kayseri Erkilet Airport, Turkey" },
    { id: "NAV", name: "Nevşehir Kapadokya Airport", query: "Nevşehir Kapadokya Airport, Turkey" },
    { id: "ESB", name: "Esenboğa International Airport", query: "Esenboğa International Airport, Ankara, Turkey" },
    { id: "ADA", name: "Adana Şakirpaşa Airport", query: "Adana Şakirpaşa Airport, Turkey" },
    { id: "GAP", name: "Şanlıurfa GAP Airport", query: "Şanlıurfa GAP Airport, Turkey" },
    { id: "TZX", name: "Trabzon Airport", query: "Trabzon Airport, Turkey" },
  ];

  const airportRadiusKm: Record<string, number> = {
    "Istanbul Airport": 70,
    "Sabiha Gökçen International Airport": 70,
    "Izmir Adnan Menderes Airport": 180,
    "Milas–Bodrum Airport": 70,
    "Dalaman Airport": 70,
    "Antalya Airport": 100,
    "Kayseri Erkilet Airport": 70,
    "Nevşehir Kapadokya Airport": 70,
    "Esenboğa International Airport": 70,
    "Adana Şakirpaşa Airport": 50,
    "Şanlıurfa GAP Airport": 50,
    "Trabzon Airport": 50,
  };

  function validateForm() {
    if (!pickupLocation || !dropOffLocation || !pickupDate || !pickupHour || !passengerCount) {
      setMessage("Please fill in all fields.");
      return false;
    }
    if (!isPickupLocationValid) {
      setMessage("Please select a valid pickup location.");
      return false;
    }
    if (!isDropOffLocationValid) {
      setMessage("Please select a valid drop-off location.");
      return false;
    }
    if (pickupLocation === "" || dropOffLocation === "") {
      setMessage("Please fill in location fields.");
      return false;
    }
    if (pickupLocation === dropOffLocation) {
      setMessage("Pickup and drop-off locations cannot be the same.");
      return false;
    }
    return true;
  }

  async function getFreshPlaceId(query: string): Promise<string | null> {
    return new Promise((resolve) => {
      const service = new google.maps.places.PlacesService(document.createElement("div"));
      service.findPlaceFromQuery({ query, fields: ["place_id"] }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results?.length) {
          resolve(results[0].place_id!);
        } else {
          resolve(null);
        }
      });
    });
  }

  async function fetchPlaceDetails(placeId: string, query: string): Promise<Location | null> {
    return new Promise((resolve) => {
      const service = new google.maps.places.PlacesService(document.createElement("div"));
      service.getDetails({ placeId, fields: ["geometry", "formatted_address", "name"] }, async (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
          resolve({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address || "",
            name: place.name || "",
            placeId,
          });
        } else if (status === google.maps.places.PlacesServiceStatus.INVALID_REQUEST) {
          const newPlaceId = await getFreshPlaceId(query);
          if (newPlaceId) {
            const refreshed = await fetchPlaceDetails(newPlaceId, query);
            resolve(refreshed);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
    });
  }

  async function cleanupData() {
    await fetch("/api/cleanup");
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!validateForm()) return;

    const data = {
      pickup_location: pickupLocation,
      drop_off_location: dropOffLocation,
      pickup_date: pickupDate?.toDateString(),
      pickup_hour: pickupHour,
      passenger_count: passengerCount,
      uuid,
    };

    setClientData(data);
    setMessage("Form submitted successfully!");

    const response = await fetch("api/form-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (response.status === 200) {
      router.push(`/booking?uuid=${uuid}`);
    }
    cleanupData();
  }

const handlePickupChange = async (selectedId: string) => {
  const sel = airports.find((a) => a.id === selectedId);
  if (!sel) {
    setPickupLocation(null);
    setIsPickupLocationValid(false);
    return;
  }

  // Reset drop-off completely
  setDropOffLocation(null);
  setDropOffInput("");
  setIsDropOffLocationValid(false);

  const freshPlaceId = await getFreshPlaceId(sel.query);
  if (!freshPlaceId) {
    setMessage("Could not resolve Place ID for " + sel.name);
    setIsPickupLocationValid(false);
    return;
  }

  const info = await fetchPlaceDetails(freshPlaceId, sel.query);
  if (!info) {
    setMessage("Invalid airport selection.");
    setIsPickupLocationValid(false);
    return;
  }

  // ✅ Update pickup location
  setPickupLocation({
    id: sel.id,
    name: sel.name,
    query: sel.query,
    placeId: freshPlaceId,
    lat: info.lat,
    lng: info.lng,
    address: info.address,
  });
  setIsPickupLocationValid(true);
  setMessage("");
};


  const togglePickupDateMenu = () => setIsPickupOpen((prev) => !prev);
  const handlePickupTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => setPickupHour(e.target.value);
  const handlePickupDaySelect = (date: Date) => setPickupDate(date);

  return (
    <form
      className="bg-base-300 w-full rounded-box p-5 flex flex-col justify-between h-fit gap-3 shadow-xl"
      onSubmit={handleSubmit}
    >
      <LoadGoogleMaps />
      <p className="font-semibold text-red-500">{message}</p>

      {/* Pickup Location */}
      <fieldset className="fieldset">
        <select
          className="p-4 bg-base-100 border-r-16 border-transparent text-black"
          value={pickupLocation?.id || ""}
          onChange={(e) => handlePickupChange(e.target.value)}
        >
          <option value="">Select airport</option>
          {airports.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
        <legend className="font-semibold text-sm">
          From (We only operate in Turkey.)
        </legend>
      </fieldset>

      {/* Drop Off Location */}
      <fieldset className="fieldset">
        <legend className="font-semibold text-sm">
          To (We only operate in Turkey.)
        </legend>
        <label
          htmlFor="drop_off_location"
          className="input focus-within:outline-0 w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 opacity-80"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <AutocompleteInput
            value={dropOffInput}
            onChange={(val) => {
              setDropOffInput(val);
              setIsDropOffLocationValid(false);
            }}
            onPlaceSelected={async (place) => {
              console.log("Selected place:", pickupLocation);
              
              if (!pickupLocation) {
                setMessage("Please select a pickup location first.");
                setDropOffLocation(null);
                setIsDropOffLocationValid(false);
                setDropOffInput("");
                return;
              }

              const result = await getDrivingDistance(
                { lat: pickupLocation.lat, lng: pickupLocation.lng },
                { lat: place.lat, lng: place.lng }
              );

              const maxRadius = airportRadiusKm[pickupLocation.name] || 50;

              if (!result) {
                setMessage("Could not calculate driving distance. Try again.");
                setDropOffLocation(null);
                setIsDropOffLocationValid(false);
                setDropOffInput("");
                return;
              }

              if (result.distanceKm > maxRadius) {
                setMessage(
                  `Selected drop-off (${
                    place.name
                  }) is ${result.distanceKm.toFixed(
                    1
                  )}km away by car. Max allowed is ${maxRadius}km from ${
                    pickupLocation.name
                  }.`
                );
                setDropOffLocation(null);
                setIsDropOffLocationValid(false);
                setDropOffInput("");
              } else {
                setDropOffLocation(place);
                setIsDropOffLocationValid(true);
                setDropOffInput(place.name ?? "");
                setMessage("");
              }
            }}
            placeholder="Select a hotel"
            locationType="lodging"
            bounds={
              pickupLocation
                ? new google.maps.Circle({
                    center: new google.maps.LatLng(
                      pickupLocation.lat,
                      pickupLocation.lng
                    ),
                    radius: (airportRadiusKm[pickupLocation.name] || 50) * 1000,
                  }).getBounds() || undefined
                : undefined
            }
          />
        </label>
      </fieldset>

      {/* Pickup Date & Time */}
      <fieldset className="fieldset flex">
        <div className="w-full border border-base-300 rounded-box">
          <div
            className="collapse-title text-sm font-semibold bg-base-100 cursor-pointer"
            onClick={togglePickupDateMenu}
          >
            Pickup Date and Time
          </div>
          {isPickupOpen && (
            <div className="md:p-4 bg-base-200 rounded-b-box">
              <DayPicker
                mode="single"
                required
                disabled={{ before: new Date() }}
                selected={pickupDate}
                onSelect={handlePickupDaySelect}
                className="bg-base-300 rounded-box md:p-3 mb-4 w-full flex flex-col items-center"
                footer={
                  pickupDate
                    ? `Pickup Date: ${pickupDate.toString().slice(0, 15)}`
                    : ""
                }
              />
              <input
                type="time"
                name="pickupHour"
                required
                className="input focus-within:outline-0 w-full text-primary"
                value={pickupHour}
                onChange={handlePickupTimeChange}
              />
            </div>
          )}
        </div>
      </fieldset>

      {/* Passenger Count */}
      <fieldset className="fieldset flex focus-within:outline-0">
        <legend className="font-semibold text-sm">
          Passenger Count (Max - 45)
        </legend>
        <input
          type="number"
          className="input validator focus-within:outline-0 w-full"
          placeholder="Passengers (1-45)"
          min="1"
          max="45"
          title="Passenger Count"
          value={passengerCount}
          onChange={(e) => setPassengerCount(parseInt(e.target.value))}
        />
      </fieldset>

      <button
        type="submit"
        className="btn btn-primary w-full hover:bg-gray-200 hover:text-black"
      >
        Search
      </button>
    </form>
  );
}
