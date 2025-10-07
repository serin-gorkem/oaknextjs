import Image from "next/image";
import { memo } from "react";

const Steps = memo(function () {
  return (
    <section id="steps" className="h-fit mt-16 px-2 pb-8 flex flex-col lg:p-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto gap-8 lg:gap-16">
      <figure className="flex flex-col gap-2.5">
        <figcaption className="text-xl title lg:text-2xl text-warning font-bold font-heading leading-tight">
          How to book your ride
        </figcaption>
        <h1 className="text-2xl lg:text-4xl font-bold opacity-85">
          Book in Four Simple Steps
        </h1>
      </figure>
      <article className="flex flex-col gap-8 lg:gap-24">
        <Step svg="./images/svgs/step_1.svg" title="Step 1: Fill out the Form" text="Select your 📍pickup & drop-off locations, 🗓️ travel date, 👥 number of passengers, and add a 🔄 return trip if needed. Airport to Hotels makes booking seamless and stress-free." direction="" />
        <Step svg="./images/svgs/step_2.svg" title="Step 2: Choose Your Vehicle" text="Browse our 🚖 luxury, 💼 business, and 💲 economy airport transfer vehicles. Each option includes detailed features, ✅ transparent pricing, and unmatched comfort to fit your needs." direction="md:flex-row-reverse" />
        <Step svg="./images/svgs/step_3.svg" title="Step 3: Enhance Your Ride" text="Customize your airport transfer with ✨ extra services, such as 👶 child seats, 🧳 additional luggage space, or ⭐ VIP chauffeur service for a premium travel experience." direction="" />
        <Step svg="./images/svgs/step_4.svg" title="Step 4: Secure & Instant Confirmation" text="Enter your 🔐 personal details, confirm your ✅ booking, and receive 📩 instant confirmation. With 🕒 24/7 Airport to Hotels, your airport transfer is always reliable and hassle-free." direction="md:flex-row-reverse" />
      </article>
    </section>
  )
});

type StepProps = {
  direction: string;
  svg: string;
  title: string;
  text: string;
}

function Step(props: StepProps) {
  return (
    <div className={`w-full flex flex-col md:flex-row ${props.direction} justify-between gap-8 xl:gap-32`}>
      <Image width={500} height={500} src={props.svg} loading="lazy" alt="Fill out the Form" className="h-64 lg:h-64 xl:h-96" />
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl xl:text-3xl">{props.title}</h2>
        <p className="text-xl lg:text-2xl">{props.text}</p>
      </div>
    </div>
  );
}

export default Steps;
