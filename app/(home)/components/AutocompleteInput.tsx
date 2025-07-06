"use client";

import React, { useEffect, useRef, useState } from "react";

interface AutocompleteInputProps {
  value: string;
  onChange: (val: string) => void;
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
  placeholder?: string;
  locationType?: "airport" | "lodging" | "default";
}

export default function AutocompleteInput({
  value,
  onChange,
  onPlaceSelected,
  placeholder = "Bir yer yazın...",
  locationType = "default",
}: AutocompleteInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !window.google ||
      !inputRef.current ||
      autocomplete
    ) return;

    const bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(35.8, 25.8), // Güneybatı Türkiye
      new google.maps.LatLng(42.1, 44.8)  // Kuzeydoğu Türkiye
    );

    const options: google.maps.places.AutocompleteOptions = {
      bounds,
      componentRestrictions: { country: "tr" },
      fields: ["formatted_address", "geometry", "name", "place_id"],
      strictBounds: false,
    };

    const ac = new google.maps.places.Autocomplete(inputRef.current, options);

    if (locationType === "airport") {
      ac.setTypes(["airport"]);
    } else if (locationType === "lodging") {
      ac.setTypes(["lodging"]);
    }

    ac.addListener("place_changed", () => {
      const place = ac.getPlace();
      if (place) onPlaceSelected(place);
    });

    setAutocomplete(ac);
  }, [autocomplete, locationType]);

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
