'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import HoverZoom from './HoverZoom';

// Logos whose files carry lots of empty canvas render tiny at the modal's
// logo size. These trimmed copies are used ONLY here; tabs and card badges
// keep the original files and sizing.
const POPUP_LOGOS: Record<string, string> = {
	"/asset/logo/FUJIFILM.png": "/asset/logo/popup/fujifilm.png",
	"/asset/logo/ozelle (1).png": "/asset/logo/popup/ozelle-1-.png",
	"/asset/logo/northern.png": "/asset/logo/popup/northern.png",
	"/asset/logo/hamiltonlogo.png": "/asset/logo/popup/hamiltonlogo.png",
	"/asset/logo/nihon.png": "/asset/logo/popup/nihon.png",
	"/asset/logo/drager.png": "/asset/logo/popup/drager.png",
	"/asset/logo/Penlon (1).png": "/asset/logo/popup/penlon-1-.png",
	"/asset/logo/GE-Healthcare-Logo-2004–2023.png": "/asset/logo/popup/ge-healthcare-logo-2004-2023.png",
	"/asset/logo/comen.png": "/asset/logo/popup/comen.png",
	"/asset/logo/byond.png": "/asset/logo/popup/byond.png",
	"/asset/logo/uzumcu.png": "/asset/logo/popup/uzumcu.png",
	"/asset/logo/HFMED.png": "/asset/logo/popup/hfmed.png",
	"/asset/clinical-chemistry/diamond-logo.png": "/asset/logo/popup/diamond-logo.png"
};

/**
 * Product details modal — "pop-out" design used by every product page:
 * the brand logo floats above a white card and the product photo breaks out
 * of the card's top-right corner. 3D spring entrance, float, hover tilt,
 * brand-coloured glow, light sweep, staggered copy. Closes on backdrop click,
 * "Back to products" or Escape.
 */
