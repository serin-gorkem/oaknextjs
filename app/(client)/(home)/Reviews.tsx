"use client";

import { memo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Stars from "./components/Stars";

// === Icons ===
const LeftIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-7"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);

const RightIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-7"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
  </svg>
);

// === Component ===
const Reviews = memo(function Reviews() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((prev) => (prev === 0 ? reviewInfo.length - 1 : prev - 1));
  const next = () => setIndex((prev) => (prev + 1) % reviewInfo.length);

  const visible = [
    (index + reviewInfo.length - 1) % reviewInfo.length,
    index,
    (index + 1) % reviewInfo.length,
  ];

  return (
    <motion.section
      id="reviews"
      className="h-fit px-2 flex flex-col flex-wrap gap-4 xl:max-w-6xl lg:max-w-5xl mx-auto sm:gap-8"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      aria-labelledby="reviews-heading"
    >
      {/* === Section Header === */}
      <header className="flex flex-col gap-3 text-center lg:text-left mb-8">
        <h2
          id="reviews-heading"
          className="text-xl lg:text-2xl text-warning font-bold uppercase tracking-wide"
        >
          Reviews
        </h2>
        <h3 className="text-2xl lg:text-4xl font-bold text-base-content/90">
          See What Our Customers Say
        </h3>
      </header>

      {/* === Review Carousel === */}
      <div
        className="relative flex justify-center items-center h-[18rem] perspective-[1600px] overflow-hidden"
        aria-live="polite"
      >
        {/* Left button */}
        <button
          onClick={prev}
          className="absolute left-0 z-20 bg-base-300 hover:bg-warning text-base-content hover:text-white p-3 rounded-full shadow-lg transition-all duration-200"
          aria-label="Previous review"
          aria-controls="review-carousel"
        >
          {LeftIcon}
        </button>

        {/* Review cards */}
        {visible.map((i, pos) => {
          const isCenter = pos === 1;
          const offsetX = pos === 0 ? -320 : pos === 2 ? 320 : 0;
          const z = isCenter ? 0 : -120;
          const scale = isCenter ? 1 : 0.9;
          const opacity = isCenter ? 1 : 0.4;
          const blur = isCenter ? "blur(0px)" : "blur(2px)";
          const rotateY = pos === 0 ? 8 : pos === 2 ? -8 : 0;

          return (
            <motion.article
              key={i}
              itemScope
              itemType="https://schema.org/Review"
              className={`absolute ${
                isCenter ? "z-20 shadow-2xl" : "z-10"
              } rounded-box p-8 w-[22rem] sm:w-[26rem] backdrop-blur-sm`}
              animate={{ x: offsetX, z, scale, opacity, rotateY }}
              transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
              style={{
                transformOrigin: "center center",
                backfaceVisibility: "hidden",
                backgroundColor: isCenter
                  ? "rgba(255,255,255,1)"
                  : "rgba(255,255,255,0.65)",
                filter: blur,
              }}
            >
              {isCenter && (
                <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/0 pointer-events-none rounded-box" />
              )}
              <h4
                itemProp="name"
                className="font-bold text-warning mb-3 text-lg relative z-10"
              >
                {reviewInfo[i].title}
              </h4>
              <p
                itemProp="reviewBody"
                className="text-base text-base-content/80 leading-relaxed relative z-10"
              >
                {reviewInfo[i].review}
              </p>
              <p
                itemProp="author"
                className="mt-4 text-sm opacity-75 font-medium relative z-10"
              >
                — {reviewInfo[i].name}, {reviewInfo[i].business}
              </p>
              <meta itemProp="reviewRating" content="5" />
            </motion.article>
          );
        })}

        {/* Right button */}
        <button
          onClick={next}
          className="absolute right-0 z-20 bg-base-300 hover:bg-warning text-base-content hover:text-white p-3 rounded-full shadow-lg transition-all duration-200"
          aria-label="Next review"
          aria-controls="review-carousel"
        >
          {RightIcon}
        </button>
      </div>

      {/* === Bottom Info (TripAdvisor) === */}
      <div className="bg-base-300 rounded-box shadow-md flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 w-full mt-10">
        <div className="flex flex-col">
          <h4 className="text-xl text-base-content">
            Our customers say
            <span className="font-bold text-warning"> Excellent</span>
          </h4>
          <div className="flex items-center">
            <Image
              src="/images/Tripadvisor-Logo.webp"
              alt="Tripadvisor logo"
              width={160}
              height={80}
              loading="lazy"
              className="object-contain w-24 h-auto"
            />
            <Stars starCount={5} />
          </div>
        </div>
        <a
          href="https://www.tripadvisor.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Go to Tripadvisor reviews"
          className="btn btn-primary hover:bg-white hover:text-primary w-64"
        >
          Review Us on Tripadvisor
        </a>
      </div>
    </motion.section>
  );
});

export default Reviews;

/* === Static Data === */
const reviewInfo = [
  {
    id: 0,
    title: "Always on Time",
    name: "Sarah L.",
    business: "Business Traveler",
    review:
      "Amazing experience! The booking was simple, the driver was punctual, and the car spotless. Highly recommend!",
  },
  {
    id: 1,
    title: "Comfort & Style",
    name: "John D.",
    business: "Frequent Traveler",
    review:
      "Seamless transfer experience. Comfortable, professional, and on time. Will book again.",
  },
  {
    id: 2,
    title: "Professional Drivers",
    name: "Maria Singh",
    business: "Business Traveler",
    review:
      "Our transfer was perfect. The driver was polite and very helpful. Excellent service overall.",
  },
  {
    id: 3,
    title: "Safe & Smooth Ride",
    name: "Robert W.",
    business: "Tourist",
    review:
      "Super comfortable and safe journey. The whole process was effortless. Recommended!",
  },
  {
    id: 4,
    title: "Luxury Experience",
    name: "Anna K.",
    business: "Event Planner",
    review:
      "Great communication, premium vehicle quality, and flawless timing. Perfect for VIP transfers.",
  },
];