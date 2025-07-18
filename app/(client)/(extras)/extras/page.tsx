"use client";
import { Suspense } from "react";
import ExtrasContent from "./components/ExtrasContent";

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExtrasContent />
    </Suspense>
  );
}