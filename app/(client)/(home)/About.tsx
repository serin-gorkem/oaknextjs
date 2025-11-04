"use client";
import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const About = memo(function () {
  return (
    <section
      id="about"
      className="relative w-full h-[40rem] xl:max-w-9/12 lg:max-w-11/12 lg:mx-auto overflow-hidden"
    >
      {/* Background image with cinematic motion */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="/images/about.webp"
          alt="About Us"
          fill
          className="rounded-box object-cover"
          priority
        />
      </motion.div>

      {/* Text content block */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
        className="lg:p-16 p-4 max-w-2xl relative z-10"
      >
        <div className="bg-base-300 lg:h-[33rem] lg:w-[60rem] rounded-[10px] p-4 lg:p-8 opacity-90 shadow-md">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-xl title lg:text-xl text-warning lg:text-left text-center font-bold leading-tight"
              >
                About Us
              </motion.p>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-6xl lg:w-5/6 lg:text-left text-center w-full leading-tight"
              >
                We are <br /> Airport to Hotels
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              className="text-base lg:text-xl opacity-85 lg:w-5/6 w-full  leading-tight"
            >
              At Airport to Hotels, we specialize in providing seamless,
              reliable, and comfortable transfers directly from airports to your
              hotel. Our mission is to make your arrival and departure effortless,
              allowing you to start and end your trip with ease.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              aria-label="Book now button"
              className="btn w-48 h-12 bg-primary text-white hover:bg-warning hover:border-warning hover:shadow-none hover:text-base-100"
            >
              <a href="/about" className="w-full" aria-label="Go to book now.">
                Learn More
              </a>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
});

export default About;