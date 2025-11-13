"use client";

import Image from "next/image";
import Stars from "./components/Stars";
import Form from "./components/Form";
import CurrencyWrapper from "../components/CurrencyWrapper";

export default function Home() {
  return (
    <section
      id="home"
      className="relative flex flex-col h-fit sm:gap-5 lg:gap-10 overflow-hidden"
    >
      {/* === Background Image === */}
      <div className="absolute inset-0">
        <Image
          src="/images/homepage.webp"
          width={1920}
          height={1080}
          alt="Private airport transfer car background"
          className="object-center object-cover w-full h-full brightness-40"
          priority
          fetchPriority="high"
          decoding="async"
          quality={70}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 1920px"
        />
      </div>

      {/* === Bottom Gradient Overlay === */}
      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-base-100/100 to-transparent pointer-events-none" />

      {/* === Main Content === */}
      <article
        id="above-the-fold"
        className="relative z-10 flex flex-col justify-between gap-10 p-4 my-24 sm:my-48 lg:flex-row lg:px-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto" 
      >
        {/* === Left Side (Hero Text) === */}
        <div className="flex flex-col gap-5 text-base-100 lg:w-[55%]">
          <h1 className="font-bold tracking-tight title leading-snug text-2xl sm:text-4xl xl:text-[2.6rem] lg:leading-tight">
            Reliable <span className="text-warning">Airport Travels.</span>{" "}
            Travel with Confidence and Luxury at Great Prices.
          </h1>

          <p className="font-paragraph xl:pb-8 text-base font-light text-white opacity-80 sm:text-sm xl:text-lg leading-relaxed tracking-tight">
            At Airport to Hotels, we provide seamless, reliable, and comfortable
            transfers directly from airports to your hotel. Start and end your
            trip effortlessly with professional drivers and luxury vehicles.
          </p>

          <a href="/#steps" aria-label="Navigate to booking steps section">
            <button className="btn btn-md lg:btn-lg font-paragraph font-light self-baseline hover:bg-primary hover:border-primary hover:text-base-100 transition-all">
              How to book your ride
            </button>
          </a>
        </div>

        {/* === Right Side (Booking Form) === */}
        <div className="relative sm:max-w-80 md:max-w-96 w-full mt-8 lg:mt-0 lg:w-[45%]">
          <CurrencyWrapper>
            <Form />
          </CurrencyWrapper>

          {/* === Rating Card (Tripadvisor) === */}
          <div className="absolute left-1/2 -z-10 -translate-x-1/2 -bottom-14 w-10/12 h-16 bg-base-300 rounded-box shadow-xl pt-2 px-3 flex justify-between items-center">
            <Image
              src="/images/Tripadvisor-Logo.webp"
              alt="Tripadvisor rating logo"
              loading="lazy"
              width={128}
              height={128}
              className="object-contain w-1/2"
            />
            <Stars starCount={5} />
          </div>
        </div>
      </article>
    </section>
  );
}