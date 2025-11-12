import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectMongoose } from '../../../../lib/mongoose';
import User from '../../../../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

async function getUserFromToken(req: Request) {
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
  if (!process.env.MONGODB_URI) return NextResponse.json({ error: 'MONGODB_URI not configured' }, { status: 503 });
  try {
    await connectMongoose();
    const requesterId = await getUserFromToken(req);
    if (!requesterId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const targetId = params.id;
    const me = await User.findById(requesterId).exec();
    if (!me) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (me._id.toString() !== targetId && !me.isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json();
    const patch: any = {};
    if (body.name) patch.name = body.name;
    if (body.email) patch.email = body.email.toLowerCase();
    // password updates should be done via a dedicated endpoint and re-hashed; omitted here.

    const updated = await User.findByIdAndUpdate(targetId, patch, { new: true }).select('name email isAdmin');
    return NextResponse.json({ user: updated });
  } catch (err: any) {
    console.error('update user error', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!process.env.MONGODB_URI) return NextResponse.json({ error: 'MONGODB_URI not configured' }, { status: 503 });
  try {
    await connectMongoose();
    const requesterId = await getUserFromToken(req);
    if (!requesterId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const targetId = params.id;
    const me = await User.findById(requesterId).exec();
    if (!me) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (me._id.toString() !== targetId && !me.isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    await User.findByIdAndDelete(targetId);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('delete user error', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
