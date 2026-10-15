import { NextResponse } from 'next/server';

/**
 * Serve a JSON API response from memory, refreshing it in the background.
 *
 * The event gallery/video routes list the Spaces bucket on every call, which
 * takes ~9 s. The listing changes rarely, so we keep the last good result:
 * fresh for `ttlMs`, then still served (stale) while one refresh runs behind
 * it. Errors are never cached. Browsers/CDN may also reuse it briefly.
 */
export function cachedJson(load: () => Promise<NextResponse>, ttlMs = 10 * 60_000) {
	let cache: { at: number; body: unknown } | null = null;
	let refreshing: Promise<void> | null = null;
	const headers = { 'Cache-Control': `public, max-age=60, s-maxage=${Math.round(ttlMs / 1000)}, stale-while-revalidate=86400` };

	const refresh = () =>
		(refreshing ??= load()
			.then(async (res) => {
				if (res.ok) cache = { at: Date.now(), body: await res.clone().json() };
				return res;
			})
			.then(() => undefined, () => undefined)
			.finally(() => {
				refreshing = null;
			}));

	return async function GET() {
		if (cache) {
			if (Date.now() - cache.at > ttlMs) void refresh();
			return NextResponse.json(cache.body, { headers });
		}
		const res = await load();
		if (res.ok) {
			cache = { at: Date.now(), body: await res.clone().json() };
			return NextResponse.json(cache.body, { headers });
		}
		return res;
	};
}
