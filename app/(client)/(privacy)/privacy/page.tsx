"use client";
import { Suspense } from "react";
import PrivacyContent from "./components/PrivacyContent";
import FallbackLoader from "../../components/FallbackLoader";

export default function DetailsPage() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <PrivacyContent />
    </Suspense>
  );
}