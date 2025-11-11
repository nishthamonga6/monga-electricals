"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Brands list (includes remote URLs for logos you provided). Bajaj was removed per earlier request.
const brands = [
  {
    id: 'orient',
    name: 'Orient',
    src: 'https://tse4.mm.bing.net/th/id/OIP.Aym69WFn6h7wRdBY67172QHaEA?w=316&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  },
  {
    id: 'microtek',
    name: 'Microtek',
    src: 'https://tse3.mm.bing.net/th/id/OIP.EODj4EDTnprt-lcIYQrxfwHaDR?rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 'livpure',
    name: 'Livpure',
    src: 'https://bl-i.thgim.com/public/incoming/g7ynwr/article65439342.ece/alternates/FREE_1200/luminous-logo.png',
  },
  {
    id: 'luminous',
    name: 'Luminous',
    src: 'https://logos-world.net/wp-content/uploads/2023/03/Havells-Logo.png',
  },
  { id: 'kent', name: 'Kent', src: 'https://tse3.mm.bing.net/th/id/OIP.2Os3mGb99prqN9hPgS-D0QHaFj?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'racold', name: 'Racold', src: 'https://static.businessworld.in/2591470043527Racold-Logo.jpg' },
  { id: 'philips', name: 'Philips', src: 'https://tse2.mm.bing.net/th/id/OIP.isnY6lNbKgGdax0zB0oG5QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
];

export default function Brands() {
  const [openAll, setOpenAll] = useState(false);
  return (
    <section className="bg-gray-50">
      <div className="container-section py-12">
        <motion.h2
          className="text-2xl font-semibold tracking-tight mb-6"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Brands We Deal In
        </motion.h2>

        <div role="region" aria-label="Brands list">
          <div className="flex justify-end mb-3">
            <button
              className="text-sm text-gray-700 hover:text-brand underline"
              onClick={() => setOpenAll(true)}
            >
              Show all brands
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-items-center py-4">
            {brands.map((b, i) => (
              <motion.div
                key={b.id}
                className="flex items-center justify-center"
                title={b.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 flex items-center justify-center bg-white rounded-md p-3 shadow-sm hover:shadow-md transition-shadow">
                  {
                    // Use next/image for both local and remote images to satisfy Next.js optimization
                  }
                  <Image src={b.src} alt={`${b.name} logo`} width={200} height={200} className="brand-logo" />
                </div>
              </motion.div>
            ))}
          </div>
          {/* Full-grid modal */}
          {openAll && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40" onClick={() => setOpenAll(false)} />
              <div className="relative w-[95%] max-w-4xl bg-white rounded-lg shadow-lg p-6 overflow-auto max-h-[80vh]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">All Brands</h3>
                  <button onClick={() => setOpenAll(false)} className="text-sm text-gray-600">Close</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {brands.map((b) => (
                    <div key={b.id} className="flex items-center justify-center">
                      <div className="w-36 h-36 flex items-center justify-center bg-white rounded-md p-3 shadow-sm">
                        <Image src={b.src} alt={`${b.name} logo`} width={160} height={160} className="brand-logo" />
                      </div>
                      <div className="text-center mt-2 text-sm">{b.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
