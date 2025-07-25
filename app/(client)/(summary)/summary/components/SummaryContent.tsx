{
  /* React imports */
}
import { lazy, memo } from "react";

{
  /* Lazy Loadings */
}
const Steps = lazy(() => import("../../../components/Steps"));
const PageIndicator = lazy(() => import("../../../components/PageIndicator"));

import { useGetData } from "../../../components/GetData";
import { useRouter } from "next/navigation";
import ContactSummaryCard from "./ContactSummaryCard";
import VehicleInfo from "./VehicleInfo";
import RideDetails from "./RideDetailsCard";



{
  /* On Form.jsx, there is a submit button and it will push form information to this jsx file and it will be used in Transfer Card  */
}
const Summary = memo(function () {
  const {clientData} = useGetData();
  const router = useRouter();

  function navigateToDetails() {
    router.push(`/details?uuid=${clientData.uuid}`);
  }

  function navigateToBooking(){
    router.push(`/booking?uuid=${clientData.uuid}`);
  }

  return (
    <>
      <div className="flex relative mt-24 flex-col justify-between lg:block xl:max-w-9/12 lg:max-w-11/12 mx-auto">
        <section className="p-4 md:px-4 flex justify-between flex-col-reverse lg:flex-row-reverse gap-4 w-full lg:px-0 ">
          <aside className="flex flex-col gap-3 xl:w-4/12 lg:w-5/12">
            <VehicleInfo
              clientData={clientData}
              navigateToBooking={navigateToBooking}
            />
            {/* Navigation Buttons */}
            {/* Navigation Buttons */}
            <div className="flex flex-col">
              <button
                onClick={navigateToDetails}
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
              <button
                onClick={navigateToDetails}
                className="btn btn-primary hover:text-white mt-2  hover:btn-warning px-2 md:w-full btn-gray"
              >
                Book your trip now !
              </button>
            </div>
          </aside>
          <div className="lg:w-full flex flex-col gap-4">
            <div className=" lg:flex lg:flex-col lg:gap-4">
              {/*For page indicator active functionality, later.*/}
              <PageIndicator activeStep="summary" />
              <ContactSummaryCard clientData={clientData} navigateToDetails={navigateToDetails}/>
              <RideDetails clientData={clientData} navigateToDetails={navigateToBooking}/>
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