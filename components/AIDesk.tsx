"use client";
import React, { useState } from 'react';

export default function AIDesk() {
  const [name, setName] = useState('Monga Electricals');
  const [tone, setTone] = useState('friendly');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  async function generate() {
    setLoading(true);
    setResult('');
    try {
      const question = `Write a short SEO meta description (<=160 chars), a 1-line tagline, and a short Facebook post for ${name} in Sirsa in a ${tone} tone. Separate sections with lines.`;
      const resp = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await resp.json();
      setResult(data.answer || 'No answer returned.');
    } catch (e) {
      setResult('Error generating content.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border rounded-lg p-6 bg-white">
      <h3 className="text-xl font-semibold">AI Content Helper</h3>
      <p className="text-sm text-gray-600 mt-1">Generate a meta description, tagline and a Facebook post to improve your page content and social sharing.</p>

      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        <label className="sr-only" htmlFor="ai-name">Business name</label>
        <input id="ai-name" value={name} onChange={(e) => setName(e.target.value)} className="border px-3 py-2 rounded" placeholder="Business name" />

        <label className="sr-only" htmlFor="ai-tone">Tone</label>
        <select id="ai-tone" value={tone} onChange={(e) => setTone(e.target.value)} className="border px-3 py-2 rounded" aria-label="Tone">
          <option value="friendly">Friendly</option>
          <option value="professional">Professional</option>
          <option value="casual">Casual</option>
        </select>
      </div>

      <div className="mt-4 flex gap-3">
        <button className="bg-accent text-black px-4 py-2 rounded disabled:opacity-60" onClick={generate} disabled={loading}>
          {loading ? 'Generating…' : 'Generate'}
        </button>
        <button className="px-4 py-2 border rounded" onClick={() => { setResult(''); setName('Monga Electricals'); setTone('friendly'); }}>Reset</button>
      </div>

      {result && (
        <div className="mt-4 whitespace-pre-wrap bg-gray-50 p-3 rounded text-sm">
          {result}
        </div>
      )}
    </div>
  );
}
