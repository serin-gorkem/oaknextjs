"use client";
import { Suspense } from "react";
import PrivacyContent from "./components/PrivacyContent";
import FallbackLoader from "../../components/FallbackLoader";

export default function PrivacyPage() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <PrivacyContent />
    </Suspense>
  );
}