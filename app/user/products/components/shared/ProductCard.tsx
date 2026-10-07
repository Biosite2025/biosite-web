"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

	// Ghost/outline default that fills solid navy on hover — keeps the product
	// image as the hero of the card instead of a wall of blue bars.
	const viewDetailsButton = (
		<motion.button
			type="button"
			whileTap={{ scale: 0.97 }}
			onClick={onViewDetails}
			className="w-full border-2 border-[#2B3990] text-[#2B3990] bg-transparent py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base
					 hover:bg-[#2B3990] hover:text-white transition-colors duration-200
					 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3990]"
		>
			View Details
		</motion.button>
	);

	const productImage = (
		<div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
			<Image
				src={image}
				alt={name}
				fill
				className="object-contain p-6 transition-transform duration-[220ms] ease-out group-hover:scale-105"
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			/>
		</div>
	);

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 40 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
			transition={{ duration: 0.5, delay: index * 0.08 }}
			whileHover={{ y: -6 }}
			className="group relative flex flex-col h-full bg-white rounded-xl border border-gray-100
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
				{brandLogo && (
					<div className="absolute top-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
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
			<div className="relative z-10 flex flex-col flex-1 px-4 sm:px-5 md:px-6 pt-5 pb-4 sm:pb-5">
				<h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-1.5 group-hover:text-[#2B3990] transition-colors duration-200">
					{name}
				</h3>
				<p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
					{description}
				</p>

				<div className="mt-auto">
					{href ? (
						<Link href={href} className="block w-full">
							{viewDetailsButton}
						</Link>
					) : (
						viewDetailsButton
					)}
				</div>
			</div>
		</motion.div>
	);
}
