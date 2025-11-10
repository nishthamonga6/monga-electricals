import { NextResponse } from 'next/server';

// Single-product API removed: stubbed to avoid exposing file-backed datastore
export async function GET() {
  return NextResponse.json({ error: 'product API removed' }, { status: 410 });
}

export async function PUT() {
  return NextResponse.json({ error: 'product API removed' }, { status: 410 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'product API removed' }, { status: 410 });
}
