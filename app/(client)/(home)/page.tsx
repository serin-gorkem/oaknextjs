"use client";

import { Suspense, lazy } from "react";
import PageDivider from "./components/PageDivider";
import FallbackLoader from "../components/FallbackLoader";

// Lazy-loaded components
const Home = lazy(() => import("./Home"));
const ChooseUs = lazy(() => import("./ChooseUs"));
const About = lazy(() => import("./About"));
const Vehicles = lazy(() => import("./Vehicles"));
const Reviews = lazy(() => import("./Reviews"));
const Steps = lazy(() => import("../components/Steps"));
const FAQ = lazy(() => import("./FAQ"));
const Contact = lazy(() => import("./Contact"));

export default function Landing() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER;

  return (
    <>
      {/* Floating WhatsApp Button */}
      {whatsappNumber && (
        <a
          href={`https://api.whatsapp.com/send?phone=${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact via WhatsApp"
          className="fixed z-50 right-6 bottom-6 group hidden md:block"
        >
          <div className="relative flex items-center">
            {/* Tooltip */}
            <div className="absolute right-16 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 w-48 bg-white shadow-xl rounded-xl px-4 py-2 text-gray-800 pointer-events-none">
              <h3 className="font-semibold text-sm">24/7 Customer Service</h3>
              <p className="text-xs text-gray-500">Ask us any question</p>
            </div>

            {/* WhatsApp Icon */}
            <div className="p-4 rounded-full bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="none"
                className="w-12 h-12"
              >
                <path
                  fill="#BFC8D0"
                  d="M16 31c7.732 0 14-6.268 14-14S23.732 3 16 3 2 9.268 2 17c0 2.51.661 4.867 1.818 6.905L2 31l7.315-1.696A13.94 13.94 0 0 0 16 31"
                />
                <path
                  fill="url(#paint0_linear)"
                  d="M28 16c0 6.627-5.373 12-12 12a11.93 11.93 0 0 1-6.807-2.116L5.09 26.909l1.075-4.03A11.95 11.95 0 0 1 4 16C4 9.373 9.373 4 16 4s12 5.373 12 12"
                />
                <path
                  fill="#fff"
                  d="M12.5 9.5c-.333-.669-.844-.61-1.36-.61-.921 0-2.359 1.105-2.359 3.16 0 1.684.742 3.528 3.243 6.286 2.414 2.662 5.585 4.039 8.218 3.992s3.175-2.313 3.175-3.078c0-.339-.21-.508-.356-.554-.897-.43-2.552-1.233-2.928-1.384-.377-.15-.573.054-.695.165-.342.325-1.019 1.284-1.25 1.5s-.578.106-.721.024c-.53-.212-1.964-.85-3.107-1.958-1.415-1.371-1.498-1.843-1.764-2.263-.213-.336-.057-.542.021-.632.305-.351.726-.894.914-1.164s.04-.679-.05-.934c-.387-1.097-.715-2.015-.981-2.55"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="26.5"
                    x2="4"
                    y1="7"
                    y2="28"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#5BD066" />
                    <stop offset="1" stopColor="#27B43E" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </a>
      )}

      {/* Page Content */}
      <Suspense fallback={<FallbackLoader />}>
        <Home />
        <PageDivider />
        <ChooseUs />
        <PageDivider />
        <About />
        <PageDivider />
        <Vehicles />
        <PageDivider />
        <Reviews />
        <PageDivider />
        <Steps />
        <PageDivider />
        <FAQ />
        <PageDivider />
        <Contact />
        <PageDivider />
      </Suspense>
    </>
  );
}