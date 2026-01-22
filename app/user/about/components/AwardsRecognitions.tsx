'use client'; 

import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const awards = [
	{
		year: '2022',
		title: 'Best in Clinical Chemistry Partner in South East Asia',
		company: 'Werfen - Pullman Resort, Phuket Thailand',
	},
	{
		year: '2023',
		title: 'Highest Sales in Clinical Chemistry Award in Asia Pacific',
		company: 'Werfen - Renaissance Pattaya Resort & Spa, Thailand',
	},
	{
		year: '2023',
		title: 'Award of Excellence in Performance',
		company: 'Aeon',
	},
	{
		year: '2024',
		title: 'Top Channel Partner Overall Medical Business',
		company: 'FujiFilm Philippines - Okada, Manila',
	},
	{
		year: '2023',
		title: 'AIA Top Sales Award in South East Asia',
		company: 'Tosoh - Paradox Hotel, Singapore',
	},
	{
		year: '2023',
		title: 'Top Channel Partner First Installation Award for Echelon Smart',
		company: 'FujiFilm Philippines - Okada, Manila',
	},
	{
		year: '2023',
		title: 'Strategic Partnership Award',
		company: 'Haier Biomedical',
	},
	{
		year: '2024',
		title: 'Strategic Partnership Award',
		company: 'Haier Biomedical - Two Consecutive Years',
	},
];


