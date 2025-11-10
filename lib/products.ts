// products module removed — intentionally empty to undo recent additions
export type Product = {
  id: string;
  name: string;
  price: number;
  desc?: string;
  brand?: string;
  image?: string;
};

export const products: Product[] = [];
export const brands: { id: string; name: string }[] = [];
