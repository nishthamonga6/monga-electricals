"use client";
import React from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';

export default function CartButton() {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <Link href={'/cart' as any} className="relative inline-flex items-center gap-2 text-sm px-3 py-1 rounded hover:bg-gray-100 transition-colors" aria-label="Cart">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-gray-700">
        <path d="M6 6h15l-1.5 9h-11L6 6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="20" r="1" fill="currentColor" />
        <circle cx="18" cy="20" r="1" fill="currentColor" />
      </svg>
      <span className="sr-only">Cart</span>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-600 rounded-full">{count}</span>
      )}
    </Link>
  );
}
