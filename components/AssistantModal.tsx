"use client";
import React, { useEffect, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose(): void;
};

type Message = { from: 'user' | 'assistant'; text: string };

const SUGGESTIONS = [
  'What are your store hours?',
  'Do you deliver in Sirsa?',
  'Which brands of wires do you stock?',
  'How can I contact the store?',
];

export default function AssistantModal({ isOpen, onClose }: Props) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [suggestLoading, setSuggestLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setInput('');
      setMessages([]);
      setLoading(false);
    }
  }, [isOpen]);

  async function send(question: string) {
    if (!question.trim()) return;
    const userMsg: Message = { from: 'user', text: question };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const json = await res.json();
      const answer = json?.answer ?? 'Sorry, I could not find an answer.';
      setMessages(prev => [...prev, { from: 'assistant', text: String(answer) }]);
    } catch (err) {
      setMessages(prev => [...prev, { from: 'assistant', text: 'Network error — please try again.' }]);
    } finally {
      setLoading(false);
    }
  }

  async function suggestReply() {
    // find last customer message (from 'user')
    const lastUser = [...messages].reverse().find(m => m.from === 'user');
    if (!lastUser) return;
    setSuggestLoading(true);
    setSuggestion(null);
    try {
      const prompt = `Please suggest a short, polite, and helpful reply to this customer message:\n\n"${lastUser.text}"`;
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: prompt }),
      });
      const json = await res.json();
      const answer = json?.answer ?? 'Could not generate a suggestion.';
      setSuggestion(String(answer));
    } catch (err) {
      setSuggestion('Network error — could not generate suggestion.');
    } finally {
      setSuggestLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-xl mx-4 sm:mx-0 bg-white rounded-t-xl sm:rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Assistant — Ask a question</h3>
          <button aria-label="Close assistant" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="p-4 max-h-72 overflow-y-auto space-y-3">
          {messages.length === 0 && (
            <div className="text-sm text-gray-600">Ask anything about the shop, products, delivery, or contact — try a suggestion below.</div>
          )}
          {messages.map((m, idx) => (
            <div key={idx} className={`p-2 rounded ${m.from === 'user' ? 'bg-indigo-50 self-end text-right' : 'bg-gray-100'}`}>
              <div className="text-sm">{m.text}</div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2 mb-3 flex-wrap">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => send(s)} className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">
                {s}
              </button>
            ))}
          </div>

          {/* Suggest reply to the last customer message */}
          <div className="mb-3 flex items-center gap-2">
            <button
              onClick={suggestReply}
              disabled={suggestLoading || messages.findIndex(m => m.from === 'user') === -1}
              className="text-sm px-3 py-1 rounded bg-amber-100 hover:bg-amber-200"
            >
              {suggestLoading ? 'Suggesting…' : 'Suggest reply'}
            </button>
            {suggestion && (
              <div className="flex-1 p-2 bg-amber-50 rounded border border-amber-100">
                <div className="text-sm mb-2">Suggestion:</div>
                <div className="text-sm mb-2">{suggestion}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setInput(suggestion); setSuggestion(null); }}
                    className="text-sm px-3 py-1 rounded bg-amber-200 hover:bg-amber-300"
                  >
                    Use suggestion
                  </button>
                  <button
                    onClick={() => { send(suggestion); setSuggestion(null); setInput(''); }}
                    className="text-sm px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Send suggestion
                  </button>
                  <button onClick={() => setSuggestion(null)} className="text-sm px-3 py-1 rounded border">Dismiss</button>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={e => {
              e.preventDefault();
              send(input);
              setInput('');
            }}
            className="flex gap-2"
          >
            <input
              aria-label="Ask assistant"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60">
              {loading ? 'Thinking…' : 'Ask'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
