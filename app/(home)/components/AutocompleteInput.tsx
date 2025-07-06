"use client";

import React, { useEffect, useRef } from "react";

export interface LocationInfo {
  lat: number;
  lng: number;
  address: string;
}

interface AutocompleteInputProps {
  value: string;
  onChange: (val: string) => void;
  onPlaceSelected: (location: LocationInfo) => void;
  placeholder?: string;
  locationType?: "airport" | "lodging";
}

export default function AutocompleteInput({
  value,
  onChange,
  onPlaceSelected,
  placeholder = "Bir yer yazın...",
  locationType,
}: AutocompleteInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !window.google ||
      !inputRef.current ||
      autocompleteRef.current
    ) {
      return;
    }

    const options: google.maps.places.AutocompleteOptions = {
      componentRestrictions: { country: "tr" },
      fields: ["geometry", "formatted_address"],
    };

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);

    // Tip filtrelemesi (havaalanı veya otel)
    if (locationType === "airport") {
      autocomplete.setTypes(["airport"]);
    } else if (locationType === "lodging") {
      autocomplete.setTypes(["lodging"]);
    }

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (
        place &&
        place.geometry &&
        place.geometry.location &&
        typeof place.geometry.location.lat === "function" &&
        typeof place.geometry.location.lng === "function"
      ) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address || "";

        onPlaceSelected({ lat, lng, address });
      }
    });

    autocompleteRef.current = autocomplete;
  }, [locationType]);

  return (
    <input
      ref={inputRef}
      type="text"
      aria-label={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
