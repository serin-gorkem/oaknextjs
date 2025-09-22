"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export function useGetData() {
  const [clientData, setClientData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
   const router = useRouter();
  const uuid = searchParams.get("uuid");

  async function getClientData() {
    try {
      const res = await fetch(`/api/form-data?uuid=${uuid}`);
      const json = await res.json();

      if (!res.ok) {
        if (res.status === 404) {
          setError("Session Timeout. Redirecting to Home page.");
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        } else {
          setError("There was a problem with the data.");
        }
        return;
      }

      if (!json.error) setClientData(json);
    } catch (err) {
      console.error("getClientData error:", err);
      setError("Sunucuya bağlanılamadı.");
    }
  }
  useEffect(() => {
    if (!uuid) return;
    getClientData()
  }, [uuid]);

  return  { clientData, setClientData,error };
}
