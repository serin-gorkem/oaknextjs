import { useState } from "react";

export function useLandingPageFormState() {
    const [shouldShowReturnUI, setWantsReturnTrip] = useState(false);
    const [pickupLocation, setPickupLocation] = useState("");
    const [pickupInput, setPickupInput] = useState("");
    const [dropOffLocation, setDropOffLocation] = useState("");
    const [dropOffInput, setDropOffInput] = useState("");
    const [passengerCount, setPassengerCount] = useState(1);
  
    const [returnDate, setReturnDate] = useState("");
    const [returnHour, setReturnHour] = useState("00:00");
  
    const [pickupDate, setPickupDate] = useState("");
    const [pickupHour, setPickupHour] = useState("00:00");
    const [returnPassengerCount, setReturnPassengerCount] = useState(1);
  
    const [isPickupOpen, setIsPickupOpen] = useState(false);
    const [isReturnOpen, setReturnOpen] = useState(false);

    const [errorText, setErrorText] = useState("");

  return {
    shouldShowReturnUI,
    setWantsReturnTrip,
    pickupLocation,
    setPickupLocation,
    pickupInput,
    setPickupInput,
    dropOffLocation,
    setDropOffLocation,
    dropOffInput,
    setDropOffInput,
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
  };
}
