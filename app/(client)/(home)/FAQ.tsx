"use client";
import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";

const FAQ = memo(function () {
  return (
    <section
      id="FAQ"
      className="h-fit mt-16 px-2 pb-8 flex flex-col lg:p-0 xl:max-w-9/12 lg:max-w-11/12 mx-auto gap-8 lg:gap-16"
    >
      {/* Başlık */}
      <motion.figure
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col gap-2.5"
      >
        <figcaption className="text-xl title lg:text-2xl text-warning font-bold font-heading leading-tight">
          FAQ
        </figcaption>
        <h1 className="text-2xl lg:text-4xl font-bold opacity-85">
          Frequently Asked Questions
        </h1>
      </motion.figure>

      {/* İçerik */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-4">
        <motion.div
          className="flex flex-col justify-between flex-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <FAQElement
            title="What is Airport to Hotels and what services do you provide?"
            text="Airport to Hotels offers private and shared transfers between airports and hotels across Turkey. Our mission is to provide seamless, reliable, and comfortable rides so that your arrival and departure are stress-free. We operate with licensed vehicles and professional drivers."
          />
          <FAQElement
            title="Which airports and destinations do you cover?"
            text="We currently operate transfers at major Turkish airports including Istanbul Airport, Sabiha Gökçen, İzmir Adnan Menderes, Bodrum Milas, Dalaman, Antalya, Kayseri (Erkilet), Nevşehir Kapadokya, Esenboğa, Adana Şakirpaşa, Şanlıurfa (GAP) and Trabzon. We deliver door-to-door service from airport → hotel or hotel → airport within Turkey."
          />
          <FAQElement
            title="Can I request additional services (child seats, extra luggage, VIP)?"
            text="Yes. During the booking process you may add optional extras such as child seats, extra luggage space, or a VIP chauffeur service. These options help tailor the ride to your needs."
          />
          <FAQElement
            title="What are your rates, and are there hidden fees?"
            text="We believe in clear & transparent pricing. The price shown when booking is the total you’ll pay — no hidden fees or surprises."
          />
        </motion.div>

        {/* Görsel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <Image
            src="/images/faq.webp"
            alt="FAQ"
            width={1920}
            height={1080}
            className="rounded-box w-full h-96 object-cover shadow-lg"
          />
        </motion.div>
      </div>

      {/* Alt kısım */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-3"
      >
        <h2 className="text-xl md:text-2xl font-bold">
          Still have questions?
        </h2>
        <p className="text-base md:text-lg">
          Please contact our support team — we’re happy to help!
        </p>
        <button className="btn btn-outline px-8 btn-lg">Contact Us</button>
      </motion.div>
    </section>
  );
});

type FAQElementProps = {
  title: string;
  text: string;
};

function FAQElement(props: FAQElementProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="collapse collapse-arrow join-item border-primary border rounded-box"
    >
      <input
        aria-label="faq-element"
        type="radio"
        name="faq-accordion"
        defaultChecked={false}
      />
      <div className="collapse-title font-semibold">{props.title}</div>
      <div className="collapse-content text-sm opacity-80">{props.text}</div>
    </motion.div>
  );
}

export default FAQ;