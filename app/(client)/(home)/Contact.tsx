"use client";
import { memo, useState } from "react";
import { motion } from "framer-motion";

const Contact = memo(function Contact() {
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
      id="contact"
      aria-labelledby="contact-heading"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="h-fit mt-16 px-2 pb-8 flex flex-col xl:max-w-6xl lg:max-w-5xl mx-auto gap-12 lg:gap-16"
    >
      {/* === Section Header === */}
      <header className="flex flex-col gap-2 text-center lg:text-left">
        <h2
          id="contact-heading"
          className="text-xl lg:text-2xl text-warning font-bold uppercase tracking-wide"
        >
          Contact
        </h2>
        <h3 className="text-2xl lg:text-4xl font-bold text-base-content/90">
          Talk To Us
        </h3>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* === Contact Form === */}
        <motion.form
          role="form"
          aria-labelledby="contact-heading"
          aria-describedby="form-feedback"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 lg:w-1/2"
          onSubmit={handleSubmit}
        >
          {/* First Name */}
          <label className="flex flex-col font-semibold text-sm lg:text-base">
            First Name
            <input
              type="text"
              name="firstName"
              autoComplete="given-name"
              className="bg-base-300 h-10 p-2 w-full shadow-sm lg:text-base mt-1"
              placeholder="John"
              required
            />
          </label>

          {/* Last Name */}
          <label className="flex flex-col font-semibold text-sm lg:text-base">
            Last Name
            <input
              type="text"
              name="lastName"
              autoComplete="family-name"
              className="bg-base-300 h-10 p-2 w-full shadow-sm lg:text-base mt-1"
              placeholder="Doe"
              required
            />
          </label>

          {/* Email */}
          <label className="flex flex-col font-semibold text-sm lg:text-base">
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="bg-base-300 h-10 p-2 w-full shadow-sm lg:text-base mt-1"
              placeholder="john@example.com"
              required
            />
          </label>

          {/* Phone */}
          <label className="flex flex-col font-semibold text-sm lg:text-base">
            Phone Number
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              className="bg-base-300 h-10 p-2 w-full shadow-sm lg:text-base mt-1"
              placeholder="+00 000 000 00 00"
              required
            />
          </label>

          {/* Message */}
          <label className="flex flex-col font-semibold text-sm lg:text-base">
            Message
            <textarea
              name="message"
              className="bg-base-300 h-32 w-full p-2 shadow-sm lg:text-base resize-none"
              placeholder="Leave us a message..."
              required
            />
          </label>

          <button
            type="submit"
            className="btn btn-lg w-full btn-primary hover:bg-white hover:text-primary text-base-100 font-paragraph font-light"
          >
            Send Message
          </button>

          <p
            id="form-feedback"
            role="status"
            aria-live="polite"
            className={`mt-2 text-sm ${
              statusType === "success"
                ? "text-green-600"
                : statusType === "error"
                ? "text-red-600"
                : "text-transparent"
            }`}
          >
            {statusMessage}
          </p>
        </motion.form>

        {/* === Contact Details + Map === */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col gap-8 lg:w-1/2"
          itemScope
          itemType="https://schema.org/ContactPoint"
        >
          <div>
            <h4 className="text-xl lg:text-2xl font-bold">Call Us</h4>
            <p className="text-base text-base-content/80">
              Available Mon–Fri, 8 AM–5 PM
            </p>
            <a
              href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER}`}
              itemProp="telephone"
              className="text-base text-primary font-semibold flex items-center gap-2 mt-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              {process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER}
            </a>
          </div>

          <div>
            <h4 className="text-xl lg:text-2xl font-bold">Join Us</h4>
            <p className="text-base text-base-content/80">
              Visit our office in Kuşadası, Turkey
            </p>
            <iframe
              loading="lazy"
              allowFullScreen
              title="Our office location on map"
              className="w-full h-92 mt-3 rounded-lg shadow-md"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ9eNRs4OpvhQREf4JZnlssoQ&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
            />
          </div>
        </motion.div>
      </div>

      {/* === Legal / Business Info === */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-base-200 p-4 rounded-lg shadow-md flex flex-col gap-4"
      >
        <h4 className="text-xl lg:text-2xl font-bold text-base-content">
          Legal & Contact Information
        </h4>

        <div>
          <h5 className="font-semibold">A) Business / Trade Info</h5>
          <p>
            OAK TURİZM SEYH. ACENTECİLİĞİ OTELCİLİK VE İNŞAAT LTD ŞTİ. <br />
            MERSİS No: 0632 1006 6690 0001 — Vergi Dairesi: Kuşadası <br />
            Vergi No: 6321006669 <br />
            Cumhuriyet Mah. Muhammer Ülgen Sok. Samsara Plaza Kat: 4 Daire: 401,
            Kuşadası / Aydın
          </p>
        </div>

        <div>
          <h5 className="font-semibold">B) Communication Info</h5>
          <p>
            Email: <a href="mailto:info@airporttohotels.com">info@airporttohotels.com</a>
            <br />
            Tel: {process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER}
          </p>
        </div>

        <div>
          <h5 className="font-semibold">C) Professional Info</h5>
          <p>Member of TÜRSAB (Association of Turkish Travel Agencies)</p>
        </div>
      </motion.section>
    </motion.section>
  );
});

export default Contact;