"use client";
import Script from "next/script";

/**
 * Google Maps API'yi lazy load eder.
 * Artık render-blocking değil, sayfa idle iken yüklenir.
 */
export default function LoadGoogleMaps() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <Script
      src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
      strategy="lazyOnload"
      onLoad={() => console.log("✅ Google Maps API loaded lazily")}
    />
  );
}
