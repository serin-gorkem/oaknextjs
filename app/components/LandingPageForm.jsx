"use client";
import { memo, useMemo } from "react";
import { useRef } from "react";
import  { useLandingPageFormState } from "./useLandingPageFormState";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import useFormVariables from "./useGetLocalVariables";
import {
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";

/**
 * LandingPageForm is a memoized React functional component that renders a form for booking a transfer service.
 * It includes fields for pickup and drop-off locations, dates, times, passenger counts, and an optional return trip.
 * The component integrates with the Google Maps Places API for location autocomplete functionality.
 *
 * @component
 * @returns {JSX.Element} The rendered form component.
 *
 * @example
 * <LandingPageForm />
 *
 * @description
 * The form includes the following features:
 * - Pickup and drop-off location inputs with Google Maps Places API autocomplete.
 * - Date and time pickers for both pickup and return trips.
 * - Passenger count inputs with validation.
 * - Toggle for enabling/disabling a return trip.
 * - Validation to ensure all required fields are filled and pickup/drop-off locations are different.
 * - Saves form data to localStorage and navigates to the "vehicle-features" page upon submission.
 *
 * @requires useLandingPageFormState - Custom hook for managing form state.
 * @requires useJsApiLoader - Hook for loading the Google Maps JavaScript API.
 * @requires useNavigate - React Router hook for navigation.
 * @requires Autocomplete - Google Maps Places API Autocomplete component.
 * @requires DayPicker - Component for selecting dates.
 *
 * @dependencies
 * - Google Maps JavaScript API (requires a valid API key).
 * - React Router for navigation.
 * - LocalStorage for saving form data.
 *
 * @note
 * - The component assumes the Google Maps API key is provided via the `VITE_GOOGLE_MAPS_API_KEY` environment variable.
 * - The form only supports locations within Turkey.
 */
const LandingPageForm = memo(function () {
    const {
      shouldShowReturnUI,
      setWantsReturnTrip,
      pickupLocation,
      setPickupLocation,
      dropOffLocation,
      setDropOffLocation,
      passengerCount,
      setPassengerCount,
      returnDate,
      setReturnDate,
      returnHour,
      setReturnHour,
      pickupDate,
      setPickupDate,
      pickupHour,
      setPickupHour,
      returnPassengerCount,
      setReturnPassengerCount,
      isPickupOpen,
      setIsPickupOpen,
      isReturnOpen,
      setReturnOpen,
      errorText,
      setErrorText,
    } = useLandingPageFormState();

  const togglePickupDateMenu = () => {
    setIsPickupOpen((prev) => !prev);
  };
  const toggleReturnDateMenu = () => {
    setReturnOpen((prev) => !prev);
  };
  const libraries = ["places","geometry"];
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || (() => {
      console.error("Google Maps API key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment.");
      return ""; // Provide a fallback or empty string
    })(),
    libraries: libraries,
  });

  const options = useMemo(
    () => ({
      types: ["airport"],
      componentRestrictions: { country: "tr" },
    }),
    []
  );
  const DropOffOptions = useMemo(
    () => ({
      componentRestrictions: { country: "tr" },
    }),
    []
  );

  function handlePickupTimeChange(e) {
    const time = e.target.value;
    setPickupHour(time);
  }

  function handlePickupDaySelect(date) {
    const newDate = date.toString().slice(0, 15);
    setPickupDate(newDate);
  }

  const validateForm = () => {
    if (!pickupLocation || !dropOffLocation || !pickupDate || !pickupHour || !passengerCount) {
      setErrorText("Please fill in all fields.");
      return false;
    }
    if (pickupLocation === dropOffLocation) {
      if(pickupLocation === "" || dropOffLocation === ""){
        setErrorText("Please fill in location fields.");
        return false;
      }
      setErrorText("Pickup and drop-off locations cannot be the same.");
      return false;
    }
    if (shouldShowReturnUI) {
      if (!returnDate || !returnHour || !returnPassengerCount) {
        setErrorText("Please fill in all return fields.");
        return false;
      }
    }
    return true;
  };
  
  const { setFormVariables } = useFormVariables();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setFormVariables(
      {
        pickupLocation,
        dropOffLocation,
        pickupDate,
        pickupHour,
        passengerCount,
        shouldShowReturnUI,
        returnDate,
        returnHour,
        returnPassengerCount,
      }
    )
   //navigate("vehicle-features");
  };
  const autocompletePickupRef = useRef(null);
  const autocompleteDropRef = useRef(null);

  const handlePlaceChanged = (refType,setPlaceType) => {
    const place = refType.current.getPlace();
    if (!place.geometry){
      setPlaceType("");
      return;
    }

    const location = place.geometry.location;
    setPlaceType({
      lat: location.lat(),
      lng: location.lng(),
      name: place.name,
      address: place.formatted_address
    });
  };

  return (
    <>
      {isLoaded && (
        <form
          className="bg-base-300 w-full rounded-box p-5 flex flex-col justify-between h-fit gap-3 shadow-xl"
          onSubmit={handleSubmit}
        >
          <p className="font-semibold text-red-500">{errorText}</p>

          <fieldset className="fieldset">
            <legend className="font-semibold text-sm">
              From (We only operate on Turkey.)
            </legend>
            <label className="input  focus-within:outline-0 w-full ">
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
              <div className="w-full">
                  <Autocomplete
                    onLoad={(ref) => (autocompletePickupRef.current = ref)}
                    onPlaceChanged={() =>handlePlaceChanged(autocompletePickupRef,setPickupLocation)}
                    options={options}
                  >
                    <input
                    type="text"
                    id="autocomplete"
                    required={true}
                    value={pickupLocation.name}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Airport"
                    />
                  </Autocomplete>
              </div>
            </label>
          </fieldset>
          <fieldset className="fieldset ">
            <legend className="font-semibold text-sm">
              To (We only operate on Turkey.)
            </legend>
            <label className="input focus-within:outline-0 w-full">
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
              <div className="w-full">
              <Autocomplete
                    onLoad={(ref) => (autocompleteDropRef.current = ref)}
                    onPlaceChanged={() =>handlePlaceChanged(autocompleteDropRef,setDropOffLocation)}
                    options={DropOffOptions}
                  >
                    <input
                    type="text"
                    id="autocomplete"
                    required={true}
                    value={dropOffLocation.name}
                    onChange={(e) => setDropOffLocation(e.target.value)}
                    placeholder="Address,airport,hotel..."
                    />
                  </Autocomplete>
              </div>
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
                    footer={pickupDate ? `Pickup Date: ${pickupDate}` : ""}
                  />
                  <input
                    type="time"
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
            className="btn btn-primary w-full hover:bg-gray-200 hover:text-black"
          >
            Search
          </button>
        </form>
      )}
    </>
  );
});
export default LandingPageForm;
