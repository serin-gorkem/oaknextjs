"use client";

import { lazy, memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import { useVehicle } from "../context/VehicleContext";

// === Lazy Import ===
const VehicleCard = lazy(() => import("./components/VehicleCard"));

const Vehicles = memo(function Vehicles() {
  const [perPage, setPerPage] = useState(2);
  const { vehicles } = useVehicle();

  // === Responsive perPage setting ===
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setPerPage(1);
      else if (width < 1024) setPerPage(2);
      else setPerPage(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // === Check Icon ===
  const CheckIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6 text-warning"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  );

  const includedItems = [
    "Taxes and Tolls",
    "Flight Monitoring",
    "Waiting Time and Parking",
    "Free Amendments",
    "Free Cancellations",
  ];

  return (
    <motion.section
      id="vehicles"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="h-fit my-16 px-2 pb-8 flex flex-col xl:max-w-6xl lg:max-w-5xl mx-auto gap-10"
    >
      {/* === Section Header === */}
      <header className="flex flex-col gap-2 text-center lg:text-left">
        <h2 className="text-xl lg:text-2xl text-warning font-bold uppercase">
          Our Vehicles
        </h2>
        <h3 className="text-2xl lg:text-4xl font-bold text-base-content/90">
          Maximum Comfort and Safety for Your Trip
        </h3>
        <p className="text-lg font-medium text-base-content/70">
          Licensed vehicles, professional drivers.
        </p>
      </header>

      {/* === Vehicle Carousel === */}
      <Splide
        aria-label="Vehicle Carousel"
        options={{
          type: "loop",
          gap: "1rem",
          autoplay: true,
          interval: 5000,
          pauseOnHover: true,
          perPage,
          speed: 800,
          rewind: true,
          pagination: true,
          drag: "free",
        }}
        className="overflow-hidden pb-12"
      >
        {vehicles?.map((vehicle) => (
          <SplideSlide key={vehicle.id ?? vehicle.name}>
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

      {/* === Price Includes Section === */}
      <div className="bg-white rounded-box p-6 shadow-sm">
        <h4 className="text-2xl mb-3 font-semibold text-base-content">
          Prices Include
        </h4>
        <ul className="flex flex-col gap-2 text-base text-base-content/80">
          {includedItems.map((text) => (
            <li key={text} className="flex items-center gap-2">
              {CheckIcon}
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* === Jet & Helicopter Section === */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center text-center gap-8 mt-8 lg:mt-24"
      >
        <header>
          <h3 className="text-3xl lg:text-4xl font-bold text-base-content/90">
            A Solution for Every Destination
          </h3>
          <p className="text-lg font-medium text-base-content/70">
            Discover our private Jet and Helicopter options.
          </p>
        </header>

        <Image
          src="/images/helicopter-jet.webp"
          alt="Helicopter and Jet view"
          width={1920}
          height={1080}
          loading="lazy"
          className="w-full h-96 rounded-lg object-cover"
        />

        {/* === Private Jet Section === */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <Image
            src="/images/private-jet.webp"
            alt="Private Jet"
            width={1920}
            height={1080}
            loading="lazy"
            className="h-96 lg:w-1/2 rounded-lg object-cover"
          />
          <div className="flex flex-col gap-3 text-left lg:w-1/2">
            <h4 className="text-2xl lg:text-3xl font-bold text-base-content/90">
              Private Jet
            </h4>
            <p className="text-lg text-base-content/70 leading-relaxed lg:w-10/12">
              Experience true exclusivity with our private jet transfers,
              available from Istanbul, Sabiha Gökçen, Dalaman, Bodrum, İzmir,
              and Antalya Airports. Contact us via WhatsApp for pricing and
              availability.
            </p>
          </div>
        </div>

        {/* === Private Helicopter Section === */}
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-3 text-left lg:w-1/2">
            <h4 className="text-2xl lg:text-3xl font-bold text-base-content/90">
              Private Helicopter
            </h4>
            <p className="text-lg text-base-content/70 leading-relaxed lg:w-10/12">
              Enjoy breathtaking aerial transfers for a VIP experience.
              Available at Istanbul, Sabiha Gökçen, Dalaman, Bodrum, İzmir, and
              Antalya Airports. Contact us via WhatsApp for charter options.
            </p>
          </div>
          <Image
            src="/images/helicopter.webp"
            alt="Private Helicopter"
            width={1920}
            height={1080}
            loading="lazy"
            className="h-96 lg:w-1/2 rounded-lg object-cover"
          />
        </div>
      </motion.section>
    </motion.section>
  );
});

export default Vehicles;