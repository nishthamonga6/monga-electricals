'use client';
import { motion, useReducedMotion } from 'framer-motion';

const services = [
  { title: 'Retail & Wholesale', desc: 'Electricals for homes, shops, and sites.' },
  { title: 'Product Guidance', desc: 'We help you choose dependable brands.' },
  { title: 'Bulk Orders', desc: 'Project and contractor friendly pricing.' },
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Services() {
  const reduce = useReducedMotion();
  return (
    <section id="services" className="bg-gray-50">
      <div className="container-section py-16">
        <motion.h2
          className="text-3xl font-bold tracking-tight"
          initial={reduce ? undefined : { opacity: 0, y: 40 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
          viewport={{ once: true }}
        >
          Our Services
        </motion.h2>
        <motion.div
          className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial={reduce ? undefined : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={{ once: true }}
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              className="rounded-lg border bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              variants={itemVariants}
              whileHover={reduce ? undefined : { scale: 1.02, y: -3 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              style={{ willChange: 'transform, opacity' }}
            >
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
