'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

/**
 * Hover effect for the product photo in the details modal — the same
 * treatment as the product cards (see ProductCard): a subtle mouse-driven 3D
 * tilt, a gentle 5% grow, and a soft brand-blue tint from the bottom.
 *
 * Wrap a `fill` <Image> (its parent must be positioned). Tilt is off on touch
 * devices (no hover) and for reduced motion, exactly like the cards.
 */
export default function HoverZoom({ children }: { children: ReactNode }) {
	const reducedMotion = useReducedMotion();
	const [isTouch, setIsTouch] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia('(hover: none)');
		setIsTouch(mq.matches);
		const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	}, []);
	const tiltEnabled = !isTouch && !reducedMotion;

	// Same timing as the card image: 220ms ease-out grow on hover.
	const photo = (
		<div
			className="absolute inset-0 transition-transform duration-[220ms] ease-out group-hover/photo:scale-105"
			style={{ transformStyle: 'preserve-3d' }}
		>
			{children}
		</div>
	);

	return (
		<div className="group/photo absolute inset-0 overflow-hidden rounded-[inherit]">
			{tiltEnabled ? (
				// Same tilt settings as the cards — kept small (5°) for a B2B medical brand.
				<Tilt
					tiltMaxAngleX={5}
					tiltMaxAngleY={5}
					scale={1.03}
					transitionSpeed={900}
					glareEnable={false}
					className="absolute inset-0"
					style={{ transformStyle: 'preserve-3d' }}
				>
					{photo}
				</Tilt>
			) : (
				photo
			)}
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2B3990]/10 to-transparent opacity-0 transition-opacity duration-200 group-hover/photo:opacity-100" />
		</div>
	);
}
