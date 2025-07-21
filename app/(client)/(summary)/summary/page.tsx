"use client";
import { Suspense } from "react";
import SummaryContent from "./components/SummaryContent";

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SummaryContent />
    </Suspense>
  );
}