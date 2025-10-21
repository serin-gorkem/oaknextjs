"use client";

import { Suspense, lazy } from "react";
import PageDivider from "./components/PageDivider";
import FallbackLoader from "../components/FallbackLoader";

// Componentler lazy load olarak import
const Home = lazy(() => import("./Home"));
const ChooseUs = lazy(() => import("./ChooseUs"));
const About = lazy(() => import("./About"));
const Vehicles = lazy(() => import("./Vehicles"));
const Reviews = lazy(() => import("./Reviews"));
const Steps = lazy(() => import("../components/Steps"));
const FAQ = lazy(() => import("./FAQ"));
const Contact = lazy(() => import("./Contact"));


export default function Landing() {
  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href={`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 right-6 bottom-6 group hidden md:block"
      >
        <div className="relative flex items-center">
          {/* Tooltip */}
          <div className="absolute right-16 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 w-48 bg-white shadow-lg rounded-xl px-4 py-2 text-gray-800 pointer-events-none">
            <h3 className="font-semibold text-sm">24/7 Customer Service</h3>
            <p className="text-xs text-gray-500">Ask us any question</p>
          </div>

          {/* WhatsApp Icon */}
          <div className="p-4 rounded-full shadow-md hover:shadow-xl transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 32 32"
              className="w-12 h-12"
            >
              <path
                fill="#BFC8D0"
                fillRule="evenodd"
                d="M16 31c7.732 0 14-6.268 14-14S23.732 3 16 3 2 9.268 2 17c0 2.51.661 4.867 1.818 6.905L2 31l7.315-1.696A13.94 13.94 0 0 0 16 31m0-2.154c6.543 0 11.846-5.303 11.846-11.846 0-6.542-5.303-11.846-11.846-11.846C9.458 5.154 4.154 10.458 4.154 17c0 2.526.79 4.868 2.138 6.79L5.23 27.77l4.049-1.013a11.8 11.8 0 0 0 6.72 2.09"
                clipRule="evenodd"
              />
              <path
                fill="url(#paint0_linear_87_7264)"
                d="M28 16c0 6.627-5.373 12-12 12-2.528 0-4.873-.782-6.807-2.116L5.09 26.909l1.075-4.03A11.95 11.95 0 0 1 4 16C4 9.373 9.373 4 16 4s12 5.373 12 12"
              />
              <path
                fill="#fff"
                fillRule="evenodd"
                d="M16 30c7.732 0 14-6.268 14-14S23.732 2 16 2 2 8.268 2 16c0 2.51.661 4.867 1.818 6.905L2 30l7.315-1.696A13.94 13.94 0 0 0 16 30m0-2.154c6.543 0 11.846-5.303 11.846-11.846 0-6.542-5.303-11.846-11.846-11.846C9.458 4.154 4.154 9.458 4.154 16c0 2.526.79 4.868 2.138 6.79L5.23 26.77l4.049-1.013a11.8 11.8 0 0 0 6.72 2.09"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </a>

      {/* Tüm sayfa tek Suspense içinde */}
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
