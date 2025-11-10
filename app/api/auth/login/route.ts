import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDatabase } from '../../../../lib/mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export async function POST(req: Request) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: 'MONGODB_URI not configured on server' }, { status: 503 });
  }
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const db = await getDatabase();
    const users = db.collection('users');
    const userDoc = await users.findOne({ email: email.toLowerCase() });
    if (!userDoc) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const match = await bcrypt.compare(password, userDoc.passwordHash);
    if (!match) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const user = { id: userDoc._id.toString(), name: userDoc.name, email: userDoc.email };
    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    return NextResponse.json({ user, token });
  } catch (err: any) {
    console.error('login error', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
