"use client";
{
  /* React imports */
}
import { lazy, memo } from "react";

{
  /* Lazy Loadings */
}
const TransferSummaryCard = lazy(() =>
  import("./TransferSummaryCard")
);
import Steps from "../components/Steps";
const PageIndicator = lazy(() => import("../PageIndicator"));
const VehicleFeaturesCard = lazy(() =>
  import("./VehicleFeaturesCard")
);

{
  /* API Keys and images import */
}
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";

import useFormVariables from "../components/useGetLocalVariables";
import Navbar from "../components/Navbar";

{
  /* On Form.jsx, there is a submit button and it will push form information to this jsx file and it will be used in Transfer Card  */
}
const VehicleFeatures = memo(function () {
  const { getFormVariables } = useFormVariables();
  const localData = getFormVariables();
  
  const libraries = ["places","geometry"];
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || (() => {
      console.error("Google Maps API key is missing. Please set VITE_GOOGLE_MAPS_API_KEY in your environment.");
      return ""; // Provide a fallback or empty string
    })(),
    libraries: libraries,
  });
  const containerStyle = {
    width: "100%",
    height: "23rem",
  };

  const center = {
      lat: localData.pickupLocation?.lat || 0,
      lng: localData.pickupLocation?.lng || 0,
  };
  
  const positions = [
      { lat: localData.pickupLocation?.lat || 0, lng: localData.pickupLocation?.lng || 0 },
      { lat: localData.dropOffLocation?.lat || 0, lng: localData.dropOffLocation?.lng || 0 },
  ];

  function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRad = (value) => (value * Math.PI) / 180;
  
    const R = 6371; // Earth's radius (km)
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // km cinsinden
  }
  
  function estimateFlightTime(distanceKm){
    const averageSpeed = 900; // Average airplane speed (km/hour)
    const timeHours = distanceKm / averageSpeed;
    const hours = Math.floor(timeHours);
    const minutes = Math.round((timeHours - hours) * 60);
    return `${hours} h ${minutes} min`;
  }
  
  // Kullanım:
  const lat1 = localData?.pickupLocation?.lat || 0;
  const lon1 = localData?.pickupLocation?.lng || 0;
  const lat2 = localData?.dropOffLocation?.lat || 0;
  const lon2 = localData?.dropOffLocation?.lng || 0;
  
  const distance = haversineDistance(lat1, lon1, lat2, lon2);
  const flightDuration = estimateFlightTime(distance);
  console.log("Uçuş mesafesi:", distance.toFixed(0), "km");
  console.log("Tahmini uçuş süresi:", flightDuration);

  const polylineOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
  };

  return (
    <>
      <Navbar isBookingPage={true} />
      <div className="flex relative flex-col justify-between lg:block xl:max-w-9/12 lg:max-w-11/12 mx-auto">
        <section className="p-4 md:px-4 flex justify-between flex-col mt-36 lg:flex-row-reverse gap-4 w-full lg:px-0 ">
          <div className="lg:hidden block">
            <PageIndicator />
          </div>
          <aside className="flex flex-col gap-3 xl:w-3/12 lg:w-5/12">
            <TransferSummaryCard totalDistance={distance.toFixed(0)} flightDuration={flightDuration} />
            <div className="hidden lg:block rounded-box bg-base-300 p-2">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                <h3 className="font-bold">Need Help ? </h3>
              </div>
              <div className="divider my-2"></div>
              <div className="flex items-center gap-2">
                <a
                  href={`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER}`}
                  aria-label="whatsapp link"
                  className=" text-primary size-10"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z"
                        fill="#000000"
                      ></path>
                    </g>
                  </svg>
                </a>
                <p>Start a chat</p>
              </div>
              <div className="divider my-2"></div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <a href= {`${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER}`} className="text-xs lg:text-base">
                  {`${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER}`}
                </a>
              </div>
              <div className="divider my-2"></div>
            </div>
          </aside>
          <div className="lg:w-full flex flex-col gap-4">
            <div className="hidden lg:block">
              <PageIndicator />
            </div>
            <div className="w-full z-0 h-96 hidden md:block">
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={7}
                  options={{
                    mapId: "b004964ef53350d0",
                    disableDefaultUI: true,
                  }}
                >
                  {positions.map((pos, index) => (
                    <Marker key={index} position={pos} />
                  ))}
                  <Polyline path={positions} options={polylineOptions} />
                </GoogleMap>
              )}
            </div>
            {/*Price from the database should be passed here.*/}
            <VehicleFeaturesCard
              img="./images/vito.webp"
              vehicleName={"Mercedes Vito"}
              person={8}
              bags={4}
              features={[
                "Airport Welcome",
                "Flight Tracker",
                "Disinfection",
                "Door To Door",
                "No Hidden Costs",
                "Passenger Insurance",
                "Your Special Vehicle",
              ]}
              price={"219.34 $"}
            />
            <div className="w-full h-fit flex items-center bg-[#C2E6D2] text-success-content rounded-box p-1 font-bold gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-full w-70 md:w-36"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl md:text-2xl"> Free Cancellation</h2>
                <p className="text-sm md:text-base md:w-4/5 opacity-80">
                  Book today, lock the price. You can cancel for free within the
                  <span className="text-primary ">02 March 2025</span> and get a
                  full refund of the transfer.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="[&>section]:max-w-full">
          <Steps />
        </div>
      </div>
    </>
  );
});

export default VehicleFeatures;
