"use client";
import { lazy, memo, useEffect, useState } from "react";

const VehicleCard = lazy(() => import("./components/VehicleCard"));

import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useVehicle } from "../context/VehicleContext";
import Image from "next/image";

const Vehicles = memo(function () {
  const [perPage, setPerPage] = useState(2);
  type Vehicle = {
    id: number;
    name: string;
    image_url: string;
    capacity_person: number;
    capacity_bags: number;
    features: string[];
    base_price: number;
  };
  const { vehicles } = useVehicle();

  useEffect(() => {
    const updatePerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPerPage(1); // mobile: <640px
      } else if (width < 1024) {
        setPerPage(2); // tablet: 640px–1023px
      } else {
        setPerPage(3); // desktop: >=1024px
      }
    };
    updatePerPage(); // Run once on mount
    window.addEventListener("resize", updatePerPage);

    return () => {
      window.removeEventListener("resize", updatePerPage);
    };
  }, []);

const checkIcon = (
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

const items = [
  "Taxes and Tolls",
  "Flight Monitoring",
  "Waiting Time and Parking",
  "Free Amendments",
  "Free Cancellations",
];


  return (
    <>
      <section
        id="vehicles"
        className="h-fit mt-16 px-2 pb-8 flex flex-col lg:p-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto flex-wrap gap-4"
      >
        <figure className="flex flex-col gap-2.5 h-fit">
          <figcaption className="text-xl title lg:text-2xl text-warning font-bold font-heading leading-tight">
            Our Vehicles
          </figcaption>
          <h1 className="text-2xl lg:text-4xl font-bold opacity-85">
            Maximum Confort and safety for your trip
          </h1>
          <h2 className=" text-xl font-medium opacity-70">
            Licensed vehicles, professional drivers
          </h2>
        </figure>

        <Splide
          aria-label="Vehicle Carousel"
          className="overflow-hidden"
          options={{
            type: "loop",
            gap: "1rem",
            autoplay: true,
            width: "100%",
            pauseOnHover: true,
            resetProgress: false,
            perPage,
            speed: 800,
            rewind: true,
            rewindByDrag: true,
            rewindSpeed: 1000,
            height: "100%",
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
        <div className="bg-white  rounded-box p-4">
          <h2 className="text-2xl my-2 title">Prices Include</h2>
          <ul className="flex flex-col justify-between gap-2 text-base opacity-80">
            {items.map((text) => (
              <li key={text} className="flex items-center gap-2">
                {checkIcon}
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Helicopter and Jet Section.  */}
        <figure className="flex flex-col text-center w-full mt-8 lg:mt-24 gap-5 h-fit">
          <figcaption className="text-2xl lg:text-4xl font-bold opacity-85">
            A SOLUTION FOR EVERY DESTINATION
          </figcaption>
          <h2 className=" text-xl font-medium opacity-70">
            Discover our private Jet and Helicopter choices.
          </h2>
          <Image
            src="/images/helicopter-jet.webp"
            alt="Helicopter and Jet"
            width={1920}
            height={1080}
            className="w-full h-96 rounded-lg object-cover"
            priority
          ></Image>
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="flex flex-col gap-8 lg:flex-row justify-between ">
              <Image
                src="/images/private-jet.webp"
                alt="Private Jet"
                width={1920}
                height={1080}
                className="h-96 lg:w-1/2 rounded-lg object-cover"
                priority
              ></Image>
              <div className="text-left flex lg:w-1/2 flex-col gap-2.5 lg:pl-2">
                <h3 className="text-2xl lg:text-4xl font-bold opacity-85">
                  Private Jet
                </h3>
                <p className="text-xl font-medium opacity-70 lg:w-10/12">
                  Enjoy exclusive helicopter transfers for a VIP experience.
                  Available at Istanbul, Sabiha Gökçen, Dalaman, Bodrum, İzmir,
                  and Antalya Airports. Contact us via WhatsApp for pricing and
                  booking.
                </p>
              </div>
            </div>
            <div></div>
          </div>
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="flex flex-col-reverse gap-8 lg:flex-row justify-between ">
              <div className="text-left flex lg:w-1/2 flex-col gap-2.5 lg:pr-2">
                <h3 className="text-2xl lg:text-4xl font-bold opacity-85">
                  Private Helicopter
                </h3>
                <p className="text-xl font-medium opacity-70 lg:w-10/12">
                  Enjoy exclusive helicopter transfers for a VIP experience.
                  Available at Istanbul, Sabiha Gökçen, Dalaman, Bodrum, İzmir,
                  and Antalya Airports. Contact us via WhatsApp for pricing and
                  booking.
                </p>
              </div>
              <Image
                src="/images/helicopter.webp"
                alt="Private Jet"
                width={1920}
                height={1080}
                className="h-96 lg:w-1/2 rounded-lg object-cover "
                priority
              ></Image>
            </div>
            <div></div>
          </div>
        </figure>
      </section>
    </>
  );
});

export default Vehicles;
