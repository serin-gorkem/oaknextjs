"use client";
import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";

const Footer = memo(function Footer() {
  return (
    <footer
      className="bg-info-content pt-12 pb-4 relative text-neutral-content"
      aria-labelledby="footer-heading"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer Navigation and Company Information
      </h2>

      {/* === Main Footer === */}
      <div className="footer sm:footer-horizontal xl:max-w-6xl lg:max-w-5xl mx-auto sm:px-4 px-2">
        {/* === Column 1: Logo + Description === */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="max-w-sm"
        >
          <Image
            src="/images/logos/Logo_W.png"
            width={160}
            height={50}
            alt="Airport to Hotels Logo"
            className="h-10 w-auto"
            itemProp="logo"
          />
          <p
            className="w-11/12 text-sm sm:text-base mt-2 leading-relaxed text-base-100/90"
            itemProp="description"
          >
            Based in Kuşadası, Turkey — we provide reliable and comfortable
            airport transfers nationwide. Transparent pricing and professional
            drivers ensure a stress-free journey.
          </p>
        </motion.div>

        {/* === Column 2: Navigation === */}
        <motion.nav
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          aria-label="Main navigation"
        >
          <h3 className="footer-title underline underline-offset-8 decoration-warning text-base-300 mb-1">
            Browse
          </h3>
          <ul className="text-base-100 space-y-1">
            {menuItem("Home", "/")}
            {menuItem("About Us", "#about")}
            {menuItem("FAQ", "#faq")}
            {menuItem("Booking Steps", "#steps")}
            {menuItem("Contact", "#contact")}
          </ul>
        </motion.nav>

        {/* === Column 3: Services === */}
        <motion.nav
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
          aria-label="Policies and Services"
        >
          <h3 className="footer-title underline underline-offset-8 decoration-warning text-base-300 mb-1">
            Our Services
          </h3>
          <ul className="text-base-100 space-y-1">
            {menuItem("Booking & Cancellation Policy", "/policy")}
            {menuItem("Distance Sales Agreement", "/policy")}
            {menuItem("Service Delivery Policy", "/policy")}
            {menuItem("Privacy Policy", "/privacy")}
            {menuItem("Our Vehicles", "/#vehicles")}
            {menuItem("Tours of You", "https://www.toursofyou.com/")}
            {menuItem("TÜRSAB Verification", "https://www.tursab.org.tr/tr/ddsv")}
          </ul>
        </motion.nav>

        {/* === Column 4: Contact === */}
        <motion.address
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
          className="not-italic"
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
        >
          <h3 className="footer-title underline underline-offset-8 decoration-warning text-base-300 mb-1">
            Contact
          </h3>
          <ul className="text-base-100 space-y-2">
            <li className="flex items-center gap-2">
              <PhoneIcon />
              <a
                href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER ?? ""}`}
                className="text-base"
                itemProp="telephone"
                aria-label="Call us via phone number"
              >
                {process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MailIcon />
              <a
                href="mailto:info@airporttohotels.com"
                itemProp="email"
                className="text-base"
              >
                info@airporttohotels.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapIcon />
              <p
                className="text-base leading-snug"
                itemProp="streetAddress"
              >
                Cumhuriyet Mah. Muhammer Ülgen Sok. Samsara Plaza Kat:4 Daire:401
                Kuşadası / Aydın, Turkey
              </p>
            </li>
          </ul>
        </motion.address>
      </div>

      {/* === Footer Bottom Bar === */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true }}
        className="text-white w-full mt-10 flex flex-col items-center gap-4 text-center"
      >
        {/* TÜRSAB logo */}
        <a
          href="https://www.tursab.org.tr/tr/ddsv"
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label="TÜRSAB digital verification system"
        >
          <Image
            src="/images/tursab/tursab-en.webp"
            alt="TÜRSAB Verification Logo"
            width={240}
            height={80}
            className="rounded-box w-auto h-14"
          />
        </a>

        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} All rights reserved — OAK Travel Group
        </p>

        {/* Company credit */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-xs opacity-80">
          <div className="flex items-center gap-1">
            <p>Airport to Hotels is part of</p>
            <Image
              src="/images/logos/Logo-oak.webp"
              alt="OAK Travel Group Logo"
              width={48}
              height={48}
              className="inline-block"
            />
            <span className="pl-1 font-light">OAK Travel Agency</span>
          </div>
          <span className="text-xs font-light">TÜRSAB Reg. No: 12849</span>
        </div>

        <a
          className="text-sm underline-offset-4 hover:underline"
          href="https://gorkemserin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Website Designed by Crehera Web Agency — Görkem Serin
        </a>

        <Image
          src="/images/iyzico.webp"
          alt="iyzico Secure Payment Logo"
          width={120}
          height={120}
          className="opacity-90 mt-2"
        />
      </motion.div>
    </footer>
  );
});

/* === Helper Components === */
function menuItem(text: string, link: string) {
  return (
    <li className="link lg:text-base link-hover">
      <a
        href={link}
        aria-label={`Navigate to ${text}`}
        rel={link.startsWith("http") ? "noopener noreferrer nofollow" : undefined}
      >
        {text}
      </a>
    </li>
  );
}

function PhoneIcon() {
  return (
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
  );
}

function MailIcon() {
  return (
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
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
}

function MapIcon() {
  return (
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
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
}

export default Footer;