const TrophyIcon = () => (
	<motion.div
		className="relative group"
		whileHover={{ scale: 1.12, rotate: -6 }}
		transition={{ type: 'spring', stiffness: 300, damping: 18 }}
	>
			    <motion.span
				    className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full border-2 sm:border-2 md:border-2 lg:border-3 xl:border-3 border-[#2356a8]/30 group-hover:!border-white transition-colors duration-300 flex-shrink-0"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.2 }}
				>
										<svg
												width="24"
												height="24"
											className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-[#2356a8] group-hover:!text-white transition-colors duration-300 flex-shrink-0"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
										>
        <motion.path
          d="M7 4V6C7 8.20914 8.79086 10 11 10H13C15.2091 10 17 8.20914 17 6V4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <path d="M4 4H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 4V6C6 9.31371 8.68629 12 12 12C15.3137 12 18 9.31371 18 6V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 20H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.span>
    {/* Subtle glow effect */}
    <motion.div
	className="absolute inset-0 rounded-full bg-[#2356a8]/10 opacity-0 group-hover:opacity-100 blur-xl"
      transition={{ duration: 0.5 }}
    />
  </motion.div>
);


const cardVariants = {
	initial: { opacity: 0, y: 40 },
	hover: { }, // No zoom effect
};

const getCardAnimate = (i: number) => ({
	opacity: 1,
	y: 0,
	transition: { delay: 0.2 + i * 0.12, type: 'spring' as const, stiffness: 120, damping: 18 },
});

const AwardSection = () => {
    // Hydration-safe: SSR always renders 3 slides, update on client only
    const [slidesToShow, setSlidesToShow] = React.useState(3);
    // Remove arrows, enable swipe/drag only
    const arrows = false;

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow,
        slidesToScroll: 1, // Autoplay/arrow moves 1 card
        arrows: false,
        swipe: true,
        draggable: true,
        swipeToSlide: true, // Allow user to drag/swipe multiple cards
        autoplay: true,
        autoplaySpeed: 4000,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 9999,
                settings: {
                    slidesToShow,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    centerMode: false,
                },
            },
        ],
    };
    return (
        <>
            <style>{`
                    @media (min-width: 1279px) and (max-width: 1281px) and (min-height: 664px) and (max-height: 666px) {
                    #scaleaward{
                    transform: scale(0.8) !important;
                    }
                    #awards-recognitions {
                    height: 665px !important;
                    }
                    }
                .slick-slide { 
                    padding: 0 8px;
                }
                @media (max-width: 1023px) {
                    .slick-slide { padding: 0 6px !important; }
                    .slick-list { margin: 0 -6px; }
                }
                @media (max-width: 912px) {
                    .slick-slide { padding: 0 4px !important; }
                    .slick-list { margin: 0 -4px; }
                }
                @media (max-width: 768px) {
                    .slick-slide { padding: 0 8px !important; }
                    .slick-list { margin: 0 -8px; }
                }
                @media (max-width: 480px) {
                    .slick-slide { padding: 0 4px !important; }
                    .slick-list { margin: 0 -4px; }
                }
                .slick-track { display: flex !important; }
                .slick-slide > div { height: 100%; }
                .slick-dots { 
                    bottom: -48px;
                    z-index: 10;
                }
                .slick-dots li button:before {
                    font-size: 12px;
                    opacity: 0.5;
                    color: #2356a8;
                }
                .slick-dots li.slick-active button:before {
                    opacity: 1;
                    color: #2356a8;
                }
                @media (max-width: 912px) {
                    .slick-dots { bottom: -36px; }
                    .slick-dots li button:before { font-size: 10px; }
                }
                @media (max-width: 480px) {
                    .slick-dots { bottom: -28px; }
                    .slick-dots li button:before { font-size: 8px; }
                }
                @media (min-width: 1900px) and (max-width: 1940px) and (min-height: 1180px) and (max-height: 1220px) {
                    #awards-recognitions {
                        padding-top: 100px !important;
                        padding-bottom: 100px !important;
                    }
                    #awards-recognitions h2 {
                        font-size: 4.5rem !important;
                        margin-bottom: 32px !important;
                    }
                    #awards-recognitions .text-gray-600 {
                        font-size: 1.5rem !important;
                        line-height: 2 !important;
                    }
                    .slick-slide > div > div > div {
                        height: 420px !important;
                        max-width: 440px !important;
                        padding: 40px !important;
                    }
                }
            `}</style>
            <motion.section
                id="awards-recognitions"
                className="py-6 sm:py-8 md:py-16 lg:py-24 xl:py-36 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen flex items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
            >
                {/* Background image with Next.js Image for optimization */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/dmvyhrewy/image/upload/w_1200,q_auto:low,f_auto/v1763530490/biosite-assets/bg456.png"
                        alt="Background"
                        fill
                        loading="lazy"
                        quality={60}
                        sizes="100vw"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                </div>
                {/* White overlay to reduce background image opacity */}
                <div style={{position:'absolute',inset:0,background:'rgba(255,255,255,0.85)',pointerEvents:'none',zIndex:1}} />
                <div id='scaleaward' className="max-w-7xl mx-auto text-center relative z-10 w-full" style={{position:'relative',zIndex:2}}>
                    <motion.div
                        className="mb-3 sm:mb-6 md:mb-8 lg:mb-10 group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-gray-900 relative group px-2 sm:px-0">
                            Awards &amp; Recognitions
                        </h2>
                        <motion.p
                            className="text-gray-600 mb-0 max-w-3xl mx-auto text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl font-medium leading-relaxed group-hover:text-gray-700 transition-colors duration-300 px-3 sm:px-2 md:px-0"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            For almost <span className="font-bold text-[#2356a8]">20 years</span> in the business, <span className="font-bold text-[#2356a8]">BMI</span> has earned a reputation as a reliable distributor of innovative products for the healthcare industry.
                        </motion.p>
                    </motion.div>
                    <div className="mt-4 sm:mt-6 md:mt-10 lg:mt-12 xl:mt-16 overflow-visible w-full pb-12 sm:pb-16 md:pb-20">
                        <Slider {...sliderSettings}>
                            {awards.map((award, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex flex-col items-center justify-center group cursor-default w-full"
                                    variants={cardVariants}
                                    initial="initial"
                                    animate={getCardAnimate(idx)}
                                    whileHover="hover"
                                    viewport={{ once: true }}
                                >
                                    <div className="relative h-[220px] sm:h-[240px] md:h-[280px] lg:h-[320px] xl:h-[360px] w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[350px] xl:max-w-[380px] p-3 sm:p-4 md:p-6 lg:p-7 xl:p-8 rounded-lg sm:rounded-xl md:rounded-2xl border-2 sm:border-2 md:border-3 lg:border-4 border-gray-200 hover:border-[#2356a8] flex items-center justify-center transition-all duration-500 ease-out bg-white shadow-lg hover:shadow-lg will-change-transform group mx-auto"
                                        style={{ boxSizing: 'border-box', marginBottom: '20px' }}
                                    >
                                        <span className="absolute inset-0 rounded-2xl z-0 overflow-hidden">
                                            <span className="block w-0 group-hover:w-full h-full bg-[#2356a8] transition-all duration-500 ease-out left-0 top-0 absolute z-0" style={{ transitionProperty: 'width' }}></span>
                                        </span>
                                        <span className="relative z-10 flex flex-col items-center justify-center w-full text-center">
                                            <TrophyIcon />
                                            <div className="mt-1 sm:mt-2 md:mt-2 lg:mt-3 xl:mt-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                                                {award.year}
                                            </div>
                                            <div className="mt-1 sm:mt-1.5 md:mt-2 lg:mt-2 xl:mt-3 text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-semibold text-gray-500 tracking-wide group-hover:text-white transition-colors duration-300 uppercase leading-tight text-center px-2 sm:px-3 md:px-4 break-words hyphens-auto w-full overflow-hidden">
                                                {award.title}
                                            </div>
                                            <div className="mt-0.5 sm:mt-1 md:mt-1 lg:mt-1.5 xl:mt-2 text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base text-gray-600 group-hover:text-white transition-colors duration-300 leading-snug text-center px-2 sm:px-3 md:px-4 break-words w-full overflow-hidden">
                                                {award.company}
                                            </div>
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </motion.section>
        </>
    );
};

export default AwardSection;