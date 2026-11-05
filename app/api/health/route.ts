import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Public liveness check: says only that the server is responding.
export async function GET() {
  return NextResponse.json({ status: 'ok' }, { headers: { 'Cache-Control': 'no-store' } });
}
