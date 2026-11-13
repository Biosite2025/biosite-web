/**
 * Typo and shorthand tolerance for Biomi.
 *
 * Before a question is answered, chat shorthand is expanded ("u" -> "you",
 * "wat" -> "what") and misspelled words are corrected to the nearest word
 * Biomi knows: product names, brands, categories, FAQ wording and the topic
 * words its answers listen for ("hematolgy" -> "hematology", "upcomming" ->
 * "upcoming", "dengeu" -> "dengue").
 *
 * It only ever corrects towards that vocabulary, and only when the word is
 * close (one edit, or two in long words; swapped letters count as one). A
 * word nothing resembles, like a brand we don't carry, is left alone, so Biomi
 * can still say honestly that it isn't on the website.
 */

/** Chat shorthand and common misspellings that edit distance alone can't fix safely. */
const SHORTHAND: Record<string, string> = {
	u: 'you', ya: 'you', yu: 'you', ur: 'your', urs: 'yours', r: 'are', ar: 'are',
	pls: 'please', plz: 'please', pakisend: 'please send',
	wat: 'what', wut: 'what', wht: 'what', whta: 'what', wats: 'what is', whats: 'what is', wha: 'what',
	wen: 'when', whn: 'when', wer: 'where', whr: 'where', hw: 'how', hws: 'how is',
	nd: 'and', abt: 'about', bout: 'about', thx: 'thanks', tnx: 'thanks', tnks: 'thanks', thnx: 'thanks',
	tel: 'tell', hav: 'have', hve: 'have', giv: 'give', cn: 'can', cud: 'could', wud: 'would', shud: 'should',
	dis: 'this', dat: 'that', da: 'the',
	num: 'number', addr: 'address', msg: 'message', avail: 'available',
	tym: 'time', tyme: 'time', gud: 'good', yrs: 'years',
	magkno: 'magkano', mgkano: 'magkano', mgkno: 'magkano',
	analyser: 'analyzer', analysers: 'analyzers', catalogue: 'catalog', centre: 'center',
};

/** Two-word fixes where the first word is a real word used wrongly ("were is" -> "where is"). */
const PHRASES: [RegExp, string][] = [
	[/\bwere (is|are|can|do)\b/g, 'where $1'],
	[/\bwhere (?:r|ar) (u|you)\b/g, 'where are you'],
	[/\b(?:r|ar) (?:u|you)\b/g, 'are you'],
	[/\bdo u\b/g, 'do you'],
	[/\bhow mch\b|\bhow mutch\b|\bhow muc\b/g, 'how much'],
	[/\bthank u\b/g, 'thank you'],
];

/**
 * Topic words Biomi's answers listen for. Kept here (not derived from the
 * regexes) so a misspelling has a clear, safe target.
 */
const TOPIC_WORDS = `
mission vision values core awards award recognition events event upcoming seminar seminars conference conferences
training trainings workshop workshops webinar convention outreach community charity history founded established
office offices address location locations branch contact phone number email hours open opening close closing schedule
hiring career careers jobs job apply application internship vacancy position positions resume
quotation quote price prices pricing cost discount delivery deliver shipping warranty installation install
maintenance calibration calibrate repair service services support technical demo demonstration brochure catalog
manual datasheet order orders purchase payment terms stock available availability distributor distributors partner
partners supplier suppliers brands brand products product analyzer analyzers machine machines equipment equipments
hospital laboratory clinic test tests kit kits rapid dengue covid malaria pregnancy hepatitis syphilis troponin
hematology chemistry clinical immunology immunoassay coagulation urinalysis microscope microscopes centrifuge
centrifuges freezer freezers refrigerator refrigerators autoclave sterilizer incubator pipette pipettes pipettor
ultrasound radiology xray ventilator monitor monitors biosafety cabinet cabinets histopathology tissue processor
molecular diagnostics diagnostic imaging blood bank electrolytes disposables consumables reagents reagent gloves
about biosite company manila cebu davao luzon visayas mindanao philippines nationwide facebook linkedin social
certified certification thanks hello please today tomorrow next when where what which how much many does have
offer sell carry recommend compare difference best cheapest affordable specifications specs features details more
magkano presyo meron trabaho saan kailan
`;

