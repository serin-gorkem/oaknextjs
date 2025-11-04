"use client";
import { motion } from "framer-motion";
import Stars from "./components/Stars";
import Form from "./components/Form";
import CurrencyWrapper from "../components/CurrencyWrapper";
import Image from "next/image";

export default function Home() {
  return (
    <section
      id="home"
      className="relative flex flex-col h-fit sm:gap-5 lg:gap-10 overflow-hidden"
    >
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute w-full h-full"
      >
        <Image
          src="/images/homepage.webp"
          width={1920}
          height={1080}
          className="object-center object-cover w-full h-full brightness-40"
          alt="backgroundImage"
          priority
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-base-100/100 to-transparent pointer-events-none" />

      {/* Content */}
      <article
        id="above-the-fold"
        className="relative z-10 flex flex-col justify-between gap-4 p-2 my-24 sm:my-48 md:px-4 lg:flex-row lg:px-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto"
      >
        {/* Left Side */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="flex flex-col gap-4"
        >
          <motion.h1
            variants={{
              hidden: { y: 40, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="title font-bold tracking-tight leading-snug text-2xl sm:text-4xl xl:text-5xl text-base-100 lg:leading-tight xl:w-9/12"
          >
            Reliable <span className="text-warning">Airport Travels. </span>
            Travel with Confidence and Luxury at Great Prices.
          </motion.h1>

          <motion.h2
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-paragraph xl:pb-8 text-base font-light text-white opacity-80 sm:text-sm xl:text-xl xl:w-8/12 leading-relaxed tracking-tighter"
          >
            At Airport to Hotels, we specialize in providing seamless, reliable,
            and comfortable transfers directly from airports to your hotel. Our
            mission is to make your arrival and departure effortless, allowing
            you to start and end your trip with ease.
          </motion.h2>

          <motion.a
            href="/#steps"
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <button
              aria-label="How to book your ride page navigator button"
              className="btn btn-md lg:btn-lg hover:bg-primary hover:border-primary hover:text-base-100 font-paragraph font-light self-baseline"
            >
              How to book your ride
            </button>
          </motion.a>
        </motion.div>

        {/* Right Side (Form) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="relative sm:max-w-96 h-fit w-full"
        >
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
        </motion.div>
      </article>
    </section>
  );
}