"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import AuthControls from './LoginSignup';
import ChatTrigger from './ChatTrigger';
import CartButton from './CartButton';
import SearchBox from './SearchBox';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">
      <div className="container-section h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-brand text-lg hover:text-brand-dark transition-colors">
          Monga Electricals
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/#about" className="hover:text-brand transition-colors">About</Link>
          <Link href="/#services" className="hover:text-brand transition-colors">Services</Link>
          <Link href="/products" className="hover:text-brand transition-colors">Products</Link>
          <Link href="/contact" className="hover:text-brand transition-colors">Contact</Link>
          <Link href={'/product-of-the-month' as any} className="hover:text-brand transition-colors">Product of Month</Link>
          <Link href={'/blog' as any} className="hover:text-brand transition-colors">Blog</Link>
          <div className="ml-2">
            <SearchBox />
          </div>
          <ChatTrigger />
          <CartButton />
          <AuthControls />
        </nav>

        {/* Mobile actions */}
        <div className="md:hidden flex items-center gap-2">
          <CartButton />
          <ChatTrigger />
          <AuthControls />
          {/* hamburger */}
          <button
            aria-label="Toggle menu"
            aria-expanded={open ? 'true' : 'false'}
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {open ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 12h18" />
                  <path d="M3 6h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="container-section py-4 flex flex-col gap-3">
            <Link href="/#about" className="block py-2 px-1 hover:text-brand">About</Link>
            <Link href="/#services" className="block py-2 px-1 hover:text-brand">Services</Link>
            <Link href="/products" className="block py-2 px-1 hover:text-brand">Products</Link>
            <Link href="/contact" className="block py-2 px-1 hover:text-brand">Contact</Link>
            <Link href={'/product-of-the-month' as any} className="block py-2 px-1 hover:text-brand">Product of Month</Link>
            <Link href={'/blog' as any} className="block py-2 px-1 hover:text-brand">Blog</Link>
            <div className="pt-2 border-t mt-2 flex items-center gap-3">
              <SearchBox />
              <CartButton />
              <ChatTrigger />
              <AuthControls />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
