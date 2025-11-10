// products module removed — intentionally empty to undo recent additions
export type Product = {
  id: string;
  name: string;
  price: number;
  desc?: string;
  brand?: string;
  image?: string;
};

export const brands: { id: string; name: string }[] = [
  { id: 'bajaj', name: 'Bajaj' },
  { id: 'finolex', name: 'Finolex' },
  { id: 'havells', name: 'Havells' },
  { id: 'luminous', name: 'Luminous' },
  { id: 'livpure', name: 'Livpure' },
  { id: 'microtek', name: 'Microtek' },
  { id: 'orient', name: 'Orient' },
  { id: 'philips', name: 'Philips' },
  { id: 'polycab', name: 'Polycab' },
  { id: 'anchor', name: 'Anchor' },
];

export const products: Product[] = [
  { id: 'p_bajaj_fan1', name: 'Bajaj Ceiling Fan 1200mm', price: 1999, desc: 'Energy efficient ceiling fan', brand: 'Bajaj', image: '/brands/bajaj.svg' },
  { id: 'p_bajaj_fan2', name: 'Bajaj Decorative Fan', price: 2499, desc: 'Stylish finish with remote', brand: 'Bajaj', image: '/brands/bajaj.svg' },

  { id: 'p_finolex_wire1', name: 'Finolex 2.5mm Wire (100m)', price: 899, desc: 'ISI marked insulated copper wire', brand: 'Finolex', image: '/brands/finolex.svg' },
  { id: 'p_finolex_wire2', name: 'Finolex 4mm Wire (100m)', price: 1299, desc: 'High-conductivity copper cable', brand: 'Finolex', image: '/brands/finolex.svg' },

  { id: 'p_havells_mcb1', name: 'Havells MCB 6A', price: 249, desc: 'Miniature circuit breaker, single pole', brand: 'Havells', image: '/brands/havells.svg' },
  { id: 'p_havells_switch1', name: 'Havells Modular Switch', price: 149, desc: 'Durable switch with modern finish', brand: 'Havells', image: '/brands/havells.svg' },

  { id: 'p_luminous_batt1', name: 'Luminous Inverter Battery 150Ah', price: 25999, desc: 'Tubular battery for long backup', brand: 'Luminous', image: '/brands/luminous.svg' },

  { id: 'p_livpure_pur1', name: 'Livpure RO Water Purifier', price: 12999, desc: 'Advanced purification with TDS control', brand: 'Livpure', image: '/brands/livpure.svg' },

  { id: 'p_microtek_ups1', name: 'Microtek UPS 1KVA', price: 4499, desc: 'Reliable UPS for home use', brand: 'Microtek', image: '/brands/microtek.svg' },

  { id: 'p_orient_fan1', name: 'Orient Ceiling Fan', price: 1899, desc: 'Powerful motor with sleek blades', brand: 'Orient', image: '/brands/orient.svg' },

  { id: 'p_philips_led1', name: 'Philips LED Bulb 9W', price: 149, desc: 'Warm white, energy saving', brand: 'Philips', image: '/brands/philips.svg' },

  { id: 'p_polycab_cable1', name: 'Polycab FRLS Cable 1.5mm', price: 599, desc: 'Fire retardant cable, 100m', brand: 'Polycab', image: '/brands/polycab.svg' },

  { id: 'p_anchor_socket1', name: 'Anchor Socket 3-pin', price: 99, desc: 'Durable socket with child safety', brand: 'Anchor', image: '/brands/anchor.svg' },
];

export function getProductsByBrand(brandId: string) {
  const b = brands.find((x) => x.id.toLowerCase() === brandId.toLowerCase());
  if (!b) return [] as Product[];
  return products.filter((p) => p.brand && p.brand.toLowerCase() === b.name.toLowerCase());
}
