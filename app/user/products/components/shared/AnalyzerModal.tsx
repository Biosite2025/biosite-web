'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import HoverZoom from './HoverZoom';
import TestMenuTable, { countAssays, type TestMenu } from './TestMenuTable';

/**
 * Product modal for analyzers that have a test menu (Tosoh, DiaSorin, ILab,
 * BIO-FLASH). One column on every screen size, with two tabs:
 *  - Product details: large floating photo, brand logo, description, quote CTA
 *  - Test menu: the full-width table, with a compact header that keeps the
 *    product photo, name and logo in view.
 */
export default function AnalyzerModal({
	name,
	description,
	image,
	logo,
	brandName,
	menu,
	menuTitle,
	menuFooter,
	onClose,
}: {
	name: string;
	description?: string;
	image: string;
	logo?: string;
	brandName?: string;
	menu: TestMenu;
	menuTitle: string;
	menuFooter?: string;
	onClose: () => void;
}) {
	const [tab, setTab] = useState<'details' | 'menu'>('details');
	const reducedMotion = useReducedMotion();
	const assays = countAssays(menu);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
		window.addEventListener('keydown', onKey);
		// Lets background animations pause while the modal covers the page.
		document.documentElement.setAttribute('data-modal-open', '');
		return () => {
			window.removeEventListener('keydown', onKey);
			document.documentElement.removeAttribute('data-modal-open');
		};
	}, [onClose]);

	const fade = reducedMotion
		? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
		: { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.22, ease: 'easeOut' as const } };

	const tabBtn = (id: 'details' | 'menu', label: React.ReactNode) => (
		<button
			type="button"
			role="tab"
			id={`analyzer-tab-${id}`}
			aria-selected={tab === id}
			aria-controls={`analyzer-panel-${id}`}
			onClick={() => setTab(id)}
			className={`relative flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B3990]/40 sm:text-sm ${tab === id ? 'text-white' : 'text-[#2B3990] hover:bg-[#2B3990]/5'}`}
		>
			{tab === id && (
				<motion.span layoutId="analyzer-tab-pill" className="absolute inset-0 -z-10 rounded-full bg-[#2B3990]" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
			)}
			{label}
		</button>
	);

	return (
		<>
			<motion.div
				className="fixed inset-0 z-40 bg-slate-200/70 backdrop-blur-lg"
				onClick={onClose}
				style={{ cursor: 'pointer' }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.2 }}
			/>
			<div className="pointer-events-none fixed inset-x-0 bottom-0 top-16 z-50 flex items-center justify-center p-3 sm:p-4 lg:top-24">
				<motion.div
					role="dialog"
					aria-modal="true"
					aria-labelledby="analyzer-modal-title"
					onClick={(e) => e.stopPropagation()}
					initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ type: 'spring', stiffness: 260, damping: 26 }}
					className="pointer-events-auto flex h-[min(46rem,100%)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-[0_40px_90px_-30px_rgba(15,23,42,0.45)] ring-1 ring-gray-200"
				>
					{/* Header: product (thumbnail on the menu tab), name, brand, close */}
					<div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 sm:px-6 sm:py-4">
						<AnimatePresence initial={false}>
							{tab === 'menu' && (
								<motion.div
									key="thumb"
									className="relative h-12 w-12 shrink-0 sm:h-16 sm:w-16"
									initial={{ opacity: 0, width: 0 }}
									animate={{ opacity: 1, width: 'auto' }}
									exit={{ opacity: 0, width: 0 }}
									transition={{ duration: 0.2 }}
								>
									<Image src={image} alt="" fill sizes="64px" className="object-contain drop-shadow-[0_6px_6px_rgba(15,23,42,0.18)]" />
								</motion.div>
							)}
						</AnimatePresence>
						<div className="min-w-0 flex-1">
							{brandName && <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 sm:text-xs">{brandName}</p>}
							<h2 id="analyzer-modal-title" className="truncate text-lg font-extrabold leading-tight text-gray-900 sm:text-2xl">
								{name}
							</h2>
						</div>
						{logo && (
							<Image src={logo} alt={`${brandName ?? 'Brand'} logo`} width={240} height={80} className="hidden h-8 w-auto max-w-[120px] object-contain min-[380px]:block sm:h-10 sm:max-w-[160px]" />
						)}
						<button
							type="button"
							onClick={onClose}
							aria-label="Close"
							className="-mr-1 shrink-0 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B3990]/40"
						>
							<svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					{/* Tabs */}
					<div className="px-4 pt-3 sm:px-6">
						<div role="tablist" aria-label="Product information" className="isolate flex gap-1 rounded-full bg-[#2B3990]/[0.06] p-1">
							{tabBtn('details', 'Product details')}
							{tabBtn('menu', <>Test menu <span className={tab === 'menu' ? 'text-white/70' : 'text-[#2B3990]/50'}>· {assays}</span></>)}
						</div>
					</div>

					{/* Body */}
					<div className="relative min-h-0 flex-1">
						<AnimatePresence mode="wait" initial={false}>
							{tab === 'details' ? (
								<motion.div
									key="details"
									{...fade}
									id="analyzer-panel-details"
									role="tabpanel"
									aria-labelledby="analyzer-tab-details"
									className="absolute inset-0 flex flex-col px-4 pt-2 sm:px-6"
								>
									{/* Photo stays put; only the description scrolls; actions are pinned below. */}
									<div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] gap-3 md:grid-cols-2 md:grid-rows-[minmax(0,1fr)] md:gap-8">
										{/* Floating product photo */}
										<div className="relative mx-auto h-40 w-full max-w-xs sm:h-56 md:h-72 md:max-w-none md:self-center">
											<div aria-hidden="true" className="absolute inset-x-[18%] bottom-1 h-5 bg-[radial-gradient(closest-side,rgba(15,23,42,0.22),transparent)]" />
											<div className="nikon-stage-float absolute inset-0">
												<HoverZoom stage>
													<Image src={image} alt={name} fill priority sizes="(max-width: 768px) calc(var(--vw,1vw)*80), 360px" className="object-contain p-2 drop-shadow-[0_14px_10px_rgba(15,23,42,0.18)]" />
												</HoverZoom>
											</div>
										</div>
										<div className="min-h-0 overflow-y-auto overscroll-contain pr-1 md:self-stretch md:py-2">
											<p className="text-sm leading-relaxed text-gray-600 sm:text-[15px]">{description}</p>
										</div>
									</div>
									<div className="flex shrink-0 flex-col gap-2 border-t border-gray-100 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4">
										<p className="order-2 text-[11px] text-gray-400 sm:order-1 sm:text-xs">For detailed specifications and pricing, our sales team will get back to you.</p>
										<div className="order-1 flex shrink-0 gap-2 sm:order-2">
												<button
													type="button"
													onClick={() => setTab('menu')}
													className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#2B3990] px-4 py-2 sm:flex-none text-sm font-semibold text-[#2B3990] transition hover:bg-[#2B3990] hover:text-white"
												>
													View test menu ({assays})
												</button>
												<Link
													href="/user/contact"
													className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#2B3990] px-4 py-2 sm:flex-none text-sm font-semibold text-white shadow-lg shadow-[#2B3990]/25 transition hover:bg-[#1f2a6b]"
												>
													Request a Quote →
												</Link>
											</div>
										</div>
								</motion.div>
							) : (
								<motion.div
									key="menu"
									{...fade}
									id="analyzer-panel-menu"
									role="tabpanel"
									aria-labelledby="analyzer-tab-menu"
									className="absolute inset-0 flex flex-col px-4 pb-4 pt-3 sm:px-6 sm:pb-6"
								>
									<h3 className="mb-2 text-sm font-bold text-gray-900 sm:text-base">{menuTitle}</h3>
									<TestMenuTable menu={menu} footer={menuFooter} className="min-h-0 flex-1" />
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</motion.div>
			</div>
		</>
	);
}
