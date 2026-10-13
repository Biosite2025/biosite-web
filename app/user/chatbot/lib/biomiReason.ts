import type { Answer, Product } from './biomiSearch';

/**
 * Biomi's "reasoning" over product descriptions: pulls the facts the website
 * states (speed, sample volume, size, loading, temperature, who it's for) so
 * Biomi can compare models, suggest the right fit, and answer "does X do Y?".
 * Everything comes from the description text — nothing is guessed.
 */

export type Workload = 'small' | 'mid' | 'high';
const WORKLOAD_LABEL: Record<Workload, string> = {
	small: 'small labs & clinics',
	mid: 'mid-volume labs',
	high: 'high-volume labs & hospitals',
};

const SMALL = /small (?:labs?|clinics?|laborator\w*|healthcare)|\bclinics?\b|low[- ]workload|low[- ]volume|\bcompact\b|bench-?top|point-of-care|\bportable\b|entry[- ]level|small to medium|limited space|minimum footprint|low-volume/gi;
const MID = /mid[- ]volume|moderate[- ]workload|medium(?:-sized)? lab|small to medium|mid-size/gi;
const HIGH = /high[- ]volume|high[- ]workload|ultra[- ]high|large[- ]scale|reference laborator\w*|high[- ]throughput|\bbusy\b|high[- ]efficiency|unprecedented throughput/gi;

const count = (s: string, re: RegExp) => (s.match(re) ?? []).length;

/** Who the product is aimed at, according to its description. */
export function workload(p: Product): Workload | undefined {
	const d = p.description;
	const s = count(d, SMALL), m = count(d, MID), h = count(d, HIGH);
	if (!s && !m && !h) return undefined;
	if (h > s && h >= m) return 'high';
	if (m > s && m >= h) return 'mid';
	return s >= h ? 'small' : 'high';
}

const uniq = (xs: string[]) => [...new Set(xs.map((x) => x.trim()).filter(Boolean))];
const all = (d: string, re: RegExp) => uniq([...d.matchAll(re)].map((m) => m[0]));

/** Facts stated in the description, as short display strings. */
export function specs(p: Product) {
	const d = p.description;
	return {
		speed: all(d, /(?:up to |over |exceeding |about |~)?\d[\d,]*\+?\s*(?:tests?|CBCs?|samples?|slides?|photometric tests)(?:\/hr?\b|\s*(?:per|an|each)\s*hour)/gi).join('; '),
		sample: all(d, /\d+(?:\.\d+)?\s*(?:µL|μL|uL)\b/gi).join(', '),
		size: all(d, /(?:\d+(?:\.\d+)?\s*(?:cm|m)\b[^.;,]{0,25}?(?:footprint|counter (?:width|space)|wide|of counter space)|(?:footprint|counter width)[^.;,]{0,12}?\d+(?:\.\d+)?\s*(?:cm|m)\b|minimum footprint|compact[^.;,]{0,20}footprint)/gi).join('; '),
		loading: all(d, /\d+-tube autoloader|autoloader|manual loading|continuous loading|load(?:ed)? up to \d+ (?:routine )?samples|up to \d+ samples(?: loaded)?/gi).join('; '),
		temperature: all(d, /[-−–]?\s?\d+\s?°C(?:\s*to\s*[-−–]?\s?\d+\s?°C)?/g).join(', '),
		time: all(d, /(?:in |within |~|about )?\d+(?:\.\d+)?\s*(?:seconds|minutes|mins?)\b/gi).join('; '),
	};
}

const firstSentence = (d: string) => {
	const s = d.split(/(?<=[.!?])\s+/)[0] ?? d;
	return s.length > 140 ? s.slice(0, 137).trimEnd() + '…' : s;
};

