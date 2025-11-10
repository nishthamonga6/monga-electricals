"use client";
import React from 'react';
import { useCart } from '@/components/CartContext';
import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';

export default function CartPage() {
  const { items, remove, clear } = useCart();
  const auth = useAuth();

  const total = items.reduce((s, i) => s + (i.price || 0) * i.qty, 0);

  return (
    <main className="container-section py-16">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <div>
          <p className="text-gray-600">Your cart is empty.</p>
          <Link href="/products" className="text-brand underline">Browse products</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((it) => (
            <div key={it.id} className="flex items-center justify-between border rounded p-3">
              <div>
                <div className="font-semibold">{it.name}</div>
                <div className="text-sm text-gray-600">Qty: {it.qty}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-semibold">₹{((it.price || 0) * it.qty).toFixed(2)}</div>
                <button className="text-sm text-red-600" onClick={() => remove(it.id)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Total</div>
            <div className="text-xl font-bold">₹{total.toFixed(2)}</div>
          </div>

          <div className="flex gap-3">
            <button
              className="bg-accent text-black px-4 py-2 rounded-md"
              onClick={() => {
                // create an order and save to auth (simple local action)
                if (auth?.user) {
                  auth.addOrder?.({ items, total });
                  clear();
                  alert('Order placed — saved to your order history.');
                } else {
                  alert('Please login or sign up to place an order.');
                }
              }}
            >Proceed to Checkout</button>
            <button className="border px-4 py-2 rounded-md" onClick={() => clear()}>Clear</button>
          </div>
        </div>
      )}
    </main>
  );
}
