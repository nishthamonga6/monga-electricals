import AIToolsClient from '@/components/AIToolsClient';

export default function AIToolsPage() {
  return (
    <main className="container-section py-12">
      <h1 className="text-2xl font-semibold mb-4">AI Tools</h1>
      <p className="text-gray-600 mb-6">Small assistant and helper tools to make finding products and asking questions easier.</p>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="p-4 border rounded">
          <h3 className="font-medium mb-2">Ask the assistant</h3>
          <AIToolsClient />
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-medium mb-2">Quick AI helpers</h3>
          <ul className="space-y-2 text-sm">
            <li>- Product Q&A (ask about availability, specs)</li>
            <li>- Delivery & pricing estimator (coming soon)</li>
            <li>- Compare brands (coming soon)</li>
          </ul>
          <p className="mt-4 text-xs text-gray-500">These tools are lightweight and run on the server or via the assistant API. You can enable a stronger LLM by setting OPENAI_API_KEY in your environment.</p>
        </div>
      </section>
    </main>
  );
}
