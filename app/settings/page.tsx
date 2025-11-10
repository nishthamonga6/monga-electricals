"use client";
import React from 'react';
import { useAuth } from '@/components/AuthContext';
import { useCart } from '@/components/CartContext';

export default function SettingsPage() {
  const auth = useAuth();
  const { items } = useCart();

  if (!auth.user) {
    return (
      <main className="container-section py-16">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-4 text-gray-600">Please log in to view your settings and order history.</p>
      </main>
    );
  }

  return (
    <main className="container-section py-16">
      <h1 className="text-2xl font-bold">Settings & Profile</h1>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <section className="md:col-span-1 border rounded p-4">
          <h2 className="font-semibold">Profile</h2>
          <div className="mt-3">
            <div className="font-medium">{auth.user.name}</div>
            <div className="text-sm text-gray-600">{auth.user.email}</div>
          </div>
        </section>

        <section className="md:col-span-2 border rounded p-4">
          <h2 className="font-semibold">Orders</h2>
          <div className="mt-3 space-y-3">
            {auth.user.orders && auth.user.orders.length > 0 ? (
              auth.user.orders.map((o: any) => (
                <div key={o.id} className="border rounded p-3">
                  <div className="text-sm text-gray-600">Order ID: {o.id}</div>
                  <div className="text-sm text-gray-600">Placed: {new Date(o.createdAt).toLocaleString()}</div>
                  <div className="mt-2">
                    {o.items.map((it: any) => (
                      <div key={it.id} className="flex items-center justify-between">
                        <div className="text-sm">{it.name} x {it.qty}</div>
                        <div className="text-sm">₹{(it.price || 0) * it.qty}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-600">No orders yet.</div>
            )}
          </div>

          <h2 className="font-semibold mt-6">Search History</h2>
          <div className="mt-3 text-sm text-gray-700">
            {auth.user.searches && auth.user.searches.length > 0 ? (
              <ul className="list-disc pl-5">
                {auth.user.searches.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-gray-600">No searches recorded.</div>
            )}
          </div>

          <h2 className="font-semibold mt-6">Current Cart Snapshot</h2>
          <div className="mt-3">
            {items.length === 0 ? (
              <div className="text-sm text-gray-600">Your cart is empty.</div>
            ) : (
              items.map((it) => (
                <div key={it.id} className="flex items-center justify-between text-sm">
                  <div>{it.name} x {it.qty}</div>
                  <div>₹{(it.price || 0) * it.qty}</div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
