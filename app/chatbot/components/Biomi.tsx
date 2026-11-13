"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FAQ_DATA } from "../faqData";
import { askBiomi, loadBiomi, EMPTY_CONTEXT, STARTER_QUESTIONS, type Answer, type BiomiContext, type Product } from "../lib/biomiSearch";
import PopOutModal from '../../products/shared/PopOutModal';
import PixelBlast from './PixelBlast';



// Animated 3D Biomi Avatar with Framer Motion
function BiomiAvatar({ size = 44, animationState = "idle" }) {
		// Animation variants
				const headVariants = {
					// idle sway is a CSS loop (.biomi-sway in globals.css), not a JS animation
					idle: { rotate: 0, y: 0 },
					thinking: { rotate: 0, y: 0 },
					reply: { rotate: [0, 10, 0], y: [0, 2, 0], transition: { duration: 0.6 } },
				};
				const eyeVariants = {
					// idle blink is a CSS loop (.biomi-blink)
					idle: { scaleY: 1 },
					thinking: { scaleY: [1, 0.1, 1], transition: { duration: 0.4 } },
					reply: { scaleY: 1 },
				};
				// Robot mascot SVG
				return (
					<motion.span
						className="inline-block bg-white border-2 border-[#b2d6e6] rounded-full overflow-hidden"
						style={{ width: size, height: size }}
						initial="idle"
						animate={animationState}
					>
						<motion.svg
							width={size}
							height={size}
							viewBox="0 0 100 100"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							style={{ display: "block" }}
						>
							<motion.g variants={headVariants} animate={animationState} className={animationState === 'idle' ? 'biomi-sway' : undefined}>
								{/* Outer head shape */}
								<ellipse cx="50" cy="60" rx="38" ry="35" fill="#e6f4fa" stroke="#3a6b7c" strokeWidth="3" />
								{/* Faceplate */}
								<ellipse cx="50" cy="60" rx="28" ry="23" fill="#f6fcff" stroke="#3a6b7c" strokeWidth="2.2" />
								{/* Ears */}
								<ellipse cx="15" cy="60" rx="6" ry="10" fill="#e6f4fa" stroke="#3a6b7c" strokeWidth="2" />
								<ellipse cx="85" cy="60" rx="6" ry="10" fill="#e6f4fa" stroke="#3a6b7c" strokeWidth="2" />
								{/* Antenna */}
								<rect x="47" y="15" width="6" height="15" rx="3" fill="#e6f4fa" stroke="#3a6b7c" strokeWidth="2" />
								<circle cx="50" cy="13" r="5" fill="#f6fcff" stroke="#3a6b7c" strokeWidth="2" />
								{/* Eyes */}
								<motion.circle
									cx="40"
									cy="60"
									r="3.5"
									fill="#3a6b7c"
									variants={eyeVariants}
									animate={animationState}
									className={animationState === 'idle' ? 'biomi-blink' : undefined}
								/>
								<motion.circle
									cx="60"
									cy="60"
									r="3.5"
									fill="#3a6b7c"
									variants={eyeVariants}
									animate={animationState}
									className={animationState === 'idle' ? 'biomi-blink' : undefined}
								/>
								{/* Smile */}
								<path d="M43 70 Q50 75 57 70" stroke="#3a6b7c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
							</motion.g>
						</motion.svg>
					</motion.span>
				);
}

const ICONS = {
	chat: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
	topics: 'M4 6h16M4 12h16M4 18h10',
	products: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
	lab: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3M7.5 15h9',
	quote: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
	office: 'M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
	arrow: 'M5 12h14M13 6l6 6-6 6',
	back: 'M19 12H5M11 18l-6-6 6-6',
	send: 'M12 19V5M6 11l6-6 6 6',
};
// In the order of STARTER_QUESTIONS.
const STARTER_ICONS = [ICONS.products, ICONS.lab, ICONS.quote, ICONS.office];

function Icon({ path, className }: { path: string; className?: string }) {
	return (
		<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d={path} />
		</svg>
	);
}

