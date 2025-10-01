import Image from "next/image";
import { memo, useState } from "react";

const VehicleCard = memo(function (props: {
  img: string;
  text: string;
  personCount: number;
  bagsCount: number;
  specs: string[];
  base_price: number;
}) {
  const [details, setDetails] = useState(false);

  function showDetails() {
    setDetails(!details);
  }

  return (
    <article className="bg-base-300 rounded-box shadow-md h-fit flex md:flex-1/3 lg:flex-1/4 w-full flex-col p-6 ">
      {!details ? (
        <FrontFace
          showDetails={showDetails}
          img={props.img}
          text={props.text}
          personCount={props.personCount}
          bagsCount={props.bagsCount}
          basePrice={props.base_price}
        />
      ) : (
        <BackFace
          showDetails={showDetails}
          img={props.img}
          text={props.text}
          personCount={props.personCount}
          bagsCount={props.bagsCount}
          specs={props.specs}
          basePrice={props.base_price}
        />
      )}
    </article>
  );
});

type BackFaceProps = {
  showDetails: () => void;
  img: string;
  text: string;
  personCount: number;
  bagsCount: number;
  specs: string[];
  basePrice: number;
};

function BackFace(props: BackFaceProps) {
  const specsList = props.specs.map((spec, index) => {
    return (
      <div className="flex gap-2 w-fit" key={index}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke=" oklch(59.27% 0.2264 26.75)"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <p>{spec}</p>
      </div>
    );
  });
  return (
    <figure className="flex relative h-fit flex-col justify-center gap-4">
      <figcaption
        onClick={props.showDetails}
        className="cursor-pointer text-xs absolute text-warning -top-2 right-0 font-bold"
      >
        Exit
      </figcaption>
      <h1 className="text-2xl font-heading font-normal">Vehicle Features</h1>
      <div className="flex gap-2">
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
        <p>{props.personCount} person</p>
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
        <p>{props.bagsCount} bag</p>
      </div>
      <hr></hr>
      <div className="flex flex-col flex-wrap gap-2 ">{specsList}</div>
      <p>
        <span className="text-warning font-black pr-2">{props.basePrice} $</span>
        with prices starting
      </p>
      <hr></hr>
      <button
        aria-label="Go to booking button"
        className="btn btn-warning text-base-100 w-5/8 h-12"
      >
        Go to booking
      </button>
    </figure>
  );
}

type FrontFaceProps = {
  showDetails: () => void;
  img: string;
  text: string;
  personCount: number;
  bagsCount: number;
  basePrice: number;
};

function FrontFace(props: FrontFaceProps) {
  return (
    <figure className="flex relative h-96 flex-col justify-center gap-2">
      <figcaption
        onClick={props.showDetails}
        className="cursor-pointer text-xs absolute text-warning -top-2 right-0 font-bold"
      >
        All features
      </figcaption>
      <Image
        src={props.img}
        width={200}
        height={200}
        loading="lazy"
        alt="vehicle image"
        className=" mt-3 w-full h-48 object-contain"
      /> 
      <h1 className="text-2xl font-heading font-bold">{props.text}</h1>
      <div className="flex gap-2">
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
        <p>{props.personCount} person</p>
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
        <p>{props.bagsCount} bag</p>
      </div>
      <p>
        Starting from
        <span className="text-warning font-black pr-2"> {props.basePrice} $</span>
      </p>
      <hr></hr>
    </figure>
  );
}

export default VehicleCard;