/** Side-by-side comparison of 2–3 products from their descriptions. */
export function compareAnswer(ps: Product[]): Answer {
	const sp = ps.map(specs);
	const wl = ps.map(workload);
	const rows: { label: string; values: string[] }[] = [
		{ label: 'Brand', values: ps.map((p) => p.brand || '—') },
		{ label: 'Category', values: ps.map((p) => p.category) },
		{ label: 'Designed for', values: wl.map((w) => (w ? WORKLOAD_LABEL[w] : '—')) },
		{ label: 'Speed', values: sp.map((s) => s.speed || '—') },
		{ label: 'Sample volume', values: sp.map((s) => s.sample || '—') },
		{ label: 'Size', values: sp.map((s) => s.size || '—') },
		{ label: 'Loading', values: sp.map((s) => s.loading || '—') },
		{ label: 'Temperature', values: sp.map((s) => s.temperature || '—') },
		{ label: 'Turnaround', values: sp.map((s) => s.time || '—') },
		{ label: 'Highlights', values: ps.map((p) => firstSentence(p.description)) },
	].filter((r) => r.values.some((v) => v !== '—'));

	const text: string[] = [];
	const [a, b] = ps;
	const [wa, wb] = wl;
	if (ps.length === 2 && wa && wb && wa !== wb) {
		text.push(`The main difference: the ${a.name} is aimed at ${WORKLOAD_LABEL[wa]}, while the ${b.name} is built for ${WORKLOAD_LABEL[wb]}.`);
		const small = wa === 'small' || (wa === 'mid' && wb === 'high') ? a : b;
		const big = small === a ? b : a;
		text.push(`Choose the ${small.name} for a lower workload and smaller space; choose the ${big.name} if you run a high number of samples every day.`);
	} else if (ps.length === 2 && a.category !== b.category) {
		text.push(`These do different jobs: the ${a.name} is a ${a.category} product and the ${b.name} is a ${b.category} product.`);
	} else {
		text.push(`Here’s how the ${ps.map((p) => p.name).join(' and ')} compare, based on our website:`);
	}
	text.push('Comparison is based on the descriptions on our website. For full spec sheets, our team can send you the brochures.');
	return {
		text,
		compare: { products: ps, rows },
		products: ps,
		links: [{ label: 'Request a Quote', href: '/user/contact' }],
	};
}

// Product mentioned by model ("GEM 5000" -> GEM Premier 5000 with iQM2, "DxH 900").
export const nameTokens = (name: string) => name.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').split(/[^a-z0-9]+/).filter((t) => t && !['with', 'and', 'the', 'series', 'system', 'for'].includes(t));

export function mentionedProducts(products: Product[], q: string): Product[] {
	// "DxH 500 and 900" -> "DxH 500 and DxH 900"
	const qq = q.replace(/\b([a-z][a-z-]*)\s+(\d+[a-z]*)\s+(and|vs\.?|versus|or|at|o|tsaka)\s+(\d+[a-z]*)\b/g, '$1 $2 $3 $1 $4');
	const qt = new Set(qq.split(/[^a-z0-9]+/).filter(Boolean));
	const hits: { p: Product; score: number; key: string }[] = [];
	for (const p of products) {
		const nt = nameTokens(p.name);
		if (!nt.length) continue;
		const matched = nt.filter((t) => qt.has(t));
		const digits = nt.filter((t) => /\d/.test(t));
		// Single plain words ("Class Series", "Methanol") only count when distinctive.
		const exact = matched.length === nt.length && (nt.length >= 2 || /\d/.test(nt[0]) || nt[0].length >= 6);
		const byModel =
			digits.length > 0 && matched.some((t) => /\d/.test(t)) && matched.some((t) => !/\d/.test(t)) && matched.length / nt.length >= 0.5;
		if (exact || byModel) hits.push({ p, score: matched.length + (exact ? 5 : 0), key: matched.filter((t) => /\d/.test(t)).join(' ') || p.name });
	}
	hits.sort((x, y) => y.score - x.score);
	const seen = new Set<string>();
	const names = new Set<string>();
	const out: Product[] = [];
	for (const h of hits) {
		if (seen.has(h.key) || names.has(h.p.name.toLowerCase())) continue;
		seen.add(h.key);
		names.add(h.p.name.toLowerCase());
		out.push(h.p);
	}
	return out;
}

