"use client";
import { Suspense } from "react";
import PolicyContent from "./components/PolicyContent";
import FallbackLoader from "../../components/FallbackLoader";


export default function PolicyPage() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <PolicyContent />
    </Suspense>
  );
}