
'use client';
import React from 'react';

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// iPad Air, iPad Pro, and iPad Mini responsive styles
const ipadResponsiveStyles = `
	@media (min-width: 768px) and (max-width: 912px) {
		.location-boxes-container {
			justify-content: center !important;
			margin-left: auto !important;
			margin-right: auto !important;
			width: 100% !important;
			display: flex !important;
			scale: 0.95 !important;
			margin-left: -30px !important;
		}
		.location-boxes-container > div {
			scale: 0.9 !important;
			display: grid !important;
			grid-template-columns: 1fr 1fr 1fr !important;
			gap: 24px !important;
			padding-left: 0 !important;
			padding-right: 0 !important;
			margin-left: auto !important;
			margin-right: auto !important;
			justify-items: center !important;
		}
		.location-box {
			width: 100% !important;
			min-width: 0 !important;
			max-width: 100% !important;
			margin-left: 0 !important;
			margin-right: 0 !important;
			padding: 28px 18px !important;
			font-size: 1.08rem !important;
		}
	}
	@media (min-width: 911px) and (max-width: 913px) and (min-height: 1367px) and (max-height: 1369px) {
		/* Surface Pro 7 912x1368 - Move quotes container to the right */
		.hero-content-container {
			margin-left: 50px !important;
			margin-right: 50px !important;
			left: auto !important;
			right: auto !important;
			position: absolute !important;
		}
	}
	@media (min-width: 767px) and (max-width: 769px) and (min-height: 1023px) and (max-height: 1025px) {
		/* iPad Mini 768x1024 - Center, fit quotes, adjust layout */
		.hero-content-container {
			left: 50% !important;
			right: auto !important;
			margin-left: 0 !important;
			margin-right: 0 !important;
			position: absolute !important;
			padding-left: 24px !important;
			padding-right: 24px !important;
			max-width: 600px !important;
			margin-top: 32px !important;
			width: 95vw !important;
			transform: translateX(-50%) scale(0.98) !important;
			top: 0 !important;
			display: flex !important;
			flex-direction: column !important;
			align-items: flex-start !important;
			justify-content: center !important;
			text-align: left !important;
		}
		.hero-title {
			font-size: 2.1rem !important;
			line-height: 1.13 !important;
			margin-bottom: 14px !important;
			max-width: 100% !important;
			text-align: left !important;
			margin-left: 0 !important;
			margin-right: 0 !important;
			display: block !important;
		}
		.hero-title .absolute {
			left: 0 !important;
			transform: none !important;
		}
		.hero-subtitle {
			font-size: 1.01rem !important;
			line-height: 1.5 !important;
			margin-bottom: 18px !important;
			max-width: 95vw !important;
			text-align: left !important;
			margin-left: 0 !important;
			margin-right: 0 !important;
			padding-right: 0 !important;
			display: block !important;
		}
		.hero-buttons {
			flex-direction: row !important;
			gap: 10px !important;
			margin-top: 18px !important;
			align-items: left !important;
			justify-content: left !important;
			width: 100% !important;
		}
		.hero-button {
			min-width: 120px !important;
			justify-content: center !important;
			padding: 10px 14px !important;
			font-size: 0.95rem !important;
			text-align: center !important;
		}
		.location-boxes-container {
			padding: 0 10px !important;
			margin-bottom: 18px !important;
		}
		.location-box {
			padding: 16px !important;
			min-width: 260px !important;
			max-width: 320px !important;
		}
		.location-box-title {
			font-size: 1rem !important;
			margin-bottom: 10px !important;
		}
		.location-box-address {
			font-size: 0.85rem !important;
			margin-bottom: 14px !important;
		}
		.location-box-phone {
			font-size: 0.9rem !important;
			margin-bottom: 14px !important;
		}
	}
		@media (min-width: 818px) and (max-width: 822px) and (min-height: 1178px) and (max-height: 1182px) {
			/* iPad Air 820x1180 - Left align, zoom out, move right */
			.hero-content-container {
				left: 48px !important;
				right: auto !important;
				margin-left: 0 !important;
				margin-right: auto !important;
				position: absolute !important;
				padding-left: 0 !important;
				padding-right: 0 !important;
				max-width: 720px !important;
				margin-top: 38px !important;
				text-align: left !important;
				width: 95vw !important;
				transform: scale(0.92) !important;
			}
			.hero-title {
				font-size: 2.5rem !important;
				line-height: 1.08 !important;
				margin-bottom: 16px !important;
				max-width: 100% !important;
				text-align: left !important;
				margin-left: 0 !important;
				margin-right: auto !important;
				display: block !important;
			}
			.hero-title .absolute {
				left: 0 !important;
				transform: none !important;
			}
			.hero-subtitle {
				font-size: 1.02rem !important;
				line-height: 1.5 !important;
				margin-bottom: 24px !important;
				max-width: 680px !important;
				text-align: left !important;
				margin-left: 0 !important;
				margin-right: auto !important;
				padding-right: 0 !important;
				display: block !important;
			}
			.hero-buttons {
				flex-direction: row !important;
				gap: 14px !important;
				margin-top: 20px !important;
				align-items: flex-start !important;
				justify-content: flex-start !important;
				width: 100% !important;
			}
					.hero-button {
						min-width: 140px !important;
						justify-content: center !important;
						padding: 12px 18px !important;
						font-size: 0.98rem !important;
						text-align: center !important;
					}
			.location-boxes-container {
				padding: 0 16px !important;
				margin-bottom: 24px !important;
				scale: 1.1 !important;
				margin-left: 0 !important;
				margin-right: 0 !important;
				justify-content: center !important;
			}
			.location-boxes-container > div {
				display: flex !important;
				flex-direction: row !important;
				gap: 16px !important;
				justify-content: center !important;
				align-items: stretch !important;
			}
			.location-box {
				padding: 20px !important;
				min-width: 200px !important;
				max-width: 240px !important;
				flex: 1 !important;
			}
			.location-box-title {
				font-size: 1.1rem !important;
				margin-bottom: 12px !important;
			}
			.location-box-address {
				font-size: 0.9rem !important;
				margin-bottom: 20px !important;
			}
			.location-box-phone {
				font-size: 0.95rem !important;
				margin-bottom: 20px !important;
			}
		}
  
		@media (min-width: 1024px) and (max-width: 1034px) and (min-height: 1360px) and (max-height: 1380px) {
			/* iPad Pro 11" 1024x1366 - Stronger zoom out for hero content */
			.hero-content-container {
				left: 60% !important;
				transform: translateX(-50%) scale(0.82) !important;
				padding-left: 80px !important;
				padding-right: 36px !important;
				max-width: 700px !important;
				padding-bottom: 200px !important;
				width: calc(100% - 72px) !important;
			}
			.hero-title {
				font-size: 2.7rem !important;
				line-height: 1.05 !important;
				margin-bottom: 18px !important;
			}
			.hero-subtitle {
				font-size: 1.05rem !important;
				line-height: 1.45 !important;
				margin-bottom: 30px !important;
				max-width: 600px !important;
			}
			.hero-buttons {
				flex-direction: row !important;
				gap: 24px !important;
				margin-top: 30px !important;
			}
			.hero-button {
				padding: 16px 28px !important;
				font-size: 1rem !important;
			}
			.location-boxes-container {
				padding: 0 24px !important;
				margin-bottom: 32px !important;
			}
			.location-box {
				padding: 24px !important;
				min-width: 280px !important;
				max-width: 320px !important;
			}
			.location-box-title {
				font-size: 1.2rem !important;
				margin-bottom: 16px !important;
			}
			.location-box-address {
				font-size: 1rem !important;
				margin-bottom: 24px !important;
			}
			.location-box-phone {
				font-size: 1.05rem !important;
				margin-bottom: 24px !important;
			}
		}
  
	@media (min-width: 1279px) and (max-width: 1281px) and (min-height: 664px) and (max-height: 666px) {
		/* 1280x665 Display - Reduce zoom significantly */
		.hero-content-container {
			left: 50% !important;
			transform: translateX(-50%) scale(0.75) !important;
			padding-left: 30px !important;
			padding-right: 30px !important;
			max-width: 850px !important;
			margin-top: 0 !important;
			width: calc(100% - 60px) !important;
		}
		.hero-title {
			font-size: 2.2rem !important;
			line-height: 1.1 !important;
			margin-bottom: 12px !important;
		}
		.hero-subtitle {
			font-size: 0.95rem !important;
			line-height: 1.5 !important;
			margin-bottom: 16px !important;
			max-width: 90% !important;
		}
		.hero-buttons {
			flex-direction: row !important;
			gap: 16px !important;
			margin-top: 12px !important;
		}
		.hero-button {
			padding: 10px 24px !important;
			font-size: 0.9rem !important;
		}
		.location-boxes-container {
			padding: 0 16px !important;
			margin-bottom: 20px !important;
			margin-top: 20px !important;
			scale: 0.85 !important;
		}
		.location-boxes-container > div {
			display: flex !important;
			flex-direction: row !important;
			gap: 14px !important;
			justify-content: center !important;
			align-items: stretch !important;
		}
		.location-box {
			padding: 16px !important;
			min-width: 240px !important;
			max-width: 300px !important;
			flex: 1 !important;
		}
		.location-box-title {
			font-size: 1rem !important;
			margin-bottom: 10px !important;
		}
		.location-box-address {
			font-size: 0.8rem !important;
			margin-bottom: 16px !important;
		}
		.location-box-phone {
			font-size: 0.85rem !important;
			margin-bottom: 16px !important;
		}
	}

	@media (min-width: 1360px) and (max-width: 1370px) and (min-height: 760px) and (max-height: 775px) {
		/* 1366x768 Laptop Display - Reduce image zoom */
		.hero-content-container {
			left: 55% !important;
			transform: translateX(-50%) scale(0.88) !important;
			padding-left: 50px !important;
			padding-right: 50px !important;
			max-width: 900px !important;
			margin-top: 20px !important;
			width: calc(100% - 100px) !important;
		}
		.hero-title {
			font-size: 2.8rem !important;
			line-height: 1.08 !important;
			margin-bottom: 18px !important;
		}
		.hero-subtitle {
			font-size: 1.05rem !important;
			line-height: 1.55 !important;
			margin-bottom: 24px !important;
			max-width: 85% !important;
		}
		.hero-buttons {
			flex-direction: row !important;
			gap: 24px !important;
			margin-top: 20px !important;
		}
		.hero-button {
			padding: 14px 32px !important;
			font-size: 0.98rem !important;
		}
		.location-boxes-container {
			padding: 0 20px !important;
			margin-bottom: 30px !important;
			margin-top: 30px !important;
		}
		.location-boxes-container > div {
			display: flex !important;
			flex-direction: row !important;
			gap: 20px !important;
			justify-content: center !important;
			align-items: stretch !important;
		}
		.location-box {
			padding: 20px !important;
			min-width: 280px !important;
			max-width: 340px !important;
			flex: 1 !important;
		}
		.location-box-title {
			font-size: 1.1rem !important;
			margin-bottom: 14px !important;
		}
		.location-box-address {
			font-size: 0.88rem !important;
			margin-bottom: 20px !important;
		}
		.location-box-phone {
			font-size: 0.95rem !important;
			margin-bottom: 20px !important;
		}
	}

	@media (min-width: 1365px) and (max-width: 1375px) and (min-height: 1020px) and (max-height: 1030px) {
		/* iPad Pro 12.9" 1366x1024 - Zoom out hero content */
		.hero-content-container {
			left: 60% !important;
			transform: translateX(-50%) scale(0.92) !important;
			padding-left: 60px !important;
			padding-right: 60px !important;
			max-width: 1000px !important;
			margin-top: 30px !important;
			width: calc(100% - 120px) !important;
		}
		.hero-title {
			font-size: 3.7rem !important;
			line-height: 1.05 !important;
			margin-bottom: 22px !important;
		}
		.hero-subtitle {
			font-size: 1.22rem !important;
			line-height: 1.6 !important;
			margin-bottom: 50px !important;
			max-width: 80% !important;
		}
		.hero-buttons {
			flex-direction: row !important;
			gap: 32px !important;
			margin-top: 40px !important;
		}
		.hero-button {
			padding: 20px 40px !important;
			font-size: 1.13rem !important;
		}
		.location-boxes-container {
			padding: 0 32px !important;
			margin-bottom: 40px !important;
		}
		.location-box {
			padding: 28px !important;
			min-width: 320px !important;
			max-width: 380px !important;
		}
		.location-box-title {
			font-size: 1.3rem !important;
			margin-bottom: 18px !important;
		}
		.location-box-address {
			font-size: 1.1rem !important;
			margin-bottom: 28px !important;
		}
		.location-box-phone {
			font-size: 1.15rem !important;
			margin-bottom: 28px !important;
		}
	}

	@media (min-width: 1900px) and (max-width: 1940px) and (min-height: 1180px) and (max-height: 1220px) {
		/* 1920x1200 Display - Optimized layout */
		.hero-content-container {
			left: 50% !important;
			transform: translateX(-50%) scale(1.0) !important;
			padding-left: 80px !important;
			padding-right: 80px !important;
			max-width: 1200px !important;
			margin-top: 60px !important;
			width: calc(100% - 160px) !important;
		}
		.hero-title {
			font-size: 4.2rem !important;
			line-height: 1.1 !important;
			margin-bottom: 24px !important;
			max-width: 100% !important;
		}
		.hero-subtitle {
			font-size: 1.35rem !important;
			line-height: 1.65 !important;
			margin-bottom: 28px !important;
			max-width: 90% !important;
		}
		.hero-buttons {
			flex-direction: row !important;
			gap: 36px !important;
			margin-top: 20px !important;
		}
		.hero-button {
			padding: 22px 48px !important;
			font-size: 1.2rem !important;
			min-width: 180px !important;
		}
		.location-boxes-container {
			padding: 0 40px !important;
			margin-bottom: 50px !important;
			margin-top: 50px !important;
		}
		.location-boxes-container > div {
			display: flex !important;
			flex-direction: row !important;
			gap: 28px !important;
			justify-content: center !important;
			align-items: stretch !important;
			max-width: 1400px !important;
			margin: 0 auto !important;
		}
		.location-box {
			padding: 32px !important;
			min-width: 360px !important;
			max-width: 420px !important;
			flex: 1 !important;
		}
		.location-box-title {
			font-size: 1.4rem !important;
			margin-bottom: 20px !important;
		}
		.location-box-address {
			font-size: 1.15rem !important;
			margin-bottom: 30px !important;
			line-height: 1.6 !important;
		}
		.location-box-phone {
			font-size: 1.2rem !important;
			margin-bottom: 30px !important;
		}
	}
`;