const words = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').split(/[^a-z0-9]+/).filter(Boolean);

/** Edit distance with adjacent swaps counting as one edit, stopped early above `max`. */
function distance(a: string, b: string, max: number) {
	if (Math.abs(a.length - b.length) > max) return max + 1;
	const prev2 = new Array(b.length + 1).fill(0);
	let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
	for (let i = 1; i <= a.length; i++) {
		const cur = [i];
		let rowMin = i;
		for (let j = 1; j <= b.length; j++) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
			if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
			cur.push(v);
			rowMin = Math.min(rowMin, v);
		}
		if (rowMin > max) return max + 1;
		prev2.splice(0, prev2.length, ...prev);
		prev = cur;
	}
	return prev[b.length];
}

export type Speller = { vocab: Map<string, number>; byLength: Map<number, string[]> };

/** Build the vocabulary once from the knowledge base. `texts` are names, brands, categories, FAQ questions… */
export function buildSpeller(texts: string[]): Speller {
	const vocab = new Map<string, number>();
	for (const t of texts) for (const w of words(t)) if (w.length >= 3 && !/^\d+$/.test(w)) vocab.set(w, (vocab.get(w) ?? 0) + 1);
	// Topic words win ties: they are what the answers listen for.
	for (const w of words(TOPIC_WORDS)) vocab.set(w, (vocab.get(w) ?? 0) + 1000);
	const byLength = new Map<number, string[]>();
	for (const w of vocab.keys()) {
		const list = byLength.get(w.length) ?? [];
		list.push(w);
		byLength.set(w.length, list);
	}
	return { vocab, byLength };
}

/** Words never "corrected" (common English/Filipino words that are fine as typed). */
const KEEP = new Set(
	('the and for you your are can how what when where which who why with from have has had does did was were will would ' +
		'should could this that these those there their them they then than also just only some any all more most much many ' +
		'need want like know tell show give send find help please thanks thank hello good okay yes not but about into over ' +
		'very really still here near list like our ours its kayo naman lang po ba ang mga sa ng may meron wala ako ko mo niyo nyo ' +
		'ito iyan yan yun saan kailan paano bakit sino ano gusto pwede puwede salamat').split(' '),
);

function correctWord(w: string, sp: Speller): string {
	if (SHORTHAND[w]) return SHORTHAND[w];
	if (w.length < 4 || /\d/.test(w) || sp.vocab.has(w) || KEEP.has(w)) return w;
	// Plurals and simple endings of a known word are fine as typed.
	if (sp.vocab.has(w.replace(/(es|s)$/, '')) || sp.vocab.has(w.replace(/ing$/, '')) || sp.vocab.has(w.replace(/ed$/, ''))) return w;
	const max = w.length >= 8 ? 2 : 1;
	let best = '';
	let bestD = max + 1;
	let bestF = 0;
	for (let len = w.length - max; len <= w.length + max; len++) {
		for (const c of sp.byLength.get(len) ?? []) {
			if (c[0] !== w[0] && !(c[1] === w[0] && c[0] === w[1])) continue; // first letter right (or swapped)
			const d = distance(w, c, max);
			const f = sp.vocab.get(c) ?? 0;
			if (d < bestD || (d === bestD && f > bestF)) {
				best = c;
				bestD = d;
				bestF = f;
			}
		}
	}
	return bestD <= max ? best : w;
}

/** The question with shorthand expanded and typos corrected (lower case). */
export function correctQuestion(question: string, sp: Speller): string {
	let q = question.toLowerCase();
	for (const [re, to] of PHRASES) q = q.replace(re, to);
	// Keep punctuation and numbers/model codes as they are; fix word by word.
	return q.replace(/[a-z0-9]+(?:'[a-z]+)?/g, (w) => (w.includes("'") || /\d/.test(w) ? w : correctWord(w, sp)));
}
