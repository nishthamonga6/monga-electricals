import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

// Minimal, single-definition Orders API route
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

function verifyToken(token: string | null): any {
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    let db;
    try {
      db = await getDatabase();
    } catch (dbErr: any) {
      console.error('MongoDB not configured', dbErr?.message || dbErr);
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }
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
  const payload: any = verifyToken(token);
  // Accept common id fields produced by different auth implementations
  const userIdRaw = payload?.sub ?? payload?.id ?? payload?._id ?? null;
  if (payload && !userIdRaw) console.log('orders POST: token present but no id field in payload; payload keys=', Object.keys(payload));

  const orders = db.collection('orders');
    const now = new Date();

    // If userIdRaw looks like a Mongo ObjectId, store as ObjectId; otherwise store raw string (so we don't throw)
    let storedUserId: any = null;
    if (userIdRaw) {
      try {
        storedUserId = ObjectId.isValid(userIdRaw) ? new ObjectId(userIdRaw) : String(userIdRaw);
      } catch (e) {
        storedUserId = String(userIdRaw);
      }
    }

    const orderDoc: any = { items, total: Number(total || 0), customer, userId: storedUserId, status: 'pending', createdAt: now, source: 'web' };

    const res = await orders.insertOne(orderDoc);
    // Return the inserted id and the stored document (without internal _id object)
    return NextResponse.json({ ok: true, orderId: res.insertedId.toString(), order: { ...orderDoc, orderId: res.insertedId.toString() } });
  } catch (err: any) {
    console.error('orders POST error', err);
    return NextResponse.json({ error: err?.message ?? 'Server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const auth = req.headers.get('authorization') || '';
    const token = auth.replace(/^Bearer\s+/i, '') || null;
  const payload: any = verifyToken(token);

    const userIdRaw = payload?.sub ?? payload?.id ?? payload?._id ?? null;
    if (!userIdRaw) {
      console.log('orders GET: token missing or payload has no id; payload keys=', Object.keys(payload || {}));
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = String(userIdRaw);
    const db = await getDatabase();
    const orders = db.collection('orders');

    const docs = await orders.find({ userId: new ObjectId(userId) }).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ orders: docs });
  } catch (err: any) {
    console.error('orders GET error', err);
    return NextResponse.json({ error: err?.message ?? 'Server error' }, { status: 500 });
  }
}
