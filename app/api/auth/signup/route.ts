import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectMongoose } from '../../../../lib/mongoose';
import User from '../../../../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export async function POST(req: Request) {
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: 'MONGODB_URI not configured on server' }, { status: 503 });
  }
  try {
    await connectMongoose();
    const body = await req.json();
    const { name, email, password } = body;
    if (!name || !email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const existing = await User.findOne({ email: email.toLowerCase() }).exec();
    if (existing) return NextResponse.json({ error: 'User already exists' }, { status: 409 });

    const hash = await bcrypt.hash(password, 10);
    const userDoc = new User({ name, email: email.toLowerCase(), passwordHash: hash });
    await userDoc.save();

    const user = { id: userDoc._id.toString(), name: userDoc.name, email: userDoc.email };
    const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    return NextResponse.json({ user, token });
  } catch (err: any) {
    console.error('signup error', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
