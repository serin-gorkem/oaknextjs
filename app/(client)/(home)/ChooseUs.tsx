import { lazy, memo } from "react";
const SpecsCard = lazy(() => import("./components/SpecsCard"));

const ChooseUs = memo(function () {
  const cardsList = cardInfo.map((card) => {
    return (
      <SpecsCard key={card.id} title={card.title} image={card.image} text={card.text} />
    );
  });

  return (
    <section
      id="us"
      className="h-fit mt-16 px-2 pb-8 flex flex-col lg:p-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto gap-4"
    >
      <figure className="flex flex-col gap-2.5">
        <figcaption className="text-xl title lg:text-2xl text-warning font-bold font-heading leading-tight">
          Why Choose Us
        </figcaption>
        <h1 className="text-2xl lg:text-4xl font-bold opacity-85">
          Service Tailored to You
        </h1>
      </figure>
      <div className="flex gap-6 flex-wrap">{cardsList}</div>
    </section>
  );
});
const cardInfo = [
  {
    id: "0",
    title: "Reliable & Punctual Transfers",
    text: "We understand how important it is to be on time, especially when catching a flight. Our service ensures you’re always on schedule, whether you’re heading to the airport or arriving at your destination. With Airport to Hotels, you can trust that your transfer will be timely and stress-free.",
    image: "/images/choose/1.webp",
  },
  {
    id: "1",
    title: "Comfort & Safety Guaranteed",
    text: "Travel with peace of mind in our fleet of luxury, business, and economy vehicles. Each car is carefully maintained to ensure maximum comfort and safety. We prioritize your well-being, so you can sit back and relax, knowing you’re in good hands.",
    image: "/images/choose/2.webp",
  },
  {
    id: "2",
    title: "Clear & Transparent Pricing",
    text: "Say goodbye to hidden fees. At Airport to Hotels, we believe in honesty and transparency. Our affordable pricing is clear from the start, so you’ll always know what to expect. No surprises, just quality service at the best value.",
    image: "/images/choose/3.webp",
  },
];

export default ChooseUs;
