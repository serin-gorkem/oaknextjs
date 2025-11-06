"use client";
import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const VehicleCard = memo(function (props: {
  img: string;
  text: string;
  personCount: number;
  bagsCount: number;
  specs: string[];
  base_price: string | number;
}) {
  const [details, setDetails] = useState(false);

  function toggleDetails() {
    setDetails((prev) => !prev);
  }

  return (
    <motion.article
      className="relative w-full h-[45rem] perspective bg-transparent"
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: details ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* FRONT */}
        <FrontFace
          showDetails={toggleDetails}
          img={props.img}
          text={props.text}
          specs={props.specs}
          basePrice={props.base_price}
        />

        {/* BACK */}
        <BackFace
          showDetails={toggleDetails}
          img={props.img}
          text={props.text}
          personCount={props.personCount}
          bagsCount={props.bagsCount}
          specs={props.specs}
          basePrice={props.base_price}
        />
      </motion.div>
    </motion.article>
  );
});

type BackFaceProps = {
  showDetails: () => void;
  img: string;
  text: string;
  personCount: number;
  bagsCount: number;
  specs: string[];
  basePrice: string | number;
};

function BackFace(props: BackFaceProps) {
  return (
    <motion.figure
      className="absolute inset-0 backface-hidden bg-base-300 rounded-box shadow-md p-6 flex flex-col gap-4"
      style={{ transform: "rotateY(180deg)" }}
    >
      <figcaption
        onClick={props.showDetails}
        className="cursor-pointer text-warning font-bold self-end"
      >
        ✕
      </figcaption>

      <h1 className="text-2xl font-heading font-normal">Vehicle Features</h1>
      <div className="flex gap-3 items-center">
        <span className="text-warning">👤</span>
        <p>{props.personCount} person</p>
        <span className="text-warning">🧳</span>
        <p>{props.bagsCount} bag</p>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        {props.specs.map((s, i) => (
          <div key={i} className="flex gap-2 items-center">
            <span className="text-warning">✔</span>
            <p>{s}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 text-warning font-black">{props.basePrice}</p>
      <div className="flex gap-4 mt-auto">
        <a href="/book" className="btn btn-warning text-base-100 w-1/2">
          Go to booking
        </a>
        <button
          onClick={props.showDetails}
          className="btn btn-primary text-base-100 w-1/2"
        >
          Return
        </button>
      </div>
    </motion.figure>
  );
}

type FrontFaceProps = {
  showDetails: () => void;
  img: string;
  text: string;
  specs: string[];
  basePrice: string | number;
};

function FrontFace(props: FrontFaceProps) {
  return (
    <motion.figure
      className="absolute inset-0 backface-hidden bg-base-300 rounded-box shadow-md p-6 flex flex-col gap-4"
      style={{ transform: "rotateY(0deg)" }}
    >
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
      <div className="flex flex-col gap-2">
        {props.specs.map((spec, i) => (
          <div key={i} className="flex gap-2 items-center">
            <span className="text-warning">✔</span>
            <p>{spec}</p>
          </div>
        ))}
      </div>
      <button
        onClick={props.showDetails}
        className="btn btn-warning text-base-100 mt-auto"
      >
        All Features
      </button>
    </motion.figure>
  );
}

export default VehicleCard;