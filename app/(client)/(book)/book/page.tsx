"use client";
import { Suspense } from "react";
import BookContent from "./components/BookContent";

export default function Booking() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookContent />
    </Suspense>
  );
}