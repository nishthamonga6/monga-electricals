"use client";
import React from 'react';
import { useCart } from './CartContext';

export default function ProductOfMonth() {
  const { add } = useCart();

  const product = {
    id: 'led-panel-24w',
    name: 'LED Panel 24W (Warm White)',
    price: 499,
  };

  return (
    <div className="rounded-lg border p-6 grid md:grid-cols-3 gap-6 items-center">
      <div className="md:col-span-1">
        <div className="w-full h-40 bg-gray-100 rounded-md flex items-center justify-center">Image</div>
      </div>
      <div className="md:col-span-2">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="mt-2 text-gray-600">High efficiency LED panel suitable for home and office lighting.</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="text-2xl font-bold">₹{product.price}</div>
          <button
            className="bg-accent text-black px-4 py-2 rounded-md font-semibold"
            onClick={() => add({ id: product.id, name: product.name, qty: 1, price: product.price })}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
