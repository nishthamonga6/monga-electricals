"use client";
import React, { useEffect, useState } from 'react';
import { useCart } from '@/components/CartContext';

type Product = { id: string; name: string; price: number; desc?: string };

export default function ProductsPage() {
  const { add } = useCart();
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const raw = localStorage.getItem('monga_products_v1');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('monga_products_v1', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  function addProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !price) return;
    const p: Product = { id: String(Date.now()), name: name.trim(), price: Number(price), desc: desc.trim() };
    setProducts((s) => [p, ...s]);
    setName('');
    setPrice('');
    setDesc('');
  }

  return (
    <div className="container-section py-12">
      <h2 className="text-2xl font-bold">Manage Products</h2>

      <section className="mt-6 p-4 bg-white rounded shadow-sm">
        <h3 className="font-semibold">Add product</h3>
        <form className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3" onSubmit={addProduct}>
          <input className="p-2 border rounded" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="p-2 border rounded" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input className="p-2 border rounded" placeholder="Short description" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <div className="sm:col-span-3">
            <button type="submit" className="mt-3 px-4 py-2 bg-brand text-white rounded">Add product</button>
          </div>
        </form>
      </section>

      <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length === 0 && <p className="text-sm text-gray-600">No products yet — add one above.</p>}
        {products.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow-sm">
            <h4 className="font-semibold">{p.name}</h4>
            <p className="text-sm text-gray-600">{p.desc}</p>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-lg font-medium">₹{p.price.toFixed(2)}</div>
              <div>
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => add({ id: p.id, name: p.name, qty: 1, price: p.price })}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
