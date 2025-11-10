"use client";
import React from 'react';
import { useAuth } from '@/components/AuthContext';

export default function OrdersPage() {
  const auth = useAuth();

  if (!auth.user) {
    return (
      <main className="container-section py-16">
        <h1 className="text-2xl font-bold">Your Orders</h1>
        <p className="mt-4 text-gray-600">Please log in to view orders.</p>
      </main>
    );
  }

  return (
    <main className="container-section py-16">
      <h1 className="text-2xl font-bold">Your Orders</h1>
      <div className="mt-6 space-y-4">
        {auth.user.orders && auth.user.orders.length > 0 ? (
          auth.user.orders.map((o: any) => (
            <div key={o.id} className="border rounded p-3">
              <div className="text-sm text-gray-600">Order ID: {o.id}</div>
              <div className="text-sm text-gray-600">Placed: {new Date(o.createdAt).toLocaleString()}</div>
              <div className="mt-2">
                {o.items.map((it: any) => (
                  <div key={it.id} className="flex items-center justify-between text-sm">
                    <div>{it.name} x {it.qty}</div>
                    <div>₹{(it.price || 0) * it.qty}</div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-600">No orders yet.</div>
        )}
      </div>
    </main>
  );
}
