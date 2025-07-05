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
    title: "We Keep Things Organised",
    text: "With the experience that we’ve built up over the years and the technology that we’ve adopted, we have everything in place to make sure your journey runs smoothly. From carefully preparing a route in advance to account for any issues along the way, through to coordinating the movement of thousands of passengers at a time, our skilled team will ensure that everything proceeds as planned.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={100}
        height={100}
        className="w-fit h-16"
        viewBox="0 0 100 100"
      >
        <path
          fill="oklch(59.27% 0.2264 26.75)"
          d="M1.965 12.5C.88 12.5 0 13.443 0 14.605v70.79c0 1.162.88 2.104 1.965 2.105h96.07c1.085 0 1.965-.943 1.965-2.105v-70.79c0-1.162-.88-2.104-1.965-2.105Zm22.408 4.213h12.385c3.19 1.117 6.48 2.17 9.773 3.135c7.26 2.126 14.43 3.856 20.004 5.056c1.774.382 3.307.687 4.711.957c-.961 1.034-1.904 2.065-2.867 3.094l-1.057 1.129c-6.493-2.033-13.921-4.056-23.474-6.059c-6.74-1.412-13.237-3.964-19.475-7.312m17.08 0h14.453a296 296 0 0 0 11.785 2.814c2.73.588 5.06 1.043 6.784 1.346a59 59 0 0 0 2.091.336c.52.071.951.085.795.09l.006.158a419 419 0 0 0 4.26-4.744h5.332c-4.469 5.16-9.513 10.604-14.564 16.002C62.597 43.184 52.989 53.4 48.97 59.592a10.4 10.4 0 0 1 1.79 5.836c0 1.793-.457 3.484-1.261 4.963c4.097 3.203 7.157 7.856 9.928 12.896h-4.635c-2.384-4.05-4.909-7.543-7.832-9.808a10.41 10.41 0 0 1-9.732 1.949a89 89 0 0 1-3.231 7.86h-4.43c1.527-3.143 2.92-6.369 4.096-9.782c-2.336-1.923-3.83-4.834-3.83-8.078c0-2.752 1.083-5.258 2.836-7.131c-5.91-13.21-16.585-20-28.738-27.215v-4.674c12.892 7.605 25.195 14.839 32.052 29.502a10.35 10.35 0 0 1 10.092.809c4.67-6.914 13.935-16.629 23.397-26.739c1.588-1.697 3.155-3.398 4.73-5.1c-.158-.026-.253-.038-.422-.068a192 192 0 0 1-6.931-1.375c-5.543-1.193-12.683-2.916-19.897-5.029a212 212 0 0 1-5.5-1.695m20.65 0H79.6c-.895 1.004-1.77 1.997-2.702 3.021c-.05-.005-.077-.004-.128-.011a59 59 0 0 1-2.036-.328c-1.697-.299-4.013-.75-6.726-1.334a291 291 0 0 1-5.904-1.348m26.846 0h7.12v4.385c-.042-.003-.082-.012-.124-.012h-.013a1.75 1.75 0 0 0 .013 3.5c.042 0 .082-.009.123-.012v3.524c-.04-.003-.08-.012-.123-.012h-.013a1.75 1.75 0 0 0 .013 3.5c.042 0 .082-.009.123-.012v3.524c-.04-.003-.08-.012-.123-.012a1.75 1.75 0 1 0 0 3.5c.042 0 .082-.009.123-.012v1.295c-.791-.251-1.598-.502-2.369-.754a1.75 1.75 0 0 0-1.54-.504c-.641-.213-1.257-.425-1.884-.638a1.75 1.75 0 1 0-3.078-1.055c-1.426-.499-2.822-.998-4.222-1.496a1.75 1.75 0 0 0-.942-.334c-.71-.253-1.433-.507-2.146-.76a1.75 1.75 0 0 0-.43-2.422l-1.596 1.71c-1.047-.37-2.159-.738-3.23-1.106c5-5.346 9.953-10.706 14.318-15.797m5.06 1.84c-1.156.286-2.137.788-3.138 1.545a1.75 1.75 0 1 0 3.139-1.545m-4.421 2.656a46 46 0 0 0-2.268 2.277a1.75 1.75 0 1 0 2.268-2.277m-85.656 1.99c18.115 12.035 33.234 17 51.261 19.965c-3.805 4.23-7.139 8.16-9.572 11.578a11.8 11.8 0 0 0-5.324-1.28c-1.241 0-2.441.194-3.57.552c-7.314-14.554-19.964-21.79-32.795-29.356Zm88.5 1.387a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5m-6.28.148l-2.256 2.416a1.75 1.75 0 1 0 2.256-2.416m2.78 3.352a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5m-6.121.228l-2.323 2.489a1.75 1.75 0 1 0 2.323-2.489m2.62 3.272a1.75 1.75 0 1 0 .028 3.5a1.75 1.75 0 0 0-.027-3.5m7 0a1.75 1.75 0 1 0 .028 3.5a1.75 1.75 0 0 0-.027-3.5m-88.5 1.248c11.478 6.84 21.321 13.273 26.981 25.223c-1.607 2.038-2.578 4.597-2.578 7.37c0 3.318 1.382 6.333 3.592 8.509c-1.164 3.244-2.53 6.33-4.024 9.351h-4.328l2.75-4.762l-2.922-1.687l1.041-1.805l-4.047-2.336l-6.115 10.59H3.931V48.32l7.684 4.582l4.778-8.012l-12.461-7.432ZM63.58 44.437c2.32.385 4.57.922 6.73 1.57a1.75 1.75 0 1 0 2.84.927c1.369.483 2.69 1 3.97 1.54a1.75 1.75 0 0 0 1.415.61c.649.29 1.276.584 1.897.88a1.75 1.75 0 1 0 3.127 1.56c.693.363 1.29.708 1.935 1.064l-.058-.002a1.75 1.75 0 1 0 1.464.773c3.197 1.81 5.717 3.38 7.327 4.172a1.75 1.75 0 0 0 1.723 2.055c.042 0 .08-.015.122-.018v3.53c-.04-.003-.08-.012-.123-.012h-.013a1.75 1.75 0 0 0 .013 3.5c.042 0 .082-.009.123-.012v3.524c-.04-.003-.08-.012-.123-.012a1.75 1.75 0 1 0 0 3.5c.042 0 .082-.009.123-.012v9.713H61.15c-2.7-5.02-5.69-9.798-9.795-13.324a11.8 11.8 0 0 0-.613-10.328c2.623-3.807 7.38-9.234 12.834-15.198zm4.37 4.649c-.218 0-.434.04-.637.12a11.4 11.4 0 0 0-.092 3.22a1.75 1.75 0 1 0 .729-3.34m7 0a1.75 1.75 0 1 0 0 3.5a1.75 1.75 0 0 0 0-3.5m-56.749 3.307l-3.623 6.275l-2.431 4.21l6.275 3.624l2.432-4.211l2.492 1.44l3.623-6.276l-2.492-1.44zm53.235.193a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5m7 0a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5m-3.5 3.5a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5m7 0a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5m7 0a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5m-20.713.021c.013.031.021.061.035.092a70 70 0 0 1-.139 3.377a1.75 1.75 0 0 0 .104-3.469m-27.922 2.856a6.434 6.434 0 0 0-6.463 6.465a6.43 6.43 0 0 0 6.463 6.463a6.434 6.434 0 0 0 6.465-6.463a6.435 6.435 0 0 0-6.465-6.465m31.135.623a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5m7 0a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5m7 0a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5m7 0a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5m-52.135.877c2.783 0 4.965 2.182 4.965 4.965s-2.182 4.963-4.965 4.963s-4.963-2.18-4.963-4.963s2.18-4.965 4.963-4.965m34.635 2.623a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5m7 0a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5m7 0a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5m-20.694.023c.224.556.658.995 1.444 1.514a1.75 1.75 0 0 0-1.444-1.514m10.194 3.477a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5m7 0a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5m7 0a1.75 1.75 0 1 0 .027 3.5a1.75 1.75 0 0 0-.027-3.5M65.81 68.359c-3.228 0-5.877 2.65-5.877 5.877c0 3.228 2.65 5.875 5.877 5.875s5.875-2.647 5.875-5.875c0-3.227-2.648-5.877-5.875-5.877m16.134 1.727a1.75 1.75 0 0 0-1.271 2.953l2.562-.021a1.75 1.75 0 0 0-1.29-2.932m7 0a1.75 1.75 0 0 0-1.324 2.893l2.668-.024a1.75 1.75 0 0 0-1.344-2.87m-23.134 1.273a2.854 2.854 0 0 1 2.875 2.877a2.85 2.85 0 0 1-2.875 2.875a2.854 2.854 0 0 1-2.877-2.875a2.855 2.855 0 0 1 2.877-2.877m-18.913 4.02c2.168 1.932 4.174 4.707 6.118 7.908H35.65c.899-1.979 1.762-3.992 2.541-6.096c.686.124 1.387.2 2.106.2c2.433 0 4.704-.745 6.601-2.012"
          color="oklch(59.27% 0.2264 26.75)"
        ></path>
      </svg>
    ),
  },
  {
    id: "1",
    title: "We will pick up the phone",
    text: "We offer a quick and effective response to any enquiries so that you aren’t kept waiting for an answer. If you contact us during our office opening times, we will make sure you receive a response within an hour so that you can be sure you’re being listened to. And, even outside of these hours, we will be monitoring our phones and emails to make sure that you hear back from us as quickly as possible.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 19 32"
        className="w-fit h-16"
      >
        <g fill="oklch(59.27% 0.2264 26.75)">
          <path d="M1.5 32h16c.827 0 1.5-.673 1.5-1.5v-29c0-.827-.673-1.5-1.5-1.5h-16C.673 0 0 .673 0 1.5v29c0 .827.673 1.5 1.5 1.5M1 1.5a.5.5 0 0 1 .5-.5h16a.5.5 0 0 1 .5.5v29a.5.5 0 0 1-.5.5h-16a.5.5 0 0 1-.5-.5z"></path>
          <path d="M2.5 27h14a.5.5 0 0 0 .5-.5v-21a.5.5 0 0 0-.5-.5h-14a.5.5 0 0 0-.5.5v21a.5.5 0 0 0 .5.5M3 6h13v20H3z"></path>
          <circle cx={10} cy={29} r={1}></circle>
          <path d="M7.5 4h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0 0 1"></path>
        </g>
      </svg>
    ),
  },
  {
    id: "2",
    title: "We always find a way",
    text: "We will never let our passengers down. We have the experience, skills, and resources to make sure that your journey runs smoothly and you get to your destination. After more than 20 years in the industry, we’ve never missed a transfer and we’ve never left passengers stranded at the side of the road. It really is that simple",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 32"
        className="w-fit h-16"
      >
        <g fill="oklch(59.27% 0.2264 26.75)">
          <path d="M12 0C5.383 0 0 5.394 0 12.022c0 9.927 11.201 19.459 11.678 19.86a.5.5 0 0 0 .64.004C12.795 31.492 24 22.124 24 12.022C24 5.394 18.617 0 12 0m.002 30.838C10.161 29.193 1 20.579 1 12.022C1 5.944 5.935 1 12 1s11 4.944 11 11.022c0 8.702-9.152 17.193-10.998 18.816"></path>
          <path d="M12 6c-3.309 0-6 2.691-6 6s2.691 6 6 6s6-2.691 6-6s-2.691-6-6-6m0 11c-2.757 0-5-2.243-5-5s2.243-5 5-5s5 2.243 5 5s-2.243 5-5 5"></path>
        </g>
      </svg>
    ),
  },
  {
    id: "3",
    title: "Reliable & Punctual Transfers",
    text: "We understand how important it is to be on time, especially when catching a flight. Our service ensures you’re always on schedule, whether you’re heading to the airport or arriving at your destination. With Oak Travel, you can trust that your transfer will be timely and stress-free.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-fit h-16"
        viewBox="0 0 32 32"
      >
        <g fill="oklch(59.27% 0.2264 26.75)">
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
    id: "4",
    title: "Comfort & Safety Guaranteed",
    text: "Travel with peace of mind in our fleet of luxury, business, and economy vehicles. Each car is carefully maintained to ensure maximum comfort and safety. We prioritize your well-being, so you can sit back and relax, knowing you’re in good hands.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-fit h-16"
        viewBox="0 0 27 32"
      >
        <path
          fill="oklch(59.27% 0.2264 26.75)"
          d="M13.5 0C4.563 0 .292 5.047.114 5.262A.5.5 0 0 0 0 5.581v10.054c0 8.504 7.826 13.553 11.19 15.329a.501.501 0 0 0 .467-.885C7.677 27.978 1 23.308 1 15.634V5.771c.702-.755 4.632-4.597 12-4.765V31.5a.5.5 0 0 0 .875.331C15.512 31.127 27 25.816 27 15.5v-10a.5.5 0 0 0-.115-.319C26.737 5.002 23.171.806 15.744.057a.506.506 0 0 0-.548.447a.5.5 0 0 0 .447.548c6.287.634 9.703 3.945 10.357 4.64V15.5c0 8.952-9.363 13.949-12 15.179V.5a.5.5 0 0 0-.5-.5"
        ></path>
      </svg>
    ),
  },
  {
    id: "5",
    title: "Clear & Transparent Pricing",
    text: "Say goodbye to hidden fees. At Oak Travel, we believe in honesty and transparency. Our affordable pricing is clear from the start, so you’ll always know what to expect. No surprises, just quality service at the best value.",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-fit h-16"
        viewBox="0 0 26 26"
      >
        <g
          fill="oklch(59.27% 0.2264 26.75)"
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
