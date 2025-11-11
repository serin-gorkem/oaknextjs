"use client";
import { Suspense } from "react";
import BookContent from "./components/BookContent";
import FallbackLoader from "../../components/FallbackLoader";

/**
 * Booking page entry point.
 * Uses Suspense to asynchronously load the booking form section.
 */
export default function Booking() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <BookContent />
    </Suspense>
  );
}