'use client'; 

import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const awards = [
	{
		year: '2022',
		title: 'COAGULATION DEALER OF THE YEAR',
		company: 'Marsman Drysdale Medical Products, Inc.',
	},
	{
		year: '2021',
		title: 'BEST DISTRIBUTOR AWARD',
		company: 'Global Healthcare Solutions',
	},
	{
		year: '2020',
		title: 'EXCELLENCE IN SERVICE',
		company: 'Healthcare Innovations Ltd.',
	},
	{
		year: '2019',
		title: 'TOP PERFORMER AWARD',
		company: 'Medical Supplies Co.',
	},
	{
		year: '2018',
		title: 'INNOVATION LEADER',
		company: 'Biotech Solutions Inc.',
	},
	{
		year: '2017',
		title: 'CUSTOMER SATISFACTION AWARD',
		company: 'Healthcare Partners Ltd.',
	},
];


const TrophyIcon = () => (
	<motion.div
		className="relative group"
		whileHover={{ scale: 1.12, rotate: -6 }}
		transition={{ type: 'spring', stiffness: 300, damping: 18 }}
	>
			    <motion.span
				    className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border-2 sm:border-2 md:border-3 lg:border-4 border-[#2356a8]/30 group-hover:!border-white transition-colors duration-300"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.2 }}
				>
										<svg
												width="24"
												height="24"
												className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 text-[#2356a8] group-hover:!text-white transition-colors duration-300"
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
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    centerMode: false,
                },
            },
            {
                // iPad Mini 768x1024 (portrait)
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    centerMode: false,
                },
            },
            {
                breakpoint: 912,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    centerMode: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    centerMode: true,
                    centerPadding: '20px',
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
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
            `}</style>
            <motion.section
                id="awards-recognitions"
                className="py-6 sm:py-8 md:py-16 lg:py-24 xl:py-36 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-16 relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen flex items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
            >
                <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
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
                                    <div className="relative h-[220px] sm:h-[240px] md:h-[280px] lg:h-[320px] xl:h-[360px] w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[350px] xl:max-w-[380px] p-3 sm:p-4 md:p-6 lg:p-7 xl:p-8 rounded-lg sm:rounded-xl md:rounded-2xl border-2 sm:border-2 md:border-3 lg:border-4 border-gray-200 hover:border-[#2356a8] flex items-center justify-center transition-all duration-500 ease-out bg-white shadow-lg sm:shadow-xl md:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl will-change-transform group mx-auto"
                                        style={{ boxSizing: 'border-box' }}
                                    >
                                        <span className="absolute inset-0 rounded-2xl z-0 overflow-hidden">
                                            <span className="block w-0 group-hover:w-full h-full bg-[#2356a8] transition-all duration-500 ease-out left-0 top-0 absolute z-0" style={{ transitionProperty: 'width' }}></span>
                                        </span>
                                        <span className="relative z-10 flex flex-col items-center justify-center w-full text-center">
                                            <TrophyIcon />
                                            <div className="mt-1 sm:mt-2 md:mt-3 lg:mt-4 xl:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">
                                                {award.year}
                                            </div>
                                            <div className="mt-1 sm:mt-2 md:mt-3 lg:mt-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-gray-500 tracking-wide group-hover:text-white transition-colors duration-300 uppercase leading-tight text-center px-1 sm:px-2">
                                                {award.title}
                                            </div>
                                            <div className="mt-0.5 sm:mt-1 md:mt-1.5 lg:mt-2 text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg text-gray-600 group-hover:text-white transition-colors duration-300 leading-snug text-center px-1 sm:px-2">
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