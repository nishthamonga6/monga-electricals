import { NextResponse } from 'next/server';

// Products API removed — stubbed out
export async function GET() {
  return NextResponse.json({ error: 'products API has been removed' }, { status: 410 });
}

export async function POST() {
  return NextResponse.json({ error: 'products API has been removed' }, { status: 410 });
}
