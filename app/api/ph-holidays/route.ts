import { NextRequest, NextResponse } from 'next/server';
import { fallbackHolidays, holidayKind, type Holiday } from '@/lib/phHolidays';

/**
 * GET /api/ph-holidays?year=2026
 * Philippine regular and special non-working holidays for one year, from
 * Nager.Date (refreshed at most once a day). If that service is down, the
 * holidays that can be calculated are returned instead, marked `source: "fallback"`.
 */
export async function GET(request: NextRequest) {
  const year = Number(request.nextUrl.searchParams.get('year'));
  if (!Number.isInteger(year) || year < 2000 || year > 2100) {
    return NextResponse.json({ success: false, error: 'Use a year between 2000 and 2100' }, { status: 400 });
  }

  try {
    const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/PH`, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`Nager.Date answered ${res.status}`);
    const rows: { date: string; name: string }[] = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) throw new Error('Empty holiday list');
    const holidays: Holiday[] = rows
      .filter((r) => typeof r.date === 'string' && typeof r.name === 'string')
      .map((r) => {
        // Tidy the source's spelling ("Last Day of The Year" -> "of the").
        const name = r.name.replace(/\s+/g, ' ').trim().replace(/(?<=\s)(The|Of|And)(?=\s)/g, (w) => w.toLowerCase());
        return { date: r.date, name, kind: holidayKind(name) };
      });
    return NextResponse.json(
      { success: true, source: 'live', holidays },
      { headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400' } },
    );
  } catch (error) {
    console.error('[ph-holidays] live list failed, using fallback:', error);
    return NextResponse.json(
      { success: true, source: 'fallback', holidays: fallbackHolidays(year) },
      { headers: { 'Cache-Control': 'public, max-age=600' } },
    );
  }
}
