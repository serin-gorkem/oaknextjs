import { memo } from "react";
import Image from "next/image";

const About = memo(function () {
  return (
    <section
      id="about"
      className="p-2 md:px-4 lg:px-0 flex flex-col gap-8 z-10 xl:max-w-9/12 lg:max-w-11/12 mx-auto"
    >
      <figure className="flex flex-col gap-2.5">
        <figcaption className="text-xl text-warning lg:text-2xl font-black font-heading leading-tight">
          About Us
        </figcaption>
        <h1 className="text-2xl lg:text-4xl font-bold opacity-85">
          Who we are ?
        </h1>
      </figure>
      <figure className="flex lg:flex-row flex-col gap-4">
        <Image
          src="/images/Team.webp"
          width={1000}
          height={1000}
          className="w-full lg:w-1/2 h-auto object-cover rounded-lg"
          alt="team image"
        ></Image>
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl lg:text-4xl">We are Airport to Hotels</h2>
          <p className="text-xs font-normal text-primary xl:text-xl leading-relaxed tracking-tighter">
            At Airport to Hotels, we specialize in providing seamless, reliable,
            and comfortable transfers directly from airports to your hotel. Our
            mission is to make your arrival and departure effortless, allowing
            you to start and end your trip with ease.
          </p>
          <p className="text-xs font-normal text-primary xl:text-xl leading-relaxed tracking-tighter">
            Our team of licensed and trained professionals is dedicated to
            ensuring safety, punctuality, and customer satisfaction. We operate
            with a modern fleet of luxury vehicles that are regularly maintained
            for maximum comfort and safety on every journey.
          </p>
          <p className="text-xs font-normal text-primary xl:text-xl leading-relaxed tracking-tighter">
            Thanks to our extensive and affordable service network, we offer
            fast, dependable, and cost-effective transportation solutions across
            the region. Whether you're traveling for business or leisure, we are
            committed to providing an exceptional transfer experience.
          </p>
          <p className="text-xs font-normal text-primary xl:text-xl leading-relaxed tracking-tighter">
Travel with Airport to Hotels for a comfortable, safe, and economical ride from the airport directly to your accommodation.
          </p>
        </div>
      </figure>
    </section>
  );
});

export default About;
