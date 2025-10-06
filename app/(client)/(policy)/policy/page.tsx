"use client";
import { Suspense } from "react";
import PolicyContent from "./components/PolicyContent";

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PolicyContent />
    </Suspense>
  );
}