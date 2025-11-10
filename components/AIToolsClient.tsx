"use client";
import React, { useState } from 'react';

export default function AIToolsClient() {
  const [q, setQ] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function ask() {
    if (!q.trim()) return;
    setLoading(true);
    setAnswer(null);
    try {
      const res = await fetch('/api/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: q }) });
      const json = await res.json();
      setAnswer(json?.answer ?? 'No answer');
    } catch (err) {
      setAnswer('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm">Ask the assistant</label>
        <div className="flex gap-2 mt-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="E.g. What brands of wires do you stock?" className="flex-1 border rounded px-3 py-2" />
          <button onClick={ask} disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading ? 'Asking…' : 'Ask'}</button>
        </div>
      </div>

      <div>
        <label className="block text-sm">Answer</label>
        <div className="mt-2 p-3 border rounded min-h-[56px]">{answer ?? <span className="text-gray-500">No answer yet.</span>}</div>
      </div>
    </div>
  );
}
