import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!phone || phone.trim().length < 6) {
      return NextResponse.json({ ok: false, error: 'Phone is required' }, { status: 400 });
    }

    // TODO: Replace this with real email sending or DB storage.
    // For security, never log sensitive info in production.
    console.log('Contact form submission:', { name, phone, message });

    return NextResponse.json({ ok: true, message: 'Thank you! We will contact you shortly.' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
