"use client";

import { motion } from "framer-motion";

export type BiomiAvatarState = "idle" | "thinking" | "reply";

/**
 * Biomi's robot face. Idle: a slow head sway and blinking eyes (CSS loops in
 * globals.css: .biomi-sway / .biomi-blink, off for reduced motion). "thinking"
 * squints once, "reply" gives a little nod. Used in the FAQ chat and on the
 * floating Biomi button on product pages.
 */
export default function BiomiAvatar({
	size = 44,
	animationState = "idle",
	className = "",
}: {
	size?: number;
	animationState?: BiomiAvatarState;
	className?: string;
}) {
	const headVariants = {
		idle: { rotate: 0, y: 0 },
		thinking: { rotate: 0, y: 0 },
		reply: { rotate: [0, 10, 0], y: [0, 2, 0], transition: { duration: 0.6 } },
	};
	const eyeVariants = {
		idle: { scaleY: 1 },
		thinking: { scaleY: [1, 0.1, 1], transition: { duration: 0.4 } },
		reply: { scaleY: 1 },
	};
	return (
		<motion.span
			className={`inline-block bg-white border-2 border-[#b2d6e6] rounded-full overflow-hidden ${className}`}
			style={{ width: size, height: size }}
			initial="idle"
			animate={animationState}
		>
			<motion.svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }} aria-hidden="true">
				<motion.g variants={headVariants} animate={animationState} className={animationState === "idle" ? "biomi-sway" : undefined}>
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
					<motion.circle cx="40" cy="60" r="3.5" fill="#3a6b7c" variants={eyeVariants} animate={animationState} className={animationState === "idle" ? "biomi-blink" : undefined} />
					<motion.circle cx="60" cy="60" r="3.5" fill="#3a6b7c" variants={eyeVariants} animate={animationState} className={animationState === "idle" ? "biomi-blink" : undefined} />
					{/* Smile */}
					<path d="M43 70 Q50 75 57 70" stroke="#3a6b7c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
				</motion.g>
			</motion.svg>
		</motion.span>
	);
}
