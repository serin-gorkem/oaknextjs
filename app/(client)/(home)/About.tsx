"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const About = memo(function About() {
  return (
    <section
      id="about"
      className="relative w-full h-[40rem] xl:max-w-6xl lg:max-w-5xl mx-auto overflow-hidden"
    >
      {/* === Background Image with Subtle Motion === */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="/images/about.webp"
          alt="Airport To Hotels transfer service background"
          fill
          className="object-cover rounded-box"
          priority={false}
          quality={75}
          sizes="100vw"
        />
        {/* Overlay for text contrast */}
        <div className="absolute inset-0 bg-black/30 rounded-box" />
      </motion.div>

      {/* === Text Content === */}
      <motion.article
        initial={{ x: -60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
        className="relative z-10 p-4 lg:p-16 max-w-2xl"
      >
        <div className="bg-base-300/90 backdrop-blur-md rounded-2xl p-6 lg:p-10 shadow-md">
          {/* === Title & Subtitle === */}
          <header className="flex flex-col gap-3">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-xl lg:text-2xl text-warning font-semibold tracking-wide uppercase text-center lg:text-left"
            >
              About Us
            </motion.h2>

            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-5xl font-bold leading-tight text-center lg:text-left text-base-content"
            >
              We Are Airport To Hotels
            </motion.h3>
          </header>

          {/* === Description === */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 text-base lg:text-lg text-base-content/90 leading-relaxed"
          >
            At Airport To Hotels, we provide seamless, reliable, and comfortable
            transfers directly from airports to your hotel. Our mission is to
            make your arrival and departure effortless — allowing you to start
            and end your trip in total comfort.
          </motion.p>

          {/* === CTA Button === */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <a
              href="/about"
              aria-label="Navigate to About page"
              className="btn w-48 h-12 bg-primary text-white hover:bg-warning hover:border-warning hover:text-base-100 transition-colors"
            >
              Learn More About Us
            </a>
          </motion.div>
        </div>
      </motion.article>
    </section>
  );
});

export default About;