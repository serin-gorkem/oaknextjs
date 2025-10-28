"use client";

import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
  Libraries,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

interface LatLng {
  lat: number;
  lng: number;
  address: string;
}

interface Props {
  origin: LatLng | null;
  destination: LatLng | null;
  onRouteInfo?: (info: {
    distanceKm:number;
    distanceMi:number;
    durationHours:number;
    durationMinutes:number;
  }) => void;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const libraries = ["places"] as Libraries;

export default function DirectionsMap({ origin, destination,onRouteInfo }: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
  });
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [requestRoute, setRequestRoute] = useState(false);

  useEffect(() => {
    if (origin && destination) {
      setRequestRoute(true);
    }
  }, [origin, destination]);

  const handleDirectionsCallback = (
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === "OK" && result) {
      setDirections(result);
      setRequestRoute(false);

        const leg = result.routes[0].legs[0];
        const meters = leg.distance?.value ?? 0;
        const seconds = leg.duration?.value ?? 0;

        const distanceKm = meters / 1000;
        const distanceMi = meters / 1609.34;
        const durationHours = Math.floor(seconds / 3600);
        const durationMinutes = Math.floor((seconds % 3600) / 60);

        if(onRouteInfo){
            onRouteInfo({
                distanceKm,
                distanceMi,
                durationHours,
                durationMinutes,
            });
        }
    } else {
      console.error("Yön bilgisi alınamadı:", status);
      setRequestRoute(false);
    }
  };

  const mapOptions: google.maps.MapOptions = {
    gestureHandling: "greedy", // scroll/drag desteği açık
    scrollwheel: true,
    draggable: true,
    zoomControl: true,
    disableDefaultUI: false,
  };
  return isLoaded ? (

    <GoogleMap mapContainerStyle={containerStyle} options={mapOptions} zoom={7}>
      {origin && destination && (
        <>
          {requestRoute && !directions && (
            <DirectionsService
              options={{
                origin: { lat: origin.lat, lng: origin.lng },
                destination: { lat: destination.lat, lng: destination.lng },
                travelMode: google.maps.TravelMode.DRIVING,
              }}
              callback={handleDirectionsCallback}
            />
          )}
          {directions && (
            <DirectionsRenderer
              options={{
                directions,
                suppressMarkers: false,
              }}
            />
          )}
        </>
      )}
    </GoogleMap>
  ) : (
    <p>Harita yükleniyor...</p>
  );
}
