import Link from 'next/link';

export default function BrandsIndex() {
  return (
    <div className="container-section py-12">
      <h1 className="text-2xl font-semibold mb-6">Brands (removed)</h1>
      <p className="mb-4 text-sm text-gray-600">The brand listing page added recently has been removed per repository cleanup.</p>
      <Link href="/products" className="text-brand underline">Go to products</Link>
    </div>
  );
}
