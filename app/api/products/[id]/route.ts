import { NextResponse } from 'next/server';
import { connectMongoose } from '../../../../lib/mongoose';
import Product from '../../../../models/Product';
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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!process.env.MONGODB_URI) return NextResponse.json({ error: 'DB not configured' }, { status: 503 });
    await connectMongoose();
    const userId = await getUserFromReq(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const patch: any = {};
    if (body.name) patch.name = body.name;
    if (body.image) patch.image = body.image;
    if (body.price !== undefined) patch.price = body.price;
    if (body.desc) patch.desc = body.desc;
    if (body.category) patch.category = body.category;

    const updated = await Product.findByIdAndUpdate(params.id, patch, { new: true }).exec();
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ product: updated });
  } catch (err: any) {
    console.error('product PUT error', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!process.env.MONGODB_URI) return NextResponse.json({ error: 'DB not configured' }, { status: 503 });
    await connectMongoose();
    const userId = await getUserFromReq(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const removed = await Product.findByIdAndDelete(params.id).exec();
    if (!removed) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('product DELETE error', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}

