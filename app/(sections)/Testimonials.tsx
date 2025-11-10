"use client";

const testimonials = [
  { name: 'Rohit', text: 'Good quality products and helpful staff.' },
  { name: 'Simran', text: 'Got wires and switches for my home renovation. Recommended.' },
  { name: 'Aman', text: 'Fair pricing and original items.' },
];

import { motion, useReducedMotion } from 'framer-motion';

export default function Testimonials() {
  const reduce = useReducedMotion();
  const item = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

  return (
    <section className="bg-white">
      <div className="container-section py-16">
        <motion.h2
          className="text-3xl font-bold tracking-tight"
          initial={reduce ? undefined : { opacity: 0, y: 40 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
          viewport={{ once: true }}
        >
          What Customers Say
        </motion.h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              className="rounded-lg border p-6 bg-gray-50"
              initial={reduce ? undefined : 'hidden'}
              whileInView={reduce ? undefined : 'visible'}
              variants={item}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={reduce ? undefined : { scale: 1.01 }}
              style={{ willChange: 'transform, opacity' }}
            >
              <blockquote className="text-gray-700">“{t.text}”</blockquote>
              <figcaption className="mt-4 text-sm text-gray-600">— {t.name}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
