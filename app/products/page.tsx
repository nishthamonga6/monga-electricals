"use client";
import React from 'react';
import Image from 'next/image';
import { useCart } from '@/components/CartContext';
import { brands, products as allProducts, Product as PType } from '@/lib/products';

export default function ProductsPage() {
  const { add } = useCart();

  // Group products by brand id (using brands list as source of truth)
  const grouped = brands.map((b) => ({ brand: b, items: allProducts.filter((p) => p.brand && p.brand.toLowerCase() === b.name.toLowerCase()) }));

  return (
    <div className="container-section py-12">
      <h2 className="text-2xl font-bold">Products</h2>
      <p className="text-sm text-gray-600 mt-2">Browse products grouped by the brands we carry.</p>

      <div className="mt-6 space-y-8">
        {grouped.map(({ brand, items }) => (
          <section key={brand.id}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{brand.name}</h3>
              <span className="text-sm text-gray-500">{items.length} items</span>
            </div>

            {items.length === 0 ? (
              <div className="mt-3 text-sm text-gray-600">No products listed for {brand.name}.</div>
            ) : (
              <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((p: PType) => (
                  <div key={p.id} className="bg-white p-4 rounded shadow-sm flex flex-col">
                    <div className="h-28 w-full relative mb-3 bg-gray-50 flex items-center justify-center">
                      {p.image ? (
                        // Use Image when available; fallback to an <img> tag if next/image can't optimize SVG locally
                        <img src={p.image} alt={p.name} className="max-h-20" />
                      ) : (
                        <div className="text-sm text-gray-400">No image</div>
                      )}
                    </div>
                    <h4 className="font-semibold">{p.name}</h4>
                    <p className="text-sm text-gray-600 flex-1">{p.desc}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-lg font-medium">₹{p.price.toFixed(2)}</div>
                      <button className="px-3 py-1 border rounded" onClick={() => add({ id: p.id, name: p.name, qty: 1, price: p.price })}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
