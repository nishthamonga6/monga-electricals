"use client";
import React, { useEffect, useState } from 'react';
import { login } from '@/lib/api';

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function doLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
      setMessage('Logged in — you can now use admin APIs via the backend');
    } catch (err: any) {
      setMessage(err?.message || 'Login failed');
    }
  }

  return (
    <div className="container-section py-12">
      <h1 className="text-2xl font-semibold mb-4">Admin</h1>
      <form className="max-w-sm bg-white p-4 rounded shadow-sm" onSubmit={doLogin}>
        {message && <div className="mb-3 text-sm text-green-700">{message}</div>}
        <label className="block mb-2">Email<input className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label className="block mb-2">Password<input type="password" className="w-full p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        <div className="mt-4">
          <button className="px-4 py-2 bg-brand text-white rounded">Login</button>
        </div>
      </form>
    </div>
  );
}
