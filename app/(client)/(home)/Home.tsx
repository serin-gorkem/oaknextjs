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
      {/* Background Image */}
      <div className="absolute w-full h-full">
        <Image
          src="/images/homepage.webp"
          width={1920}
          height={1080}
          className="object-center object-cover w-full h-full brightness-40"
          alt="Airport transfer background"
          priority
          decoding="async" // ✅ Görseli asenkron çöz, render blocking kalkar
          quality={70} // ✅ Görsel sıkıştırma
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 1920px" // ✅ Responsive
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-base-100/100 to-transparent pointer-events-none" />

      {/* Content */}
      <article
        id="above-the-fold"
        className="relative z-10 flex flex-col justify-between gap-4 p-2 my-24 sm:my-48 md:px-4 lg:flex-row lg:px-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto"
      >
        {/* Left Side */}
        <div className="flex flex-col gap-4 fade-in-fast">
          <h1 className="title font-bold tracking-tight leading-snug text-2xl sm:text-4xl xl:text-5xl text-base-100 lg:leading-tight xl:w-9/12">
            Reliable <span className="text-warning">Airport Travels. </span>
            Travel with Confidence and Luxury at Great Prices.
          </h1>

          <h2 className="font-paragraph xl:pb-8 text-base font-light text-white opacity-80 sm:text-sm xl:text-xl xl:w-8/12 leading-relaxed tracking-tighter">
            At Airport to Hotels, we specialize in providing seamless, reliable,
            and comfortable transfers directly from airports to your hotel. Our
            mission is to make your arrival and departure effortless, allowing
            you to start and end your trip with ease.
          </h2>

          <a href="/#steps">
            <button
              aria-label="How to book your ride page navigator button"
              className="btn btn-md lg:btn-lg hover:bg-primary hover:border-primary hover:text-base-100 font-paragraph font-light self-baseline transition-all duration-200"
            >
              How to book your ride
            </button>
          </a>
        </div>

        {/* Right Side (Form) */}
        <div className="relative sm:max-w-96 h-fit w-full slide-up">
          <CurrencyWrapper>
            <Form />
          </CurrencyWrapper>

          <div className="absolute bg-base-300 rounded-box shadow-xl h-16 w-10/12 left-1/2 -translate-x-1/2 -bottom-13 pt-2 px-2 -z-10 flex justify-between items-center">
            <Image
              src="/images/Tripadvisor-Logo.webp"
              alt="tripadvisor logo"
              loading="lazy"
              width={512}
              height={512}
              className="w-1/2 bg-cover bg-center"
            />
            <div className="flex">
              <Stars starCount={5} />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}