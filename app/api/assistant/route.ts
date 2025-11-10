import { NextResponse } from 'next/server';

type Body = { question?: string };

const CANONICAL_ANSWERS: { [k: string]: string } = {
  hours: 'Our store in Sirsa is typically open 9:30 AM – 7:30 PM, Monday–Saturday. Please call to confirm special hours or holidays.',
  delivery: 'Yes — we deliver locally in Sirsa. Delivery charges may apply for distant locations. For bulk orders we offer special rates.',
  payment: 'We accept cash, UPI, and major debit/credit cards. For larger commercial orders we can invoice on request.',
  brands: 'We stock popular brands like Orient, Microtek, Livpure, Luminous and more — contact us if you need a specific brand.',
  contact: 'You can reach us via the Contact page on this site or by using the WhatsApp button visible on the page.',
};

function fallbackAnswer(question: string) {
  const q = question.toLowerCase();
  if (q.includes('hour') || q.includes('open') || q.includes('time')) return CANONICAL_ANSWERS.hours;
  if (q.includes('deliver') || q.includes('delivery') || q.includes('ship')) return CANONICAL_ANSWERS.delivery;
  if (q.includes('pay') || q.includes('payment') || q.includes('card')) return CANONICAL_ANSWERS.payment;
  if (q.includes('brand') || q.includes('brands') || q.includes('orient') || q.includes('microtek')) return CANONICAL_ANSWERS.brands;
  if (q.includes('contact') || q.includes('phone') || q.includes('reach')) return CANONICAL_ANSWERS.contact;
  return "I'm not sure — please ask for 'store hours', 'delivery', 'payment', or 'contact', or leave a detailed message and we'll reply via the Contact page or WhatsApp button.";
  // Previously returned a long guidance string; return empty so UI shows a neutral message instead.
  // This avoids showing the long default guidance inside small helper widgets.
  return '';
}

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();
    const question = (body?.question || '').trim();
    if (!question) return NextResponse.json({ answer: 'Please provide a question.' }, { status: 400 });

    // If an OpenAI API key is provided in the environment, proxy the request.
    const key = process.env.OPENAI_API_KEY;
    if (key) {
      // Note: This code will proxy to OpenAI when OPENAI_API_KEY is set in your environment.
      // Keep your key secret and do not commit it to the repo. The example below uses the Chat Completions API.
      const payload = {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant for Monga Electricals, a local electrical shop in Sirsa, India. Keep answers short and practical.' },
          { role: 'user', content: question },
        ],
        temperature: 0.2,
      };

      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        const text = await resp.text();
        return NextResponse.json({ answer: `External API error: ${resp.status} ${text}` }, { status: 502 });
      }
      const data = await resp.json();
      const assistant = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || 'No answer.';
      return NextResponse.json({ answer: assistant });
    }

    // Fallback local assistant when no API key is configured
    const answer = fallbackAnswer(question);
    return NextResponse.json({ answer });
  } catch (err: any) {
    return NextResponse.json({ answer: 'Server error handling the request.' }, { status: 500 });
  }
}
