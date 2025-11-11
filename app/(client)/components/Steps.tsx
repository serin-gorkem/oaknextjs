"use client";

import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";

/* === Component === */
const Steps = memo(function Steps() {
  return (
    <section
      id="steps"
      aria-labelledby="steps-heading"
      className="h-fit mt-16 px-2 pb-8 flex flex-col xl:max-w-6xl lg:max-w-5xl mx-auto gap-8 lg:gap-16"
    >
      {/* === Section Header === */}
      <header className="flex flex-col gap-2 text-center lg:text-left">
        <h2
          id="steps-heading"
          className="text-xl lg:text-2xl text-warning font-bold uppercase tracking-wide"
        >
          How to Book Your Ride
        </h2>
        <h3 className="text-2xl lg:text-4xl font-bold text-base-content/90">
          Book in Four Simple Steps
        </h3>
      </header>

      {/* === Steps List === */}
      <ol className="flex flex-col gap-12 lg:gap-24 list-none">
        <Step
          stepNumber={1}
          svg="/images/svgs/step_1.svg"
          title="Fill Out the Form"
          text="Select your pickup and drop-off locations, travel date, and number of passengers. Add a return trip if needed — booking is fast, simple, and hassle-free."
          direction=""
        />
        <Step
          stepNumber={2}
          svg="/images/svgs/step_2.svg"
          title="Choose Your Vehicle"
          text="Explore our range of luxury, business, and economy transfer vehicles. Transparent pricing, detailed features, and the comfort you deserve."
          direction="md:flex-row-reverse"
        />
        <Step
          stepNumber={3}
          svg="/images/svgs/step_3.svg"
          title="Enhance Your Ride"
          text="Upgrade your transfer with extras like child seats, additional luggage options, or a VIP chauffeur service."
          direction=""
        />
        <Step
          stepNumber={4}
          svg="/images/svgs/step_4.svg"
          title="Confirm and Relax"
          text="Review your details, confirm your booking, and get instant confirmation. Enjoy peace of mind with our 24/7 customer support."
          direction="md:flex-row-reverse"
        />
      </ol>
    </section>
  );
});

/* === Step Component === */
type StepProps = {
  direction: string;
  svg: string;
  title: string;
  text: string;
  stepNumber: number;
};

function Step({ direction, svg, title, text, stepNumber }: StepProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`flex flex-col md:flex-row ${direction} justify-between items-center gap-8 xl:gap-32`}
    >
      {/* === Illustration === */}
      <Image
        width={500}
        height={500}
        src={svg}
        loading="lazy"
        alt={`Illustration for step ${stepNumber}: ${title}`}
        className="h-64 lg:h-72 xl:h-96 w-auto object-contain"
      />

      {/* === Step Description === */}
      <div className="flex flex-col gap-4 max-w-2xl text-center md:text-left">
        <h4 className="font-bold text-2xl xl:text-3xl text-base-content">
          Step {stepNumber}: {title}
        </h4>
        <p className="text-lg lg:text-xl text-base-content/80 leading-relaxed">
          {text}
        </p>
      </div>
    </motion.li>
  );
}

export default Steps;