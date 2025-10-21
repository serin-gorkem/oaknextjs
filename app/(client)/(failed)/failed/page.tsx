"use client";
import { Suspense } from "react";
import FailedContent from "./components/FailedContent";
import FallbackLoader from "../../components/FallbackLoader";


export default function DetailsPage() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <FailedContent />
    </Suspense>
  );
}