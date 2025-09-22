// components/SessionExpiredFallback.tsx
import React from "react";

type Props = {
  error: string | null;
  clientData: any;
};

export default function SessionExpiredFallback({ error, clientData }: Props) {
  if (error) {
    return (
      <div className="text-center h-screen flex items-center justify-center mt-20">
        <h2 className="text-xl font-bold mb-4">{error}</h2>
      </div>
    );
  }

  if (!clientData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-center mt-20">Loading Data...</p>
      </div>
    );
  }

  return null;
}
