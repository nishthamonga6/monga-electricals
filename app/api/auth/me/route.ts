import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectMongoose } from '../../../../lib/mongoose';
import User from '../../../../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export async function GET(req: Request) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: 'MONGODB_URI not configured on server' }, { status: 503 });
  }
  try {
    await connectMongoose();
    const auth = req.headers.get('authorization') || '';
    const token = auth.replace(/^Bearer\s+/i, '');
    if (!token) return NextResponse.json({ error: 'No token' }, { status: 401 });

    const payload: any = jwt.verify(token, JWT_SECRET);
    const userId = payload?.sub;
    if (!userId) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const u = await User.findById(userId).select('name email').exec();
    if (!u) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ user: { id: u._id.toString(), name: u.name, email: u.email } });
  } catch (err: any) {
    console.error('me error', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
