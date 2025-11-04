"use client";
import { lazy, memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useVehicle } from "../context/VehicleContext";
import Image from "next/image";

const VehicleCard = lazy(() => import("./components/VehicleCard"));

const Vehicles = memo(function () {
  const [perPage, setPerPage] = useState(2);
  const { vehicles } = useVehicle();

  useEffect(() => {
    const updatePerPage = () => {
      const width = window.innerWidth;
      if (width < 640) setPerPage(1);
      else if (width < 1024) setPerPage(2);
      else setPerPage(3);
    };
    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  const checkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6 text-warning shrink-0"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  );

  const items = [
    "Taxes and Tolls",
    "Flight Monitoring",
    "Waiting Time and Parking",
    "Free Amendments",
    "Free Cancellations",
  ];

  return (
    <motion.section
      id="vehicles"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      className="h-fit mt-16 px-2 pb-8 flex flex-col lg:p-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto gap-6"
    >
      {/* === Title === */}
      <motion.figure
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col gap-2.5 text-center lg:text-left"
      >
        <figcaption className="text-xl title lg:text-2xl text-warning font-bold font-heading leading-tight">
          Our Vehicles
        </figcaption>
        <h1 className="text-2xl lg:text-4xl font-bold opacity-85">
          Maximum Comfort and Safety for Your Trip
        </h1>
        <h2 className="text-xl font-medium opacity-70">
          Licensed vehicles, professional drivers
        </h2>
      </motion.figure>

      {/* === Slider (Splide) === */}
      {typeof window !== "undefined" && (
        <Splide
          aria-label="Vehicle Carousel"
          className="overflow-hidden"
          options={{
            type: "loop",
            gap: "1rem",
            autoplay: true,
            width: "100%",
            pauseOnHover: true,
            perPage,
            speed: 800,
            rewind: true,
            rewindSpeed: 1000,
          }}
        >
          {vehicles?.map((vehicle, index) => (
            <SplideSlide key={index}>
              <VehicleCard
                img={vehicle.image_url}
                text={vehicle.name}
                personCount={vehicle.capacity_person}
                bagsCount={vehicle.capacity_bags}
                specs={vehicle.features}
                base_price={vehicle.base_price}
              />
            </SplideSlide>
          ))}
        </Splide>
      )}

      {/* === Price Section === */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="bg-white rounded-box p-5 shadow-md border border-base-300"
      >
        <h2 className="text-2xl my-2 title font-semibold">Prices Include</h2>
        <ul className="flex flex-col justify-between gap-2 text-base opacity-80">
          {items.map((text) => (
            <li key={text} className="flex items-center gap-3">
              {checkIcon}
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* === Jet & Helicopter Section === */}
      <motion.figure
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col text-center w-full mt-8 lg:mt-20 gap-5 h-fit"
      >
        <figcaption className="text-2xl lg:text-4xl font-bold opacity-85">
          A SOLUTION FOR EVERY DESTINATION
        </figcaption>
        <h2 className="text-xl font-medium opacity-70">
          Discover our private Jet and Helicopter choices.
        </h2>

        <Image
          src="/images/helicopter-jet.webp"
          alt="Helicopter and Jet"
          width={1920}
          height={1080}
          loading="lazy"
          className="w-full h-56 sm:h-72 md:h-80 lg:h-96 rounded-lg object-cover"
        />

        {/* === Private Jet === */}
        <div className="collapse collapse-plus bg-base-200 rounded-box shadow-sm">
          <input type="checkbox" />
          <div className="collapse-title text-lg lg:text-xl font-semibold">
            Private Jet
          </div>
          <div className="collapse-content">
            <Image
              src="/images/private-jet.webp"
              alt="Private Jet"
              width={1920}
              height={1080}
              loading="lazy"
              className="h-56 sm:h-72 md:h-80 lg:h-96 w-full rounded-lg object-cover mb-4"
            />
            <p className="text-base lg:text-lg opacity-80 leading-relaxed text-left">
              Enjoy exclusive jet transfers for a VIP experience. Available at
              Istanbul, Sabiha Gökçen, Dalaman, Bodrum, İzmir, and Antalya
              Airports. Contact us via WhatsApp for pricing and booking.
            </p>
          </div>
        </div>

        {/* === Private Helicopter === */}
        <div className="collapse collapse-plus bg-base-200 rounded-box shadow-sm">
          <input type="checkbox" />
          <div className="collapse-title text-lg lg:text-xl font-semibold">
            Private Helicopter
          </div>
          <div className="collapse-content">
            <Image
              src="/images/helicopter.webp"
              alt="Private Helicopter"
              width={1920}
              height={1080}
              loading="lazy"
              className="h-56 sm:h-72 md:h-80 lg:h-96 w-full rounded-lg object-cover mb-4"
            />
            <p className="text-base lg:text-lg opacity-80 leading-relaxed text-left">
              Enjoy exclusive helicopter transfers for a VIP experience.
              Available at Istanbul, Sabiha Gökçen, Dalaman, Bodrum, İzmir, and
              Antalya Airports. Contact us via WhatsApp for pricing and booking.
            </p>
          </div>
        </div>
      </motion.figure>
    </motion.section>
  );
});

export default Vehicles;