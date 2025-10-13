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
				    className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-[#2356a8]/30 group-hover:!border-white transition-colors duration-300"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.2 }}
				>
										<svg
												width="56"
												height="56"
												viewBox="0 0 24 24"
												fill="none"
												className="text-[#2356a8] group-hover:!text-white transition-colors duration-300"
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
		       },
	       },
	       {
		       breakpoint: 640,
		       settings: {
			       slidesToShow: 1,
			       slidesToScroll: 1,
		       },
	       },
       ],
       };
	   return (
		   <>
			   <style>{`
				   .slick-slide { 
					   padding: 0 16px;
				   }
				   .slick-track {
					   display: flex !important;
				   }
				   .slick-slide > div {
					   height: 100%;
				   }
			   `}</style>
		   <motion.section
			   id="awards-recognitions"
			   className="py-24 md:py-36 px-2 md:px-16 relative overflow-hidden min-h-screen flex items-center"
				   initial={{ opacity: 0, y: 40 }}
				   whileInView={{ opacity: 1, y: 0 }}
				   viewport={{ once: true, amount: 0.3 }}
				   transition={{ duration: 0.7, ease: 'easeOut' }}
			   >
				<div className="max-w-7xl mx-auto text-center relative z-10">
                
				<motion.div
					className="mb-10 group"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7, delay: 0.1 }}
				>
					<h2 className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900 relative group">
						Awards &amp; Recognitions
					</h2>
					<motion.p
						className="text-gray-600 mb-0 max-w-3xl mx-auto text-xl md:text-2xl font-medium leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7, delay: 0.2 }}
					>
						For almost <span className="font-bold text-[#2356a8]">20 years</span> in the business, <span className="font-bold text-[#2356a8]">BMI</span> has earned a reputation as a reliable distributor of innovative products for the healthcare industry.
					</motion.p>
				</motion.div>
                
				   <div className="mt-16 overflow-visible">
					   <Slider {...sliderSettings}>
						   {awards.map((award, idx) => (
							<motion.div
								key={idx}
								className="flex flex-col items-center px-6 group cursor-default"
								variants={cardVariants}
								initial="initial"
								animate={getCardAnimate(idx)}
								whileHover="hover"
								viewport={{ once: true }}
							>
								<div className="relative h-[340px] w-full max-w-[380px] mx-auto p-8 rounded-2xl border-4 border-gray-200 hover:border-[#2356a8] flex items-center justify-center transition-all duration-500 ease-out bg-white shadow-2xl hover:shadow-3xl will-change-transform group">
                                    
									<span className="absolute inset-0 rounded-2xl z-0 overflow-hidden">
										<span className="block w-0 group-hover:w-full h-full bg-[#2356a8] transition-all duration-500 ease-out left-0 top-0 absolute z-0" style={{transitionProperty:'width'}}></span>
									</span>
									<span className="relative z-10 flex flex-col items-center justify-center w-full text-center">
										<TrophyIcon />
										<div className="mt-6 text-3xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">
											{award.year}
										</div>
										<div className="mt-4 text-xl font-semibold text-gray-500 tracking-wide group-hover:text-white transition-colors duration-300 uppercase leading-tight">
											{award.title}
										</div>
										<div className="mt-2 text-lg text-gray-600 group-hover:text-white transition-colors duration-300 leading-snug">
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