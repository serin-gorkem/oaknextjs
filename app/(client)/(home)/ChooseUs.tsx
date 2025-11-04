"use client";
import { lazy, memo } from "react";
import { motion, type Variants } from "framer-motion";

const SpecsCard = lazy(() => import("./components/SpecsCard"));

/* === Motion Variants === */
const fadeParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25, delayChildren: 0.2 },
  },
};

const fadeSlide: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeCard: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

/* === Component === */
const ChooseUs = memo(function () {
  return (
    <motion.section
      id="us"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeParent}
      className="relative mt-24 px-4 pb-12 flex flex-col gap-10 xl:max-w-9/12 lg:max-w-11/12 mx-auto"
    >
      {/* Background gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-base-100 via-transparent to-base-300 opacity-60 -z-10 rounded-box" />

      {/* === Başlık === */}
      <motion.figure variants={fadeSlide} className="text-center lg:text-left space-y-2">
        <figcaption className="text-xl lg:text-2xl text-warning font-semibold tracking-wide uppercase">
          Why Choose Us
        </figcaption>
        <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-base-content/90">
          Service Tailored to You
        </h1>
        <p className="max-w-2xl mx-auto lg:mx-0 text-base-content/70">
          Experience comfort, reliability, and transparency — designed to make your journey effortless.
        </p>
      </motion.figure>

      {/* === 3 Kart === */}
      <motion.div
        variants={fadeParent}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center"
      >
        {cardInfo.map((card, i) => (
          <motion.div
            key={card.id}
            variants={fadeCard}
            whileHover={{
              y: -6,
              scale: 1.03,
              boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
            }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          >
            <SpecsCard title={card.title} image={card.image} text={card.text} />
          </motion.div>
        ))}
      </motion.div>

      {/* === Alt Bilgi Alanı === */}
      <motion.article
        variants={fadeSlide}
        className="flex flex-col lg:flex-row gap-8 justify-between mt-6"
      >
        {/* Sol kutu */}
        <motion.figure
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="border border-gray-300 bg-white/90 backdrop-blur-md lg:w-4/12 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >
          <figcaption className="text-xl lg:text-2xl mb-4 font-bold text-base-content/90">
            Why book with us
          </figcaption>
          <ul className="flex flex-col gap-3 text-base text-base-content/80">
            {features.map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3 hover:text-warning transition-colors"
              >
                {item.icon}
                {item.title}
              </motion.li>
            ))}
          </ul>
        </motion.figure>

        {/* Sağ kutu */}
        <motion.figure
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-8/12 bg-white/90 backdrop-blur-md border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md flex flex-col justify-between text-base-content/80 leading-relaxed"
        >
          <p>- Private, door-to-door transfer service.</p>
          <p>- Exact meeting point and emergency contact details provided via confirmation email.</p>
          <p>- Vehicles may be upgraded or multiple vehicles used based on availability.</p>
          <p>- Flight monitoring and up to 1 hour of waiting time included.</p>
        </motion.figure>
      </motion.article>
    </motion.section>
  );
});

export default ChooseUs;

/* === Data === */
const features = [
  {
    title: "Excellent reputation",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-warning">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08..." />
      </svg>
    ),
  },
  {
    title: "No credit card fees",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-warning">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5..." />
      </svg>
    ),
  },
  {
    title: "Free cancellation",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-warning">
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5..." />
      </svg>
    ),
  },
  {
    title: "Professional drivers",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-warning">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5V6A3.75..." />
      </svg>
    ),
  },
];

const cardInfo = [
  {
    id: "0",
    title: "Reliable & Punctual Transfers",
    text: "We understand how important it is to be on time. Our service ensures you’re always on schedule — stress-free and seamless.",
    image: "/images/choose/1.webp",
  },
  {
    id: "1",
    title: "Comfort & Safety Guaranteed",
    text: "Travel with peace of mind in our well-maintained luxury, business, and economy vehicles. Comfort and safety come first.",
    image: "/images/choose/2.webp",
  },
  {
    id: "2",
    title: "Clear & Transparent Pricing",
    text: "Say goodbye to hidden fees. Honest pricing, clear communication, and the best value from start to finish.",
    image: "/images/choose/3.webp",
  },
];