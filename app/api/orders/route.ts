import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

// Minimal, single-definition Orders API route
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

function verifyToken(token: string | null) {
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as { sub?: string } | null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const db = await getDatabase();
    const body = await req.json();
    const { items, total, customer } = body || {};

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items' }, { status: 400 });
    }
    if (!customer || !customer.name || !customer.address) {
      return NextResponse.json({ error: 'Missing customer info' }, { status: 400 });
    }

    const auth = req.headers.get('authorization') || '';
    const token = auth.replace(/^Bearer\s+/i, '') || null;
    const payload = verifyToken(token);
    const userId = payload?.sub ?? null;

    const orders = (await db).collection('orders');
    const now = new Date();

    const orderDoc: any = { items, total: Number(total || 0), customer, userId: userId ? new ObjectId(userId) : null, status: 'pending', createdAt: now, source: 'web' };

    const res = await orders.insertOne(orderDoc);
    return NextResponse.json({ ok: true, orderId: res.insertedId.toString() });
  } catch (err: any) {
    console.error('orders POST error', err);
    return NextResponse.json({ error: err?.message ?? 'Server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const auth = req.headers.get('authorization') || '';
    const token = auth.replace(/^Bearer\s+/i, '') || null;
    const payload = verifyToken(token);

    if (!payload?.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = payload.sub as string;
    const db = await getDatabase();
    const orders = db.collection('orders');

    const docs = await orders.find({ userId: new ObjectId(userId) }).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ orders: docs });
  } catch (err: any) {
    console.error('orders GET error', err);
    return NextResponse.json({ error: err?.message ?? 'Server error' }, { status: 500 });
  }
}
