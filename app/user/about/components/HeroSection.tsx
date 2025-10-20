"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const slides = [
	{
		src: "/asset/slide (1).png",
		headline: "Reliable Medical & Diagnostic Solution",
		subheadline:
			"Discover a trusted source for medical and diagnostic instruments. We specialize in the importation and distribution of high-quality diagnostic devices, laboratory supplies, and medical consumables to meet your healthcare and laboratory needs.",
		buttons: [
			{ label: "Get Quote", href: "/contact" },
			{ label: "About Us", href: "/user/about" },
		],
	},
	{
		src: "/asset/slide (2).png",
		headline: "Innovating Diagnostics, Elevating Care",
		subheadline:
			"Transforming healthcare through advanced diagnostic and medical supplies. Explore our comprehensive range of premium laboratory tools, diagnostic devices, and medical consumables designed to support excellence in medical practice.",
		buttons: [
			{ label: "Our Products", href: "/products" },
			{ label: "Contact", href: "/contact" },
		],
	},
	{
		src: "/asset/slide (3).png",
		headline: "Your Partner in Advanced Healthcare",
		subheadline:
			"Empowering healthcare professionals with top-notch medical and laboratory products. From cutting-edge diagnostic instruments to essential consumables, we deliver quality solutions tailored for precision and reliability.",
		buttons: [
			{ label: "Learn More", href: "/user/about" },
			{ label: "Join Us", href: "/careers" },
		],
	},
];

// Placeholder translation function (replace with real translation logic or i18n integration)
function translate(text: string) {
	// In a real app, use a translation library or API here
	return text;
}

const TRANSITION_DURATION = 900; // ms
const SLIDE_DURATION = 3000; // ms
const TEXT_ANIMATION_DELAY = 250; // ms delay after image transition

