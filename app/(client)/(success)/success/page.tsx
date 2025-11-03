"use client";
import { Suspense } from "react";
import SuccessContent from "./components/SuccessContent";
import FallbackLoader from "../../components/FallbackLoader";


export default function SuccessPage() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <SuccessContent />
    </Suspense>
  );
}