"use client";

import { Suspense } from "react";
import DetailsContent from "./components/DetailsContent";
import FallbackLoader from "../../components/FallbackLoader";

/**
 * Renders the Details page wrapped in React Suspense
 * for lazy-loading of content and a smooth fallback experience.
 */
export default function DetailsPage() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <DetailsContent />
    </Suspense>
  );
}
