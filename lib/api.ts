// Lightweight API client used by the Next frontend.
// Uses NEXT_PUBLIC_API_URL (e.g. http://localhost:5000) or empty string for same-origin.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

// This client expects a backend URL in NEXT_PUBLIC_API_URL. If not set, it will use http://localhost:5000 by default.

type GetProductsParams = { brand?: string; q?: string };

function getAuthHeaders(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  // token may be stored either in the legacy 'monga_token' key or inside the AuthContext storage key
  const token = localStorage.getItem('monga_token') || (() => {
    try {
      const raw = localStorage.getItem('monga_user_v1');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed?.token || null;
    } catch (e) {
      return null;
    }
  })();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getProducts(params: GetProductsParams = {}): Promise<any[]> {
  // Call the configured backend (or default to localhost:5000)
  const basePath = API_BASE || 'http://localhost:5000';
  const urlBase = `${basePath}/products`;
  const search = new URLSearchParams();
  if (params.brand) search.set('brand', params.brand);
  if (params.q) search.set('q', params.q);
  const final = search.toString() ? `${urlBase}?${search.toString()}` : urlBase;
  const res = await fetch(final, { headers: { 'Content-Type': 'application/json' } });
  if (!res.ok) throw new Error('Failed to fetch products');
  const body = await res.json();
  return body.products || [];
}

export async function getProduct(id: string): Promise<any> {
  const url = API_BASE ? `${API_BASE}/products/${id}` : `/api/products/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch product');
  const body = await res.json();
  return body.product;
}

export async function createOrder(payload: any): Promise<any> {
  const url = API_BASE ? `${API_BASE}/orders` : '/api/orders';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(getAuthHeaders() as Record<string, string>) },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
}

export async function login(email: string, password: string): Promise<any> {
  const res = await fetch((API_BASE || '') + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  const body = await res.json();
  if (typeof window !== 'undefined' && body.token) localStorage.setItem('monga_token', body.token);
  return body;
}

export async function signup(name: string, email: string, password: string): Promise<any> {
  const res = await fetch((API_BASE || '') + '/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error('Signup failed');
  const body = await res.json();
  if (typeof window !== 'undefined' && body.token) localStorage.setItem('monga_token', body.token);
  return body;
}

export function logout(): void {
  if (typeof window !== 'undefined') localStorage.removeItem('monga_token');
}
