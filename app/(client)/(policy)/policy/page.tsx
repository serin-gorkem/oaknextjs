"use client";
import { Suspense } from "react";
import PolicyContent from "./components/PolicyContent";
import FallbackLoader from "../../components/FallbackLoader";


export default function DetailsPage() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <PolicyContent />
    </Suspense>
  );
}