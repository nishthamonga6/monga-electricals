"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  password?: string;
  orders?: any[];
  searches?: string[];
};

type AuthContextValue = {
  user: User | null;
  signup: (u: { name: string; email: string; password: string }) => Promise<User>;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  updateProfile: (patch: Partial<User>) => void;
  addSearch: (term: string) => void;
  addOrder: (order: any) => void;
};

const KEY = 'monga_user_v1';
const ACCOUNTS_KEY = 'monga_accounts_v1';

type Stored = { user: User; token?: string };

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed: Stored = JSON.parse(raw);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(KEY, JSON.stringify({ user, token }));
      else localStorage.removeItem(KEY);
    } catch (e) {}
  }, [user, token]);

  async function signup({ name, email, password }: { name: string; email: string; password: string }) {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Signup failed');
      setUser(data.user);
      setToken(data.token || null);
      return data.user as User;
    } catch (e) {
      // Fallback to local-only behaviour for offline/demo
      const newUser: User = {
        id: 'u_' + Date.now(),
        name,
        email,
        password,
        avatar: null,
        orders: [],
        searches: [],
      };
      // persist fallback account so user can log in again after logout
      try {
        const raw = localStorage.getItem(ACCOUNTS_KEY);
        const existing = raw ? (JSON.parse(raw) as User[]) : [];
        const next = [...existing.filter((a) => a.email !== newUser.email), newUser];
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(next));
      } catch (err) {
        // ignore
      }
      setUser(newUser);
      return newUser;
    }
  }

  async function login(email: string, password: string) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Login failed');
      setUser(data.user);
      setToken(data.token || null);
      return data.user as User;
    } catch (e) {
      // fallback to local-storage check
      try {
        // First check current session storage
        const raw = localStorage.getItem(KEY);
        if (raw) {
          const stored: Stored = JSON.parse(raw);
          if (stored.user?.email === email && stored.user?.password === password) {
            setUser(stored.user);
            setToken(stored.token || null);
            return stored.user;
          }
        }

        // Then check fallback accounts registry (created when offline signing up)
        const accountsRaw = localStorage.getItem(ACCOUNTS_KEY);
        if (!accountsRaw) return null;
        const accounts: User[] = JSON.parse(accountsRaw);
        const matched = accounts.find((a) => a.email === email && a.password === password);
        if (matched) {
          setUser(matched);
          // no token available for fallback accounts
          setToken(null);
          return matched;
        }
        return null;
      } catch (err) {
        return null;
      }
    }
  }

  function logout() {
    // clear active session but keep local fallback accounts (if any)
    setUser(null);
    setToken(null);
  }

  function updateProfile(patch: Partial<User>) {
    setUser((u) => (u ? { ...u, ...patch } : u));
  }

  function addSearch(term: string) {
    setUser((u) => {
      if (!u) return u;
      const searches = [term, ...(u.searches || [])].slice(0, 50);
      const next = { ...u, searches };
      return next;
    });
  }

  function addOrder(order: any) {
    setUser((u) => {
      if (!u) return u;
      const orders = [{ id: 'o_' + Date.now(), createdAt: new Date().toISOString(), ...order }, ...(u.orders || [])];
      const next = { ...u, orders };
      return next;
    });
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateProfile, addSearch, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
