/**
 * Philippine holidays (regular and special non-working days) for the events
 * calendar. The live list comes from Nager.Date (app/api/ph-holidays), which
 * follows each year's proclamation; FALLBACK covers the days that can be
 * worked out without it if that service is ever unreachable.
 */

export type HolidayKind = 'national' | 'religious' | 'newyear' | 'labor' | 'cultural';
export type Holiday = { date: string; name: string; kind: HolidayKind };

/** Which icon a holiday gets, from its English name. */
export function holidayKind(name: string): HolidayKind {
  const n = name.toLowerCase();
  if (/new year|last day of the year|christmas eve/.test(n) && !/chinese/.test(n)) return 'newyear';
  if (/labou?r/.test(n)) return 'labor';
  if (/chinese|eid|islam|ramadan|hari raya/.test(n)) return 'cultural';
  if (/thursday|friday|saturday|saints|souls|immaculate|christmas|easter/.test(n)) return 'religious';
  return 'national';
}

const pad = (n: number) => String(n).padStart(2, '0');
const iso = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`;

/** Easter Sunday (Gregorian), for Holy Week. */
function easter(y: number) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(y, month - 1, day));
}

const shift = (dt: Date, days: number) => {
  const x = new Date(dt.getTime() + days * 86400000);
  return iso(x.getUTCFullYear(), x.getUTCMonth() + 1, x.getUTCDate());
};

/** Last Monday of August: National Heroes Day. */
function heroesDay(y: number) {
  const last = new Date(Date.UTC(y, 7, 31));
  const back = (last.getUTCDay() + 6) % 7; // days back to Monday
  return shift(last, -back);
}

/** Holidays that can be worked out for any year (used if the live list fails). */
export function fallbackHolidays(y: number): Holiday[] {
  const e = easter(y);
  const list: [string, string][] = [
    [iso(y, 1, 1), "New Year's Day"],
    [shift(e, -3), 'Maundy Thursday'],
    [shift(e, -2), 'Good Friday'],
    [shift(e, -1), 'Holy Saturday'],
    [iso(y, 4, 9), 'Day of Valor'],
    [iso(y, 5, 1), 'Labour Day'],
    [iso(y, 6, 12), 'Independence Day'],
    [iso(y, 8, 21), 'Ninoy Aquino Day'],
    [heroesDay(y), 'National Heroes Day'],
    [iso(y, 11, 1), "All Saints' Day"],
    [iso(y, 11, 30), 'Bonifacio Day'],
    [iso(y, 12, 8), 'Feast of the Immaculate Conception of Mary'],
    [iso(y, 12, 24), 'Christmas Eve'],
    [iso(y, 12, 25), 'Christmas Day'],
    [iso(y, 12, 30), 'Rizal Day'],
    [iso(y, 12, 31), 'Last Day of the Year'],
  ];
  return list.map(([date, name]) => ({ date, name, kind: holidayKind(name) }));
}

/** Today's date in the Philippines (UTC+8, no daylight saving), as YYYY-MM-DD. */
export function manilaToday(now = Date.now()) {
  const t = new Date(now + 8 * 3600 * 1000);
  return iso(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
}

/** One short line of context for the calendar's hover tooltip. */
const ABOUT: [RegExp, string][] = [
  [/chinese new year/i, 'Lunar New Year, celebrated by the Filipino-Chinese community.'],
  [/new year's day/i, 'The first day of the year.'],
  [/maundy thursday|good friday|holy saturday|black saturday/i, 'Part of Holy Week, observed across the country.'],
  [/day of valor|kagitingan/i, 'Honours the Filipino and American soldiers of World War II.'],
  [/labou?r day/i, 'Honours Filipino workers.'],
  [/independence day/i, 'Marks the declaration of Philippine independence in 1898.'],
  [/ninoy aquino/i, 'Remembers Senator Benigno "Ninoy" Aquino Jr.'],
  [/heroes day/i, 'Honours the national heroes of the Philippines.'],
  [/all saints' day eve/i, 'The eve of All Saints’ Day, a day to visit departed loved ones.'],
  [/all saints|all souls/i, 'A day to remember departed loved ones.'],
  [/bonifacio/i, 'Birth anniversary of Andrés Bonifacio, founder of the Katipunan.'],
  [/immaculate conception/i, 'Feast of the Immaculate Conception, patroness of the Philippines.'],
  [/christmas eve/i, 'The eve of Christmas.'],
  [/christmas day/i, 'Celebrates the birth of Jesus Christ.'],
  [/rizal/i, 'Remembers national hero Dr. José Rizal.'],
  [/last day of the year/i, 'The last day of the year.'],
  [/eid|hari raya/i, 'Islamic holiday observed in the Philippines.'],
  [/edsa/i, 'Commemorates the 1986 EDSA People Power Revolution.'],
];

export function holidayAbout(name: string) {
  return ABOUT.find(([re]) => re.test(name))?.[1] ?? 'Public holiday in the Philippines.';
}
