"use client";
import { Suspense } from "react";
import BookingContent from "./components/BookingContent";

export default function Booking() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}