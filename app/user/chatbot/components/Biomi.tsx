"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, easeInOut, AnimatePresence } from "framer-motion";
import { askBiomi, loadBiomi, EMPTY_CONTEXT, STARTER_QUESTIONS, type Answer, type BiomiContext, type Product } from "../lib/biomiSearch";
import PopOutModal from '../../products/components/shared/PopOutModal';
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

type ChatMessage = { id: number; from: 'user' | 'biomi'; text?: string; answer?: Answer };

// Chat-style FAQ: answers come only from the website's own content (see ../lib/biomiSearch).
export default function BiomiFAQ() {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState('');
	const [typing, setTyping] = useState(false);
	const [avatarState, setAvatarState] = useState<'idle' | 'thinking' | 'reply'>('idle');
	const [openProduct, setOpenProduct] = useState<Product | null>(null);
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

	const chip = 'rounded-full border border-[#cfe0f7] bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-[#0056D2] shadow-sm transition hover:bg-[#eaf2fd] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0056D2]/40';

	return (
		<>
			<div id="bg" className="relative mb-6 sm:mb-10 flex justify-center items-center min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-96px)] py-3 sm:py-5 md:py-6 lg:py-8 [@media(max-height:760px)]:lg:py-3 bg-transparent font-[Inter,Poppins,sans-serif] px-2 sm:px-3 md:px-6 pt-8 mt-8 lg:mt-0 lg:pt-8 max-[912px]:mb-16 max-[912px]:mt-0 max-[912px]:py-0 max-[912px]:pt-0 max-[912px]:pb-0 max-[912px]:px-0 max-[912px]:min-h-0">
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
					className="relative z-10 flex w-full max-w-sm flex-col overflow-hidden rounded-xl border border-gray-100 bg-white p-0 shadow-lg sm:max-w-md sm:rounded-2xl sm:shadow-xl md:max-w-xl md:shadow-2xl lg:max-w-2xl"
					initial={{ opacity: 0, scale: 0.96 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, ease: 'easeOut' }}
				>
					{/* Header */}
					<div className="relative flex min-h-[64px] items-center gap-3 rounded-t-xl bg-[#0056D2] px-4 py-3 sm:min-h-[72px] sm:rounded-t-2xl sm:px-6 sm:py-4 md:min-h-[84px] md:px-8">
						<BiomiAvatar size={32} animationState={avatarState} />
						<div className="flex flex-col">
							<h2 className="text-lg font-bold leading-tight text-white sm:text-xl">Hi there! <span className="align-middle text-base sm:text-lg">👋</span></h2>
							<p className="mt-0.5 text-xs text-white opacity-90 sm:text-sm">I&apos;m Biomi. Ask me about our products, brands, offices, or careers.</p>
						</div>
					</div>

					{/* Conversation */}
					<div
						ref={listRef}
						className="flex h-[min(26rem,58dvh)] flex-col gap-3 overflow-y-auto overscroll-contain bg-[#f7fafd] px-3 py-4 sm:px-5 [@media(max-height:760px)]:lg:h-[min(22rem,52dvh)]"
						aria-live="polite"
						aria-label="Conversation with Biomi"
					>
						<div className="flex items-start gap-2">
							<BiomiAvatar size={26} />
							<div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-[#e3eaf7] bg-white px-4 py-2.5 text-sm text-[#1f3b63] shadow-sm sm:text-[15px]">
								Ask me anything about Biosite — for example a product, a brand, or where our offices are.
							</div>
						</div>
						{messages.length === 0 && (
							<div className="ml-9 flex flex-wrap gap-2">
								{STARTER_QUESTIONS.map((q) => (
									<button key={q} type="button" className={chip} onClick={() => ask(q)}>{q}</button>
								))}
							</div>
						)}

						{messages.map((m) =>
							m.from === 'user' ? (
								<div key={m.id} className="flex justify-end">
									<div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0056D2] px-4 py-2.5 text-sm text-white shadow sm:text-[15px]">{m.text}</div>
								</div>
							) : (
								<div key={m.id} className="flex items-start gap-2">
									<BiomiAvatar size={26} />
									<div className="flex min-w-0 flex-1 max-w-[88%] flex-col gap-2">
										{m.answer!.text.map((t, i) => (
											<div key={i} className="rounded-2xl rounded-tl-sm border border-[#e3eaf7] bg-white px-4 py-2.5 text-sm leading-relaxed text-[#1f3b63] shadow-sm sm:text-[15px]">{t}</div>
										))}
										{m.answer!.products && (
											<div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
												{m.answer!.products.map((p) => (
													<button key={p.url + p.name} type="button" onClick={() => openCard(p)} aria-haspopup="dialog" className="group flex min-w-0 gap-3 rounded-xl border border-[#e3eaf7] bg-white p-2.5 text-left shadow-sm transition hover:border-[#0056D2]/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0056D2]/40">
														{/* eslint-disable-next-line @next/next/no-img-element */}
														<img src={p.image} alt="" loading="lazy" className="h-14 w-14 flex-shrink-0 rounded-lg bg-[#f3f6fb] object-contain p-1" />
														<span className="min-w-0">
															<span className="block truncate text-sm font-semibold text-[#0b2a5c] group-hover:text-[#0056D2]">{p.name}</span>
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
													<div key={o.name} className="rounded-xl border border-[#e3eaf7] bg-white p-3 text-xs text-[#1f3b63] shadow-sm sm:text-sm">
														<div className="font-semibold text-[#0b2a5c]">{o.name}</div>
														<div className="mt-1">{o.address}</div>
														<div className="mt-1 text-[#5b7290]">{o.phone} · {o.email}</div>
														<div className="text-[#5b7290]">{o.hours}</div>
													</div>
												))}
											</div>
										)}
										{m.answer!.categories && (
											<div className="flex max-h-56 flex-wrap gap-1.5 overflow-y-auto overscroll-contain rounded-xl border border-[#e3eaf7] bg-white p-2.5 shadow-sm">
												{m.answer!.categories.map((c) => (
													<button key={c.name} type="button" onClick={() => ask(`Show ${c.name}`)} className="rounded-full border border-[#d6e3f5] bg-[#f7fafd] px-2.5 py-1 text-xs text-[#0b2a5c] transition hover:border-[#0056D2]/40 hover:bg-[#eaf2fd] hover:text-[#0056D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0056D2]/40">
														{c.name} <span className="text-[#8aa0bd]">{c.count}</span>
													</button>
												))}
											</div>
										)}
										{m.answer!.jobs && m.answer!.jobs.length > 0 && (
											<div className="rounded-xl border border-[#e3eaf7] bg-white p-3 text-xs text-[#1f3b63] shadow-sm sm:text-sm">
												<div className="mb-1 font-semibold text-[#0b2a5c]">Open positions</div>
												<ul className="list-disc space-y-0.5 pl-4">{m.answer!.jobs.map((j) => <li key={j}>{j}</li>)}</ul>
											</div>
										)}
										{(m.answer!.links?.length || m.answer!.suggestions?.length) ? (
											<div className="flex flex-wrap gap-2">
												{m.answer!.links?.map((l) => (
													<Link key={l.href + l.label} href={l.href} prefetch={false} className="rounded-full bg-[#0056D2] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0045a8] sm:text-sm">{l.label} →</Link>
												))}
												{m.answer!.suggestions?.map((q) => (
													<button key={q} type="button" className={chip} onClick={() => ask(q)}>{q}</button>
												))}
											</div>
										) : null}
									</div>
								</div>
							),
						)}

						{typing && (
							<div className="flex items-center gap-2" aria-label="Biomi is typing">
								<BiomiAvatar size={26} animationState="thinking" />
								<div className="flex gap-1 rounded-2xl rounded-tl-sm border border-[#e3eaf7] bg-white px-4 py-3 shadow-sm">
									{[0, 1, 2].map((d) => (
										<span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#0056D2]/60" style={{ animationDelay: `${d * 0.15}s` }} />
									))}
								</div>
							</div>
						)}
					</div>

					{/* Input */}
					<form
						className="flex items-center gap-2 border-t border-[#e3eaf7] bg-white px-3 py-3 sm:px-5"
						onSubmit={(e) => { e.preventDefault(); ask(input); }}
					>
						<label htmlFor="biomi-input" className="sr-only">Ask Biomi a question</label>
						<input
							id="biomi-input"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							maxLength={300}
							placeholder="Ask about a product, brand, or office…"
							autoComplete="off"
							className="min-w-0 flex-1 rounded-full border border-[#d6e3f5] bg-[#f7fafd] px-4 py-2.5 text-sm text-[#0b2a5c] placeholder:text-[#8aa0bd] focus:border-[#0056D2] focus:outline-none focus:ring-2 focus:ring-[#0056D2]/20 sm:text-[15px]"
						/>
						<button
							type="submit"
							disabled={!input.trim() || typing}
							className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0056D2] text-white shadow transition hover:bg-[#0045a8] disabled:opacity-40"
							aria-label="Send"
						>
							<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
						</button>
					</form>

					{/* Footer */}
					<div className="bg-white px-4 pb-2.5 text-center">
						<span className="text-[11px] text-gray-400">Biomi answers from the Biosite website only. For anything else, please contact our team.</span>
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
