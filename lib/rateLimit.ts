import { NextRequest, NextResponse } from 'next/server';

// Per-process limiter: enough to stop one client flooding the public forms.
// Each running instance counts separately, so the real limit is multiplied by
// the instance count if the app is ever scaled out.
const hits = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: NextRequest) {
  // App Platform sets do-connecting-ip to the real visitor address.
  return request.headers.get('do-connecting-ip')
    || request.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || 'unknown';
}

/** Returns a 429 response when the client is over the limit, otherwise null. */
export function rateLimit(request: NextRequest, name: string, limit: number, windowMs: number) {
  const now = Date.now();
  if (hits.size > 10000) {
    for (const [key, entry] of hits) if (entry.resetAt <= now) hits.delete(key);
  }

  const key = `${name}:${clientIp(request)}`;
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }
  entry.count++;
  if (entry.count <= limit) return null;

  return NextResponse.json(
    { success: false, error: 'Too many requests. Please try again in a few minutes.' },
    { status: 429, headers: { 'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)) } },
  );
}
