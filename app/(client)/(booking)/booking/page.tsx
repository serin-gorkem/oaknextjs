"use client";
import { Suspense } from "react";
import BookingContent from "./components/BookingContent";
import FallbackLoader from "../../components/FallbackLoader";

export default function Booking() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <BookingContent />
    </Suspense>
  );
}