import { DayPicker } from "react-day-picker";
import { addDays, parseISO } from "date-fns";
import "react-day-picker/style.css";

export type ReturnTripFormProps = {
  returnHour: string;
  returnDate: string;
  pickupDate: string; // "Wed Oct 01 2025"
  pickupHour: string; // "00:00:00"
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
  showDateSetError
}: ReturnTripFormProps) {

  const pickup = new Date(pickupDate + " " + pickupHour); // "Wed Oct 01 2025 00:00:00"
  const minReturnDate = addDays(pickup, 1);

  return (
    <div
      id="return-panel"
      className="w-full opacity-0 pointer-events-none transition-all gap-3 flex flex-col items-center justify-center top-0 h-screen fixed left-0 z-20"
    >
      <div
        onClick={handleReturnTrip}
        className="bg-primary h-screen w-full opacity-70 absolute"
      ></div>
      <div className="flex flex-col w-fit p-4 gap-2 lg:gap-4 items-center ">
        <div className="flex flex-col items-center w-full gap-4">
          <h1 className=" text-base-300 font-bold z-20 self-baseline ">
            Select pickup date
          </h1>
          <DayPicker
            mode="single"
            required={true}
            disabled={{ before: minReturnDate }}
            selected={returnDate ? new Date(returnDate) : undefined}
            onSelect={handleDaySelect}
            className={`bg-base-300 rounded-box p-3 lg:px-8 flex flex-col items-center `}
            footer={returnDate ? `Return Date: ${returnDate}` : ""}
          />
        </div>
        <form className="z-20 flex w-full flex-col gap-2">
          <fieldset className="fieldset flex focus-within:outline-0">
            <legend className="font-bold text-base text-base-100">
              Passenger Count (Max - 10)
            </legend>
            <input
              type="number"
              aria-label="input-passenger-count"
              name="passenger-count"
              className="input validator focus-within:outline-0 w-full"
              placeholder="Passengers (1-10)"
              min="1"
              max="10"
              value={returnPassengerCount}
              onChange={handlePersonCount}
              title="Passenger Count"
            />
          </fieldset>
          <fieldset className="fieldset flex focus-within:outline-0">
            <legend className="font-bold text-base text-base-100">
              Select pickup time:
            </legend>
            <input
              type="time"
              className="input focus-within:outline-0 w-full text-primary"
              value={returnHour}
              onChange={handleTimeChange}
            />
          </fieldset>
          <button
            onClick={confirmReturn}
            type="submit"
            id="return-btn"
            aria-label="confirm return trip button"
            className="btn btn-primary w-1/2  hover:bg-white hover:text-primary"
          >
            CONFIRM
          </button>
        </form>
        <h1
          className={`text-base-100 z-10 text-lg transition-all ${
            showDateSetError === true ? "opacity-100" : "opacity-0"
          } `}
        >
          Please select a return date and time
        </h1>
      </div>
    </div>
  );
}
