"use client";
import { Suspense } from "react";
import FailedContent from "./components/FailedContent";

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FailedContent />
    </Suspense>
  );
}