'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResponseMsg(null);

    if (!phone || phone.trim().length < 6) {
      setResponseMsg('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message }),
      });
      const data = await res.json();
      if (data.ok) {
        setResponseMsg(data.message || 'Thanks, we will contact you soon');
        setName('');
        setPhone('');
        setMessage('');
      } else {
        setResponseMsg(data.error || 'Something went wrong');
      }
    } catch (err) {
      setResponseMsg('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" placeholder="Your name" />
      </div>
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" placeholder="Your phone (WhatsApp-enabled)" />
      </div>
      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" rows={4} placeholder="How can we help?" />
      </div>
      <button type="submit" disabled={loading} className="bg-brand text-white px-5 py-2 rounded-md">
        {loading ? 'Sending...' : 'Send'}
      </button>
      {responseMsg && <p className="text-sm text-gray-700">{responseMsg}</p>}
      <p className="text-xs text-gray-500">This sends a message to our server; we will call or message you shortly.</p>
    </form>
  );
}
