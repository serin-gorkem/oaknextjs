"use client";
import { Suspense } from "react";
import SummaryContent from "./components/SummaryContent";
import FallbackLoader from "../../components/FallbackLoader";


export default function SummaryPage() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <SummaryContent />
    </Suspense>
  );
}