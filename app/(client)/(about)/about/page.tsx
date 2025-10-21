"use client";
import { Suspense } from "react";
import AboutContent from "./components/AboutContent";
import FallbackLoader from "../../components/FallbackLoader";


export default function Booking() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <AboutContent />
    </Suspense>
  );
}