type SlideType = {
	src: string;
	headline: string | React.ReactNode;
	subheadline: string;
	buttons: { label: string; href: string }[];
};

const slides: SlideType[] = [
	{
		src: "/asset/slides/luzonbuilding.jpg",
		headline: "",
		subheadline: "",
		buttons: [],
	},
	{
		src: "/asset/slides/slide_2.png",
		headline: "",
		subheadline: "",
		buttons: [],
	},
	{
	src: "/asset/slides/visminbuilding.png",
	headline: "",
	subheadline: "",
	buttons: [],
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

	// Manual navigation removed

	// Pause auto-advance on user interaction removed

	// Auto-advance logic
	const startAutoAdvance = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			goToSlide((current + 1) % slides.length);
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
			<style>{ipadResponsiveStyles}</style>
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
									? { opacity: 1, scale: 1.05, zIndex: 10 }
									: { opacity: 0, scale: 1.02, zIndex: 0 }
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

				{/* Navigation arrows removed */}

				{/* Enhanced content section with modern styling - Responsive */}
				<div
					className="hero-content-container absolute left-2 sm:left-4 md:left-8 lg:left-[250px] top-0 h-full flex flex-col justify-center z-20 px-3 sm:px-4 md:px-6 lg:px-20 scale-90 sm:scale-100 md:scale-110 lg:scale-130 	"
					style={{
						pointerEvents: "none",
						width: "calc(100% - 1rem)",
						maxWidth: "800px",
						marginTop: "0",
					}}
				>
					{/* Static tagline with entrance animation */}
					<motion.div
						className="flex flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
						style={{ pointerEvents: "auto", marginTop: '-80px' }}
					>
						{/* Bear Image */}
						<motion.div
							className="flex-shrink-0"
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
							style={{ marginTop: '-24px' }}
						>
							<Image
								src="/asset/tagline/bear.png"
								alt="Bear mascot"
								width={80}
								height={120}
								className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto object-contain"
								priority
							/>
						</motion.div>
						{/* Tagline */}
						<motion.div
							className="flex flex-col"
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
						>
							<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1560b2] leading-tight drop-shadow-lg">
								Because Every Life Deserves the Best Care
							</h1>
						</motion.div>
					</motion.div>
				</div>
			</motion.section>

			{/* Enhanced Location Boxes Section - Fully Responsive */}
			<div
				className="location-boxes-container absolute bottom-0 mb-6 w-full flex justify-center items-center pointer-events-none"
				style={{ position: "relative", zIndex: 30, marginTop: "40px" }}
			>
			<div className="w-full max-w-6xl flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4 lg:px-0 pointer-events-auto items-stretch items-center lg:items-stretch">
				{/* Enhanced Manila Box - Responsive */}
				<div className="location-box flex-1 bg-gradient-to-br from-[#2453A6] to-[#1a3f85] rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col min-w-[280px] sm:min-w-[300px] lg:min-w-[260px] max-w-[370px] m-3 mx-auto lg:mx-0 group hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-[#2453A6]/20 relative overflow-hidden">
						{/* Subtle pattern overlay */}
						<div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

						<div className="location-box-title text-white text-lg sm:text-xl font-bold mb-2 sm:mb-3 tracking-wide relative z-10 group-hover:text-blue-100 transition-colors duration-300">
							MANILA
						</div>
						<div className="location-box-address text-white/90 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300">
							305 Col. Bonny Serrano Ave, San Juan City, 1500 Metro Manila,
							Philippines
						</div>
						<div className="location-box-phone flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base font-semibold mb-4 sm:mb-6 relative z-10 group-hover:text-blue-100 transition-colors duration-300">
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
							
							<div className="w-12 h-8 rounded bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
								<div className="w-8 h-5 rounded bg-[#1A3578] relative">
									<div className="w-6 h-3 rounded bg-[#2453A6] absolute top-1 left-1" />
								</div>
							</div>
						</div>
					</div>

					{/* Enhanced Cebu Box - Responsive */}
				<div className="location-box flex-1 bg-gradient-to-br from-[#2453A6] to-[#1a3f85] rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col min-w-[280px] sm:min-w-[300px] lg:min-w-[260px] max-w-[370px] m-3 mx-auto lg:mx-0 group hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-[#2453A6]/20 relative overflow-hidden">
						{/* Subtle pattern overlay */}
						<div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

						<div className="location-box-title text-white text-lg sm:text-xl font-bold mb-2 sm:mb-3 tracking-wide relative z-10 group-hover:text-blue-100 transition-colors duration-300">
							CEBU
						</div>
						<div className="location-box-address text-white/90 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300">
							Block 2 Lot 2 Guadalupe Heights Village, Guadalupe, 6000 Cebu
							City, Philippines
						</div>
						<div className="location-box-phone flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base font-semibold mb-4 sm:mb-6 relative z-10 group-hover:text-blue-100 transition-colors duration-300">
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
							
							<div className="w-12 h-8 rounded bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
								<div className="w-8 h-5 rounded bg-[#1A3578] relative">
									<div className="w-6 h-3 rounded bg-[#2453A6] absolute top-1 left-1" />
								</div>
							</div>
						</div>
					</div>

					{/* Enhanced Davao Box - Responsive */}
				<div className="location-box flex-1 bg-gradient-to-br from-[#2453A6] to-[#1a3f85] rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col min-w-[280px] sm:min-w-[300px] lg:min-w-[260px] max-w-[370px] m-3 mx-auto lg:mx-0 group hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-[#2453A6]/20 relative overflow-hidden">
						{/* Subtle pattern overlay */}
						<div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

						<div className="location-box-title text-white text-lg sm:text-xl font-bold mb-2 sm:mb-3 tracking-wide relative z-10 group-hover:text-blue-100 transition-colors duration-300">
							DAVAO
						</div>
						<div className="location-box-address text-white/90 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed relative z-10 group-hover:text-white transition-colors duration-300">
							555 Manga St., Juna Subd, Matina, 8000 Davao City, Philippines
						</div>
						<div className="location-box-phone flex items-center gap-2 sm:gap-3 text-white text-sm sm:text-base font-semibold mb-4 sm:mb-6 relative z-10 group-hover:text-blue-100 transition-colors duration-300">
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