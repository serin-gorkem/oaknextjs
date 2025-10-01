"use client";
import { lazy, memo, useEffect, useState } from "react";

const VehicleCard = lazy(() => import("./components/VehicleCard"));

import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useCurrency } from "../context/CurrencyContext";
import { useVehicle } from "../context/VehicleContext";


const Vehicles = memo(function () {
  const [perPage, setPerPage] = useState(2);
  const [carouselHeight, setCarouselHeight] = useState("25rem");
  type Vehicle = {
    id: number;
    name: string;
    image_url: string;
    capacity_person: number;
    capacity_bags: number;
    features: string[];
    base_price: number;
  };
  const {vehicles} = useVehicle();
  
  useEffect(() => {
    const updatePerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPerPage(1); // mobile: <640px
        setCarouselHeight("100%");
      } else if (width < 1024) {
        setPerPage(2); // tablet: 640px–1023px
        setCarouselHeight("100%");
      } else {
        setPerPage(3); // desktop: >=1024px
        setCarouselHeight("100%");
      }
    };
    updatePerPage(); // Run once on mount
    window.addEventListener("resize", updatePerPage);

    return () => {
      window.removeEventListener("resize", updatePerPage);
    };
  }, []);


  return (
    <>
      <section
        id="vehicles"
        className="h-fit mt-16 px-2 pb-8 flex flex-col lg:p-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto flex-wrap gap-4"
      >
        <figure className="flex flex-col gap-2.5 h-fit">
          <figcaption className="text-xl lg:text-2xl text-warning font-bold font-heading leading-tight">
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
          aria-label="My Favorite Images"
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
            height: carouselHeight,
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
                base_price = {vehicle.base_price}
              />
            </SplideSlide>
          ))}
        </Splide>
      </section>
    </>
  );
});

export default Vehicles;
