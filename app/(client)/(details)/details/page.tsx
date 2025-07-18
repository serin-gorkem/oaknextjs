"use client";
import { Suspense } from "react";
import DetailsContent from "./components/DetailsContent";

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsContent />
    </Suspense>
  );
}