// Both tabs share one height, so switching or chatting never resizes the panel.
const panelBody = 'flex h-[min(28.5rem,calc(var(--vh,1dvh)*62))] flex-col gap-3 overflow-y-auto overscroll-contain bg-gradient-to-b from-[#f4f6fc] to-[#fafbfe] px-3 py-4 sm:px-5 [@media(max-height:700px)]:h-[calc(var(--vh,1dvh)*54)] [@media(max-height:760px)]:lg:h-[min(24.5rem,calc(var(--vh,1dvh)*56))]';

type ChatMessage = { id: number; from: 'user' | 'biomi'; text?: string; answer?: Answer };

// Chat-style FAQ: answers come only from the website's own content (see ../lib/biomiSearch).
export default function BiomiFAQ() {
	const reducedMotion = useReducedMotion();
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState('');
	const [typing, setTyping] = useState(false);
	const [avatarState, setAvatarState] = useState<'idle' | 'thinking' | 'reply'>('idle');
	const [openProduct, setOpenProduct] = useState<Product | null>(null);
	// "Browse topics" mode: the classic FAQ menu (category -> question -> answer) for people who'd rather tap than type.
	const [mode, setMode] = useState<'chat' | 'topics'>('chat');
	const [topic, setTopic] = useState<number | null>(null);
	const [topicQ, setTopicQ] = useState<number | null>(null);
	const openTopics = () => { setMode('topics'); setTopic(null); setTopicQ(null); };
	// Carry a browsed answer into the conversation so they can keep asking about it.
	const continueInChat = (q: string, a: string) => {
		setMessages((m) => [...m, { id: nextId.current++, from: 'user', text: q }, { id: nextId.current++, from: 'biomi', answer: { text: [a] } }]);
		setMode('chat');
	};
	const closeProduct = useCallback(() => setOpenProduct(null), []);
	const listRef = useRef<HTMLDivElement>(null);
	const nextId = useRef(1);
	// What Biomi remembers from earlier answers, so follow-ups ("how much is it?") make sense.
	const context = useRef<BiomiContext>(EMPTY_CONTEXT);
	const openCard = (p: Product) => {
		context.current = { ...context.current, focus: p };
		setOpenProduct(p);
	};

	// Fetch the knowledge index in the background once the page is up, so the
	// first answer is instant (it's small and cached by the browser).
	useEffect(() => {
		const t = setTimeout(() => { loadBiomi().catch(() => {}); }, 800);
		return () => clearTimeout(t);
	}, []);

	useEffect(() => {
		const el = listRef.current;
		if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
	}, [messages, typing]);

	const ask = async (raw: string) => {
		const question = raw.trim().slice(0, 300);
		if (!question || typing) return;
		setInput('');
		setMessages((m) => [...m, { id: nextId.current++, from: 'user', text: question }]);
		setTyping(true);
		setAvatarState('thinking');
		const started = Date.now();
		let answer: Answer;
		try {
			answer = await askBiomi(question, context.current);
			if (answer.context) context.current = answer.context;
		} catch {
			answer = { text: ["Sorry, I couldn't load our information just now. Please check your connection and try again."] };
		}
		// A short pause so the reply reads as a response, not a flash.
		await new Promise((r) => setTimeout(r, Math.max(0, 450 - (Date.now() - started))));
		setTyping(false);
		setMessages((m) => [...m, { id: nextId.current++, from: 'biomi', answer }]);
		setAvatarState('reply');
		setTimeout(() => setAvatarState('idle'), 700);
	};

	const chip = 'rounded-full border border-[#d9dff0] bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-[#2B3990] shadow-sm transition-colors hover:border-[#2B3990]/40 hover:bg-[#eef1fb] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B3990]/40';
	const rise = { initial: { opacity: 0, y: reducedMotion ? 0 : 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.25, ease: 'easeOut' as const } };

	return (
		<>
			<div id="bg" className="relative mb-6 sm:mb-10 flex justify-center items-center min-h-[calc(calc(var(--vh,1vh)*100)-64px)] lg:min-h-[calc(calc(var(--vh,1vh)*100)-96px)] py-3 sm:py-5 md:py-6 lg:py-8 [@media(max-height:760px)]:lg:py-3 bg-transparent font-[Inter,Poppins,sans-serif] px-2 sm:px-3 md:px-6 pt-8 mt-8 lg:mt-0 lg:pt-8 max-[912px]:mb-16 max-[912px]:mt-0 max-[912px]:py-0 max-[912px]:pt-0 max-[912px]:pb-0 max-[912px]:px-0 max-[912px]:min-h-0">
				{/* PixelBlast Animated Background */}
				<PixelBlast
					variant="circle"
					pixelSize={6}
					color="#2B3990"
					className="z-0"
					patternScale={3}
					patternDensity={1.2}
					pixelSizeJitter={0.5}
					enableRipples
					rippleSpeed={0.4}
					rippleThickness={0.12}
					rippleIntensityScale={1.5}
					liquid
					liquidStrength={0.12}
					liquidRadius={1.2}
					liquidWobbleSpeed={5}
					speed={0.6}
					edgeFade={0.25}
					transparent
				/>
				<motion.div
					id="userchatbot"
					className="relative z-10 flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white p-0 shadow-[0_30px_70px_-24px_rgba(43,57,144,0.45)] ring-1 ring-slate-200/70 sm:max-w-md sm:rounded-3xl md:max-w-xl lg:max-w-2xl"
					initial={{ opacity: 0, scale: 0.96 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, ease: 'easeOut' }}
				>
					<h1 className="sr-only">Ask Biomi, the Biosite virtual assistant</h1>
										{/* Header, with the switch between typing questions and tapping through topics */}
					<div className="relative flex items-center gap-3 overflow-hidden bg-gradient-to-br from-[#2B3990] via-[#2B3990] to-blue-600 px-4 py-3 sm:px-6 sm:py-4">
						<span aria-hidden="true" className="absolute -right-8 -top-16 h-44 w-44 rounded-full bg-white/10" />
						<span aria-hidden="true" className="absolute -bottom-20 right-32 h-32 w-32 rounded-full bg-white/10" />
						<span className="relative flex shrink-0">
							<BiomiAvatar size={44} animationState={avatarState} />
							<span aria-hidden="true" className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#2B3990] bg-emerald-400" />
						</span>
						<div className="relative min-w-0 flex-1">
							<h2 className="text-lg font-bold leading-tight text-white sm:text-xl">Biomi</h2>
							<p className="truncate text-xs text-blue-100 sm:text-sm">Virtual assistant</p>
						</div>
						<div role="tablist" aria-label="How would you like to get answers?" className="relative flex shrink-0 rounded-full bg-white/15 p-1">
							{([
								['chat', 'Chat', ICONS.chat],
								['topics', 'Topics', ICONS.topics],
							] as const).map(([m, label, icon]) => (
								<button
									key={m}
									id={`biomi-tab-${m}`}
									type="button"
									role="tab"
									aria-selected={mode === m}
									aria-controls={m === 'chat' ? 'biomi-chat' : 'biomi-topics'}
									onClick={() => (m === 'chat' ? setMode('chat') : openTopics())}
									className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:px-3.5 sm:text-sm ${mode === m ? 'bg-white text-[#2B3990] shadow' : 'text-white/90 hover:text-white'}`}
								>
									<Icon path={icon} className="h-4 w-4" />
									{label}
								</button>
							))}
						</div>
					</div>

{mode === 'chat' ? (
					<div
						id="biomi-chat"
						role="tabpanel"
						aria-labelledby="biomi-tab-chat"
						ref={listRef}
						className={panelBody}
						aria-live="polite"
						aria-label="Conversation with Biomi"
					>
												{messages.length === 0 && (
							<motion.div {...rise} className="m-auto flex w-full flex-col items-center py-1 text-center">
								<span className="flex [@media(max-height:700px)]:hidden"><BiomiAvatar size={56} /></span>
								<h3 className="mt-3 text-xl font-bold text-[#2B3990] sm:text-2xl [@media(max-height:700px)]:mt-0">Hi there, how can I help?</h3>
								<p className="mt-1 text-sm text-[#5b7290] [@media(max-height:700px)]:hidden">Ask me about our products, brands, events, offices, or careers.</p>
								<div className="mt-4 grid w-full grid-cols-1 gap-2 sm:grid-cols-2 [@media(max-height:700px)]:mt-2">
									{STARTER_QUESTIONS.map((q, i) => (
										<button
											key={q}
											type="button"
											onClick={() => ask(q)}
											className="group flex items-center gap-3 rounded-xl border border-[#e4e8f4] bg-white p-2.5 text-left shadow-sm transition-colors hover:border-[#2B3990]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B3990]/40"
										>
											<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef1fb] text-[#2B3990] transition-colors group-hover:bg-[#2B3990] group-hover:text-white">
												<Icon path={STARTER_ICONS[i] ?? ICONS.chat} className="h-[18px] w-[18px]" />
											</span>
											<span className="min-w-0 text-sm font-medium leading-snug text-[#1f3b63] group-hover:text-[#2B3990]">{q}</span>
										</button>
									))}
								</div>
							</motion.div>
						)}

{messages.map((m) =>
							m.from === 'user' ? (
								<motion.div key={m.id} {...rise} className="flex justify-end">
									<div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-[#2B3990] to-blue-600 px-4 py-2.5 text-sm text-white shadow-md shadow-[#2B3990]/20 sm:text-[15px]">{m.text}</div>
								</motion.div>
							) : (
								<motion.div key={m.id} {...rise} className="flex items-start gap-2">
									<BiomiAvatar size={30} />
									<div className="flex min-w-0 flex-1 max-w-[88%] flex-col gap-2">
										{m.answer!.text.map((t, i) => (
											<div key={i} className="rounded-2xl rounded-tl-sm border border-[#e4e8f4] bg-white px-4 py-2.5 text-sm leading-relaxed text-[#1f3b63] shadow-sm sm:text-[15px]">{t}</div>
										))}
										{m.answer!.products && (
											<div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
												{m.answer!.products.map((p) => (
													<button key={p.url + p.name} type="button" onClick={() => openCard(p)} aria-haspopup="dialog" className="group flex min-w-0 gap-3 rounded-xl border border-[#e4e8f4] bg-white p-2.5 text-left shadow-sm transition hover:border-[#2B3990]/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B3990]/40">
														{/* eslint-disable-next-line @next/next/no-img-element */}
														<img src={p.image} alt="" loading="lazy" className="h-14 w-14 flex-shrink-0 rounded-lg bg-[#f3f6fb] object-contain p-1" />
														<span className="min-w-0">
															<span className="block truncate text-sm font-semibold text-[#0b2a5c] group-hover:text-[#2B3990]">{p.name}</span>
															<span className="block truncate text-xs text-[#5b7290]">{[p.brand, p.category].filter(Boolean).join(' · ')}</span>
															<span className="mt-0.5 line-clamp-2 text-xs text-gray-500">{p.description}</span>
														</span>
													</button>
												))}
											</div>
										)}
										{m.answer!.offices && (
											<div className="grid gap-2">
												{m.answer!.offices.map((o) => (
													<div key={o.name} className="rounded-xl border border-[#e4e8f4] bg-white p-3 text-xs text-[#1f3b63] shadow-sm sm:text-sm">
														<div className="font-semibold text-[#0b2a5c]">{o.name}</div>
														<div className="mt-1">{o.address}</div>
														<div className="mt-1 text-[#5b7290]">{o.phone} · {o.email}</div>
														<div className="text-[#5b7290]">{o.hours}</div>
													</div>
												))}
											</div>
										)}
										{m.answer!.categories && (
											<div className="flex max-h-56 flex-wrap gap-1.5 overflow-y-auto overscroll-contain rounded-xl border border-[#e4e8f4] bg-white p-2.5 shadow-sm">
												{m.answer!.categories.map((c) => (
													<button key={c.name} type="button" onClick={() => ask(`Show ${c.name}`)} className="rounded-full border border-[#d9dff0] bg-[#f5f7fc] px-2.5 py-1 text-xs text-[#0b2a5c] transition hover:border-[#2B3990]/40 hover:bg-[#eef1fb] hover:text-[#2B3990] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B3990]/40">
														{c.name} <span className="text-[#8aa0bd]">{c.count}</span>
													</button>
												))}
											</div>
										)}
										{m.answer!.jobs && m.answer!.jobs.length > 0 && (
											<div className="rounded-xl border border-[#e4e8f4] bg-white p-3 text-xs text-[#1f3b63] shadow-sm sm:text-sm">
												<div className="mb-1 font-semibold text-[#0b2a5c]">Open positions ({m.answer!.jobs.length})</div>
												<ul className="max-h-56 list-disc space-y-0.5 overflow-y-auto overscroll-contain pl-4 pr-1">{m.answer!.jobs.map((j) => <li key={j}>{j}</li>)}</ul>
											</div>
										)}
										{(m.answer!.links?.length || m.answer!.suggestions?.length) ? (
											<div className="flex flex-wrap gap-2">
												{m.answer!.links?.map((l) => (
													/^https?:/.test(l.href) ? (
														<a key={l.href + l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#2B3990] bg-white px-3 py-1.5 text-xs font-semibold text-[#2B3990] shadow-sm transition hover:bg-[#eef1fb] sm:text-sm">{l.label} ↗<span className="sr-only"> (opens in a new tab)</span></a>
													) : (
														<Link key={l.href + l.label} href={l.href} prefetch={false} className="rounded-full bg-[#2B3990] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1f2a6b] sm:text-sm">{l.label} →</Link>
													)
												))}
												{m.answer!.suggestions?.map((q) => (
													<button key={q} type="button" className={chip} onClick={() => ask(q)}>{q}</button>
												))}
											</div>
										) : null}
										</div>
									</motion.div>
							),
						)}

						{typing && (
							<div className="flex items-center gap-2" aria-label="Biomi is typing">
								<BiomiAvatar size={30} animationState="thinking" />
								<div className="flex gap-1 rounded-2xl rounded-tl-sm border border-[#e4e8f4] bg-white px-4 py-3 shadow-sm">
									{[0, 1, 2].map((d) => (
										<span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#2B3990]/60" style={{ animationDelay: `${d * 0.15}s` }} />
									))}
								</div>
							</div>
						)}
					</div>
					) : (
						/* Browse topics: category -> question -> answer (same FAQ content Biomi searches) */
						<div
							id="biomi-topics"
							role="tabpanel"
							aria-labelledby="biomi-tab-topics"
							className={panelBody}
						>
							{topic === null && (
								<>
									<h3 className="text-lg font-bold text-[#2B3990]">What would you like to know about?</h3>
									<div className="grid grid-cols-2 gap-2 sm:gap-3">
										{FAQ_DATA.map((cat, idx) => (
											<button
												key={cat.category}
												type="button"
												onClick={() => { setTopic(idx); setTopicQ(null); }}
												className="group flex min-h-[44px] w-full items-center justify-between gap-2 rounded-xl border border-[#e4e8f4] bg-white px-3 py-2 text-left text-[13px] font-semibold leading-snug text-[#1f3b63] shadow-sm transition-colors hover:border-[#2B3990]/40 hover:text-[#2B3990] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B3990]/30 sm:px-4 sm:py-3 sm:text-[15px]"
											>
												{cat.category}
												<Icon path={ICONS.arrow} className="h-4 w-4 shrink-0 text-[#8aa0bd] transition-colors group-hover:text-[#2B3990]" />
											</button>
										))}
									</div>
								</>
							)}

							{topic !== null && topicQ === null && (
								<>
									<button type="button" onClick={() => setTopic(null)} className="flex w-fit items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-[#2B3990] transition-colors hover:bg-[#dfe4f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B3990]/40"><Icon path={ICONS.back} className="h-3.5 w-3.5" />All topics</button>
									<h3 className="text-lg font-bold text-[#2B3990]">{FAQ_DATA[topic].category}</h3>
									<div className="flex flex-col gap-2">
										{FAQ_DATA[topic].questions.map((item, idx) => (
											<button
												key={item.q}
												type="button"
												onClick={() => setTopicQ(idx)}
												className="rounded-xl border border-[#e4e8f4] bg-white px-3 py-2.5 text-left text-sm font-medium text-[#1f3b63] shadow-sm transition-colors hover:border-[#2B3990]/40 hover:text-[#2B3990] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B3990]/30 sm:px-4 sm:py-3 sm:text-[15px]"
											>
												{item.q}
											</button>
										))}
									</div>
								</>
							)}

							{topic !== null && topicQ !== null && (
								<>
									<button type="button" onClick={() => setTopicQ(null)} className="flex w-fit items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-[#2B3990] transition-colors hover:bg-[#dfe4f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B3990]/40"><Icon path={ICONS.back} className="h-3.5 w-3.5" />{FAQ_DATA[topic].category}</button>
									<div className="flex justify-end">
										<div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-br from-[#2B3990] to-blue-600 px-4 py-2.5 text-sm text-white shadow-md shadow-[#2B3990]/20 sm:text-[15px]">{FAQ_DATA[topic].questions[topicQ].q}</div>
									</div>
									<div className="flex items-start gap-2">
										<BiomiAvatar size={30} />
										<div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-[#e4e8f4] bg-white px-4 py-2.5 text-sm leading-relaxed text-[#1f3b63] shadow-sm sm:text-[15px]">{FAQ_DATA[topic].questions[topicQ].a}</div>
									</div>
									<div className="ml-9 flex flex-wrap gap-2">
										<button type="button" className={chip} onClick={() => continueInChat(FAQ_DATA[topic].questions[topicQ].q, FAQ_DATA[topic].questions[topicQ].a)}>Continue in chat</button>
										<button type="button" className={chip} onClick={() => setTopic(null)}>Other topics</button>
									</div>
								</>
							)}
						</div>
					)}

											{/* Input */}
					<form
						className="bg-white px-3 pt-3 sm:px-5"
						onSubmit={(e) => { e.preventDefault(); setMode('chat'); ask(input); }}
					>
						<label htmlFor="biomi-input" className="sr-only">Ask Biomi a question</label>
						<div className="flex items-center gap-2 rounded-2xl border border-[#d9dff0] bg-[#f5f7fc] py-1.5 pl-4 pr-1.5 transition-colors focus-within:border-[#2B3990] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2B3990]/15">
							<input
								id="biomi-input"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								maxLength={300}
								placeholder="Ask about a product, brand, or office…"
								autoComplete="off"
								className="min-w-0 flex-1 bg-transparent py-1 text-sm text-[#0b2a5c] outline-none placeholder:text-[#7486a3] sm:text-[15px]"
							/>
							<button
								type="submit"
								disabled={!input.trim() || typing}
								className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2B3990] to-blue-600 text-white shadow transition-opacity disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B3990] focus-visible:ring-offset-2"
								aria-label="Send"
							>
								<Icon path={ICONS.send} className="h-[18px] w-[18px]" />
							</button>
						</div>
					</form>

					{/* Footer */}
					<div className="bg-white px-4 pb-2.5 pt-2 text-center">
						<span className="text-[11px] text-gray-500">Biomi answers from the Biosite website only. For anything else, please contact our team.</span>
					</div>
</motion.div>
			</div>

			{/* Product details open over the chat (same modal as the product pages),
			    so closing it brings the visitor straight back to the conversation. */}
			<AnimatePresence>
				{openProduct && (
					<PopOutModal
						key={openProduct.url + openProduct.name}
						name={openProduct.name}
						description={openProduct.description}
						image={openProduct.image}
						logo={openProduct.logo || undefined}
						brandName={openProduct.brand || undefined}
						backLabel="Back to chat"
						onClose={closeProduct}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
