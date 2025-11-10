"use client";
import { motion, useReducedMotion } from 'framer-motion';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const child = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-brand to-brand-dark" />
      <div className="container-section py-24 relative">
        <motion.div
          className="max-w-3xl"
          variants={container}
          initial={reduce ? undefined : 'hidden'}
          animate={reduce ? undefined : 'visible'}
          style={{ willChange: 'transform, opacity' }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            variants={child}
            transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
          >
            Monga Electricals
          </motion.h1>

          <motion.p
            className="mt-4 text-lg max-w-2xl"
            variants={child}
            transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1], delay: 0.06 }}
          >
            Electrical supplies in Sirsa — Wires, MCBs, Switches, Fans, Lighting and more. Quality brands, fair prices.
          </motion.p>

          <motion.div
            className="mt-8 flex gap-4"
            variants={child}
            transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1], delay: 0.12 }}
          >
            <a
              href="#services"
              className="bg-accent text-black px-6 py-3 rounded-md font-semibold hover:opacity-90 hover:scale-105 transition-all duration-200"
            >
              Our Services
            </a>
            <a
              href="/contact"
              className="border border-white/80 px-6 py-3 rounded-md font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-200"
            >
              Contact Us
            </a>
          </motion.div>
        </motion.div>

        {/* Decorative hero visual: subtle pop-in image/shape */}
        <motion.div
          aria-hidden
          className="absolute right-8 top-12 hidden md:block w-80 h-80 rounded-xl overflow-hidden bg-white/5"
          initial={reduce ? {} : { opacity: 0, y: 20, scale: 0.95 }}
          animate={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1], delay: 0.18 }}
          style={{ willChange: 'transform, opacity' }}
        />

        {/* removed Facebook overlay to keep page uncluttered; latest posts are shown in the footer section */}
      </div>
    </section>
  );
}
