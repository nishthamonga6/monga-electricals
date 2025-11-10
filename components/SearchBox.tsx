"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

export default function SearchBox() {
  const [q, setQ] = useState('');
  const router = useRouter();
  const auth = useAuth();

  function submit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!q.trim()) return;
    auth.addSearch(q.trim());
    router.push(`/?q=${encodeURIComponent(q.trim())}`);
    setQ('');
  }

  return (
    <form onSubmit={submit} className="flex items-center">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="text-sm px-2 py-1 border rounded-l-md w-40" />
      <button type="submit" className="px-2 py-1 bg-gray-100 border border-l-0 rounded-r-md text-sm">Search</button>
    </form>
  );
}
