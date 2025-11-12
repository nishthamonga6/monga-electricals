import { NextResponse } from 'next/server';
import { connectMongoose } from '../../../lib/mongoose';
import Product from '../../../models/Product';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

async function getUserFromReq(req: Request) {
  const auth = req.headers.get('authorization') || '';
  const token = auth.replace(/^Bearer\s+/i, '');
  if (!token) return null;
  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    return payload.sub;
  } catch (err) {
    return null;
  }
}

export async function GET() {
  try {
    await connectMongoose();
    const products = await Product.find().sort({ createdAt: -1 }).lean().exec();
    return NextResponse.json({ products });
  } catch (err: any) {
    console.error('products GET error', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!process.env.MONGODB_URI) return NextResponse.json({ error: 'DB not configured' }, { status: 503 });
    await connectMongoose();
    const userId = await getUserFromReq(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { name, image, price, desc, category } = body;
    if (!name || !image) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const created = await Product.create({ name, image, price: price || 0, desc: desc || '', category: category || '' });
    return NextResponse.json({ product: created });
  } catch (err: any) {
    console.error('products POST error', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
 
