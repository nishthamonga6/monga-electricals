import Link from 'next/link';

export default function BrandPage() {
  return (
    <div className="container-section py-12">
      <h1 className="text-2xl font-semibold mb-4">Brand page removed</h1>
      <p className="text-sm text-gray-600 mb-4">Individual brand pages were part of a recent feature and have been removed.</p>
      <Link href="/products" className="text-brand underline">Back to products</Link>
    </div>
  );
}
