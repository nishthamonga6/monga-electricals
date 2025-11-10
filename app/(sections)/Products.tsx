"use client";
import { motion, useReducedMotion } from 'framer-motion';
import { useCart } from '@/components/CartContext';

const products = [
  { name: 'MCBs & DBs', desc: 'Protection devices for safety.' },
  { name: 'Wires & Cables', desc: 'ISI-marked for reliability.' },
  { name: 'Switches & Sockets', desc: 'Modern designs and finishes.' },
  { name: 'LED Lighting', desc: 'Bulbs, panels, strips, floodlights.' },
  { name: 'Fans', desc: 'Ceiling, pedestal, and exhaust fans.' },
  { name: 'Accessories', desc: 'Conduits, boxes, tapes, and more.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Products() {
  const { add } = useCart();
  const reduce = useReducedMotion();
  return (
    <section id="products" className="bg-white">
      <div className="container-section py-16">
        <motion.h2
          className="text-3xl font-bold tracking-tight"
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
          viewport={{ once: true }}
        >
          Products
        </motion.h2>
        <motion.div
          className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true }}
        >
          {products.map((p) => (
            <motion.div
              key={p.name}
              className="rounded-lg border p-6 hover:shadow-md hover:border-brand/20 transition-all duration-200"
              variants={itemVariants}
              whileHover={reduce ? undefined : { scale: 1.03, y: -4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, duration: 0.28 }}
              style={{ willChange: 'transform, opacity' }}
            >
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-2 text-gray-600">{p.desc}</p>
              <div className="mt-4 flex items-center gap-3">
                <button
                  className="text-sm px-3 py-1 border rounded"
                  onClick={() => add({ id: p.name, name: p.name, qty: 1 })}
                >
                  Add to cart
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
