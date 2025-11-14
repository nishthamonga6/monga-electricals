"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { useCart } from '@/components/CartContext';

// Keep your existing product data intact
const PRODUCTS = [
  { id: 'product-1', name: 'Welding Machine', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWpsERNgh3n3He0HuB2ylMwTLorRKbK4y344CB9Yom19LiFjjm', desc: 'Reliable welding machine for industrial use.', price: 19999, rating: 4.3, reviews: 124 },
  { id: 'product-2', name: 'Cutting Machine', image: 'https://5.imimg.com/data5/SELLER/Default/2024/9/448532834/HG/TI/WO/81144813/55-500x500.jpg', desc: 'High precision cutting machine for metal works.', price: 14999, rating: 4.1, reviews: 88 },
  { id: 'product-3', name: 'Drilling Machine', image: 'https://productimages.withfloats.com/tile/68cc0736cd0e8f5d490473c2.jpeg', desc: 'Powerful drilling machine for accurate holes.', price: 8999, rating: 4.0, reviews: 54 },
  { id: 'product-4', name: 'Electric Grinder', image: 'https://www.bestomart.com/cdn/shop/files/1000136467-2_grande.jpg?v=1736241787', desc: 'Compact electric grinder for finishing and shaping.', price: 2999, rating: 4.2, reviews: 41 },
  { id: 'product-5', name: 'Water Geyser', image: 'https://rukminim2.flixcart.com/image/300/300/xif0q/water-geyser/m/h/a/2024-aqua-therm-3000-lazer-5-5-original-imah6xef565evbjq.jpeg', desc: 'Efficient water geyser for home and commercial use.', price: 6999, rating: 4.4, reviews: 221 },
  { id: 'product-6', name: 'Product 6', image: 'https://cdn.moglix.com/p/ci1D4WIvAKbjx-xxlarge.jpg', desc: '', price: 0, rating: 4.0, reviews: 3 },
  { id: 'product-7', name: 'Product 7', image: 'https://rukminim2.flixcart.com/image/480/640/l3hmwsw0/room-heater/u/q/g/hot-waves-lazer-2000-original-imagehzggekzq6nb.jpeg?q=20', desc: '', price: 0, rating: 3.9, reviews: 12 },
  { id: 'product-8', name: 'Product 8', image: 'https://5.imimg.com/data5/SELLER/Default/2025/7/528076508/LF/UY/ZF/247216349/commercial-ro-plant.jpg', desc: '', price: 0, rating: 4.5, reviews: 7 },
  { id: 'product-9', name: 'Product 9', image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRk9CTE2vz3c2CVk8XSJMVTAc9kPg5BouG8I5exm4Cs-xkXwxJM', desc: '', price: 0, rating: 4.0, reviews: 2 },
  { id: 'product-10', name: 'Product 10', image: 'https://rukminim2.flixcart.com/image/480/640/kw3v0cw0/water-geyser/b/w/y/2021-cdr-dlx-vertical-water-heater-25-liter-2000-racold-25-original-imag8usdf6qsguh6.jpeg?q=90', desc: '', price: 0, rating: 4.1, reviews: 8 },
  { id: 'product-11', name: 'Product 11', image: 'https://rukminim2.flixcart.com/image/480/640/xif0q/water-purifier/i/n/i/bliss-model-with-premium-led-display-suitable-for-home-office-original-imahdqwpqjczysz4.jpeg?q=90', desc: '', price: 0, rating: 4.6, reviews: 64 },
  { id: 'product-12', name: 'Product 12', image: 'https://content.jdmagicbox.com/v2/comp/amritsar/l8/0183px183.x183.200312131120.s8l8/catalogue/sandhu-enterprises-amritsar-gpo-amritsar-water-purifier-repair-and-services-pureit-2d7wlyd2st-250.jpg', desc: '', price: 0, rating: 4.0, reviews: 6 },
  { id: 'product-13', name: 'Product 13', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR5DZDvNDSzKwiRM0mgIde_4knNT1O_IOPXTVrSlveE1mlLd_y1ULYoQ4eL-yPkpgQm_-1UZAGkdR60rxgAl9mrMtVtR5KM0P0K3ZddvysuySc-FTZJerjYLrk', desc: '', price: 0, rating: 3.8, reviews: 4 },
  { id: 'product-14', name: 'Product 14', image: 'https://5.imimg.com/data5/SELLER/Default/2025/4/500418803/TQ/UT/JM/109955577/sunexa-25-lph-ro-plant-500x500.jpg', desc: '', price: 0, rating: 4.2, reviews: 13 },
  { id: 'product-15', name: 'Water Heater (Lazer)', image: 'https://lazerindia.com/wp-content/uploads/2024/08/Latest-Watre-Heater-1024x1024.jpg', desc: 'Latest water heater model by Lazer India — efficient and durable.', price: 11999, rating: 4.4, reviews: 312 },
  { id: 'product-16', name: 'Product 16', image: 'https://images-eu.ssl-images-amazon.com/images/I/71jqL1lY4sL._AC_UL495_SR435,495_.jpg', desc: '', price: 0, rating: 4.1, reviews: 21 },
  { id: 'product-17', name: 'Product 17', image: 'https://aqua1.in/wp-content/uploads/2024/04/web-pic-2-250x250.jpg', desc: '', price: 0, rating: 4.0, reviews: 9 },
  { id: 'product-18', name: 'Product 18', image: 'https://m.media-amazon.com/images/I/41EacWgvP1L._AC_UF350,350_QL50_.jpg', desc: '', price: 0, rating: 4.0, reviews: 5 },
  { id: 'product-19', name: 'Product 19', image: 'https://5.imimg.com/data5/SELLER/Default/2025/10/551648476/PT/JW/AB/51768864/bink-1.jpg', desc: '', price: 0, rating: 4.3, reviews: 2 },
  { id: 'product-20', name: 'Product 20', image: '/placeholder.svg', desc: '', price: 0, rating: 3.9, reviews: 1 },
  { id: 'product-21', name: 'Product 21', image: 'https://aquaro.in/wp-content/uploads/2025/09/olix-golden.png', desc: '', price: 0, rating: 4.2, reviews: 11 },
  { id: 'product-22', name: 'Product 22', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7hdoBNXjE7Bh5vumXoPyhHNJMOZotxO3gIPqL4c8r573KMPgy', desc: '', price: 0, rating: 4.0, reviews: 7 },
  { id: 'product-23', name: 'Product 23', image: 'https://5.imimg.com/data5/SELLER/Default/2025/8/536475711/EE/FH/EU/8295197/electric-water-heater-500x500.jpg', desc: '', price: 0, rating: 4.1, reviews: 3 },
  { id: 'product-24', name: 'Product 24', image: 'https://images-eu.ssl-images-amazon.com/images/I/51RlfUI3+oL._AC_UL210_SR210,210_.jpg', desc: '', price: 0, rating: 4.0, reviews: 2 },
];

export default function ProductsPage() {
  const { add } = useCart();
  // UI states
  const [wish, setWish] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>(PRODUCTS[0].image);
  const [qty, setQty] = useState<number>(1);
  const [tab, setTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [recent, setRecent] = useState<string[]>([]);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState('');
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantQuery, setAssistantQuery] = useState('');
  const [assistantResults, setAssistantResults] = useState<typeof PRODUCTS>([]);
  const [added, setAdded] = useState<Record<string, boolean>>({});

  const toggleWish = (id: string) => setWish((s) => ({ ...s, [id]: !s[id] }));

  useEffect(() => {
    // load recent on mount
    try {
      const cur = JSON.parse(localStorage.getItem('monga_recent') || '[]');
      setRecent(cur);
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (!selected) return;
    const p = PRODUCTS.find((x) => x.id === selected);
    if (p) setMainImage(p.image);

    // track recently viewed in localStorage
    try {
      const key = 'monga_recent';
      const cur = JSON.parse(localStorage.getItem(key) || '[]');
      const filtered = [selected, ...cur.filter((id: string) => id !== selected)].slice(0, 12);
      localStorage.setItem(key, JSON.stringify(filtered));
      setRecent(filtered);
    } catch (e) {}
  }, [selected]);

  const prod = PRODUCTS.find((p) => p.id === selected) || PRODUCTS[0];

  // Smart filtering (lightweight "AI-ish" behavior: fuzzy-ish match + ranking)
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PRODUCTS;
    // boost by name match, then desc, then reviews/rating
    const tokens = q.split(/\s+/).filter(Boolean);
    const score = (p: typeof PRODUCTS[0]) => {
      let s = 0;
      const name = (p.name || '').toLowerCase();
      const desc = (p.desc || '').toLowerCase();
      for (const t of tokens) {
        if (name.includes(t)) s += 10;
        if (desc.includes(t)) s += 5;
        if (String(p.price).includes(t)) s += 3;
      }
      s += (p.reviews || 0) * 0.01 + (p.rating || 0) * 1; // small popularity boost
      return s;
    };
    return [...PRODUCTS].map((p) => ({ p, s: score(p) })).filter(x => x.s > 0).sort((a, b) => b.s - a.s).map(x => x.p);
  }, [search]);

  // Simple assistant: keyword matching + explanation
  const runAssistant = (query: string) => {
    const q = (query || '').toLowerCase();
    if (!q) {
      setAssistantResults([]);
      return;
    }
    // match words from query to product name/desc
    const tokens = q.split(/\s+/).filter(Boolean);
    const matches = PRODUCTS.map((p) => {
      let s = 0;
      const hay = (p.name + ' ' + (p.desc || '')).toLowerCase();
      for (const t of tokens) if (hay.includes(t)) s += 1;
      return { p, s };
    }).filter(x => x.s > 0).sort((a, b) => b.s - a.s).map(x => x.p);
    setAssistantResults(matches.slice(0, 8));
  };

  return (
  <div className="container mx-auto max-w-7xl py-8 px-4 pr-6 lg:pr-28" role="main">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Products</h2>
        <p className="text-sm text-gray-600">Curated tools & appliances — professional grade.</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input aria-label="Search products" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Smart search — try 'water heater' or 'welding'" className="pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500 w-72" />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 3.5a7.5 7.5 0 0013.15 13.15z" />
            </svg>
          </div>
        </div>
        <button onClick={() => { setAssistantOpen(true); setAssistantQuery(''); setAssistantResults([]); }} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm">Ask Assistant</button>
      </div>
    </div>
      {!selected ? (
        // grid
        <div>
          <div className="mb-4" role="region" aria-label="Product catalog">
            {search ? (
              <p className="text-sm text-gray-600 mb-2">Showing {filtered.length} result(s) for "{search}"</p>
            ) : (
              <p className="text-sm text-gray-600 mb-2">Browse our catalog. Click an item to view details.</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" role="list">
            {(search ? filtered : PRODUCTS).map((p) => (
              <article key={p.id} role="listitem" aria-labelledby={`title-${p.id}`} className="group relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-transform duration-200 flex flex-col min-h-[520px]">
                {/* optional badge */}
                {p.reviews > 100 && (
                  <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-2 py-0.5 rounded">Popular</span>
                )}

                <button aria-label={`View ${p.name}`} onClick={() => { setSelected(p.id); setMainImage(p.image); }} className="relative h-56 md:h-64 w-full mb-4 bg-gray-50 rounded overflow-hidden flex items-center justify-center focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300">
                  <Image src={p.image} alt={p.name} fill className="object-contain p-2" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity w-full h-full flex items-center justify-center">
                      <span className="text-white text-sm opacity-0 group-hover:opacity-100">View details</span>
                    </div>
                  </div>
                </button>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div id={`title-${p.id}`} className="text-sm font-semibold text-gray-900">{p.name}</div>
                      <div className="text-xs text-gray-500">Sold by Monga Electricals</div>
                    </div>
                    <button aria-label={wish[p.id] ? 'Remove from wishlist' : 'Add to wishlist'} title={wish[p.id] ? 'Remove from wishlist' : 'Add to wishlist'} onClick={() => toggleWish(p.id)} className="text-gray-400 hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={wish[p.id] ? 'red' : 'none'} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21s-7-4.35-9.5-7.07A5.72 5.72 0 0 1 3 6.5 5.5 5.5 0 0 1 10 6c1.64 0 3.04.78 4 2 .96-1.22 2.36-2 4-2a5.5 5.5 0 0 1 7 5.43c0 2.31-1.18 4.28-3.5 6.43C19 16.65 12 21 12 21z" />
                      </svg>
                    </button>
                  </div>

                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">{p.desc ? (p.desc.length > 140 ? `${p.desc.slice(0, 140)}...` : p.desc) : 'No description available.'}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className={`w-3 h-3 ${i < Math.round(p.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.383 2.455a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.383 2.455c-.785.57-1.84-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.616 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.97z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-xs text-gray-600">{p.rating || '0'} • {p.reviews || 0}</div>
                    </div>

                    <div className="text-right">
                      {p.price ? (
                        <div>
                          <div className="text-lg font-bold text-gray-900">₹{p.price.toLocaleString()}</div>
                          <div className="flex items-center justify-end gap-2 mt-1">
                            <div className="text-xs text-gray-500 line-through">₹{Math.round(p.price * 1.2).toLocaleString()}</div>
                            <div className="text-xs bg-red-50 text-red-600 font-semibold px-1.5 py-0.5 rounded">-{Math.round(((Math.round(p.price * 1.2) - p.price) / Math.round(p.price * 1.2)) * 100)}%</div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm font-semibold">Contact</div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                    <div>
                      <button
                        onClick={() => {
                          add({ id: p.id, name: p.name, qty: 1 });
                          setAdded((s) => ({ ...s, [p.id]: true }));
                          setTimeout(() => setAdded((s) => ({ ...s, [p.id]: false })), 1400);
                        }}
                        className={`px-4 py-3 bg-emerald-600 text-white rounded-md font-semibold focus-visible:ring-2 focus-visible:ring-emerald-400 transform transition-all duration-300 flex items-center justify-center gap-2 ${added[p.id] ? 'scale-95 shadow-lg' : 'hover:-translate-y-0.5 hover:shadow-xl active:scale-95'} w-full sm:w-40 md:w-44 lg:w-48`}
                      >
                        <span className={`inline-flex items-center justify-center w-5 h-5 ${added[p.id] ? 'animate-pulse' : ''}`}>
                          {added[p.id] ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd"/></svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"/></svg>
                          )}
                        </span>
                        <span className="truncate">{added[p.id] ? 'Added' : 'Add'}</span>
                      </button>
                    </div>
                    <div className="w-full sm:w-auto">
                      <button onClick={() => setSelected(p.id)} className="w-full sm:w-28 px-3 py-2 border rounded-md text-sm text-gray-700 focus-visible:ring-2 focus-visible:ring-indigo-300">View</button>
                    </div>
                    <div className="ml-auto text-sm text-green-600 font-medium">{p.price ? 'In stock' : 'Out of stock'}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
  /* Detail view */
  <div className="bg-white rounded-lg shadow-sm p-6" aria-live="polite">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setSelected(null)} className="text-sm text-blue-600 underline">Back to products</button>
            <div className="text-sm text-gray-600">Product detail</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="hidden lg:block lg:col-span-2">
              <div className="flex flex-col gap-3 sticky top-24">
                {PRODUCTS.slice(0, 8).map((t) => (
                  <button key={t.id} onMouseEnter={() => setMainImage(t.image)} onClick={() => setSelected(t.id)} title={`View ${t.name}`} aria-label={`View ${t.name}`} className={`border rounded p-1 bg-white hover:shadow-lg transition ${mainImage === t.image ? 'ring-2 ring-indigo-300' : ''}`}>
                    <div className="relative w-24 h-24">
                      <Image src={t.image} alt={t.name} fill className="object-contain p-1" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-gray-50 rounded-lg p-4">
                <div ref={mainRef} className="relative w-full h-96 bg-white overflow-hidden rounded-lg group">
                  <Image src={mainImage} alt={prod.name} fill className="object-contain transition-transform duration-500 group-hover:scale-110" priority />
                </div>

                <div className="mt-4 flex gap-3 overflow-x-auto lg:overflow-visible">
                  {PRODUCTS.slice(0, 8).map((t) => (
                    <button key={t.id} title={`Select ${t.name}`} aria-label={`Select ${t.name}`} onClick={() => { setMainImage(t.image); setSelected(t.id); }} className="w-16 h-16 rounded overflow-hidden border hover:shadow-md">
                      <div className="relative w-full h-full"><Image src={t.image} alt={t.name} fill className="object-contain p-1" /></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <h1 className="text-2xl lg:text-3xl font-semibold leading-tight">{prod.name}</h1>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < Math.round(prod.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.383 2.455a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.383 2.455c-.785.57-1.84-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.616 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.97z" />
                    </svg>
                  ))}
                </div>
                <div className="text-sm text-gray-600">{prod.rating} • {prod.reviews} ratings</div>
              </div>

              <div className="mt-4">
                <div className="flex items-baseline gap-3">
                  <div className="text-2xl font-bold text-gray-900">₹{prod.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 line-through">₹{Math.round(prod.price * 1.2).toLocaleString()}</div>
                  <div className="text-sm text-red-600 font-semibold">{Math.round(((Math.round(prod.price * 1.2) - prod.price) / Math.round(prod.price * 1.2)) * 100)}% off</div>
                </div>
                <div className="mt-1 text-sm text-red-600 font-medium">Limited Time Deal</div>
                <div className="text-xs text-gray-500 mt-1">Inclusive of all taxes</div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-24 border p-4 rounded-md shadow-sm bg-white">
                <div className="text-sm text-green-600 font-semibold">In Stock</div>
                <div className="text-2xl font-bold mt-2">₹{prod.price.toLocaleString()}</div>
                <div className="mt-2 flex items-center gap-2">
                  <label className="text-sm text-gray-600">Qty</label>
                  <select aria-label="Quantity" title="Quantity" value={String(qty)} onChange={(e) => setQty(Number(e.target.value))} className="border rounded px-2 py-1">
                    {Array.from({ length: 10 }).map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                  </select>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  <button
                    onClick={() => { add({ id: prod.id, name: prod.name, qty }); setAdded((s) => ({ ...s, [prod.id]: true })); setTimeout(() => setAdded((s) => ({ ...s, [prod.id]: false })), 1600); }}
                    className={`px-4 py-2 bg-yellow-400 text-white rounded font-semibold focus-visible:ring-2 focus-visible:ring-yellow-300 transform transition-all duration-300 flex items-center gap-2 justify-center ${added[prod.id] ? 'scale-95 shadow-lg' : 'hover:-translate-y-1 hover:shadow-xl active:scale-95'} md:px-5 md:py-3 md:text-lg`}
                  >
                    {added[prod.id] ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white animate-pulse" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd"/></svg>
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"/></svg>
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                  <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-semibold focus-visible:ring-2 focus-visible:ring-orange-300">Buy Now</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex gap-4 border-b">
              <button onClick={() => setTab('description')} className={`py-2 ${tab === 'description' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}>Description</button>
              <button onClick={() => setTab('specs')} className={`py-2 ${tab === 'specs' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}>Specifications</button>
              <button onClick={() => setTab('reviews')} className={`py-2 ${tab === 'reviews' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}>Reviews</button>
            </div>
            <div className="mt-4">
              {tab === 'description' && <div className="prose max-w-none text-gray-700">{prod.desc || 'No description available.'}</div>}
              {tab === 'specs' && <ul className="list-disc pl-5 text-gray-700"><li>Specification 1</li><li>Specification 2</li><li>Specification 3</li></ul>}
              {tab === 'reviews' && <div className="text-gray-700">{prod.reviews} customer ratings • Average {prod.rating} / 5</div>}
            </div>
          </div>
        </div>
      )}

    {/* Assistant modal (lightweight client-side helper) */}
    {assistantOpen && (
      <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black opacity-30" onClick={() => setAssistantOpen(false)} />
        <div className="relative z-10 max-w-2xl w-full bg-white rounded shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Product Assistant</h3>
            <button aria-label="Close assistant" onClick={() => setAssistantOpen(false)} className="text-gray-600 hover:text-gray-800">✕</button>
          </div>
          <p className="text-sm text-gray-600 mb-3">Ask in plain English and the assistant will suggest products. (Local, private)</p>
          <div className="flex gap-2 mb-4">
            <input value={assistantQuery} onChange={(e) => setAssistantQuery(e.target.value)} placeholder="e.g. 'give me water heaters under 12000'" className="flex-1 border rounded px-3 py-2" />
            <button onClick={() => runAssistant(assistantQuery)} className="px-3 py-2 bg-indigo-600 text-white rounded">Suggest</button>
          </div>
          <div>
            {assistantResults.length === 0 ? (
              <p className="text-sm text-gray-500">No suggestions yet. Try terms like 'heater', 'welding', 'cheap', or a brand name.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {assistantResults.map(r => (
                  <button key={r.id} onClick={() => { setSelected(r.id); setAssistantOpen(false); }} className="text-left p-3 border rounded hover:shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0"><Image src={r.image} alt={r.name} fill className="object-contain p-1" /></div>
                      <div>
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-gray-600">₹{r.price ? r.price.toLocaleString() : 'Contact'}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )}
    </div>
  );
}