export default function PopOutModal({
	name,
	description,
	image,
	logo,
	brandName,
	accent = '#2B3990',
	onClose,
}: {
	name: string;
	description?: string;
	image: string;
	logo?: string;
	brandName?: string;
	/** Brand colour for the glow, edge highlight and title bar. */
	accent?: string;
	onClose: () => void;
}) {
	const reducedMotion = useReducedMotion();
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [onClose]);
	// Lets background animations pause while the modal covers the page.
	useEffect(() => {
		document.documentElement.setAttribute('data-modal-open', '');
		return () => document.documentElement.removeAttribute('data-modal-open');
	}, []);

	const stop = (e: React.MouseEvent) => e.stopPropagation();
	const rise = (delay: number) =>
		reducedMotion
			? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2, delay } }
			: { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const } };

	return (
		<>
			{/* Overlay — light frosted glass with a soft vignette */}
			<motion.div
				className="fixed inset-0 z-40 bg-slate-200/70 backdrop-blur-lg [background-image:radial-gradient(80%_70%_at_50%_45%,rgba(255,255,255,0.55),rgba(148,163,184,0.25))]"
				onClick={onClose}
				style={{ cursor: 'pointer' }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.25 }}
			/>

			<div className="fixed inset-x-0 bottom-0 top-16 lg:top-24 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 pointer-events-none [perspective:1600px]">
				<div className="relative w-full max-w-[22rem] pt-36 sm:max-w-xl sm:pt-40 lg:max-w-4xl lg:pt-[min(11rem,24vh)]">
					{/* Brand logo — floats above the card */}
					<motion.div
						className="pointer-events-none absolute left-1 top-0 z-10 sm:left-2 lg:top-2"
						initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -24, scale: 0.92 }}
						animate={{ opacity: 1, x: 0, scale: 1 }}
						transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.05 }}
					>
						{logo && (
							<Image
								src={POPUP_LOGOS[logo] ?? logo}
								alt={`${brandName ?? 'Brand'} logo`}
								width={240}
								height={240}
								className="h-14 w-auto max-w-[200px] object-contain drop-shadow-[0_10px_20px_rgba(15,23,42,0.18)] sm:h-16 sm:max-w-[240px] lg:h-20 lg:max-w-[280px]"
							/>
						)}
					</motion.div>

					{/* Card */}
					<motion.div
						role="dialog"
						aria-modal="true"
						aria-labelledby="popout-modal-title"
						onClick={stop}
						initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 36, rotateX: 10, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
						transition={{ type: 'spring', stiffness: 220, damping: 24 }}
						className="relative pointer-events-auto rounded-3xl bg-white/95 shadow-[0_40px_90px_-30px_rgba(15,23,42,0.45)] ring-1 ring-white"
					>
						{/* top edge highlight + one-off light sweep across the card */}
						<span aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-0 h-px opacity-80" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
						<span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
							{!reducedMotion && (
								<motion.span
									className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
									initial={{ x: '0%' }}
									animate={{ x: '420%' }}
									transition={{ duration: 1.3, delay: 0.55, ease: 'easeInOut' }}
								/>
							)}
						</span>


						{/* Product — breaks out of the card's top-right corner */}
						<div className="absolute -top-32 right-2 z-20 h-52 w-44 sm:-top-36 sm:right-4 sm:h-60 sm:w-52 lg:-top-[min(11rem,24vh)] lg:-right-10 lg:h-[min(22rem,48vh)] lg:w-[min(20rem,44vh)]">
							{/* brand glow + contact shadow on the card */}
							<div aria-hidden="true" className="absolute -inset-[10%]" style={{ background: `radial-gradient(closest-side, ${accent}4d, ${accent}1a 55%, transparent)` }} />
							<div aria-hidden="true" className="absolute -bottom-2 left-1/2 h-6 w-3/4 -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(15,23,42,0.28),transparent)]" />
							<motion.div
								className="absolute inset-0"
								initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, rotateY: -22, scale: 0.85 }}
								animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
								transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.15 }}
							>
								<div className="nikon-stage-float absolute inset-0">
									<HoverZoom stage>
										<Image
											src={image}
											alt={name}
											fill
											priority
											sizes="(max-width: 1024px) 220px, 320px"
											className="object-contain drop-shadow-[0_28px_30px_rgba(15,23,42,0.35)]"
										/>
									</HoverZoom>
								</div>
							</motion.div>
						</div>

						{/* Copy — kept clear of the product on desktop */}
						<div className="relative px-6 pb-6 pt-24 sm:px-8 sm:pb-8 sm:pt-28 lg:pr-[21rem] lg:pt-10 [@media(max-height:760px)]:lg:pt-7 [@media(max-height:760px)]:lg:pb-6">
							<motion.h3 {...rise(0.25)} id="popout-modal-title" className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl">
								{name}
							</motion.h3>
							<motion.span
								aria-hidden="true"
								className="mt-3 block h-1 rounded-full" style={{ backgroundColor: accent }}
								initial={{ width: 0 }}
								animate={{ width: 56 }}
								transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
							/>
							<motion.p {...rise(0.4)} className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-[15px] [@media(max-height:760px)]:lg:text-sm max-lg:h-[min(8.5rem,20dvh)] max-lg:overflow-y-auto max-lg:overscroll-contain max-lg:pr-1 max-lg:pb-3 max-lg:[mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
								{description}
							</motion.p>
							<motion.div {...rise(0.5)} className="mt-6 flex flex-wrap items-center gap-3 [@media(max-height:760px)]:lg:mt-4">
								<Link
									href="/user/contact"
									className="group inline-flex items-center gap-2 rounded-full bg-[#2B3990] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2B3990]/25 transition hover:-translate-y-0.5 hover:bg-[#1f2a6b] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990]"
								>
									Request a Quote
									<svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
										<path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
									</svg>
								</Link>
								<button
									type="button"
									onClick={onClose}
									className="rounded-full px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
								>
									Back to products
								</button>
							</motion.div>
							<motion.p {...rise(0.58)} className="mt-6 border-t border-gray-100 pt-4 text-xs text-gray-400 [@media(max-height:760px)]:hidden">
								For detailed specifications and pricing, our sales team will get back to you.
							</motion.p>
						</div>
					</motion.div>
				</div>
			</div>
		</>
	);
}

