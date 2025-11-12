"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../components/AuthContext';

export default function SignupPage() {
  const auth = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await auth.signup({ name: name || email.split('@')[0], email, password });
      if (!user) {
        setError('Signup failed');
        setLoading(false);
        return;
      }
      router.push('/');
    } catch (err: any) {
      setError(err?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Create an account</h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm">Full name</label>
            <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} type="text" className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex items-center justify-between">
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50" disabled={loading}>
              {loading ? 'Creating…' : 'Create account'}
            </button>
            <a href="/auth/login" className="text-sm text-indigo-600">Already have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
