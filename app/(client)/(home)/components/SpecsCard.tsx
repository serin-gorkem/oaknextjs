import Image from "next/image";
import { memo } from "react";

type SpecsCardProps = {
  image: string;
  title: string;
  text: string;
};

const SpecsCard = memo(function (props: SpecsCardProps) {
  return (
    <article className="bg-base-300 rounded-box shadow-md flex md:flex-1/3 lg:flex-1/4 flex-col p-4">
      {/* <figure className="flex flex-col justify-baseline gap-2">
        {props.svg}
        <figcaption className="text-xl font-bold">{props.title}</figcaption>
        <p className="text-sm">{props.text}</p>
      </figure> */}
      <Image
        src={props.image}
        alt={props.title}
        width={1920}
        height={1080}
        className="rounded-box mb-4 h-48 object-cover"
      ></Image>
      <h3>
        <strong className="text-lg font-bold">{props.title}</strong>
        <p className="text-sm mt-2">{props.text}</p>
      </h3>
    </article>
  );
});

export default SpecsCard;
