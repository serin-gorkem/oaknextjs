import { memo } from "react";
import Image from "next/image";

const About = memo(function () {
  return (
    <section
      id="about"
      className="relative w-full h-[40rem] xl:max-w-9/12 lg:max-w-11/12 lg:mx-auto"
    >
      <Image
        src="/images/about.webp"
        alt="About Us"
        fill
        className="rounded-box object-cover -z-5"
      ></Image>
      <div className="lg:p-16 p-4 max-w-2xl">
        <div className="bg-base-300 z-100 lg:h-[33rem] lg:w-[60rem] rounded-[10px] p-4 lg:p-8 opacity-90">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2"> 
            <p className="text-xl title lg:text-xl text-warning font-bold leading-tight">
              About Us
            </p>
            <h1 className="text-3xl lg:text-6xl w-5/6 leading-tight ">
              We are <br></br> Airport to Hotels
            </h1>

            </div>
            <p className="text-base lg:text-xl opacity-85 w-5/6 leading-tight" >
              At Airport to Hotels, we specialize in providing seamless, reliable, and comfortable transfers directly from airports to your hotel. Our mission is to make your arrival and departure effortless, allowing you to start and end your trip with ease. 
            </p>
          <button
            aria-label="Book now button"
            className="btn w-48 h-12 bg-primary text-white hover:bg-warning hover:border-warning hover:shadow-none hover:text-base-100"
          >
            <a href="/about" className="w-full" aria-label="Go to book now.">
            Learn More
            </a>
          </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
