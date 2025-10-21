"use client";
import { Suspense } from "react";
import BookContent from "./components/BookContent";
import FallbackLoader from "../../components/FallbackLoader";

export default function Booking() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <BookContent />
    </Suspense>
  );
}