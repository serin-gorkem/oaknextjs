"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { v4 as uuidv4 } from "uuid";
import AutocompleteInput from "./AutocompleteInput";
import LoadGoogleMaps from "@/components/LoadGoogleMaps";

export default function Form() {
  const [clientData, setClientData] = useState({});
  const [pickupLocation, setPickupLocation] = useState<any>("");
  const [dropOffLocation, setDropOffLocation] = useState<any>("");
  const [passengerCount, setPassengerCount] = useState(1);
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [pickupHour, setPickupHour] = useState("00:00");
  const [isPickupOpen, setIsPickupOpen] = useState(false);
  const uuid = uuidv4();

  const [message, setMessage] = useState("");
  const validateForm = () => {
    if (
      !pickupLocation ||
      !dropOffLocation ||
      !pickupDate ||
      !pickupHour ||
      !passengerCount
    ) {
      setMessage("Please fill in all fields.");
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
  };
  async function cleanupData() {
    await fetch("/api/cleanup");
  }

  const router = useRouter();
  async function handleSubmit(e: any) {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        pickup_location: pickupLocation,
        drop_off_location: dropOffLocation,
        pickup_date: pickupDate?.toDateString(),
        pickup_hour: pickupHour,
        passenger_count: passengerCount,
        uuid: uuid,
      };
      setClientData(data);
      setMessage("Form submitted successfully!");
      console.log(clientData);
      

      const response = await fetch("api/form-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
      if (response.status === 200) {
        router.push(`/booking?uuid=${uuid}`);
      }
      cleanupData();
      console.log("Response from API: ", response.status);
    }
  }

  const togglePickupDateMenu = () => {
    setIsPickupOpen((prev) => !prev);
  };

  function handlePickupTimeChange(e: any) {
    const time = e.target.value;
    setPickupHour(time);
  }

  function handlePickupDaySelect(date: Date) {
    setPickupDate(date);
  }

  return (
    <>
      <form
        className="bg-base-300 w-full rounded-box p-5 flex flex-col justify-between h-fit gap-3 shadow-xl"
        onSubmit={handleSubmit}
      >
        <LoadGoogleMaps />
        <p className="font-semibold text-red-500">{message}</p>

        <fieldset className="fieldset">
          <legend className="font-semibold text-sm">
            From (We only operate on Turkey.)
          </legend>
          <label htmlFor="pickup_location" className="input  focus-within:outline-0 w-full ">
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
              value={pickupLocation?.name || ""}
              onChange={(val) =>
                setPickupLocation((prev: any) => ({ ...prev!, name: val }))
              }
              onPlaceSelected={setPickupLocation}
              placeholder="Havalimanı seçin"
              locationType="airport"
            />
          </label>
        </fieldset>
        <fieldset className="fieldset ">
          <legend className="font-semibold text-sm">
            To (We only operate on Turkey.)
          </legend>
          <label htmlFor="drop_off_location" className="input focus-within:outline-0 w-full">
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
              value={dropOffLocation?.name || ""}
              onChange={(val) =>
                setDropOffLocation((prev: any) => ({ ...prev!, name: val }))
              }
              onPlaceSelected={setDropOffLocation}
              placeholder="Otel seçin"
              locationType="lodging"
            />
          </label>
        </fieldset>
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
                  required={true}
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
                  required={true}
                  className="input focus-within:outline-0 w-full text-primary"
                  value={pickupHour}
                  onChange={handlePickupTimeChange}
                />
              </div>
            )}
          </div>
        </fieldset>
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
    </>
  );
}
