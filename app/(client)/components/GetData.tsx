"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function useGetData() {
  const [clientData, setClientData] = useState<any>(null);
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");

  useEffect(() => {
    if (!uuid) return;

    fetch(`/api/form-data?uuid=${uuid}`)
      .then((res) => res.json())
      .then((json) => {
        if (!json.error) setClientData(json);
        else console.error(json.error);
      })
      .catch(console.error);
  }, [uuid]);

  return { clientData, setClientData };
}
