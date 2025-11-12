"use client";

import { DayPicker } from "react-day-picker";
import { addDays } from "date-fns";
import "react-day-picker/style.css";

export type ReturnTripFormProps = {
  returnHour: string;
  returnDate: string;
  pickupDate: string; // örn: "Wed Oct 01 2025"
  pickupHour: string; // örn: "00:00:00"
  handleReturnTrip: () => void;
  handleDaySelect: (date: Date | undefined) => void;
  returnPassengerCount: number;
  handlePersonCount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  confirmReturn: (e: React.FormEvent<HTMLButtonElement>) => void;
  showDateSetError: boolean;
};

export function ReturnTripForm({
  returnHour,
  returnDate,
  pickupDate,
  pickupHour,
  handleReturnTrip,
  handleDaySelect,
  returnPassengerCount,
  handlePersonCount,
  handleTimeChange,
  confirmReturn,
  showDateSetError,
}: ReturnTripFormProps) {
  // 🔹 Minimum dönüş tarihi: kalkıştan 1 gün sonrası
  const pickup = new Date(`${pickupDate} ${pickupHour}`);
  const minReturnDate = addDays(pickup, 1);

  const selectedDate = returnDate ? new Date(returnDate) : undefined;

  return (
    <div
      id="return-panel"
      className="fixed top-0 left-0 z-20 flex h-screen w-full flex-col items-center justify-center gap-3 pointer-events-none opacity-0 transition-all"
    >
      {/* Overlay */}
      <div
        onClick={handleReturnTrip}
        className="absolute inset-0 h-screen w-full bg-primary opacity-70 cursor-pointer"
        aria-label="Close return trip selection"
      />

      {/* İçerik */}
      <div className="relative z-20 flex w-fit flex-col items-center gap-2 p-4 lg:gap-4">
        <div className="flex w-full flex-col items-center gap-4">
          <h1 className="self-baseline font-bold text-base-300">Select pickup date</h1>

          <DayPicker
            mode="single"
            required
            disabled={{ before: minReturnDate }}
            selected={selectedDate}
            onSelect={handleDaySelect}
            className="flex flex-col items-center rounded-box bg-base-300 p-3 lg:px-8"
            footer={returnDate ? `Return Date: ${returnDate}` : ""}
          />
        </div>

        <form className="z-20 flex w-full flex-col gap-2">
          {/* Passenger Count */}
          <fieldset className="fieldset flex focus-within:outline-0">
            <legend className="text-base font-bold text-base-100">
              Passenger Count (Max - 10)
            </legend>
            <input
              type="number"
              name="passenger-count"
              aria-label="input-passenger-count"
              className="input validator w-full focus-within:outline-0"
              placeholder="Passengers (1-10)"
              min={1}
              max={10}
              value={returnPassengerCount}
              onChange={handlePersonCount}
              title="Passenger Count"
            />
          </fieldset>

          {/* Return Time */}
          <fieldset className="fieldset flex focus-within:outline-0">
            <legend className="text-base font-bold text-base-100">
              Select pickup time:
            </legend>
            <input
              type="time"
              className="input w-full text-primary focus-within:outline-0"
              value={returnHour}
              onChange={handleTimeChange}
              aria-label="input-return-hour"
            />
          </fieldset>

          {/* Confirm Button */}
          <button
            type="submit"
            onClick={confirmReturn}
            id="return-btn"
            aria-label="confirm return trip"
            className="btn btn-primary w-1/2 hover:bg-white hover:text-primary"
          >
            CONFIRM
          </button>
        </form>

        {/* Error Text */}
        <p
          className={`z-10 text-lg text-base-100 transition-all ${
            showDateSetError ? "opacity-100" : "opacity-0"
          }`}
        >
          Please select a return date and time
        </p>
      </div>
    </div>
  );
}