const HeroSection = () => {
	const [current, setCurrent] = useState(0);
	const [fade, setFade] = useState(true);
	const [showText, setShowText] = useState(true);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const isPaused = useRef(false);

	// Helper to go to a specific slide
	const goToSlide = (idx: number) => {
		setFade(false);
		setShowText(false);
		if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
		fadeTimeoutRef.current = setTimeout(() => {
			setCurrent(idx);
			setFade(true);
			setTimeout(() => setShowText(true), TEXT_ANIMATION_DELAY);
		}, TRANSITION_DURATION);
	};

	// Manual navigation
	const prevSlide = () => {
		goToSlide(current === 0 ? slides.length - 1 : current - 1);
		pauseAutoAdvance();
	};
	const nextSlide = () => {
		goToSlide(current === slides.length - 1 ? 0 : current + 1);
		pauseAutoAdvance();
	};

	// Pause auto-advance on user interaction
	const pauseAutoAdvance = () => {
		isPaused.current = true;
		if (intervalRef.current) clearInterval(intervalRef.current);
		setTimeout(() => {
			isPaused.current = false;
			startAutoAdvance();
		}, SLIDE_DURATION * 2);
	};

	// Auto-advance logic
	const startAutoAdvance = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			if (!isPaused.current) {
				goToSlide((current + 1) % slides.length);
			}
		}, SLIDE_DURATION);
	};

	useEffect(() => {
		setFade(true);
		setTimeout(() => setShowText(true), TEXT_ANIMATION_DELAY);
		startAutoAdvance();
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
			if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [current]);

	return (
		<>
			<motion.section
				id="hero"
				className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f7f9fc] via-gray-50 to-white group lg:h-screen h-[calc(100vh-64px)] lg:mt-0 mt-[-64px]"
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				{/* Enhanced Background Image with parallax and modern effects */}
				<div className="absolute inset-0 w-full h-full">
					{slides.map((slide, idx) => (
						<motion.div
							key={slide.src}
							className="absolute inset-0"
							initial={false}
							animate={
								idx === current && fade
									? { opacity: 1, scale: 1.1, zIndex: 10 }
									: { opacity: 0, scale: 1.05, zIndex: 0 }
							}
							transition={{ duration: 1.2, ease: "easeOut" }}
						>
							<Image
								src={slide.src}
								alt="Biosite Building"
								fill
								className="object-cover object-center w-full h-full"
								priority={idx === current}
								style={{ transitionProperty: "opacity, transform" }}
							/>
							{/* Enhanced overlay with dynamic gradient */}
							<motion.div
								className={`absolute inset-0 transition-all duration-[1400ms] ease-out
                  ${
                  	idx === current
                   	? 'bg-gradient-to-br from-white/85 via-white/50 to-[#2B3990]/15 backdrop-blur-[3px]'
                   	: 'bg-gradient-to-br from-white/70 via-white/30 to-[#2B3990]/5 backdrop-blur-[3px]'
                  }`}
								initial={false}
								animate={idx === current ? { opacity: 1 } : { opacity: 0.7 }}
								transition={{ duration: 1.2, ease: "easeOut" }}
							/>
							{/* Subtle pattern overlay */}
							<div className="absolute inset-0 opacity-[0.03] bg-gradient-to-br from-[#2B3990] via-transparent to-[#2B3990]" />
						</motion.div>
					))}
				</div>

				{/* Animated navigation arrows only visible on group hover with fade-in */}
				{/* Left hover area */}
				<motion.div
					className="absolute left-0 top-0 h-full w-1/2 z-40 pointer-events-none  "
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<motion.button
						onClick={prevSlide}
						onMouseEnter={pauseAutoAdvance}
						onFocus={pauseAutoAdvance}
						aria-label="Previous slide"
						tabIndex={0}
						initial={false}
						animate={{ opacity: 0 }}
						whileHover={{ opacity: 1 }}
						whileFocus={{ opacity: 1 }}
						className="w-full h-full flex items-center justify-start bg-transparent border-none outline-none p-0 m-0 cursor-pointer group pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-400"
						transition={{ duration: 0.4, ease: "easeOut" }}
						style={{ pointerEvents: "auto" }}
					>
						<span className="sr-only">Previous</span>
						<span className="ml-10 flex items-center justify-center rounded-full bg-white/95 border-2 border-[#2B3990]/30 text-[#2B3990] w-12 h-12 shadow-xl hover:shadow-2xl hover:bg-[#2B3990] hover:text-white hover:border-[#2B3990] transition-all duration-200 backdrop-blur-md">
							<svg
								width="24"
								height="24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								viewBox="0 0 24 24"
								className="transition-transform duration-300"
							>
								<path
									d="M15 19l-7-7 7-7"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</span>
					</motion.button>
				</motion.div>
				{/* Right hover area */}
				<motion.div
					className="absolute right-0 top-0 h-full w-1/2 z-40 pointer-events-none"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<motion.button
						onClick={nextSlide}
						onMouseEnter={pauseAutoAdvance}
						onFocus={pauseAutoAdvance}
						aria-label="Next slide"
						tabIndex={0}
						initial={false}
						animate={{ opacity: 0 }}
						whileHover={{ opacity: 1 }}
						whileFocus={{ opacity: 1 }}
						className="w-full h-full flex items-center justify-end bg-transparent border-none outline-none p-0 m-0 cursor-pointer group pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-400"
						transition={{ duration: 0.4, ease: "easeOut" }}
						style={{ pointerEvents: "auto" }}
					>
						<span className="sr-only">Next</span>
						<span className="mr-10 flex items-center justify-center rounded-full bg-white/95 border-2 border-[#2B3990]/30 text-[#2B3990] w-12 h-12 shadow-xl hover:shadow-2xl hover:bg-[#2B3990] hover:text-white hover:border-[#2B3990] transition-all duration-200 backdrop-blur-md">
							<svg
								width="24"
								height="24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								viewBox="0 0 24 24"
								className="transition-transform duration-300"
							>
								<path
									d="M9 5l7 7-7 7"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</span>
					</motion.button>
				</motion.div>

				{/* Enhanced content section with modern styling - Responsive */}
				<div
					className="absolute left-2 sm:left-4 md:left-8 lg:left-[250px] top-0 h-full flex flex-col justify-center z-20 px-3 sm:px-4 md:px-6 lg:px-20 scale-90 sm:scale-100 md:scale-110 lg:scale-150"
					style={{
						pointerEvents: "none",
						width: "calc(100% - 1rem)",
						maxWidth: "800px",
						marginTop: "0",
					}}
				>
					<motion.div
						className={`flex flex-col items-start transition-all duration-800 will-change-transform relative
              ${
              	showText
              	? 'opacity-100 translate-y-0 scale-100'
              	: 'opacity-0 translate-y-12 scale-95'
              }`}
						initial={false}
						animate={
							showText
								? { opacity: 1, y: 0, scale: 1 }
								: { opacity: 0, y: 48, scale: 0.97 }
						}
						transition={{ duration: 0.7, ease: "easeOut" }}
						style={{ pointerEvents: "auto" }}
					>
						{/* Subtle background accent */}
						<motion.div
							className="absolute -left-6 top-0 w-1.5 h-full bg-gradient-to-b from-[#2B3990] to-transparent origin-top"
							initial={{ opacity: 0, scaleY: 0 }}
							animate={showText ? { opacity: 0.6, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
							transition={{ duration: 0.7, ease: "easeOut" }}
							style={{ pointerEvents: "none" }}
						/>
						<motion.h1
							className="text-base sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-[#2B3990] text-left leading-tight mb-3 sm:mb-4 lg:mb-6 drop-shadow-lg transition-all duration-800 will-change-transform relative group"
							initial={false}
							animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
							transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
						>
							{translate(slides[current].headline)}
							<motion.div
								className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#2B3990] to-blue-500 rounded-full"
								initial={{ width: 0 }}
								animate={showText ? { width: "min(250px, 80%)" } : { width: 0 }}
								transition={{ duration: 0.7, ease: "easeOut" }}
							/>
						</motion.h1>
						<motion.p
							className="text-sm sm:text-base md:text-lg lg:text-xl text-[#333] text-left mb-6 sm:mb-8 max-w-full lg:max-w-2xl leading-relaxed drop-shadow-sm transition-all duration-800 will-change-transform relative"
							initial={false}
							animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
							transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
						>
							{translate(slides[current].subheadline)}
						</motion.p>
						<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 mt-2">
							{slides[current].buttons.map((btn, idx) => (
								<motion.a
									key={btn.label}
									href={btn.href}
									className={
										idx === 0
											? `bg-gradient-to-r from-[#2B3990] to-blue-700 hover:from-blue-700 hover:to-[#2B3990] text-white font-semibold rounded-lg sm:rounded-xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base shadow-xl hover:shadow-2xl focus:ring-4 focus:ring-[#2B3990]/50 focus:outline-none transition-all duration-400 will-change-transform transform hover:scale-105 hover:-translate-y-1 group relative overflow-hidden min-h-[44px] ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`
											: `bg-gradient-to-r from-[#333] to-[#222] hover:from-[#222] hover:to-[#111] text-white font-semibold rounded-lg sm:rounded-xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base shadow-xl hover:shadow-2xl focus:ring-4 focus:ring-[#333]/50 focus:outline-none transition-all duration-400 will-change-transform transform hover:scale-105 hover:-translate-y-1 group relative overflow-hidden min-h-[44px] ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`
									}
									tabIndex={0}
									initial={false}
									animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
									transition={{ duration: 0.5, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
									style={{ pointerEvents: "auto" }}
									whileHover={{ scale: 1.07, y: -4 }}
								>
									<span className="relative z-10">{translate(btn.label)}</span>
									<div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</motion.a>
							))}
						</div>
					</motion.div>
				</div>
			</motion.section>

			{/* Enhanced Location Boxes Section - Fully Responsive */}
			<div
				className="absolute bottom-0 mb-6 w-full flex justify-center items-center pointer-events-none"
				style={{ position: "relative", zIndex: 30, marginTop: "40px" }}
			>
				<div className="w-full max-w-6xl flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4 lg:px-0 pointer-events-auto">
					{/* Enhanced Manila Box - Responsive */}
					<div className="flex-1 bg-gradient-to-br from-[#2453A6] to-[#1a3f85] rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col min-w-[280px] sm:min-w-[300px] lg:min-w-[260px] max-w-[370px] mx-auto group hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-[#2453A6]/20 relative overflow-hidden">
						{/* Subtle pattern overlay */}
						<div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

						<div className="text-white text-lg sm:text-xl font-bold mb-2 sm:mb-3 tracking-wide relative z-10 group-hover:text-blue-100 transition-colors duration-300">
							MANILA
						</div>
						<div className="text-white/90 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300">
							305 Col. Bonny Serrano Ave, San Juan City, 1500 Metro Manila,
							Philippines
						</div>
						<div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base font-semibold mb-4 sm:mb-6 relative z-10 group-hover:text-blue-100 transition-colors duration-300">
							<div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
								<svg
									width="18"
									height="18"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.5"
									viewBox="0 0 24 24"
								>
									<path d="M22 16.92V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2.08a2 2 0 0 1 .84-1.63l8-5.6a2 2 0 0 1 2.32 0l8 5.6a2 2 0 0 1 .84 1.63z" />
									<circle cx="12" cy="7" r="4" />
								</svg>
							</div>
							+63 917 111 5008
						</div>
						<div className="flex items-center justify-between mt-auto relative z-10">
							<a
								href="#"
								className="text-white text-sm font-semibold flex items-center gap-2 hover:text-blue-200 transition-all duration-300 transform hover:translate-x-1 group/link"
							>
								LEARN MORE
								<span
									aria-hidden
									className="transform group-hover/link:translate-x-1 transition-transform duration-300"
								>
									→
								</span>
							</a>
							<div className="w-12 h-8 rounded bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
								<div className="w-8 h-5 rounded bg-[#1A3578] relative">
									<div className="w-6 h-3 rounded bg-[#2453A6] absolute top-1 left-1" />
								</div>
							</div>
						</div>
					</div>

					{/* Enhanced Cebu Box - Responsive */}
					<div className="flex-1 bg-gradient-to-br from-[#2453A6] to-[#1a3f85] rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col min-w-[280px] sm:min-w-[300px] lg:min-w-[260px] max-w-[370px] mx-auto group hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-[#2453A6]/20 relative overflow-hidden">
						{/* Subtle pattern overlay */}
						<div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

						<div className="text-white text-lg sm:text-xl font-bold mb-2 sm:mb-3 tracking-wide relative z-10 group-hover:text-blue-100 transition-colors duration-300">
							CEBU
						</div>
						<div className="text-white/90 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300">
							Block 2 Lot 2 Guadalupe Heights Village, Guadalupe, 6000 Cebu
							City, Philippines
						</div>
						<div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base font-semibold mb-4 sm:mb-6 relative z-10 group-hover:text-blue-100 transition-colors duration-300">
							<div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
								<svg
									width="18"
									height="18"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.5"
									viewBox="0 0 24 24"
								>
									<path d="M22 16.92V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2.08a2 2 0 0 1 .84-1.63l8-5.6a2 2 0 0 1 2.32 0l8 5.6a2 2 0 0 1 .84 1.63z" />
									<circle cx="12" cy="7" r="4" />
								</svg>
							</div>
							+63 917 111 5008
						</div>
						<div className="flex items-center justify-between mt-auto relative z-10">
							<a
								href="#"
								className="text-white text-sm font-semibold flex items-center gap-2 hover:text-blue-200 transition-all duration-300 transform hover:translate-x-1 group/link"
							>
								LEARN MORE
								<span
									aria-hidden
									className="transform group-hover/link:translate-x-1 transition-transform duration-300"
								>
									→
								</span>
							</a>
							<div className="w-12 h-8 rounded bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
								<div className="w-8 h-5 rounded bg-[#1A3578] relative">
									<div className="w-6 h-3 rounded bg-[#2453A6] absolute top-1 left-1" />
								</div>
							</div>
						</div>
					</div>

					{/* Enhanced Davao Box - Responsive */}
					<div className="flex-1 bg-gradient-to-br from-[#2453A6] to-[#1a3f85] rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col min-w-[280px] sm:min-w-[300px] lg:min-w-[260px] max-w-[370px] mx-auto group hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-[#2453A6]/20 relative overflow-hidden">
						{/* Subtle pattern overlay */}
						<div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

						<div className="text-white text-lg sm:text-xl font-bold mb-2 sm:mb-3 tracking-wide relative z-10 group-hover:text-blue-100 transition-colors duration-300">
							DAVAO
						</div>
						<div className="text-white/90 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300">
							555 Manga St., Juna Subd, Matina, 8000 Davao City, Philippines
						</div>
						<div className="flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base font-semibold mb-4 sm:mb-6 relative z-10 group-hover:text-blue-100 transition-colors duration-300">
							<div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
								<svg
									width="18"
									height="18"
									fill="none"
									stroke="currentColor"
									strokeWidth="2.5"
									viewBox="0 0 24 24"
								>
									<path d="M22 16.92V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2.08a2 2 0 0 1 .84-1.63l8-5.6a2 2 0 0 1 2.32 0l8 5.6a2 2 0 0 1 .84 1.63z" />
									<circle cx="12" cy="7" r="4" />
								</svg>
							</div>
							+63 917 111 5008
						</div>
						<div className="flex items-center justify-between mt-auto relative z-10">
							<a
								href="#"
								className="text-white text-sm font-semibold flex items-center gap-2 hover:text-blue-200 transition-all duration-300 transform hover:translate-x-1 group/link"
							>
								LEARN MORE
								<span
									aria-hidden
									className="transform group-hover/link:translate-x-1 transition-transform duration-300"
								>
									→
								</span>
							</a>
							<div className="w-12 h-8 rounded bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
								<div className="w-8 h-5 rounded bg-[#1A3578] relative">
									<div className="w-6 h-3 rounded bg-[#2453A6] absolute top-1 left-1" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HeroSection;