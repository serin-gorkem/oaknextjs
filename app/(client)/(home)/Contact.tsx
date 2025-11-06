"use client";
import { memo, useState } from "react";
import { motion } from "framer-motion";

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
    } catch {
      setStatusMessage("An error occurred. Please try again.");
      setStatusType("error");
    }
  }

  return (
    <motion.section
      id="Contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="h-fit mt-16 px-2 pb-8 flex flex-col lg:p-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto gap-8 lg:gap-16"
    >
      <figure className="flex flex-col gap-2.5">
        <figcaption className="text-xl title lg:text-2xl text-warning font-bold font-heading leading-tight">
          Contact
        </figcaption>
        <h1 className="text-2xl lg:text-4xl font-bold opacity-85">Talk To Us</h1>
      </figure>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col gap-2 lg:w-1/2"
          onSubmit={handleSubmit}
        >
          <fieldset className="fieldset flex focus-within:outline-0">
            <legend className="font-bold text-sm lg:text-base">
              First Name <span className="text-warning">*</span>
            </legend>
            <input
              type="text"
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
              type="email"
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
              type="tel"
              name="phone"
              autoComplete="tel"
              className="bg-base-300 h-10 p-2 w-full shadow-sm lg:text-base"
              placeholder="+00 000 000 00 00"
              required
            />
          </fieldset>

          <fieldset>
            <legend className="font-bold">
              Message <span className="text-warning">*</span>
            </legend>
            <textarea
              name="message"
              className="bg-base-300 h-32 w-full p-2 shadow-sm lg:text-base"
              placeholder="Leave us a message..."
              required
            />
          </fieldset>

          <button
            type="submit"
            className="btn btn-lg w-full btn-primary hover:bg-white hover:text-primary text-base-100 font-paragraph font-light self-baseline"
          >
            SEND MESSAGE
          </button>

          {statusMessage && (
            <p
              className={`mt-2 text-sm ${
                statusType === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </motion.form>

        {/* Legal & Contact Info + Map */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 lg:w-1/2"
        >
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold">Call Us</h2>
              <div className="flex items-center justify-between text-base">
                <p className="w-1/2 lg:text-base">
                  Call our team Mon–Fri, 8am–5pm
                </p>
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  <a
                    href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER}`}
                    className="text-base"
                  >
                    {process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl lg:text-2xl font-bold">Join Us</h2>
              <p className="text-base lg:text-base">
                Our office is located in Turkey / Kuşadası
              </p>
              <iframe
                loading="lazy"
                allowFullScreen
                title="location-map"
                className="w-full h-100 mt-2 rounded-lg shadow-md"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ9eNRs4OpvhQREf4JZnlssoQ&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Legal Info */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-base-200 p-4 rounded-lg shadow-md flex flex-col gap-4"
      >
        <h2 className="text-xl lg:text-2xl title font-bold">
          Legal & Contact Information
        </h2>

        <section>
          <h3 className="font-semibold">A) Business / Trade Info</h3>
          <p>
            OAK TURİZM SEYH. ACENTECİLİĞİ OTELCİLİK VE İNŞAAT LTD ŞTİ.
            <br />
            MERSİS No: 0632 1006 6690 0001 — Vergi Dairesi: Kuşadası
            <br />
            Vergi No: 6321006669
            <br />
            Cumhuriyet Mah. Muhammer Ülgen Sok. Samsara Plaza Kat: 4 Daire: 401
            Kuşadası / Aydın
          </p>
        </section>

        <section>
          <h3 className="font-semibold">B) Communication Info</h3>
          <p>
            Mail: info@airporttohotels.com
            <br />
            Tel: {process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER}
          </p>
        </section>

        <section>
          <h3 className="font-semibold">C) Professional Info</h3>
          <p>Meslek Odası: TÜRSAB</p>
        </section>
      </motion.div>
    </motion.section>
  );
});

export default Contact;