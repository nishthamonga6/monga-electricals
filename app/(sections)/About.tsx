"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function About() {
  const reduce = useReducedMotion();
  return (
    <section id="about" className="bg-white">
      <div className="container-section py-16 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 40 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight">About Us</h2>
          <p className="mt-4 text-gray-700">
            We are a trusted electricals store in Sirsa dealing in quality brands for home and industrial needs: wires,
            MCBs, switches, lighting, fans, and much more. Our focus is reliable products and honest advice.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <AnimatedCounter target={3500} label="Happy Customers" />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <AnimatedCounter target={18} suffix="+" label="Years of Service" />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <AnimatedCounter target={1200} label="Projects Supplied" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-lg overflow-hidden bg-gray-100"
          initial={reduce ? undefined : { opacity: 0, y: 40, scale: 0.98 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.8, 0.25, 1] }}
          viewport={{ once: true }}
        >
          {/* smaller, responsive local image with fill to control height */}
          <div className="relative w-full h-40 md:h-56 lg:h-72">
            <Image src="/monga-store.jpg" alt="Monga Electricals store front" fill className="object-cover" priority />
            <Link
              href="https://www.justdial.com/Sirsa-Haryana/Monga-Electricals-Near-Bsnl-Telephone-Exchange-Dwarka-Puri/9999P1666-1666-221104030300-S5I1_BZDET#"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-3 bottom-3 z-20 inline-flex items-center gap-2 bg-white/90 text-sm text-gray-800 px-3 py-1 rounded-md shadow-md hover:scale-105 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" className="opacity-90">
                <path d="M13 7h6v6" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 4L10 14" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 21H3V3" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Justdial listing</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
