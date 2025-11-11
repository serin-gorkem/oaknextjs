"use client";

import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";

/* === Component === */
const FAQ = memo(function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="h-fit mt-16 px-2 pb-8 flex flex-col xl:max-w-6xl lg:max-w-5xl mx-auto gap-12 lg:gap-16"
    >
      {/* === Section Header === */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col gap-2 text-center lg:text-left"
      >
        <h2
          id="faq-heading"
          className="text-xl lg:text-2xl text-warning font-bold uppercase tracking-wide"
        >
          FAQ
        </h2>
        <h3 className="text-2xl lg:text-4xl font-bold text-base-content/90">
          Frequently Asked Questions
        </h3>
      </motion.header>

      {/* === FAQ Content === */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-6">
        {/* Left column: FAQ list */}
        <motion.div
          className="flex flex-col justify-between flex-1 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {faqData.map((item) => (
            <FAQItem key={item.title} {...item} />
          ))}
        </motion.div>

        {/* Right column: Image */}
        <motion.figure
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <Image
            src="/images/faq.webp"
            alt="Customer service representative answering airport transfer questions"
            width={1920}
            height={1080}
            className="rounded-box w-full h-96 object-cover shadow-lg"
            loading="lazy"
            quality={75}
          />
        </motion.figure>
      </div>

      {/* === Bottom CTA === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-3 text-center"
      >
        <h4 className="text-xl md:text-2xl font-bold text-base-content">
          Still Have Questions?
        </h4>
        <p className="text-base md:text-lg text-base-content/80">
          Contact our support team — we’re here 24/7 to assist you.
        </p>
        <a
          href="/#contact"
          className="btn btn-outline px-8 btn-lg"
          aria-label="Navigate to contact section"
        >
          Contact Us
        </a>
      </motion.div>
    </section>
  );
});

/* === FAQ Item Component (semantic accordion) === */
type FAQItemProps = {
  title: string;
  text: string;
};

function FAQItem({ title, text }: FAQItemProps) {
  return (
    <motion.details
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="border border-primary/40 rounded-xl bg-white/80 backdrop-blur-md shadow-sm p-4 open:shadow-md transition-all"
    >
      <summary
        className="font-semibold cursor-pointer text-base-content/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-warning rounded-md"
        aria-expanded="false"
      >
        {title}
      </summary>
      <p className="mt-3 text-sm lg:text-base text-base-content/70 leading-relaxed">
        {text}
      </p>
    </motion.details>
  );
}

export default FAQ;

/* === Static FAQ Data === */
const faqData = [
  {
    title: "What is Airport to Hotels and what services do you provide?",
    text: "Airport to Hotels offers private and shared transfers between airports and hotels across Turkey. We aim to provide seamless, reliable, and comfortable rides with licensed vehicles and professional drivers.",
  },
  {
    title: "Which airports and destinations do you cover?",
    text: "We currently serve major airports in Turkey, including Istanbul, Sabiha Gökçen, İzmir, Bodrum, Dalaman, Antalya, Kayseri, Cappadocia, Ankara, Adana, Şanlıurfa, and Trabzon. We deliver door-to-door transfers across the country.",
  },
  {
    title: "Can I request additional services like child seats or VIP options?",
    text: "Yes, during booking you can add extras such as child seats, extra luggage space, or VIP chauffeur service to customize your journey.",
  },
  {
    title: "What are your rates, and are there hidden fees?",
    text: "All prices are fully transparent. The price shown at checkout is the total you’ll pay — no hidden fees or extra charges.",
  },
];