"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Vehicle = {
  id: number;
  name: string;
  image_url: string;
  capacity_person: number;
  capacity_bags: number;
  features: string[];
  base_price: number;
};

export type VehicleContextProps = {
  vehicles: Vehicle[];
};
const VehicleContext = createContext<VehicleContextProps | undefined>(undefined);

async function getVehicleData(setVehicleData: any) {
  const res = await fetch(`/api/get-vehicle-data`, {
    method: "GET",
  });
  if (res.ok) {
    const data = await res.json();
    setVehicleData(data);
  } else {
    const error = await res.json();
    console.error("Veri çekme hatası:", error);
  }
}

export function VehicleProvider({ children}: {children: React.ReactNode}) {
  const [vehicleData, setVehicleData] = useState<any>(null);

  useEffect(() => {
    getVehicleData(setVehicleData);
  }, []);

  return (
    <VehicleContext.Provider value={{ vehicles: vehicleData}}>
      {children}
    </VehicleContext.Provider>
  );
}

export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (!context) throw new Error("useVehicle must be used within VehicleProvider");
  return context;
};
