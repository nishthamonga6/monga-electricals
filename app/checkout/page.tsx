"use client";
import React, { useState } from 'react';
import { useCart } from '@/components/CartContext';
import { createOrder } from '@/lib/api';

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const total = items.reduce((s, i) => s + (i.price || 0) * i.qty, 0);

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !address) return setMessage('Please fill all fields');
    setLoading(true);
    try {
      const payload = {
        items: items.map((it) => ({ product: it.id, name: it.name, price: it.price, qty: it.qty })),
        total,
        customer: { name, phone, address },
      };
      await createOrder(payload);
      setMessage('Order placed successfully');
      clear();
      setName('');
      setPhone('');
      setAddress('');
    } catch (err: any) {
      setMessage(err?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-section py-12">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <form className="max-w-md bg-white p-4 rounded shadow-sm" onSubmit={placeOrder}>
        {message && <div className="mb-3 text-sm text-green-700">{message}</div>}
        <label className="block mb-2">Name<input className="w-full p-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} /></label>
        <label className="block mb-2">Phone<input className="w-full p-2 border rounded" value={phone} onChange={(e) => setPhone(e.target.value)} /></label>
        <label className="block mb-2">Address<textarea className="w-full p-2 border rounded" value={address} onChange={(e) => setAddress(e.target.value)} /></label>

        <div className="mt-4 flex items-center justify-between">
          <div className="font-medium">Total: ₹{total.toFixed(2)}</div>
          <button className="px-4 py-2 bg-brand text-white rounded" disabled={loading}>{loading ? 'Placing...' : 'Place order'}</button>
        </div>
      </form>
    </div>
  );
}
