import { memo } from "react";

const About = memo(function () {
  return (
    <section id="about" className="p-2 md:px-4 lg:px-0 flex flex-col gap-8 z-10 xl:max-w-9/12 lg:max-w-11/12 mx-auto">
      <figure className="flex flex-col gap-2.5">
        <figcaption className="text-xl text-warning lg:text-2xl font-black font-heading leading-tight">
          About Us
        </figcaption>
        <h1 className="text-2xl lg:text-4xl font-bold opacity-85">Who we are ?</h1>
      </figure>
      <figure className="flex lg:flex-row flex-col gap-4">
        <img src="/images/Team.webp" className="lg:w-1/2 object-cover" alt="team image" loading="lazy"></img>
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl lg:text-4xl">We are OAK Travel</h2>
          <p className="text-xs font-light text-primary opacity-70 xl:text-xl leading-relaxed tracking-tighter">
            At Oak Travel, we believe that airport transfers should be smooth,
            reliable, and stress-free. Whether you're traveling for business or
            leisure, we are dedicated to providing a comfortable and punctual
            experience from the moment you book until you reach your
            destination.
          </p>
          <p className="text-xs font-light text-primary opacity-70 xl:text-xl leading-relaxed tracking-tighter">
          With a fleet of luxury, business, and economy vehicles,
            we cater to every traveler's needs. Our professional drivers ensure
            a safe and seamless journey, while our transparent pricing means no
            hidden surprises—just affordable, high-quality service you can
            trust.
          </p>
          <p className="text-xs font-light text-primary opacity-70 xl:text-xl leading-relaxed tracking-tighter">
          Our mission is simple: to make airport transportation
            effortless. With an easy-to-use booking system, competitive rates,
            and a commitment to customer satisfaction, Oak Travel is your go-to
            choice for reliable airport transfers.
          </p>
        </div>
      </figure>
    </section>
  );
});

export default About;
