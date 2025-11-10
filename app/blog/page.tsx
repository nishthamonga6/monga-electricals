export default function BlogPage() {
  return (
    <main className="container-section py-16">
      <h1 className="text-3xl font-bold mb-4">Tips & Blog</h1>
      <p className="text-gray-700 mb-6">Helpful tips on electrical maintenance, buying guides, and product recommendations.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <article className="border rounded-lg p-4">
          <h2 className="font-semibold">How to pick the right MCB</h2>
          <p className="mt-2 text-gray-600">Short guide on ratings and protection.</p>
        </article>
        <article className="border rounded-lg p-4">
          <h2 className="font-semibold">LED lighting: warm vs cool</h2>
          <p className="mt-2 text-gray-600">Choosing the right color temperature for rooms.</p>
        </article>
      </div>
    </main>
  );
}
