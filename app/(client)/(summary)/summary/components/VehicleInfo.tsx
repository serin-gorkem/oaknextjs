import Image from "next/image";
import React from "react";
type VehicleInfoProps = {
  clientData: any;
  navigateToBooking: () => void;
};
const VehicleInfo = ({ clientData, navigateToBooking }: VehicleInfoProps) => {

    console.log(clientData);
    
  return (
    <div className="bg-base-300 relative sm:w-full rounded-box shadow-md flex gap-4 flex-col px-3 py-4">
      <Image
        src={"/images/vito.webp"}
        alt="vehicle"
        width={200}
        height={200}
        className="md:w-96 lg:w-80"
      />
      <div className="flex  justify-between items-center rounded-md">
        <h1 className="text-xl font-bold">Selected Vehicle</h1>
        <button onClick={navigateToBooking} className="btn btn-primary"> Edit </button>
      </div>
      <hr></hr>
      <p className="text-md">{clientData?.booking?.vehicle_name}</p>
    </div>
  );
};

export default VehicleInfo;
