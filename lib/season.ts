/**
 * Seasonal artwork. The Christmas season runs from CHRISTMAS_START to
 * CHRISTMAS_END (inclusive), by the date in the Philippines. Change these to
 * move the window; nothing else needs editing.
 */
export const CHRISTMAS_START = { month: 11, day: 1 }; // 1 November
export const CHRISTMAS_END = { month: 1, day: 6 }; // 6 January (Three Kings)

const MANILA_OFFSET_MS = 8 * 60 * 60 * 1000; // UTC+8, no daylight saving

/** True when `now` falls in the Christmas season in the Philippines. */
export function isChristmasSeason(now = new Date()) {
  const manila = new Date(now.getTime() + MANILA_OFFSET_MS);
  const m = manila.getUTCMonth() + 1;
  const d = manila.getUTCDate();
  const afterStart = m > CHRISTMAS_START.month || (m === CHRISTMAS_START.month && d >= CHRISTMAS_START.day);
  const beforeEnd = m < CHRISTMAS_END.month || (m === CHRISTMAS_END.month && d <= CHRISTMAS_END.day);
  // The season crosses New Year, so it is "after the start OR before the end".
  return afterStart || beforeEnd;
}

/**
 * The same check as a tiny inline script. It runs while the page is still
 * being parsed, before the hero is painted, and marks <html data-season>, so
 * the right artwork shows from the first frame on a page built ahead of time.
 */
export const SEASON_SCRIPT = `(function(){try{var t=new Date(Date.now()+${MANILA_OFFSET_MS}),m=t.getUTCMonth()+1,d=t.getUTCDate();var a=m>${CHRISTMAS_START.month}||(m===${CHRISTMAS_START.month}&&d>=${CHRISTMAS_START.day});var b=m<${CHRISTMAS_END.month}||(m===${CHRISTMAS_END.month}&&d<=${CHRISTMAS_END.day});if(a||b)document.documentElement.setAttribute('data-season','christmas');}catch(e){}})();`;
