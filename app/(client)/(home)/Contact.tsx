"use client";
import { memo, useState } from "react";

const Contact = memo(function () {
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatusMessage("Message sent successfully!");
        setStatusType("success");
        form.reset();
      } else {
        setStatusMessage("Failed to send message.");
        setStatusType("error");
      }
    } catch (err) {
      setStatusMessage("An error occurred. Please try again.");
      setStatusType("error");
    }
  }

  return (
    <section
      id="Contact"
      className="h-fit mt-16 px-2 pb-8 flex flex-col lg:p-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto gap-8 lg:gap-16"
    >
      <figure className="flex flex-col gap-2.5">
        <figcaption className="text-xl title lg:text-2xl text-warning font-bold font-heading leading-tight">
          Contact
        </figcaption>
        <h1 className="text-2xl lg:text-4xl font-bold opacity-85">
          Talk To Us
        </h1>
      </figure>
      <div className="flex flex-col lg:flex-row gap-6">
        <form className="flex flex-col gap-2 lg:w-1/2" onSubmit={handleSubmit}>
          <fieldset className="fieldset flex focus-within:outline-0">
            <legend className="font-bold text-sm lg:text-base">
              First Name <span className="text-warning">*</span>
            </legend>
            <input
              type="text"
              id="name"
              name="firstName" 
              autoComplete="given-name"
              className="bg-base-300 h-10 p-2 w-full shadow-sm lg:text-base"
              placeholder="First Name"
              required
            />
          </fieldset>
          <fieldset className="fieldset flex focus-within:outline-0">
            <legend className="font-bold text-sm lg:text-base">
              Last Name <span className="text-warning">*</span>
            </legend>
            <input
              type="text"
              id="name"
              name="lastName"
              autoComplete="family-name"
              className="bg-base-300 h-10 w-full p-2 shadow-sm lg:text-base"
              placeholder="Last Name"
              required
            />
          </fieldset>
          <fieldset className="fieldset flex focus-within:outline-0">
            <legend className="font-bold text-sm lg:text-base">
              Email <span className="text-warning">*</span>
            </legend>
            <input
              type="text"
              id="name"
              name="email" 
              autoComplete="email"
              className="bg-base-300 h-10 w-full p-2 shadow-sm lg:text-base"
              placeholder="Email"
              required
            />
          </fieldset>
          <fieldset className="fieldset flex focus-within:outline-0">
            <legend className="font-bold text-sm lg:text-base">
              Phone Number
            </legend>
            <input
              type="text"
              id="name"
              name="phone"
              autoComplete="tel"
              className="bg-base-300 h-10 p-2 w-full shadow-sm lg:text-base"
              placeholder="+00 000 000 00 00"
              required
            />
          </fieldset>
          <fieldset className="">
            <legend className=" font-bold">
              Message <span className="text-warning">*</span>
            </legend>
            <textarea
              id="message"
              name="message"
              className="bg-base-300 h-32 w-full p-2 shadow-sm lg:text-base"
              placeholder="Leave us a message..."
              required
            />
          </fieldset>
          <button
            type="submit"
            aria-label="How to book your ride page navigator button"
            className="btn btn-lg w-full btn-primary hover:bg-white hover:text-primary text-base-100 font-paragraph font-light self-baseline"
          >
            SEND MESSAGE
          </button>
        {/* Mesaj gösterimi */}
          {statusMessage && (
            <p
              className={`mt-2 text-sm ${
                statusType === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </form>
        <div className="flex flex-col gap-2 lg:w-1/2">
          <h2 className="text-xl lg:text-2xl font-bold">Call Us</h2>
          <div className="flex  items-center justify-between text-xs">
            <p className="w-1/2 lg:text-base">
              Call our team Mon-Fri From 8am to 5pm
            </p>
            <div className="flex gap-2 ">
            {/* Phone SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              <a href="0090 256 999 16 19" className="text-xs lg:text-base">
                {process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER}
              </a>
            </div>
          </div>
          <h2 className="text-xl lg:text-2xl font-bold">Join Us</h2>
          <p className="text-xs lg:text-base">
            Our office is located in Turkey / Kusadasi
          </p>
          {/* Will change in feature updates. */}
            <iframe
            loading="lazy"
            allowFullScreen
            title="location-map"
            className="w-full h-64 lg:h-full"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ9eNRs4OpvhQREf4JZnlssoQ&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=Space+Needle,Seattle+WA`}
            ></iframe>
        </div>
      </div>
    </section>
  );
});
export default Contact;
