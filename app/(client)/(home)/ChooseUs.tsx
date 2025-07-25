import { lazy, memo } from "react";
const SpecsCard = lazy(() => import("./components/SpecsCard"));

const ChooseUs = memo(function () {
  const cardsList = cardInfo.map((card) => {
    return (
      <SpecsCard key={card.id} title={card.title} svg={card.svg} text={card.text} />
    );
  });

  return (
    <section
      id="us"
      className="h-fit mt-16 px-2 pb-8 flex flex-col lg:p-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto gap-4"
    >
      <figure className="flex flex-col gap-2.5">
        <figcaption className="text-xl lg:text-2xl text-warning font-bold font-heading leading-tight">
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
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-fit h-16"
        viewBox="0 0 32 32"
      >
        <g fill="oklch(0.6648 0.2256 36.2)">
          <path d="M16 32c8.822 0 16-7.178 16-16S24.822 0 16 0S0 7.178 0 16s7.178 16 16 16m0-31c8.271 0 15 6.729 15 15s-6.729 15-15 15S1 24.271 1 16S7.729 1 16 1"></path>
          <path d="M20.061 21.768a.5.5 0 0 0 .708 0a.5.5 0 0 0 0-.707L16 16.293V9.319a.5.5 0 0 0-1 0V16.5c0 .133.053.26.146.354z"></path>
          <circle cx={4} cy={16} r={1}></circle>
          <circle cx={28} cy={16} r={1}></circle>
          <circle cx={16} cy={4} r={1}></circle>
          <circle cx={16} cy={28} r={1}></circle>
          <circle cx={8} cy={8} r={1}></circle>
          <circle cx={24} cy={24} r={1}></circle>
          <circle cx={25} cy={8} r={1}></circle>
          <circle cx={8} cy={24} r={1}></circle>
        </g>
      </svg>
    ),
  },
  {
    id: "1",
    title: "Comfort & Safety Guaranteed",
    text: "Travel with peace of mind in our fleet of luxury, business, and economy vehicles. Each car is carefully maintained to ensure maximum comfort and safety. We prioritize your well-being, so you can sit back and relax, knowing you’re in good hands.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-fit h-16"
        viewBox="0 0 27 32"
      >
        <path
          fill="oklch(0.6648 0.2256 36.2)"
          d="M13.5 0C4.563 0 .292 5.047.114 5.262A.5.5 0 0 0 0 5.581v10.054c0 8.504 7.826 13.553 11.19 15.329a.501.501 0 0 0 .467-.885C7.677 27.978 1 23.308 1 15.634V5.771c.702-.755 4.632-4.597 12-4.765V31.5a.5.5 0 0 0 .875.331C15.512 31.127 27 25.816 27 15.5v-10a.5.5 0 0 0-.115-.319C26.737 5.002 23.171.806 15.744.057a.506.506 0 0 0-.548.447a.5.5 0 0 0 .447.548c6.287.634 9.703 3.945 10.357 4.64V15.5c0 8.952-9.363 13.949-12 15.179V.5a.5.5 0 0 0-.5-.5"
        ></path>
      </svg>
    ),
  },
  {
    id: "2",
    title: "Clear & Transparent Pricing",
    text: "Say goodbye to hidden fees. At Airport to Hotels, we believe in honesty and transparency. Our affordable pricing is clear from the start, so you’ll always know what to expect. No surprises, just quality service at the best value.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-fit h-16"
        viewBox="0 0 26 26"
      >
        <g
          fill="oklch(0.6648 0.2256 36.2)"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M10.097 8.3c-.646.484-1 1.115-1 1.77c0 .656.354 1.287 1 1.772s1.562.8 2.595.8a.5.5 0 0 1 0 1c-1.228 0-2.36-.373-3.195-1c-.836-.627-1.4-1.53-1.4-2.571c0-1.04.564-1.945 1.4-2.572c.836-.626 1.967-.999 3.195-.999c1.918 0 3.647.919 4.314 2.334a.5.5 0 0 1-.905.426c-.457-.97-1.761-1.76-3.409-1.76c-1.033 0-1.949.315-2.595.8"></path>
          <path d="M14.957 17.983c.646-.484.999-1.116.999-1.77c0-.656-.353-1.288-1-1.772c-.646-.485-1.562-.8-2.594-.8a.5.5 0 1 1 0-1c1.228 0 2.36.373 3.195 1s1.399 1.53 1.399 2.571c0 1.04-.564 1.945-1.4 2.571c-.835.627-1.966 1-3.194 1c-1.918 0-3.647-.919-4.314-2.334a.5.5 0 0 1 .905-.426c.457.97 1.76 1.76 3.409 1.76c1.032 0 1.948-.315 2.595-.8M12 4a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 12 4"></path>
          <path d="M12 19a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5"></path>
          <path d="M13 24.5c6.351 0 11.5-5.149 11.5-11.5S19.351 1.5 13 1.5S1.5 6.649 1.5 13S6.649 24.5 13 24.5m0 1c6.904 0 12.5-5.596 12.5-12.5S19.904.5 13 .5S.5 6.096.5 13S6.096 25.5 13 25.5"></path>
        </g>
      </svg>
    ),
  },
];

export default ChooseUs;
