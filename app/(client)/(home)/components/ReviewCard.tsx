import { memo } from "react";
import Stars from "./Stars";

type ReviewCardProps = {
  title: string;
  review: string;
  name: string;
  business: string;
};

const ReviewCard = memo(function (props: ReviewCardProps) {
  return (
    <article className="flex flex-col rounded-box gap-4 p-6 bg-base-300 w-full md:flex-1/2 lg:flex-1/4 card-xl shadow-xl">
      <figure className="flex flex-col gap-4">
        <h2 className="card-title title">{props.title}</h2>
        <p className="opacity-80">{props.review}</p>
      </figure>
      <figure className="flex flex-col gap-2">
        <div className="flex">
          <Stars starCount={5} />
        </div>
        <h3 className="font-bold">{props.name}</h3>
        <h4 className="font-bold">{props.business}</h4>
      </figure>
    </article>
  );
});

export default ReviewCard;
