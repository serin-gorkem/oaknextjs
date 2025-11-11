"use client";

import { lazy, memo } from "react";
import { motion, type Variants } from "framer-motion";

// === Lazy Import ===
const SpecsCard = lazy(() => import("./components/SpecsCard"));

/* === Motion Variants === */
const fadeParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25, delayChildren: 0.2 } },
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
const ChooseUs = memo(function ChooseUs() {
  return (
    <motion.section
      id="us"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeParent}
      className="relative mt-24 px-4 pb-12 flex flex-col gap-10 xl:max-w-6xl lg:max-w-5xl mx-auto"
    >
      {/* === Background Gradient Layer === */}
      <div className="absolute inset-0 bg-gradient-to-b from-base-100 via-transparent to-base-300 opacity-60 -z-10 rounded-box" />

      {/* === Section Header === */}
      <motion.header
        variants={fadeSlide}
        className="text-center lg:text-left space-y-3"
      >
        <h2 className="text-xl lg:text-2xl text-warning font-semibold tracking-wide uppercase">
          Why Choose Us
        </h2>
        <h3 className="text-3xl lg:text-4xl font-bold leading-tight text-base-content/90">
          Service Tailored to You
        </h3>
        <p className="max-w-2xl mx-auto lg:mx-0 text-base-content/70">
          Experience comfort, reliability, and transparency — designed to make
          your journey effortless.
        </p>
      </motion.header>

      {/* === Feature Cards === */}
      <motion.div
        variants={fadeParent}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center"
      >
        {cardInfo.map((card) => (
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
            <SpecsCard {...card} />
          </motion.div>
        ))}
      </motion.div>

      {/* === Bottom Info Section === */}
      <motion.section
        variants={fadeSlide}
        className="flex flex-col lg:flex-row gap-8 justify-between mt-6"
      >
        {/* === Left Box: Booking Advantages === */}
        <motion.aside
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="border border-gray-300 bg-white/90 backdrop-blur-md lg:w-4/12 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >
          <h4 className="text-xl lg:text-2xl mb-4 font-bold text-base-content/90">
            Why book with us
          </h4>
          <ul className="flex flex-col gap-3 text-base text-base-content/80">
            {features.map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-3 hover:text-warning transition-colors"
              >
                {item.icon}
                <span>{item.title}</span>
              </motion.li>
            ))}
          </ul>
        </motion.aside>

        {/* === Right Box: Service Notes === */}
        <motion.article
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-8/12 bg-white/90 backdrop-blur-md border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md flex flex-col justify-between text-base-content/80 leading-relaxed"
        >
          <ul className="space-y-2">
            <li>- Private, door-to-door transfer service.</li>
            <li>
              - Exact meeting point and emergency contact details provided via
              confirmation email.
            </li>
            <li>
              - Vehicles may be upgraded or multiple vehicles used based on
              availability.
            </li>
            <li>- Flight monitoring and up to 1 hour of waiting time included.</li>
          </ul>
        </motion.article>
      </motion.section>
    </motion.section>
  );
});

export default ChooseUs;

/* === Static Data === */
const features = [
  {
    title: "Excellent reputation",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-7 text-warning"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48a4.5 4.5 0 0 1-1.423-.23l-3.114-1.04a4.5 4.5 0 0 0-1.423-.23H5.904"
        />
      </svg>
    ),
  },
  {
    title: "No credit card fees",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-7 text-warning"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
        />
      </svg>
    ),
  },
  {
    title: "Tolls and gratuities included",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-7 text-warning"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8.25v7.5m3.75-3.75h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Free cancellation",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-7 text-warning"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Professional drivers",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-7 text-warning"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 7.5V6A3.75 3.75 0 0 0 12 2.25 3.75 3.75 0 0 0 8.25 6v1.5m7.5 0a3 3 0 0 1 3 3V21h-15V10.5a3 3 0 0 1 3-3"
        />
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