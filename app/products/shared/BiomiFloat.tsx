"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BiomiAvatar, { type BiomiAvatarState } from "@/app/chatbot/components/BiomiAvatar";

/**
 * Floating Biomi button for the product pages.
 *
 * - Shows (fade + rise) only while product cards are on screen; it fades out
 *   over the hero, the call-to-action band, the footer and any open product
 *   window.
 * - Every time it appears, a speech bubble pops up ("Want to
 *   search a product? Click me") and hides again after a few seconds; it comes
 *   back on hover or keyboard focus.
 * - Click: opens Biomi on the FAQ page, which greets with this page's products
 *   and suggestions (/chatbot?from=<page title>).
 * - Stays a standard real size (56 px desktop, 52 px phones) even though the
 *   site zooms whole pages to fit the screen.
 */
export default function BiomiFloat() {
	const reduced = useReducedMotion() ?? false;
	const [visible, setVisible] = useState(false);
	const [bubble, setBubble] = useState(false);
	const [face, setFace] = useState<BiomiAvatarState>("idle");
	const [pageTitle, setPageTitle] = useState("");
	const [unzoom, setUnzoom] = useState(1);

	// Undo the page's scale-to-fit zoom for this button only.
	useEffect(() => {
		const read = () => {
			const z = parseFloat(document.documentElement.style.zoom) || 1;
			setUnzoom(1 / z);
		};
		read();
		window.addEventListener("resize", read);
		return () => window.removeEventListener("resize", read);
	}, []);

	// Visible only while the product area (first card's top to last card's
	// bottom) is behind the button's own spot, and no product window is open.
	// So it fades out over the hero, the call-to-action band and the footer,
	// even when a row of cards is still peeking in at the top of the screen.
	useEffect(() => {
		let hideTimer = 0;
		let frame = 0;
		// Found once per DOM change (not on every scroll frame): the product
		// section, whether a product window is open, and the page zoom.
		let dirty = true;
		let section: Element | null = null;
		let modalOpen = false;
		let z = 1;
		const locate = () => {
			dirty = false;
			z = parseFloat(document.documentElement.style.zoom) || 1;
			modalOpen = !!document.querySelector('[role="dialog"], [aria-modal="true"]');
			section = null;
			const cards = document.querySelectorAll("[data-product-card]");
			let card: Element | undefined;
			for (const c of cards) if (c.getClientRects().length) { card = c; break; } // skip hidden layouts
			if (!card) return;
			// The product section: the largest block around the cards that holds
			// neither the page's hero title nor the footer (tabs + grid, up to the
			// call-to-action band).
			const h1 = document.querySelector("h1");
			const footer = document.querySelector("footer");
			let s: Element = card;
			for (let p = s.parentElement; p && !(h1 && p.contains(h1)) && !(footer && p.contains(footer)); p = p.parentElement) s = p;
			section = s;
		};
		const update = () => {
			frame = 0;
			if (dirty || (section && !section.isConnected)) locate();
			let show = false;
			if (section && !modalOpen) {
				const vh = window.innerHeight / z;
				// The button's centre, in the page's (zoomed) coordinates: ~52 real px above the bottom.
				const spot = vh - 52 / z;
				const r = section.getBoundingClientRect();
				const seen = Math.min(r.bottom, vh) - Math.max(r.top, 0);
				// The visitor is looking at the products: they fill a good part of the
				// screen, or a short product section is on screen in full. (Near the
				// end of a long page only a sliver of products is left above the
				// call-to-action and footer, so it fades out there.)
				show = r.top < spot && (seen >= vh * 0.45 || (r.height > 0 && seen >= r.height * 0.85));
			}
			if (show) {
				window.clearTimeout(hideTimer);
				hideTimer = 0;
				setVisible(true);
			}
			// A short grace period, so passing the gap between rows doesn't flicker it.
			else if (!hideTimer)
				hideTimer = window.setTimeout(() => {
					hideTimer = 0;
					setVisible(false);
					setBubble(false);
				}, 150);
		};
		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		let titled = false;
		const onMutate = () => {
			if (!titled) {
				const t = document.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim();
				if (t) {
					titled = true;
					setPageTitle(t);
				}
			}
			dirty = true;
			schedule();
		};
		const onResize = () => {
			dirty = true; // zoom and layouts change with the window
			schedule();
		};
		onMutate();
		// Cards arrive late (tabs, lazy sections) and windows open/close: re-check on DOM changes.
		const mo = new MutationObserver(onMutate);
		mo.observe(document.body, { childList: true, subtree: true });
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", onResize);
		return () => {
			mo.disconnect();
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", onResize);
			cancelAnimationFrame(frame);
			window.clearTimeout(hideTimer);
		};
	}, []);

	// Every time Biomi pops back into view: the bubble pops up for a few seconds, with a little wave.
	useEffect(() => {
		if (!visible) return;
		const show = window.setTimeout(() => {
			setBubble(true);
			setFace("reply");
		}, reduced ? 0 : 700);
		const calm = window.setTimeout(() => setFace("idle"), reduced ? 0 : 1400);
		const hide = window.setTimeout(() => setBubble(false), 6500);
		return () => {
			window.clearTimeout(show);
			window.clearTimeout(calm);
			window.clearTimeout(hide);
		};
	}, [visible, reduced]);

	const href = `/chatbot${pageTitle ? `?from=${encodeURIComponent(pageTitle)}` : ""}`;
	const hello = () => {
		setBubble(true);
		setFace("reply");
		window.setTimeout(() => setFace("idle"), 700);
	};

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					key="biomi-float"
					initial={{ opacity: 0, y: reduced ? 0 : 16, scale: reduced ? 1 : 0.9 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: reduced ? 0 : 16, scale: reduced ? 1 : 0.9 }}
					transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
					className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6"
					style={{ zoom: unzoom }}
				>
					<Link
						href={href}
						aria-label="Ask Biomi to find a product"
						onMouseEnter={hello}
						onFocus={hello}
						onMouseLeave={() => setBubble(false)}
						onBlur={() => setBubble(false)}
						className="group relative block rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2B3990]"
					>
						{/* Speech bubble */}
						<AnimatePresence>
							{bubble && (
								<motion.span
									key="bubble"
									role="status"
									initial={{ opacity: 0, y: reduced ? 0 : 8, scale: reduced ? 1 : 0.85 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, y: reduced ? 0 : 6, scale: reduced ? 1 : 0.9 }}
									transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
									style={{ transformOrigin: "bottom right" }}
									className="absolute bottom-[calc(100%+12px)] right-0 w-max max-w-[250px] rounded-2xl rounded-br-md border border-[#d9dff0] bg-white px-4 py-2.5 text-left text-sm leading-snug text-gray-800 shadow-[0_10px_30px_-10px_rgba(16,24,40,0.35)]"
								>
									<span className="block font-semibold text-[#2B3990]">Want to search a product?</span>
									<span className="block text-gray-600">Click me and I&apos;ll help you find it.</span>
									{/* Tail */}
									<span aria-hidden="true" className="absolute -bottom-[7px] right-5 size-3 rotate-45 border-b border-r border-[#d9dff0] bg-white" />
								</motion.span>
							)}
						</AnimatePresence>

						{/* Button: gentle float; soft pulse ring when it first appears */}
						<span className={`relative flex size-[52px] items-center justify-center rounded-full bg-white shadow-[0_8px_24px_-6px_rgba(43,57,144,0.45)] ring-1 ring-[#2B3990]/10 transition-transform duration-200 group-hover:scale-105 group-active:scale-95 sm:size-14 ${reduced ? "" : "biomi-float"}`}>
							{!reduced && <span aria-hidden="true" className="biomi-ping absolute inset-0 rounded-full border-2 border-[#16A4FF]/60" />}
							<BiomiAvatar size={48} animationState={face} className="!border-[#9cc9e0] sm:scale-110" />
						</span>
					</Link>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
