import { NextResponse } from 'next/server';

// Orders API removed: routes are intentionally stubbed out per cleanup.
export async function POST() {
  return NextResponse.json({ error: 'orders API removed' }, { status: 410 });
}

export async function GET() {
  return NextResponse.json({ error: 'orders API removed' }, { status: 410 });
}
