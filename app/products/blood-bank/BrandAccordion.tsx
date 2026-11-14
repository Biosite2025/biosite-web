"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import ProductCard from "../shared/ProductCard";

/**
 * Brand accordion for the Blood Bank page.
 *
 * Desktop/tablet: the tab title sits on the left and the brands stand as an
 * overlapping stack of coloured cards on the right. When the section scrolls
 * into view the first brand glides open (pushing the title away) to show its
 * products; clicking another brand opens it and folds the others back into
 * slim spines. Phones get the same idea stacked vertically.
 */

export interface AccordionBrand { name: string; logo: string; cls: string; }
export interface AccordionProduct { id: number; name: string; image: string; description?: string; }
export interface AccordionGroup { brand: string; products: AccordionProduct[]; }

/** Panel colours per brand: deep tones so white text stays readable. */
const TONES: Record<string, [string, string]> = {
	matrix: ["#B3122E", "#7A0C20"],
	diasorin: ["#1D4E9E", "#123266"],
	acon: ["#0E7C86", "#095159"],
	haier: ["#334155", "#1E293B"],
	bms: ["#2B3990", "#1A2460"],
	centron: ["#0F766E", "#0A4F4A"],
	tulip: ["#BE185D", "#831140"],
};
const FALLBACK: [string, string] = ["#2B3990", "#1A2460"];
const tone = (brand: string) => TONES[brand] ?? FALLBACK;

/** One smooth, slightly springy-feeling ease used for every open/close. */
const EASE = [0.22, 1, 0.36, 1] as const;
const OPEN = { duration: 0.75, ease: EASE };

/** Collapsed spine width and how far neighbouring spines overlap (px, design units). */
const SPINE = 84;
const OVERLAP = 18;

