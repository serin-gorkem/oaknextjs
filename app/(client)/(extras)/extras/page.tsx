"use client";
import { Suspense } from "react";
import ExtrasContent from "./components/ExtrasContent";
import FallbackLoader from "../../components/FallbackLoader";

export default function DetailsPage() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <ExtrasContent />
    </Suspense>
  );
}