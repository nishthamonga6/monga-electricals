"use client";
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export default function AuthControls() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const auth = useAuth();

  // If logged in, show profile button instead
  if (auth.user) {
    return (
      <div className="relative">
        <ProfileDropdown user={auth.user} logout={() => auth.logout()} />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setShowLogin(true)}
        className="flex items-center gap-2 text-sm px-3 py-1 rounded border border-gray-200 hover:bg-gray-50"
        aria-label="Login"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-gray-700">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>Login</span>
      </button>
      <button
        onClick={() => setShowSignup(true)}
        className="flex items-center gap-2 text-sm px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        aria-label="Sign up"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-white">
          <path d="M12 4v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 21v-2a4 4 0 0 0-4-4H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Sign up</span>
      </button>

      {showLogin && (
        <Modal title="Login" onClose={() => setShowLogin(false)}>
          <AuthForm mode="login" onDone={() => setShowLogin(false)} />
        </Modal>
      )}

      {showSignup && (
        <Modal title="Create account" onClose={() => setShowSignup(false)}>
          <AuthForm mode="signup" onDone={() => setShowSignup(false)} />
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose(): void }) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

function AuthForm({ mode, onDone }: { mode: 'login' | 'signup'; onDone(): void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (mode === 'login') {
          const res = await auth.login(email, password);
          if (!res) {
            alert('Login failed - check email/password');
            return;
          }
          onDone();
        } else {
          await auth.signup({ name: email.split('@')[0], email, password });
          onDone();
        }
      }}
    >
      <div className="space-y-3">
        <div>
          <label htmlFor="auth-email" className="block text-sm">Email</label>
          <input id="auth-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label htmlFor="auth-password" className="block text-sm">Password</label>
          <input id="auth-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1 w-full border rounded px-3 py-2" required />
        </div>
        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={onDone} className="px-3 py-1 border rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{mode === 'login' ? 'Login' : 'Sign up'}</button>
        </div>
      </div>
    </form>
  );
}

function ProfileDropdown({ user, logout }: { user: any; logout(): void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button onClick={() => setOpen((s) => !s)} className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-white border">
        <span className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">{(user.name || user.email || 'U').slice(0,1).toUpperCase()}</span>
        <span className="hidden sm:inline">{user.name}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border py-1">
          <a href="/settings" className="block px-3 py-2 text-sm hover:bg-gray-50">Settings</a>
          <a href="/orders" className="block px-3 py-2 text-sm hover:bg-gray-50">Orders</a>
          <button onClick={() => { logout(); setOpen(false); }} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">Logout</button>
        </div>
      )}
    </div>
  );
}
