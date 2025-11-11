// products module removed — intentionally empty to undo recent additions
export type Product = {
  id: string;
  name: string;
  price: number;
  desc?: string;
  brand?: string;
  image?: string;
  imageUrl?: string;
  url?: string;
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
  { id: 'p_livpure_hydroboost', name: 'Livpure Hydroboost Alkalizer RO', price: 12999, desc: 'Hydroboost Alkalizer RO — source: https://www.amazon.in/Livpure-Hydroboost-Alkalizer-Purification-Technology/dp/B0CV9DPYBV', brand: 'Livpure', image: '/brands/livpure.svg' },
  
  { id: 'p_livpure_hydroboost', name: 'Livpure Hydroboost Alkalizer RO', price: 12999, desc: 'Hydroboost Alkalizer RO — source: https://www.amazon.in/Livpure-Hydroboost-Alkalizer-Purification-Technology/dp/B0CV9DPYBV', brand: 'Livpure', image: '/brands/livpure.svg', imageUrl: '/images/products/livpure_hydroboost.jpg', url: 'https://www.amazon.in/Livpure-Hydroboost-Alkalizer-Purification-Technology/dp/B0CV9DPYBV' },
  // Additional products added from user-provided links
  { id: 'p_livpure_glo', name: 'Livpure Glo Water Purifier', price: 9999, desc: 'Livpure Glo model', brand: 'Livpure', image: '/brands/livpure.svg', imageUrl: '/images/products/livpure_glo.jpg' },

  { id: 'p_havells_metallic_pur', name: 'Havells Metallic Body Water Purifier', price: 14999, desc: 'Havells metallic body model', brand: 'Havells', image: '/brands/havells.svg', imageUrl: '/images/products/havells_metallic.jpg', url: 'https://www.amazon.in/Metallic-Protection-Purifier-Multiple-Purification/dp/B0FCN39G9T' },
  { id: 'p_havells_black_copper', name: 'Havells Black & Copper Water Purifier', price: 15999, desc: 'Havells Black & Copper model', brand: 'Havells', image: '/brands/havells.svg', imageUrl: '/images/products/havells_black_copper.jpg' },

  { id: 'p_vguard_pur_black', name: 'V-Guard Black Water Purifier', price: 8999, desc: 'V-Guard black model', brand: 'V-Guard', image: '/brands/luminous.svg', imageUrl: '/images/products/vguard_black.jpg' },

  { id: 'p_aquaguard_pur1', name: 'Aquaguard Water Purifier (White & Blue)', price: 10999, desc: 'Aquaguard white & blue model', brand: 'Aquaguard', image: '/brands/livpure.svg', imageUrl: '/images/products/aquaguard_white_blue.jpg' },

  { id: 'p_bluestar_pur_black', name: 'Blue Star Black Water Purifier', price: 7999, desc: 'Blue Star black model', brand: 'Blue Star', image: '/brands/philips.svg', imageUrl: '/images/products/bluestar_black.jpg' },

  { id: 'p_sunexa_su50', name: 'Sunexa SU-50 Commercial RO', price: 44999, desc: 'Sunexa Commercial RO (SU-50)', brand: 'Sunexa', image: '/brands/luminous.svg', imageUrl: '/images/products/sunexa_su50.jpg', url: 'https://5.imimg.com/data5/SELLER/Default/2024/9/448532834/HG/TI/WO/81144813/55-250x250.jpg' },

  { id: 'p_bliss_led', name: 'Bliss Water Purifier (LED Model)', price: 6999, desc: 'Bliss purifier with LED', brand: 'Bliss', image: '/brands/livpure.svg', imageUrl: '/images/products/bliss_led.jpg' },

  { id: 'p_aquatick_pur', name: 'Aqua Trick Water Purifier', price: 7499, desc: 'Aqua Trick white & blue model', brand: 'Aqua Trick', image: '/brands/livpure.svg', imageUrl: '/images/products/aquatick.jpg' },

  { id: 'p_lazer_aquatherm', name: 'Lazer Aqua Therm Water Heater (3000W)', price: 6999, desc: 'Lazer Aqua Therm (Aqua Therm 3000)', brand: 'Lazer', image: '/brands/luminous.svg', imageUrl: '/images/products/lazer_aquatherm.jpg', url: 'https://lazerindia.com/wp-content/uploads/2024/08/Latest-Watre-Heater-1024x1024.jpg' },
  { id: 'p_lazer_hotwaves', name: 'Lazer Hot Waves Room Heater (Quartz)', price: 2999, desc: 'Lazer Hot Waves quartz room heater', brand: 'Lazer', image: '/brands/luminous.svg', imageUrl: '/images/products/lazer_hotwaves.jpg', url: 'https://rukminim2.flixcart.com/image/480/640/l3hmwsw0/room-heater/7/7/0/hot-waves-lazer-2000-original-imagehzguzhgwb3v.jpeg?q=90' },

  { id: 'p_padmini_flora', name: 'Padmini FLORA 3-Burner Gas Stove', price: 6999, desc: 'Padmini 3-burner FLORA gas stove', brand: 'Padmini', image: '/brands/philips.svg', imageUrl: '/images/products/padmini_flora.jpg', url: 'https://www.padminiappliances.com/cdn/shop/products/FLORA_2.jpg' },

  { id: 'p_vguard_glass3', name: 'V-Guard 3-Burner Glass Top Stove (Black)', price: 7999, desc: 'V-Guard 3-burner glass top (black)', brand: 'V-Guard', image: '/brands/luminous.svg', imageUrl: '/images/products/vguard_glass3.jpg' },

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
