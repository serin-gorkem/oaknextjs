"use client";
import { Suspense } from "react";
import PrivacyContent from "./components/PrivacyContent";

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PrivacyContent />
    </Suspense>
  );
}