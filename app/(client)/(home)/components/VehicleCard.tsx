"use client";
import Image from "next/image";
import { memo, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.42, 0, 0.58, 1] as const;

const VehicleCard = memo(function (props: {
  img: string;
  text: string;
  personCount: number;
  bagsCount: number;
  specs: string[];
  base_price: string | number;
}) {
  const [details, setDetails] = useState(false);
  const [height, setHeight] = useState<number>(420);

  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  // ✅ Stabil height ölçümü (Splide uyumlu)
  useLayoutEffect(() => {
    const measure = () => {
      const fh = frontRef.current?.scrollHeight ?? 0;
      const bh = backRef.current?.scrollHeight ?? 0;
      const max = Math.max(fh, bh);
      if (max && max !== height) setHeight(max);
    };
    measure();

    const resize = new ResizeObserver(measure);
    if (frontRef.current) resize.observe(frontRef.current);
    if (backRef.current) resize.observe(backRef.current);

    return () => resize.disconnect();
  }, [height]);

  return (
    <article className="bg-white rounded-box shadow-md flex flex-col w-full p-6">
      <motion.div
        animate={{ rotateY: details ? 180 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative w-full"
        style={{
          height,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
      >
        {/* Ön yüz */}
        <div
          ref={frontRef}
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
        >
          <FrontFace
            showDetails={() => setDetails(true)}
            img={props.img}
            text={props.text}
            specs={props.specs}
            basePrice={props.base_price}
          />
        </div>

        {/* Arka yüz */}
        <div
          ref={backRef}
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <BackFace
            showDetails={() => setDetails(false)}
            text={props.text}
            personCount={props.personCount}
            bagsCount={props.bagsCount}
            specs={props.specs}
            basePrice={props.base_price}
          />
        </div>
      </motion.div>
    </article>
  );
});

function BackFace(props: {
  showDetails: () => void;
  text: string;
  personCount: number;
  bagsCount: number;
  specs: string[];
  basePrice: string | number;
}) {
  return (
    <figure className="flex relative h-fit flex-col justify-center gap-4">
      <figcaption
        onClick={props.showDetails}
        className="cursor-pointer text-base absolute text-warning -top-2 right-0 font-bold"
      >
        Exit
      </figcaption>
      <h1 className="text-2xl font-heading font-normal">{props.text}</h1>

      <div className="flex gap-2">
        <IconUser /> <p>{props.personCount} person</p>
        <IconBag /> <p>{props.bagsCount} bag</p>
      </div>

      <hr />
      <div className="flex flex-col flex-wrap gap-2 ">
        {props.specs.map((spec, i) => (
          <Spec key={i} text={spec} />
        ))}
      </div>

      <p>
        <span className="text-warning font-black pr-2">{props.basePrice}</span>
      </p>
      <hr />

      <div className="flex gap-4">
        <button
          aria-label="Go to booking button"
          className="btn btn-warning text-base-100 w-1/3 h-12"
        >
          <a href="/book" className="w-full">
            Go to booking
          </a>
        </button>
        <button
          aria-label="Return button"
          className="btn btn-primary text-base-100 w-1/3 h-12"
          onClick={props.showDetails}
        >
          Return
        </button>
      </div>
    </figure>
  );
}

function FrontFace(props: {
  showDetails: () => void;
  img: string;
  text: string;
  specs: string[];
  basePrice: string | number;
}) {
  return (
    <figure className="flex relative h-fit flex-col justify-center gap-4">
      <Image
        src={props.img}
        width={1920}
        height={1080}
        loading="lazy"
        alt="vehicle image"
        className="mt-3 w-full h-48 object-contain"
      />
      <h1 className="text-2xl font-heading font-bold">{props.text}</h1>
      <p className="text-warning font-black">{props.basePrice}</p>
      <p className="text-warning font-black">Door-to-door</p>
      <hr />
      <div className="flex flex-col flex-wrap gap-2 ">
        {props.specs.map((spec, i) => (
          <Spec key={i} text={spec} />
        ))}
      </div>
      <button
        aria-label="Show vehicle features"
        className="btn btn-warning text-base-100 w-5/8 h-12"
        onClick={props.showDetails}
      >
        All Features
      </button>
    </figure>
  );
}

function Spec({ text }: { text: string }) {
  return (
    <div className="flex gap-2 w-fit">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="oklch(59.27% 0.2264 26.75)"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <p>{text}</p>
    </div>
  );
}

function IconUser() {
  return (
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
        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      />
    </svg>
  );
}

function IconBag() {
  return (
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
        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
}

export default VehicleCard;