import { memo } from "react";
type ContactSummaryCardProps = {
  clientData: any;
  navigateToDetails: () => void;
};
const ContactSummaryCard = memo(function ({ clientData, navigateToDetails }: ContactSummaryCardProps) {
  return (
    <article className="flex flex-col relative gap-4 p-6 mb-8 rounded-box bg-base-300 w-full md:flex-1/2 lg:flex-1/4 card-xl shadow-xl">
      <h1 className="text-xl md:text-4xl my-3">Contact & Billing Info</h1>
      <div
        className="cursor-pointer right-5 top-5 absolute flex flex-col gap-2"
      >
        <button onClick={navigateToDetails} className="btn w-24 btn-primary"> Edit </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <figure className="md:w-1/2">
          <figcaption>FIRST NAME</figcaption>
          <p className="section-text font-bold">{clientData?.details.name ?? ""}</p>
        </figure>
        <div className="divider md:hidden m-0 w-full"></div>
        <figure className="md:w-1/2">
          <figcaption>LAST NAME</figcaption>
          <p className="section-text font-bold">{clientData?.details.lastName ?? ""}</p>
        </figure>
      </div>
      <div className="divider m-0 w-full"></div>
      <figure>
        <figcaption>PHONE NUMBER</figcaption>
        <p className="section-text font-bold">{clientData?.details.phone ?? ""}</p>
      </figure>
      <div className="divider m-0 w-full"></div>
      <figure>
        <figcaption>FLIGHT NUMBER</figcaption>
        <p className="section-text font-bold">
          {clientData?.details.flightNumber ?? ""}
        </p>
      </figure>
      <div className="divider m-0 w-full"></div>
      <figure>
        <figcaption>EMAIL ADDRESS</figcaption>
        <p className="section-text font-bold">{clientData?.details.email ?? ""}</p>
        <div className="divider m-0 w-full"></div>
      </figure>
      <figure>
        <figcaption>MESSAGE</figcaption>
        <p className="section-text font-bold">{clientData?.details.message ?? ""}</p>
      </figure>
    </article>
  );
});

export default ContactSummaryCard;
