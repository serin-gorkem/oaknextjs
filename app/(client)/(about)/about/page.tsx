"use client";
import { Suspense } from "react";
import AboutContent from "./components/AboutContent";

export default function Booking() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutContent />
    </Suspense>
  );
}