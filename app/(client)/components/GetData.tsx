"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type GetDataProps = {
  clientData: any;
  setClientData: any;
};
export async function GetData({ clientData, setClientData }: GetDataProps) {
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");
  useEffect(() => {
    if (!uuid) return;
    fetch(`/api/form-data?uuid=${uuid}`)
      .then((res) => res.json())
      .then((json) => {
        if (!json.error) setClientData(json);
        else console.error(json.error);
      });
  }, [uuid]);
  if (!clientData) return <p>Yükleniyor...</p>;
}