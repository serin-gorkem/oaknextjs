"use client";
import { Suspense } from "react";
import ExtrasContent from "./components/ExtrasContent";
import FallbackLoader from "../../components/FallbackLoader";

export default function ExtrasPage() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <ExtrasContent />
    </Suspense>
  );
}