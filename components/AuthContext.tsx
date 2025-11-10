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

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(KEY, JSON.stringify(user));
      else localStorage.removeItem(KEY);
    } catch (e) {}
  }, [user]);

  async function signup({ name, email, password }: { name: string; email: string; password: string }) {
    const newUser: User = {
      id: 'u_' + Date.now(),
      name,
      email,
      password,
      avatar: null,
      orders: [],
      searches: [],
    };
    setUser(newUser);
    return newUser;
  }

  async function login(email: string, password: string) {
    // For demo: check stored user in localStorage
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      const stored: User = JSON.parse(raw);
      if (stored.email === email && stored.password === password) {
        setUser(stored);
        return stored;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  function logout() {
    setUser(null);
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
