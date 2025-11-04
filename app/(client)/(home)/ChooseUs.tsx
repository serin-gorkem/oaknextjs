"use client";
import { lazy, memo } from "react";
import { motion } from "framer-motion";

const SpecsCard = lazy(() => import("./components/SpecsCard"));

const ChooseUs = memo(function () {
  const cardsList = cardInfo.map((card) => (
    <motion.div
      key={card.id}
      variants={cardVariant}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <SpecsCard title={card.title} image={card.image} text={card.text} />
    </motion.div>
  ));

  const features = [
    { title: "Excellent reputation", icon: icons.star },
    { title: "No credit card fees", icon: icons.card },
    { title: "Tolls and gratuities included", icon: icons.plus },
    { title: "Free cancellation", icon: icons.cancel },
    { title: "Professional drivers", icon: icons.driver },
  ];

  return (
    <motion.section
      id="us"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={sectionVariant}
      className="h-fit mt-16 px-2 pb-8 flex flex-col lg:p-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto gap-4"
    >
      {/* Başlık */}
      <motion.figure
        variants={fadeUp}
        className="flex flex-col gap-2.5 text-center lg:text-left"
      >
        <figcaption className="text-xl title lg:text-2xl text-warning font-bold font-heading leading-tight">
          Why Choose Us
        </figcaption>
        <h1 className="text-2xl lg:text-4xl font-bold opacity-85">
          Service Tailored to You
        </h1>
      </motion.figure>

      {/* Kartlar */}
      <motion.div
        variants={cardsContainer}
        className="
          grid 
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
          place-items-center
        "
      >
        {cardsList}
      </motion.div>

      {/* Alt Bölüm */}
      <motion.article
        variants={fadeUp}
        className="flex flex-col lg:flex-row gap-8 justify-between"
      >
        <motion.figure
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="border-[0.5px] bg-white lg:w-4/12 border-gray-500 rounded-box p-4"
        >
          <figcaption className="text-xl lg:text-2xl mb-4 font-bold opacity-85">
            Why book with us
          </figcaption>
          <ul className="flex flex-col gap-2 text-base">
            {features.map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ x: 4, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-4"
              >
                {item.icon}
                {item.title}
              </motion.li>
            ))}
          </ul>
        </motion.figure>

        <motion.figure
          variants={fadeUp}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="py-10 bg-white flex flex-col justify-between border-[0.5px] border-gray-500 rounded-box p-4"
        >
          <p>- Private, door-to-door transfer service.</p>
          <p>
            - Exact meeting point information and emergency contact details will
            be provided in the confirmation email.
          </p>
          <p>
            - Vehicle may be upgraded to one with higher capacity, or more than
            one vehicle may be used depending on availability.
          </p>
          <p>- Flight monitoring and up to 1 hour of waiting time included.</p>
        </motion.figure>
      </motion.article>
    </motion.section>
  );
});

export default ChooseUs;

//
// === Animasyon Variantları ===
//
const sectionVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 },
  },
};

const cardsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariant = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

//
// === İkonlar ===
//
const icons = {
  star: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8 text-warning"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282"
      />
    </svg>
  ),
  card: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8 text-warning"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
      />
    </svg>
  ),
  plus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8 text-warning"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8.25v7.5m3.75-3.75h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  ),
  cancel: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8 text-warning"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  ),
  driver: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8 text-warning"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 7.5V6A3.75 3.75 0 0 0 12 2.25 3.75 3.75 0 0 0 8.25 6v1.5m7.5 0a3 3 0 0 1 3 3V21h-15V10.5a3 3 0 0 1 3-3m9 0H8.25"
      />
    </svg>
  ),
};

//
// === Kart Bilgileri ===
//
const cardInfo = [
  {
    id: "0",
    title: "Reliable & Punctual Transfers",
    text: "We understand how important it is to be on time, especially when catching a flight. Our service ensures you’re always on schedule, whether you’re heading to the airport or arriving at your destination. With Airport to Hotels, you can trust that your transfer will be timely and stress-free.",
    image: "/images/choose/1.webp",
  },
  {
    id: "1",
    title: "Comfort & Safety Guaranteed",
    text: "Travel with peace of mind in our fleet of luxury, business, and economy vehicles. Each car is carefully maintained to ensure maximum comfort and safety. We prioritize your well-being, so you can sit back and relax, knowing you’re in good hands.",
    image: "/images/choose/2.webp",
  },
  {
    id: "2",
    title: "Clear & Transparent Pricing",
    text: "Say goodbye to hidden fees. At Airport to Hotels, we believe in honesty and transparency. Our affordable pricing is clear from the start, so you’ll always know what to expect. No surprises, just quality service at the best value.",
    image: "/images/choose/3.webp",
  },
];