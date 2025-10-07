
import Stars from "./components/Stars";
import Form from "./components/Form";
import CurrencyWrapper from "../components/CurrencyWrapper";
import Image from "next/image";

export default function Home() {
  return (
    <section
      id="home"
      className="h-fit flex flex-col relative sm:gap-5 lg:gap-10"
    >
      <Image
        src="/images/Background.webp"
        width={2048}
        height={1556}
        className="object-center object-cover absolute w-full h-full brightness-20"
        alt="backgroundImage"
      />
      <article
        id="above-the-fold"
        className="p-2 md:px-4 my-24 sm:my-48 lg:px-0 flex flex-col justify-between lg:flex-row gap-4 z-10 xl:max-w-9/12 lg:max-w-11/12 mx-auto"
      >

        <div className="flex flex-col gap-4">
          <h1 className="title font-bold tracking-tight leading-snug text-2xl sm:w-full lg:leading-tight md:w-full lg:w-fit xl:w-9/12 sm:text-4xl xl:text-5xl text-base-100">
            Reliable <span className=" text-warning ">Airport Travels. </span>
            Travel with Confidence and Luxury at Great Prices.
          </h1>
          <h2 className="font-paragraph xl:pb-8 text-xs font-light text-white opacity-80 sm:w-full md:w-full sm:text-sm  xl:text-xl xl:w-8/12 w-fit leading-relaxed tracking-tighter">
            At Airport to Hotels, we specialize in providing seamless, reliable, and comfortable transfers directly from airports to your hotel. Our mission is to make your arrival and departure effortless, allowing you to start and end your trip with ease.
          </h2>
          <button
            aria-label="How to book your ride page navigator button"
            className="btn btn-md lg:btn-lg hover:bg-primary hover:border-primary hover:shadow-none hover:text-base-100 w-fit font-paragraph font-light self-baseline"
          >
            How to book your ride
          </button>
        </div>
                <div className="relative sm:max-w-96 h-fit w-full">
          <CurrencyWrapper>
            <Form/>
          </CurrencyWrapper>
          <div className="absolute bg-base-300 rounded-box shadow-xl h-16 w-10/12 left-1/2 -translate-x-1/2 -bottom-13 pt-2 px-2 -z-10 flex justify-between items-center">
            <img
              src="/images/Tripadvisor-Logo.webp"
              alt="tripadvisor logo"
              loading="lazy"
              width={64}
              height={64}
              className="w-1/2 bg-cover bg-center"
            ></img>
            <div className="flex">
              <Stars starCount={5} />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
