"use client";
import { memo, useState } from "react";
import { motion } from "framer-motion";
import Stars from "./components/Stars";

// === Heroicons SVG'ler ===
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

const Reviews = memo(function () {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((prev) => (prev === 0 ? reviewInfo.length - 1 : prev - 1));
  const next = () =>
    setIndex((prev) => (prev + 1) % reviewInfo.length);

  const visible = [
    (index + reviewInfo.length - 1) % reviewInfo.length,
    index,
    (index + 1) % reviewInfo.length,
  ];

  return (
    <section
      id="reviews"
      className="h-fit px-2 flex flex-col flex-wrap gap-4 lg:p-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto sm:gap-8"
    >
      {/* Başlık */}
      <figure className="flex flex-col gap-2.5 sm:gap-4 pb-8 text-center lg:text-left">
        <figcaption className="text-xl title lg:text-2xl text-warning font-bold font-heading leading-tight">
          Reviews
        </figcaption>
        <h1 className="text-2xl lg:text-4xl font-bold opacity-85">
          See what our customers said
        </h1>
      </figure>

      {/* Carousel */}
      <div className="relative flex justify-center items-center h-[16rem] perspective-[1600px] overflow-hidden">
        {/* Sol ok */}
        <button
          onClick={prev}
          className="absolute left-0 z-20 bg-base-300 hover:bg-warning text-base-content hover:text-white p-3 rounded-full shadow-lg transition-all duration-200"
          aria-label="Previous review"
        >
          {LeftIcon}
        </button>

        {/* Kartlar */}
        {visible.map((i, pos) => {
          const isCenter = pos === 1;
          const offsetX = pos === 0 ? -320 : pos === 2 ? 320 : 0;
          const z = isCenter ? 0 : -120;
          const scale = isCenter ? 1 : 0.9;
          const opacity = isCenter ? 1 : 0.4;
          const blur = isCenter ? "blur(0px)" : "blur(2px)";
          const rotateY = pos === 0 ? 8 : pos === 2 ? -8 : 0;

          return (
            <motion.div
              key={i}
              className={`absolute ${
                isCenter ? "z-20 shadow-2xl" : "z-10"
              } rounded-box p-8 w-[24rem] sm:w-[28rem] backdrop-blur-sm transition-all duration-500`}
              animate={{
                x: offsetX,
                z,
                scale,
                opacity,
                rotateY,
              }}
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
              <h3 className="font-bold text-warning mb-3 text-lg relative z-10">
                {reviewInfo[i].title}
              </h3>
              <p className="text-base opacity-90 leading-relaxed relative z-10">
                {reviewInfo[i].review}
              </p>
              <p className="mt-4 text-sm opacity-75 font-medium relative z-10">
                — {reviewInfo[i].name}, {reviewInfo[i].business}
              </p>
            </motion.div>
          );
        })}

        {/* Sağ ok */}
        <button
          onClick={next}
          className="absolute right-0 z-20 bg-base-300 hover:bg-warning text-base-content hover:text-white p-3 rounded-full shadow-lg transition-all duration-200"
          aria-label="Next review"
        >
          {RightIcon}
        </button>
      </div>

      {/* Alt kısım (TripAdvisor) */}
      <div className="bg-base-300 rounded-box shadow-md flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 w-full mt-10">
        <div className="flex flex-col">
          <h5 className="text-xl">
            Our customers say
            <span className="font-bold"> Excellent</span>
          </h5>
          <div className="flex items-center">
            <img
              src="./images/Tripadvisor-Logo.webp"
              alt="tripadvisor logo"
              loading="lazy"
              className="w-24 bg-cover bg-center"
            />
            <div className="flex">
              <Stars starCount={5} />
            </div>
          </div>
        </div>
        <button
          aria-label="tripadvisor site link"
          className="btn btn-primary hover:bg-white hover:text-primary w-64"
        >
          Review Us On Tripadvisor
        </button>
      </div>
    </section>
  );
});

export default Reviews;

// === Veriler ===
const reviewInfo = [
  {
    id: 0,
    title: "Always in time",
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