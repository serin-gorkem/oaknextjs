import { memo } from "react";

/* ------------------------- Types ------------------------- */
interface ContactSummaryCardProps {
  clientData: {
    details?: {
      name?: string;
      lastName?: string;
      phone?: string;
      flightNumber?: string;
      email?: string;
      message?: string;
    };
  };
  navigateToDetails: () => void;
}

/**
 * ContactSummaryCard Component
 * ------------------------------------------------------------
 * Displays user's contact and billing information summary.
 * Includes an Edit button to navigate back to the Details page.
 */
const ContactSummaryCard = memo(function ContactSummaryCard({
  clientData,
  navigateToDetails,
}: ContactSummaryCardProps) {
  const details = clientData?.details || {};

  return (
    <article className="relative flex flex-col gap-4 p-6 mb-8 rounded-box bg-base-300 w-full shadow-xl card-xl">
      {/* Header Section */}
      <header className="flex justify-between items-start">
        <h1 className="text-xl md:text-4xl my-3 font-bold">Contact & Billing Info</h1>
        <button
          onClick={navigateToDetails}
          className="btn btn-primary w-24 self-start"
        >
          Edit
        </button>
      </header>

      {/* Contact Information */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <InfoBlock label="FIRST NAME" value={details.name} />
          <div className="divider md:hidden m-0 w-full" />
          <InfoBlock label="LAST NAME" value={details.lastName} />
        </div>

        <div className="divider m-0 w-full" />
        <InfoBlock label="PHONE NUMBER" value={details.phone} />

        <div className="divider m-0 w-full" />
        <InfoBlock label="FLIGHT NUMBER" value={details.flightNumber} />

        <div className="divider m-0 w-full" />
        <InfoBlock label="EMAIL ADDRESS" value={details.email} />

        <div className="divider m-0 w-full" />
        <InfoBlock label="MESSAGE" value={details.message} />
      </section>
    </article>
  );
});

/* ------------------------- Subcomponent ------------------------- */
interface InfoBlockProps {
  label: string;
  value?: string;
}

/**
 * InfoBlock
 * A reusable small component for displaying a label and its corresponding value.
 */
function InfoBlock({ label, value }: InfoBlockProps) {
  return (
    <figure className="w-full md:w-1/2">
      <figcaption className="uppercase tracking-wide text-sm text-primary">
        {label}
      </figcaption>
      <p className="section-text font-bold break-words">{value || "—"}</p>
    </figure>
  );
}

export default ContactSummaryCard;
