"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

type Props = {
  target: number;
  duration?: number; // ms
  label?: string;
  suffix?: string;
};

export default function AnimatedCounter({ target, duration = 1400, label, suffix = '' }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '0px' });
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(target);
      setDone(true);
      return;
    }

    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const t = Math.min(1, elapsed / duration);
      // easeOutQuad
      const eased = 1 - (1 - t) * (1 - t);
      const current = Math.floor(eased * target);
      setValue(current);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        setValue(target);
        setDone(true);
      }
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduced]);

  return (
    <div ref={ref} className="flex flex-col items-start">
      <motion.span
        className="text-3xl font-bold"
        animate={done && !reduced ? { scale: [1, 1.06, 1] } : {}}
        transition={{ duration: 0.45 }}
        style={{ willChange: 'transform' }}
      >
        {value}
        {suffix}
      </motion.span>
      {label ? <span className="text-sm text-gray-600 mt-1">{label}</span> : null}
    </div>
  );
}
