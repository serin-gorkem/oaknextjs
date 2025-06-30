"use client";
{
  /* React imports */
}
import { lazy, memo } from "react";

{
  /* Lazy Loadings */
}
const Steps = lazy(() => import("../components/Steps"));
const PageIndicator = lazy(() => import("../booking/PageIndicator"));
const SummaryCard = lazy(() => import("../extras/SummaryCard"));
const ContactSummaryCard = lazy(() =>
  import("./ContactSummaryCard")
);

{
  /* API Keys and images import */
}
import RideDetails from "./RideDetailsCard";
import Navbar from "../components/Navbar";

{
  /* On Form.jsx, there is a submit button and it will push form information to this jsx file and it will be used in Transfer Card  */
}
const Summary = memo(function () {
  return (
    <>
      <Navbar isBookingPage={true} />
      <div className="flex relative flex-col mt-30 justify-between lg:block xl:max-w-9/12 lg:max-w-11/12 mx-auto">
        <section className="p-4 md:px-4 flex justify-between flex-col-reverse lg:flex-row-reverse gap-4 w-full lg:px-0 ">
          <aside className="flex flex-col gap-3 xl:w-4/12 lg:w-5/12">
            <SummaryCard
              bags={2}
              img="./images/vito.webp"
              vehicleType={"Mercedes Vito"}
              localData={false} // Set to false or provide a valid LocalData object
              pickupLocation="Sample Pickup Location"
              transferType="One Way"
              totalDistance="20 km"
              totalTime="30 min"
              totalPrice="£20"
              extras={{}}
              navigateToVehicleFeatures={() => {}}
            />
            {/* Navigation Buttons */}
            {/* Navigation Buttons */}
            <div className="w-full md:w-1/3 lg:w-full">
              <button
                className="btn px-2 md:w-full btn-gray"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                  />
                </svg>
                Personal Details
              </button>
            </div>
          </aside>
          <div className="lg:w-full flex flex-col gap-4">
            <div className=" lg:flex lg:flex-col lg:gap-4">
              {/*For page indicator active functionality, later.*/}
              <PageIndicator />
              <ContactSummaryCard
                navigateToPersonalDetails={() => {}}
              ></ContactSummaryCard>
              <RideDetails
                vehicleType={"Mercedes Vito"}
                totalDistance={"20 km"}
                totalTime={"30 min"}
                navigateToHome={() => {}}
              />
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

export default Summary;