/** "Does the GEM 5000 measure lactate?" — answered only from the description. */
export function specAnswer(p: Product, terms: string[], peers: Product[]): Answer {
	const d = p.description;
	const sentences = d.split(/(?<=[.!?])\s+/);
	const has = (t: string) => new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/s$/, '')}`, 'i');
	const found = terms.filter((t) => has(t).test(d));
	const missing = terms.filter((t) => !found.includes(t));
	const text: string[] = [];
	if (found.length) {
		const quote = sentences.filter((s) => found.some((t) => has(t).test(s))).join(' ');
		text.push(`Yes — according to our website, the ${p.name} covers ${found.join(', ')}: “${quote}”`);
	}
	if (missing.length) {
		text.push(`Our website’s description of the ${p.name} doesn’t mention ${missing.join(' or ')}, so I can’t confirm it. Our team can check the full specifications for you.`);
		const others = peers.filter((o) => o !== p && missing.every((t) => has(t).test(o.description)));
		if (others.length) {
			text.push(`These ${p.category} products do mention ${missing.join(' and ')} on our website:`);
			return { text, products: others.slice(0, 3), links: [{ label: 'Ask our team', href: '/user/contact' }] };
		}
	}
	return { text, products: [p], links: [{ label: missing.length ? 'Ask our team' : `View ${p.category}`, href: missing.length ? '/user/contact' : p.url }] };
}

// Words that describe the buyer's setting.
export const NEED_SMALL = /\b(small|clinic|clinics|maliit|low volume|low-volume|few (?:patients|samples)|starting|start-?up|rural|entry|budget|lying-in|barangay|health center|private practice)\b/;
export const NEED_MID = /\b(mid|medium|moderate|mid-size|midsize|growing)\b/;
export const NEED_HIGH = /\b(hospital|high volume|high-volume|busy|large|big|tertiary|reference lab|many (?:patients|samples)|marami|high throughput|24\/7)\b/;

/** Pick models that fit a setting, ranked by what their descriptions say. */
export function bestAnswer(list: Product[], category: string, need: Workload): Answer {
	const order: Workload[] = ['small', 'mid', 'high'];
	const dist = (w?: Workload) => (w ? Math.abs(order.indexOf(w) - order.indexOf(need)) : 1.5);
	const ranked = [...list].map((p) => ({ p, w: workload(p), d: dist(workload(p)) })).sort((x, y) => x.d - y.d);
	const fit = ranked.filter((r) => r.d === 0);
	const picks = (fit.length ? fit : ranked.filter((r) => r.d <= 1)).slice(0, 3);
	const setting = { small: 'a small clinic or low workload', mid: 'a mid-size lab', high: 'a busy, high-volume lab' }[need];
	if (!picks.length) {
		return {
			text: [`Our website doesn’t say which ${category} models suit ${setting}. Our team can recommend the right one for your workload.`],
			links: [{ label: 'Ask our team', href: '/user/contact' }],
		};
	}
	const reason = (p: Product) => {
		const re = need === 'small' ? SMALL : need === 'mid' ? MID : HIGH;
		const s = p.description.split(/(?<=[.!?])\s+/).find((x) => new RegExp(re.source, 'i').test(x));
		return s ? `“${s.length > 150 ? s.slice(0, 147) + '…' : s}”` : firstSentence(p.description);
	};
	return {
		text: [
			`For ${setting}, these ${category} models fit best based on our website:`,
			...picks.map((r) => `• ${r.p.name}${r.p.brand ? ` (${r.p.brand})` : ''} — ${reason(r.p)}`),
			'The right choice also depends on your test menu and daily sample count — our team can help you decide.',
		],
		products: picks.map((r) => r.p),
		links: [{ label: 'Ask our team', href: '/user/contact' }],
	};
}

/** Lowest-workload / compact models — offered when people ask for "the cheapest". */
export function entryLevel(list: Product[]) {
	return list.filter((p) => workload(p) === 'small');
}
