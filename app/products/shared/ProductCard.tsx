"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import Tilt from "react-parallax-tilt";

export interface ProductCardProps {
	image: string;
	name: string;
	description?: string;
	href?: string;
	brandLogo?: string;
	brandName?: string;
	/** Height class for the corner badge — override for logos with heavy internal padding */
	brandLogoClass?: string;
	index?: number;
	onViewDetails?: () => void;
}

/** True on devices with no hover (phones/tablets) — used to disable the image tilt. */
function useIsTouch() {
	const [isTouch, setIsTouch] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia("(hover: none)");
		setIsTouch(mq.matches);
		const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);
	return isTouch;
}

export default function ProductCard({
	image,
	name,
	description,
	href,
	brandLogo,
	brandName,
	brandLogoClass,
	index = 0,
	onViewDetails,
}: ProductCardProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const isTouch = useIsTouch();
	const reducedMotion = useReducedMotion();
	const tiltEnabled = !isTouch && !reducedMotion;

	// The whole card opens the product (image, text or the link below). The
	// "View Details" control is the one keyboard/screen-reader target; its
	// click bubbles up to the card, so the modal opens exactly once.
	const router = useRouter();
	const openProduct = (e: MouseEvent) => {
		if ((e.target as HTMLElement).closest("a")) return; // a real link navigates by itself
		if (href) router.push(href);
		else onViewDetails?.();
	};

	// Text link, no border. Same row height as the old button so cards keep their size.
	const viewDetailsClass =
		"group/vd inline-flex items-center gap-1.5 py-2 sm:py-1.5 text-xs sm:text-[15px] font-semibold text-[#2B3990] rounded-md " +
		"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990]";
	const viewDetailsInner = (
		<>
			<svg
				aria-hidden="true"
				viewBox="0 0 20 20"
				fill="none"
				stroke="currentColor"
				strokeWidth={2.5}
				className="size-3.5 sm:size-4 transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
			>
				<path d="M7.5 4.5 13 10l-5.5 5.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
			<span className="underline-offset-4 decoration-2 group-hover:underline">View Details</span>
		</>
	);

	const productImage = (
		<div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
			<Image
				src={image}
				alt={name}
				fill
				className="object-contain p-3 sm:p-4 transition-transform duration-[220ms] ease-out group-hover:scale-105"
				sizes="(max-width: 912px) 50vw, (max-width: 1279px) 33vw, 20vw"
			/>
		</div>
	);

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 40 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
			transition={{ duration: 0.5, delay: index * 0.08 }}
			whileHover={{ y: -4 }}
			onClick={openProduct}
			className="group relative flex flex-col h-full cursor-pointer bg-white rounded-xl border border-gray-100
					 shadow-[0_1px_3px_rgba(16,24,40,0.07),0_12px_32px_-12px_rgba(16,24,40,0.14)]
					 hover:shadow-[0_2px_6px_rgba(16,24,40,0.08),0_20px_48px_-14px_rgba(43,57,144,0.28)]
					 hover:border-[#2B3990]/30
					 transition-all duration-[220ms] ease-out overflow-hidden"
		>
			{/* Image container - 4:3, with a bottom border for tonal separation from the body */}
			<div className="relative z-10 w-full aspect-[4/3] bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 border-b border-gray-200/80 overflow-hidden">
				{tiltEnabled ? (
					// Subtle mouse-driven 3D tilt on the product image only.
					// Kept small (5°) — B2B medical brand, not a gimmick.
					<Tilt
						tiltMaxAngleX={5}
						tiltMaxAngleY={5}
						scale={1.03}
						transitionSpeed={900}
						glareEnable={false}
						className="w-full h-full"
						style={{ transformStyle: "preserve-3d" }}
					>
						{productImage}
					</Tilt>
				) : (
					productImage
				)}

				{/* Brand logo badge (kept outside the tilt so it stays anchored) */}
				{/* Badge is scaled down on phones (cards are two-up) — works with any brandLogoClass a page passes. */}
				{brandLogo && (
					<div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 origin-top-right scale-[0.6] sm:scale-[0.75] opacity-90 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
						{/* Default sizing caps BOTH height and width, so wide wordmarks
						    stay readable without ever spanning the card. When a page
						    passes brandLogoClass it owns sizing outright — keeping the
						    cap out of the base string avoids two conflicting max-w rules. */}
						<Image
							src={brandLogo}
							alt={`${brandName ?? "Brand"} logo`}
							aria-hidden="true"
							width={200}
							height={64}
							className={`${brandLogoClass ?? "h-[48px] sm:h-[56px] max-w-[150px] sm:max-w-[170px]"} w-auto object-contain drop-shadow-md`}
						/>
					</div>
				)}

				<div className="absolute inset-0 bg-gradient-to-t from-[#2B3990]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
			</div>

			{/* Content — title, description, and button read as one unit */}
			<div className="relative z-10 flex flex-col flex-1 px-3 sm:px-4 pt-3 sm:pt-4 pb-2 sm:pb-2.5">
				<h3 className="text-sm sm:text-lg font-bold text-gray-900 leading-snug mb-2 sm:mb-1 line-clamp-2 group-hover:text-[#2B3990] transition-colors duration-200">
					{name}
				</h3>
				{/* Hidden on phones to keep two-up cards compact; it's in View Details. */}
				<p className="max-sm:hidden text-gray-600 text-xs sm:text-sm leading-relaxed mb-2 line-clamp-2">
					{description}
				</p>

				<div className="mt-auto">
					{href ? (
						<Link href={href} className={viewDetailsClass} aria-label={`View details of ${name}`}>
							{viewDetailsInner}
						</Link>
					) : (
						<button type="button" className={viewDetailsClass} aria-label={`View details of ${name}`}>
							{viewDetailsInner}
						</button>
					)}
				</div>
			</div>
		</motion.div>
	);
}
