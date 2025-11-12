import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectMongoose } from '../../../lib/mongoose';
import User from '../../../models/User';

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

export async function GET(req: Request) {
  if (!process.env.MONGODB_URI) return NextResponse.json({ error: 'MONGODB_URI not configured' }, { status: 503 });
  try {
    await connectMongoose();
    const userId = await getUserFromToken(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const me = await User.findById(userId).exec();
    if (!me || !me.isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const users = await User.find().select('name email createdAt isAdmin').exec();
    return NextResponse.json({ users });
  } catch (err: any) {
    console.error('list users error', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
