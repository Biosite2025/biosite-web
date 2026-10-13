import type { Answer, Product } from './biomiSearch';

/**
 * Product-level helpers for Biomi. Biomi only answers what the website (or the
 * verified research in content/product-research.md) states outright. Anything
 * that needs judgement — comparing models, picking the "best" one, prices,
 * stock, compatibility, or a spec we don't have — goes to the sales team.
 */

export const SALES_MESSAGE = 'Contact our sales team so they can provide you the accurate answer about the product.';

/** The reply for questions that need a person (optionally showing the products asked about). */
export function salesAnswer(products: Product[] = []): Answer {
	return {
		text: [SALES_MESSAGE],
		products: products.length ? products.slice(0, 3) : undefined,
		links: [{ label: 'Contact our sales team', href: '/user/contact' }],
	};
}

/** Researched specs as one searchable string ("Throughput: 60 samples per hour. …"). */
export const researchText = (p: Product) => (p.research ?? []).map((f) => `${f.label}: ${f.value}`).join('. ');
/** Everything Biomi knows about a product: website description + researched specs. */
export const info = (p: Product) => (p.research?.length ? `${p.description} ${researchText(p)}` : p.description);

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

/**
 * "What is the throughput of the DxH 520?" — answered only when every asked-about
 * term is stated in the product's information; otherwise null (send to sales).
 */
export function directSpec(p: Product, terms: string[], yesNo: boolean): Answer | null {
	const d = info(p);
	const has = (t: string) => new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/s$/, '')}`, 'i');
	if (!terms.length || !terms.every((t) => has(t).test(d))) return null;
	// Researched facts read as their own "sentences" ("Throughput: 60 samples per hour").
	const sentences = [...p.description.split(/(?<=[.!?])\s+/), ...(p.research ?? []).map((f) => `${f.label}: ${f.value}.`)];
	const quote = sentences.filter((s) => terms.some((t) => has(t).test(s))).slice(0, 3).join(' ');
	return {
		text: [yesNo ? `Yes — for the ${p.name}: “${quote}”` : `For the ${p.name}: “${quote}”`],
		products: [p],
		links: [
			{ label: `View ${p.category}`, href: p.url },
			...(p.sources?.length ? [{ label: 'Manufacturer source', href: p.sources[0] }] : []),
		],
	};
}
