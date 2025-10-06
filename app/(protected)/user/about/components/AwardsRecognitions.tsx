
'use client';

const sliderMinHeight = 'min-h-[384px]'; 

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
		year: '2022',
		title: 'COAGULATION DEALER OF THE YEAR',
		company: 'Marsman Drysdale Medical Products, Inc.',
	},
	{
		year: '2022',
		title: 'COAGULATION DEALER OF THE YEAR',
		company: 'Marsman Drysdale Medical Products, Inc.',
	},
	{
		year: '2022',
		title: 'COAGULATION DEALER OF THE YEAR',
		company: 'Marsman Drysdale Medical Products, Inc.',
	},
	{
		year: '2022',
		title: 'COAGULATION DEALER OF THE YEAR',
		company: 'Marsman Drysdale Medical Products, Inc.',
	},
	{
		year: '2022',
		title: 'COAGULATION DEALER OF THE YEAR',
		company: 'Marsman Drysdale Medical Products, Inc.',
	},
];


const TrophyIcon = () => (
  <motion.div
    className="relative group"
    whileHover={{ scale: 1.12, rotate: -6 }}
    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
  >
			<motion.span
				className="inline-flex items-center justify-center w-28 h-28 rounded-full border-2 border-[#2356a8]/30 group-hover:!border-white transition-colors duration-300"
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.2 }}
			>
				<svg
					width="96"
					height="96"
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
	       slidesToShow: 2,
	       slidesToScroll: 2,
	       arrows: true,
	       autoplay: true,
	       autoplaySpeed: 3500,
	       responsive: [
		       {
			       breakpoint: 1024,
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
				   .slick-slide { min-height: 384px; }
			   `}</style>
		   <motion.section
			   id="awards-recognitions"
			   className="py-8 px-2 md:px-6 relative overflow-hidden"
				   initial={{ opacity: 0, y: 40 }}
				   whileInView={{ opacity: 1, y: 0 }}
				   viewport={{ once: true, amount: 0.3 }}
				   transition={{ duration: 0.7, ease: 'easeOut' }}
			   >
				<div className="max-w-5xl mx-auto text-center relative z-10">
				
				<motion.div
					className="mb-10 group"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7, delay: 0.1 }}
				>
					<h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-gray-900 relative group">
						Awards &amp; Recognitions
						<motion.div
							initial={{ width: 64, opacity: 0.7 }}
							whileHover={{ width: 160, opacity: 1 }}
							animate={{ width: 96, opacity: 0.85 }}
							transition={{ duration: 0.5, ease: 'easeOut' }}
						/>
					</h2>
					<motion.p
						className="text-gray-600 mb-2 max-w-4xl mx-auto text-lg md:text-2xl font-medium leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7, delay: 0.2 }}
					>
						For almost{' '}
						<span className="font-bold text-[#2356a8]">20 years</span> in the business,{' '}
						<span className="font-bold text-[#2356a8]">BMI</span> has earned a reputation as a reliable distributor of innovative products for the healthcare industry.
					</motion.p>
				</motion.div>
				
				   <div className="mt-12 overflow-visible">
					   <Slider {...sliderSettings}>
						   {awards.map((award, idx) => (
							<motion.div
								key={idx}
								className="flex flex-col items-center px-4 group cursor-default overflow-visible"
								variants={cardVariants}
								initial="initial"
								animate={getCardAnimate(idx)}
								whileHover="hover"
								viewport={{ once: true }}
							>
										<div className="relative min-h-[320px] max-h-[320px] py-2 px-1 rounded-xl border border-gray-100 hover:border-[#2356a8] flex items-center justify-center transition-all duration-500 ease-out bg-white shadow-lg will-change-transform overflow-visible group">
									
									<span className="absolute inset-0 rounded-xl z-0 overflow-hidden">
										<span className="block w-0 group-hover:w-full h-full bg-[#2356a8] transition-all duration-500 ease-out left-0 top-0 absolute z-0" style={{transitionProperty:'width'}}></span>
									</span>
											<span className="relative z-10 flex flex-col items-center justify-center w-full">
												<TrophyIcon />
												<div className="mt-8 text-4xl font-extrabold text-gray-900 group-hover:text-white transition-colors duration-300 text-center">
													{award.year}
												</div>
												<div className="mt-4 text-xl font-semibold text-gray-500 tracking-widest group-hover:text-white transition-colors duration-300 uppercase text-center">
													{award.title}
												</div>
												<div className="mt-2 text-lg text-gray-600 group-hover:text-white transition-colors duration-300 leading-relaxed text-center">
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