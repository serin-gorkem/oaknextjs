"use client";
import { Suspense } from "react";
import DetailsContent from "./components/DetailsContent";
import FallbackLoader from "../../components/FallbackLoader";

export default function DetailsPage() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <DetailsContent />
    </Suspense>
  );
}