export default function BrandAccordion({
	title,
	groups,
	brands,
	onViewDetails,
}: {
	title: string;
	groups: AccordionGroup[];
	brands: Record<string, AccordionBrand>;
	onViewDetails: (p: AccordionProduct) => void;
}) {
	const reduced = useReducedMotion() ?? false;
	const sectionRef = useRef<HTMLDivElement>(null);
	// Opens once the stack is well into view (not the moment its edge appears).
	const inView = useInView(sectionRef, { amount: 0.5, once: true });
	const [open, setOpen] = useState<number | null>(null);
	const touched = useRef(false);

	useEffect(() => {
		if (!inView || touched.current) return;
		// A short beat so the visitor sees the closed stack before it opens.
		const t = window.setTimeout(() => setOpen((o) => (o === null ? 0 : o)), reduced ? 0 : 450);
		return () => window.clearTimeout(t);
	}, [inView, reduced]);

	const choose = (i: number) => {
		touched.current = true;
		setOpen(i);
	};

	const total = groups.reduce((n, g) => n + g.products.length, 0);
	const names = groups.map((g) => brands[g.brand]?.name ?? g.brand);
	const transition = reduced ? { duration: 0 } : OPEN;

	// ---- Mouse wheel over the stack steps through it ----
	// One wheel step = one move: the next product in the open brand's row (when
	// it has more than fit), otherwise the next brand. At the very first/last
	// step the wheel is left alone, so the page scrolls on as normal.
	const stackRef = useRef<HTMLDivElement>(null);
	const openRef = useRef(open);
	useEffect(() => {
		openRef.current = open;
	}, [open]);
	useEffect(() => {
		const stack = stackRef.current;
		if (!stack) return;
		let lockedUntil = 0;
		// Long enough for a brand to finish opening, and for one trackpad swipe
		// (many small wheel events) to count as a single step.
		const STEP_MS = reduced ? 250 : 650;
		const QUIET_MS = 180;
		const onWheel = (e: WheelEvent) => {
			if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // pinch-zoom / sideways swipe: native
			const dir = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
			if (!dir) return;
			const now = performance.now();
			// Still the same gesture (a trackpad keeps sending small events as it
			// coasts, a spun wheel keeps clicking): keep it on the products, even if
			// the last step just reached the end, and wait for a short pause before
			// the next step. Only a NEW gesture at the end scrolls the page.
			if (now < lockedUntil) {
				e.preventDefault();
				lockedUntil = Math.max(lockedUntil, now + QUIET_MS);
				return;
			}
			const cur = openRef.current;
			const row = stack.querySelector<HTMLElement>('[role="region"] [data-product-row]');
			// A few pixels of slack: the page's scale-to-fit zoom leaves fractional widths.
			const rowCanMove =
				!!row && (dir > 0 ? row.scrollLeft + row.clientWidth < row.scrollWidth - 4 : row.scrollLeft > 4);
			const brandCanMove = cur === null ? dir > 0 : dir > 0 ? cur < groups.length - 1 : cur > 0;
			if (!rowCanMove && !brandCanMove) return; // a new gesture at the end: let the page scroll
			e.preventDefault();
			lockedUntil = now + STEP_MS;
			if (rowCanMove && row) {
				const card = row.firstElementChild as HTMLElement | null;
				const step = (card?.offsetWidth ?? row.clientWidth * 0.8) + 16; // card + gap
				row.scrollBy({ left: dir * step, behavior: reduced ? "auto" : "smooth" });
				return;
			}
			touched.current = true;
			setOpen(cur === null ? 0 : cur + dir);
		};
		stack.addEventListener("wheel", onWheel, { passive: false });
		return () => stack.removeEventListener("wheel", onWheel);
	}, [groups.length, reduced]);

	// A brand opened by stepping backwards shows its last products first, so
	// scrolling up walks back through everything in order.
	const prevOpen = useRef(open);
	useEffect(() => {
		const was = prevOpen.current;
		prevOpen.current = open;
		if (open === null || was === null || open >= was) return;
		const t = window.setTimeout(() => {
			const row = stackRef.current?.querySelector<HTMLElement>('[role="region"] [data-product-row]');
			if (row) row.scrollLeft = row.scrollWidth;
		}, 0);
		return () => window.clearTimeout(t);
	}, [open]);

	return (
		<div ref={sectionRef}>
			{/* ---------------- Tablet & desktop: horizontal stack ---------------- */}
			<div ref={stackRef} className="hidden md:flex h-[480px] items-stretch overscroll-contain" role="presentation">
				{/* Title: fills the left until a brand opens, then folds away */}
				<motion.div
					initial={false}
					animate={open === null ? { width: "36%", opacity: 1, marginRight: 32 } : { width: "0%", opacity: 0, marginRight: 0 }}
					transition={transition}
					className="shrink-0 overflow-hidden flex flex-col justify-center"
					aria-hidden={open !== null}
				>
					<div className="min-w-[280px] pr-4">
						<h3 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">{title}</h3>
						<p className="mt-4 text-base lg:text-lg text-gray-600 leading-relaxed">
							{total} product{total === 1 ? "" : "s"} from {names.join(", ")}.
						</p>
						<p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2B3990]">
							<span aria-hidden="true">←</span> Choose a brand to see its products
						</p>
					</div>
				</motion.div>

				{/* Brand cards */}
				<div className="flex flex-1 min-w-0 items-stretch justify-end">
					{groups.map((g, i) => {
						const brand = brands[g.brand];
						const [c1, c2] = tone(g.brand);
						const isOpen = open === i;
						return (
							<motion.div
								key={g.brand}
								initial={false}
								animate={{ flexGrow: isOpen ? 1 : 0 }}
								transition={transition}
								style={{
									flexBasis: SPINE,
									flexShrink: 0,
									marginLeft: i === 0 ? 0 : -OVERLAP,
									zIndex: isOpen ? 20 : groups.length - Math.abs((open ?? 0) - i),
									background: `linear-gradient(160deg, ${c1}, ${c2})`,
								}}
								className="relative min-w-0 overflow-hidden rounded-2xl shadow-[-10px_0_24px_-12px_rgba(15,23,42,0.45)]"
							>
								{/* Collapsed spine (the whole card is the button) */}
								<button
									type="button"
									onClick={() => choose(i)}
									aria-expanded={isOpen}
									aria-controls={`bb-panel-${g.brand}`}
									aria-label={`${brand?.name ?? g.brand}: ${g.products.length} product${g.products.length === 1 ? "" : "s"}`}
									className={`absolute inset-0 flex flex-col items-center justify-between py-5 text-white transition-opacity duration-300 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white ${isOpen ? "pointer-events-none opacity-0" : "opacity-100 hover:brightness-110"}`}
									style={{ paddingLeft: i === 0 ? 0 : OVERLAP }}
									tabIndex={isOpen ? -1 : 0}
								>
									<span className="flex size-12 items-center justify-center rounded-full bg-white shadow-md">
										{brand && <Image src={brand.logo} alt="" width={80} height={32} className="max-h-6 max-w-9 w-auto object-contain" />}
									</span>
									<span className="font-bold tracking-wide text-lg [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
										{brand?.name ?? g.brand}
									</span>
									<span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold tabular-nums">{g.products.length}</span>
								</button>

								{/* Open panel */}
								<AnimatePresence>
									{isOpen && (
										<motion.div
											key="panel"
											id={`bb-panel-${g.brand}`}
											role="region"
											aria-label={`${brand?.name ?? g.brand} products`}
											initial={reduced ? false : { opacity: 0 }}
											animate={{ opacity: 1, transition: { duration: 0.35, delay: reduced ? 0 : 0.3 } }}
											exit={{ opacity: 0, transition: { duration: 0.15 } }}
											className="absolute inset-0 flex flex-col p-6"
											style={{ paddingLeft: (i === 0 ? 0 : OVERLAP) + 24 }}
										>
											<PanelBody group={g} brand={brand} reduced={reduced} onViewDetails={onViewDetails} cardClass="w-[250px]" />
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						);
					})}
				</div>
			</div>

			{/* ---------------- Phones: vertical stack ---------------- */}
			<div className="md:hidden">
				<h3 className="text-2xl font-bold text-gray-900">{title}</h3>
				<p className="mt-1 mb-4 text-sm text-gray-600">{total} product{total === 1 ? "" : "s"} from {names.join(", ")}.</p>
				<div className="flex flex-col gap-2">
					{groups.map((g, i) => {
						const brand = brands[g.brand];
						const [c1, c2] = tone(g.brand);
						const isOpen = open === i;
						return (
							<div key={g.brand} className="overflow-hidden rounded-2xl shadow-md" style={{ background: `linear-gradient(160deg, ${c1}, ${c2})` }}>
								<button
									type="button"
									onClick={() => (isOpen ? (touched.current = true, setOpen(null)) : choose(i))}
									aria-expanded={isOpen}
									aria-controls={`bb-m-panel-${g.brand}`}
									className="flex w-full items-center gap-3 px-4 py-3 text-left text-white focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
								>
									<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white">
										{brand && <Image src={brand.logo} alt="" width={64} height={28} className="max-h-4 max-w-7 w-auto object-contain" />}
									</span>
									<span className="flex-1 font-bold">{brand?.name ?? g.brand}</span>
									<span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold tabular-nums">{g.products.length}</span>
									<motion.svg animate={{ rotate: isOpen ? 180 : 0 }} transition={transition} viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
										<path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
									</motion.svg>
								</button>
								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											id={`bb-m-panel-${g.brand}`}
											role="region"
											aria-label={`${brand?.name ?? g.brand} products`}
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={transition}
										>
											<div className="px-3 pb-4">
												<PanelBody group={g} brand={brand} reduced={reduced} onViewDetails={onViewDetails} cardClass="w-[46vw] max-w-[220px]" compact />
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

/** Header (logo, name, count, scroll arrows) and a sideways-scrolling row of product cards. */
function PanelBody({
	group,
	brand,
	reduced,
	onViewDetails,
	cardClass,
	compact = false,
}: {
	group: AccordionGroup;
	brand?: AccordionBrand;
	reduced: boolean;
	onViewDetails: (p: AccordionProduct) => void;
	cardClass: string;
	compact?: boolean;
}) {
	const rowRef = useRef<HTMLDivElement>(null);
	const [edges, setEdges] = useState({ start: true, end: true });

	useEffect(() => {
		const row = rowRef.current;
		if (!row) return;
		const read = () =>
			setEdges({ start: row.scrollLeft <= 2, end: row.scrollLeft + row.clientWidth >= row.scrollWidth - 2 });
		read();
		row.addEventListener("scroll", read, { passive: true });
		const ro = new ResizeObserver(read);
		ro.observe(row);
		return () => {
			row.removeEventListener("scroll", read);
			ro.disconnect();
		};
	}, []);

	const scrollBy = (dir: 1 | -1) => {
		const row = rowRef.current;
		if (!row) return;
		row.scrollBy({ left: dir * row.clientWidth * 0.8, behavior: reduced ? "auto" : "smooth" });
	};
	const overflows = !(edges.start && edges.end);

	return (
		<>
			{!compact && (
				<div className="mb-4 flex items-center gap-3 text-white">
					<span className="flex h-11 items-center rounded-full bg-white px-4 shadow-md">
						{brand && <Image src={brand.logo} alt={`${brand.name} logo`} width={160} height={48} className={`${brand.cls} !h-6 w-auto object-contain`} />}
					</span>
					<span className="text-sm font-semibold text-white/85">
						{group.products.length} product{group.products.length === 1 ? "" : "s"}
					</span>
					{overflows && (
						<span className="ml-auto flex gap-2">
							{([-1, 1] as const).map((d) => (
								<button
									key={d}
									type="button"
									onClick={() => scrollBy(d)}
									disabled={d === -1 ? edges.start : edges.end}
									aria-label={d === -1 ? "Previous products" : "More products"}
									className="flex size-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30 disabled:opacity-30 disabled:hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"
								>
									<svg viewBox="0 0 20 20" className={`size-4 ${d === -1 ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
										<path d="M7.5 4.5 13 10l-5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</button>
							))}
						</span>
					)}
				</div>
			)}
			<div
				ref={rowRef}
				data-product-row
				className="-mx-1 flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
			>
				{group.products.map((p, idx) => (
					<motion.div
						key={p.id}
						className={`shrink-0 snap-start ${cardClass}`}
						initial={reduced ? false : { opacity: 0, x: 40 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, ease: EASE, delay: reduced ? 0 : 0.35 + idx * 0.07 }}
					>
						<ProductCard
							image={p.image}
							name={p.name}
							description={p.description}
							brandName={brand?.name}
							brandLogo={brand?.logo}
							brandLogoClass={brand?.cls}
							onViewDetails={() => onViewDetails(p)}
						/>
					</motion.div>
				))}
			</div>
		</>
	);
}
