"use client";
import { lazy, memo, useEffect, useState } from "react";

const VehicleCard = lazy(() => import("./VehicleCard"));

import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const Vehicles = memo(function () {
  const [ perPage, setPerPage ] = useState( 2 );
  const [ carouselHeight, setCarouselHeight ] = useState( '25rem' );

  useEffect(() => {
    const updatePerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPerPage(1); // mobile: <640px
        setCarouselHeight( '28rem' );
      } else if (width < 1024) {
        setPerPage(2); // tablet: 640px–1023px
        setCarouselHeight( '30rem' );
      } else {
        setPerPage(3); // desktop: >=1024px
        setCarouselHeight( '27rem' );
      }
    };

    updatePerPage(); // Run once on mount
    window.addEventListener("resize", updatePerPage);

    return () => {
      window.removeEventListener("resize", updatePerPage);
    };
  }, []);
  const vehicleList = [
    {
      img: "/images/vito.webp",
      text: "Mercedes Vito",
      personCount: "7 Person",
      bagsCount: "6 bags",
      specs: [
        "Airport Service",
        "Flight Tracker",
        "Disinfection",
        "Door To Door",
        "No Hidden Costs",
      ],
    },
    {
      img: "/images/vito.webp",
      text: "Mercedes Vito",
      personCount: "7 Person",
      bagsCount: "6 bags",
      specs: [
        "Airport Service",
        "Flight Tracker",
        "Disinfection",
        "Door To Door",
        "No Hidden Costs",
      ],
    },
    {
      img: "/images/vito.webp",
      text: "Mercedes Vito",
      personCount: "7 Person",
      bagsCount: "6 bags",
      specs: [
        "Airport Service",
        "Flight Tracker",
        "Disinfection",
        "Door To Door",
        "No Hidden Costs",
      ],
    },
    {
      img: "/images/vito.webp",
      text: "Mercedes Vito",
      personCount: "7 Person",
      bagsCount: "6 bags",
      specs: [
        "Airport Service",
        "Flight Tracker",
        "Disinfection",
        "Door To Door",
        "No Hidden Costs",
      ],
    },
    {
      img: "/images/vito.webp",
      text: "Mercedes Vito",
      personCount: "7 Person",
      bagsCount: "6 bags",
      specs: [
        "Airport Service",
        "Flight Tracker",
        "Disinfection",
        "Door To Door",
        "No Hidden Costs",
      ],
    },
  ];
  

  return (
    <>
      <section
        id="vehicles"
        className="h-fit mt-16 px-2 pb-8 flex flex-col lg:p-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto flex-wrap gap-4"
      >
        <figure className="flex flex-col gap-2.5">
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
            rewind      : true,
            rewindByDrag: true,
            rewindSpeed: 1000,
            height: carouselHeight,
          }}
        >
          {vehicleList.map((vehicle, index) => (
            <SplideSlide key={index}>
              <VehicleCard
                img={vehicle.img}
                text={vehicle.text}
                personCount={vehicle.personCount}
                bagsCount={vehicle.bagsCount}
                specs={vehicle.specs}
              />
            </SplideSlide>
          ))}
        </Splide>
      </section>
    </>
  );
});


export default Vehicles;
