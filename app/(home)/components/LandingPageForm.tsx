"use client";
import { memo, useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Link from 'next/link'
import { useLoadScript } from "@react-google-maps/api";

const LandingPageForm = memo(function () {
  const [clientData, setClientData] = useState({});
  const [pickupLocation, setPickupLocation] = useState<any>({});
  const [dropOffLocation, setDropOffLocation] = useState<any>({});
  const [passengerCount, setPassengerCount] = useState(1);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupHour, setPickupHour] = useState("00:00");
  const [isPickupOpen, setIsPickupOpen] = useState(false);

  const [errorText, setErrorText] = useState("");

  //#region Autocomplete

//   const pickupRef = useRef(null);
//   const dropOffRef = useRef(null);

//   const libraries: ("places" | "geometry")[] = ["places", "geometry"];
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
//     libraries,
//   });

//   useEffect(() => {
//     if (!isLoaded || loadError || !pickupRef.current || !dropOffRef.current) return;
//       const pickupOptions = {
//       types: ["airport"],
//       componentRestrictions: { country: "tr" },
//       fields: ["address_components", "geometry"],
//     };
//     const dropOffOptions = useMemo(
//       () => ({
//         componentRestrictions: { country: "tr" },
//         fields: ["address_components", "geometry"],
//       }),
//       []
//     );
//     const pickupAutoComplete = new google.maps.places.Autocomplete(pickupRef.current, pickupOptions);
//     pickupAutoComplete.addListener("place_changed", () => handlePlaceChanged(pickupAutoComplete));

//     const dropOffAutoComplete = new google.maps.places.Autocomplete(dropOffRef.current, dropOffOptions);
//     dropOffAutoComplete.addListener("place_changed", () => handlePlaceChanged(dropOffAutoComplete));

//   }, [loadError,isLoaded]);

//     const formData = (data: any) => {
//     const addressComponents = data?.address_components;

//     const componentMap = {
//       subPremise: "",
//       premise: "",
//       street_number: "",
//       route: "",
//       country: "",
//       postal_code: "",
//       administrative_area_level_2: "",
//       administrative_area_level_1: "",
//     };

//     for (const component of addressComponents) {
//       const componentType = component.types[0] as keyof typeof componentMap;
//       if (componentMap.hasOwnProperty(componentType)) {
//         componentMap[componentType] = component.long_name;
//       }
//     }

//     const formattedAddress =
//       `${componentMap.subPremise} ${componentMap.premise} ${componentMap.street_number} ${componentMap.route}`.trim();
//     const latitude = data?.geometry?.location?.lat();
//     const longitude = data?.geometry?.location?.lng();

//     setPickupLocation((values: any) => ({
//       ...values,
//       streetAddress: formattedAddress,
//       country: componentMap.country,
//       zipCode: componentMap.postal_code,
//       city: componentMap.administrative_area_level_2,
//       state: componentMap.administrative_area_level_1,
//       latitude: latitude,
//       longitude: longitude,
//     }));
//   };

//  const handlePlaceChanged = async(address:any) => {
//     if (!isLoaded) return;
//     const place = address.getPlace()

//     if (!place || !place.geometry) {
//       setPickupLocation("");
//       setDropOffLocation("");
//       return;
//     }
//     formData(place);
//   };

  // const handlePlaceChanged = (refType: React.RefObject<google.maps.places.Autocomplete>, setPlaceType: (value: string | { lat: number; lng: number; name: string; address: string; }) => void) => {
  //   const place = refType.current.getPlace();
  //   if (!place.geometry) {
  //     setPlaceType("");
  //     return;
  //   }

  //   const location = place.geometry.location;
  //   if (!location) {
  //     setPlaceType("");
  //     return;
  //   }
  //   setPlaceType({
  //     lat: location.lat(),
  //     lng: location.lng(),
  //     name: place.name || "",
  //     address: place.formatted_address || "",
  //   });
  // };
  //#endregion

  const togglePickupDateMenu = () => {
    setIsPickupOpen((prev) => !prev);
  };

  function handlePickupTimeChange(e:any) {
    const time = e.target.value;
    setPickupHour(time);
  }

  function handlePickupDaySelect(date: Date) {
    const newDate = date.toString().slice(0, 15);
    setPickupDate(newDate);
  }

  const validateForm = () => {
    if (
      !pickupLocation ||
      !dropOffLocation ||
      !pickupDate ||
      !pickupHour ||
      !passengerCount
    ) {
      setErrorText("Please fill in all fields.");
      return false;
    }
    if (pickupLocation === "" || dropOffLocation === "") {
      setErrorText("Please fill in location fields.");
      return false;
    }
    if (pickupLocation === dropOffLocation) {
      setErrorText("Pickup and drop-off locations cannot be the same.");
      return false;
    }
    return true;
  };


  //Final step
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    //Store client information.
    setClientData({
      pickupLocation,
      dropOffLocation,
      pickupDate,
      pickupHour,
      passengerCount,
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
                {/* <Autocomplete
                  onLoad={(ref) => (autocompletePickupRef.current = ref)}
                  onPlaceChanged={() =>
                    handlePlaceChanged(autocompletePickupRef, setPickupLocation)
                  }
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
                </Autocomplete> */}
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
                  onPlaceChanged={() =>
                    handlePlaceChanged(autocompleteDropRef, setDropOffLocation)
                  }
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
          <Link
          href="/booking" data = {clientData}
          >
            <button  className="btn btn-primary w-full hover:bg-gray-200 hover:text-black">
              Search
            </button>
          </Link>
        </form>
      )}
    </>
  );
});
export default LandingPageForm;
