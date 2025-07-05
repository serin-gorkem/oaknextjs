"use client";
import { memo } from "react";
import useFormVariables from "../(home)/components/useGetLocalVariables";

type ContactSummaryCardProps = {
  navigateToPersonalDetails: () => void;
};

const ContactSummaryCard = memo(function (props: ContactSummaryCardProps) {
  const { getFormVariables } = useFormVariables();
  const localData = getFormVariables();

  return (
    <article className="flex flex-col relative gap-4 p-6 mb-8 rounded-box bg-base-300 w-full md:flex-1/2 lg:flex-1/4 card-xl shadow-xl">
      <h1>Contact & Billing Info</h1>
      <div onClick={props.navigateToPersonalDetails} className="border-2 border-gray rounded-box p-1 px-8 cursor-pointer right-5 top-5 absolute flex flex-col gap-2">
        <p>Edit</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <figure className="md:w-1/2">
          <figcaption>FIRST NAME</figcaption>
          <p className="section-text font-bold">{localData?.firstName ?? ""}</p>
        </figure>
        <div className="divider md:hidden m-0 w-full"></div>
        <figure className="md:w-1/2">
          <figcaption>LAST NAME</figcaption>
          <p className="section-text font-bold">{localData?.lastName ?? ""}</p>
        </figure>
      </div>
      <div className="divider m-0 w-full"></div>
      <figure>
        <figcaption>PHONE NUMBER</figcaption>
        <p className="section-text font-bold">{localData?.phone ?? ""}</p>
      </figure>
      <div className="divider m-0 w-full"></div>
      <figure>
        <figcaption>FLIGHT NUMBER</figcaption>
        <p className="section-text font-bold">
          {localData?.flightNumber ?? ""}
        </p>
      </figure>
      <div className="divider m-0 w-full"></div>
      <figure>
        <figcaption>EMAIL ADDRESS</figcaption>
        <p className="section-text font-bold">{localData?.email ?? ""}</p>
        <div className="divider m-0 w-full"></div>
      </figure>
      <figure>
        <figcaption>MESSAGE</figcaption>
        <p className="section-text font-bold">{localData?.message ?? ""}</p>
      </figure>
    </article>
  );
});

export default ContactSummaryCard;
