"use client";

import { Suspense } from "react";
import ExtrasContent from "./components/ExtrasContent";
import FallbackLoader from "../../components/FallbackLoader";

/**
 * ExtrasPage
 * ---
 * Displays the extras selection step (child seats, flowers, wait options, etc.)
 * Wrapped in Suspense for lazy loading and smooth fallback rendering.
 */
export default function ExtrasPage() {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen">
      <Suspense fallback={<FallbackLoader />}>
        <ExtrasContent />
      </Suspense>
    </main>
  );
}
