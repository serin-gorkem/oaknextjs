"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function useGetData() {
  const [clientData, setClientData] = useState<any>(null);
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");

  async function getClientData() {
    const res = await fetch(`/api/form-data?uuid=${uuid}`);
    const json = await res.json();
    if (!json.error) setClientData(json);
    else console.error(json.error);
  }

  useEffect(() => {
    if (!uuid) return;

  getClientData()
  }, [uuid]);

  return  { clientData, setClientData };
}
