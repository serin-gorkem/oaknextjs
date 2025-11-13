"use client";

/* -------------------- React Imports -------------------- */
import { lazy, memo } from "react";
import { motion } from "framer-motion";

/* -------------------- Lazy Imports -------------------- */
const Steps = lazy(() => import("../../../components/Steps"));
const PageIndicator = lazy(() => import("../../../components/PageIndicator"));

/* -------------------- Custom Hooks & Components -------------------- */
import { useGetData } from "../../../components/GetData";
import { useRouter } from "next/navigation";
import ContactSummaryCard from "./ContactSummaryCard";
import VehicleInfo from "./VehicleInfo";
import RideDetails from "./RideDetailsCard";
import Payment from "./Payment";

/**
 * Summary Page Component
 * --------------------------------------------------------
 * Displays a summary of the user's transfer details including:
 *  - Vehicle Information
 *  - Payment Summary
 *  - Contact and Ride Details
 * Also includes navigation buttons to go back or forward in the booking process.
 */
const Summary = memo(function Summary() {
  const { clientData } = useGetData();
  const router = useRouter();

  /* -------------------- Navigation Handlers -------------------- */
  const navigateToDetails = () =>
    router.push(`/details?uuid=${clientData.uuid}`);

  const navigateToBooking = () =>
    router.push(`/booking?uuid=${clientData.uuid}`);

  /* -------------------- Render -------------------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1, ease: "easeOut" }} // smooth fade-in
      className="flex relative mt-24 flex-col justify-between lg:block xl:max-w-9/12 lg:max-w-11/12 mx-auto"
    >
      <section className="p-4 md:px-4 flex justify-between flex-col-reverse lg:flex-row-reverse gap-4 w-full lg:px-0">
        {/* Sidebar Section */}
        <aside className="flex flex-col gap-3 xl:w-4/12 lg:w-5/12">
          <VehicleInfo
            clientData={clientData}
            navigateToBooking={navigateToBooking}
          />
          <Payment />

          {/* Navigation Button */}
          <div className="flex flex-col">
            <button
              onClick={navigateToDetails}
              className="btn px-2 md:w-full btn-gray flex items-center justify-center gap-2"
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

        {/* Summary Content */}
        <div className="lg:w-full flex flex-col gap-4">
          <div className="lg:flex lg:flex-col lg:gap-4">
            <PageIndicator activeStep="summary" />
            <ContactSummaryCard
              clientData={clientData}
              navigateToDetails={navigateToDetails}
            />
            <RideDetails
              clientData={clientData}
              navigateToDetails={navigateToBooking}
            />
          </div>
        </div>
      </section>

      {/* Bottom Step Indicator */}
      <div className="[&>section]:max-w-full">
        <Steps />
      </div>
    </motion.div>
  );
});

export default Summary;