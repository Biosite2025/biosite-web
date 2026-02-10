"use client";

import { useState } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import PixelBlast from './PixelBlast';

// Comprehensive FAQ data structure covering all website content
const FAQ_DATA = [
	{
		category: "About Biosite",
		questions: [
			{
				q: "What is Biosite Medical Instruments?",
				a: "Biosite Medical Instruments focuses on the importation and distribution of medical and diagnostic instruments, as well as medical and laboratory consumables. We are committed to saving and improving lives through reliable medical solutions.",
			},
			{
				q: "What are your core values?",
				a: "Our values spell BIOSITE: Belief (in our mission), Integrity (in business conduct), Outstanding Service (exceeding expectations), Stewardship (responsible resource management), Innovation (healthcare solutions), Teamwork (unite as ONE BIOSITE), and Excellence (striving in everything we do).",
			},
			{
				q: "Where are your offices located?",
				a: "We have three locations: Manila (305 Col. Bonny Serrano Ave, San Juan City), Cebu (Block 2 Lot 2 Guadalupe Heights Village, Guadalupe), and Davao (555 Manga St., Juna Subd, Matina). Contact: +63 917 111 5008.",
			},
			{
				q: "What are your business hours?",
				a: "Manila and Cebu: Mon-Sat 8:30am-5:30pm. Davao: Mon-Sat 8am-5pm. We serve healthcare professionals nationwide.",
			},
		],
	},
	{
		category: "Products Overview",
		questions: [
			{
				q: "What product categories do you offer?",
				a: "We offer 5 main categories: I. Clinical (Chemistry, Hematology, Microbiology), II. Histopathology (Sakura, Dakewe, Microscopes), III. General Lab Equipment (Centrifuges, Biosafety Cabinets), IV. Medical & Hospital Equipment (Radiology, ICU, Surgical), V. Disposables & Consumables.",
			},
			{
				q: "How do I browse products on the website?",
				a: "Click 'PRODUCTS' in the navigation menu to see all categories. Each category is organized by department (Clinical, Histopathology, General Lab, Medical, Disposables). Browse by clicking the category that matches your needs.",
			},
			{
				q: "Can I view product details and specifications?",
				a: "Yes! Each product page shows detailed specifications, images, and descriptions. Click 'View Details' on any product card to see complete information including features and technical specs.",
			},
			{
				q: "Do you have ISO certified products?",
				a: "Yes, many of our products meet international ISO certification standards. Check specific product details for compliance information.",
			},
		],
	},
	{
		category: "Clinical Products",
		questions: [
			{
				q: "What clinical products do you offer?",
				a: "Clinical category includes: Clinical Chemistry analyzers, HBA1C-HPLC, Immunology equipment, Coagulation analyzers, Blood Bank equipment, Arterial Blood Gas & Electrolytes, POCT (Point of Care Testing), Microbiology, Clinical Microscopy (Urinalysis/Fecalysis), Hematology analyzers, Molecular Diagnostics, and Rapid Test Kits.",
			},
			{
				q: "What is POCT?",
				a: "POCT stands for Point of Care Testing - medical diagnostic testing performed at or near the site of patient care, providing rapid results for immediate clinical decision-making.",
			},
			{
				q: "Do you offer hematology analyzers?",
				a: "Yes, we offer complete hematology solutions including automated blood cell counters, CBC analyzers, and related laboratory equipment for blood testing.",
			},
			{
				q: "What molecular diagnostic equipment do you have?",
				a: "We provide molecular diagnostics equipment including PCR systems, genetic analyzers, and nucleic acid testing platforms for advanced laboratory diagnostics.",
			},
		],
	},
	{
		category: "Histopathology & Imaging",
		questions: [
			{
				q: "What histopathology equipment do you offer?",
				a: "We offer complete histopathology solutions from leading brands: Sakura (tissue processing, embedding, microtomy, staining), Dakewe, Hiplaas, Vitro tissue processors, Biogenex IHC equipment, Nikon Microscopes, Motic Slide Scanners, and Hamamatsu Slide Scanners.",
			},
			{
				q: "What imaging equipment is available?",
				a: "Our Radiology Department section includes medical diagnostic imaging equipment, X-ray systems, and digital pathology solutions including slide scanners for high-resolution tissue imaging.",
			},
			{
				q: "Do you offer digital pathology solutions?",
				a: "Yes, we offer advanced slide scanning systems from Motic, Hamamatsu, and Nikon for digital pathology workflows.",
			},
		],
	},
	{
		category: "General Lab Equipment",
		questions: [
			{
				q: "What general lab equipment do you provide?",
				a: "We offer: Microscopes (various types), Centrifuges, Pipettors, Biorefrigerators, Biomedical Freezers (Ultra Low, Cryo, Liquid Nitrogen Storage), Biosafety Cabinets & Laminar Flow, Lab Ovens & Incubators (including CO₂), Sterilizers & Autoclaves, Dry Baths, Vortex Mixers, Rotators, Pipette Shakers, Passboxes, and Eye Wash Stations.",
			},
			{
				q: "What types of biosafety cabinets do you have?",
				a: "We provide Class I, Class II, and Class III Biosafety Cabinets, as well as Laminar Flow Cabinets for sterile work environments in laboratories.",
			},
			{
				q: "Do you offer ultra-low temperature freezers?",
				a: "Yes, we provide Biomedical Freezers including Ultra Low Freezers (-80°C), Cryo Freezers, and Liquid Nitrogen Storage systems for biological sample preservation.",
			},
		],
	},
	{
		category: "Medical & Hospital Equipment",
		questions: [
			{
				q: "What hospital equipment do you offer?",
				a: "We provide: Radiology Department equipment, Pulmonary Department (respiratory care), Emergency and Outpatient equipment, Medical Surgical and Rehabilitation Ward equipment, Operating and Delivery Room equipment, and NICU/PICU/ICU specialized equipment.",
			},
			{
				q: "Do you have ICU equipment?",
				a: "Yes, we offer complete NICU, PICU, and ICU equipment including patient monitors, ventilators, infusion systems, and life support devices.",
			},
			{
				q: "What surgical equipment is available?",
				a: "We provide Operating and Delivery Room equipment, Medical Surgical Ward equipment, and surgical instruments for various medical procedures.",
			},
			{
				q: "Do you offer pulmonary care equipment?",
				a: "Yes, our Pulmonary Department section includes respiratory care equipment, ventilators, and pulmonary function testing devices.",
			},
		],
	},
	{
		category: "Disposables & Consumables",
		questions: [
			{
				q: "What disposables and consumables do you offer?",
				a: "We provide five categories: Laboratory Equipment consumables, Laboratory Disposables (tubes, tips, slides), Hospital Disposables (patient care items), Histopathology Chemicals & Consumables (reagents, stains), and Surgical Disposables.",
			},
			{
				q: "Do you supply laboratory chemicals?",
				a: "Yes, we offer comprehensive histopathology chemicals, reagents, and staining solutions for laboratory use.",
			},
			{
				q: "Can I order hospital disposables in bulk?",
				a: "Yes, we offer bulk ordering for hospital disposables. Contact our sales team for volume pricing and customized quotes.",
			},
		],
	},
	{
		category: "Ordering & Quotations",
		questions: [
			{
				q: "How do I request a quotation?",
				a: "Visit the 'Contact' page on our website and select 'Request Quotation' as your inquiry type. Fill out the form with product details, and our team will respond promptly with pricing and availability.",
			},
			{
				q: "How do I place an order?",
				a: "Orders can be placed through the 'Contact' page by selecting 'Sales - VisMin or Luzon' or by contacting our sales team directly at +63 917 111 5008 or customerservice@biosite.com.ph.",
			},
			{
				q: "What payment methods do you accept?",
				a: "We accept bank transfers, credit cards, and other secure payment options. Contact our sales team for detailed payment information and terms.",
			},
			{
				q: "Are there discounts for bulk purchases?",
				a: "Yes, we offer competitive pricing for bulk orders. Contact our sales team for volume discounts and customized quotes.",
			},
			{
				q: "Is there a minimum order quantity?",
				a: "Minimum order quantities vary by product. This will be specified in product details or during the quotation process.",
			},
		],
	},
	 {
	   category: "Shipping & Delivery",
	   questions: [
	     {
	       q: "How long does delivery take?",
	       a: "Delivery times vary based on your location and the availability of the product. Standard delivery typically takes 5–7 business days.",
	     },
	     {
	       q: "Do you ship internationally?",
	       a: "Yes, we offer international shipping to select countries. Please contact us for more details on rates and delivery times.",
	     },
	     {
	       q: "What should I do if my order is damaged during shipping?",
	       a: "If your order arrives damaged, please contact our support team within 48 hours. Provide photos of the damaged item and the packaging for a prompt resolution.",
	     },
	   ],
	 },
	{
		category: "Services & Support",
		questions: [
			{
				q: "Do you provide installation services?",
				a: "Yes, we provide professional installation services for medical equipment. Our trained technicians ensure proper setup and configuration.",
			},
			{
				q: "Do you offer maintenance and repair services?",
				a: "Yes, we offer comprehensive maintenance, calibration, and repair services for most products. Contact us to schedule service or request technical support.",
			},
			{
				q: "Can I request a product demonstration?",
				a: "Yes! Request a product demo through the 'Contact' page or call our sales team directly. We provide on-site demonstrations for healthcare facilities.",
			},
			{
				q: "Do you offer training for equipment?",
				a: "Yes, we provide training sessions and workshops for medical equipment operation. Check our 'Events' page for upcoming training schedules or request customized training.",
			},
			{
				q: "What kind of technical support do you provide?",
				a: "We offer comprehensive technical support including phone support, on-site service, troubleshooting, calibration, and preventive maintenance programs.",
			},
		],
	},
	{
		category: "Career Opportunities",
		questions: [
			{
				q: "How do I apply for a position at Biosite?",
				a: "Visit the 'Career' page on our website. You'll find available positions across our Manila, Cebu, and Davao offices. Fill out the application form and upload your resume (PDF format, max 5MB).",
			},
			{
				q: "What positions are currently available?",
				a: "Current openings are listed on our 'Career' page. Positions vary by location (Manila, Cebu, Davao) and department. Check the page regularly for updates.",
			},
			{
				q: "What information do I need to apply?",
				a: "You'll need: Your full name, email, phone number (11 digits), position you're applying for, preferred location, and resume (PDF format). You can also include a cover letter.",
			},
			{
				q: "What is the application process?",
				a: "Submit your application through our website. Our HR team will review applications and contact qualified candidates for interviews. You'll receive confirmation after submission.",
			},
		],
	},
	{
		category: "Contact & Locations",
		questions: [
			{
				q: "How do I contact Biosite?",
				a: "Email: customerservice@biosite.com.ph | Phone: +63 917 111 5008 | Visit our 'Contact' page for location-specific details and an interactive contact form with department selection.",
			},
			{
				q: "What departments can I contact?",
				a: "Using our contact form, you can reach: Sales Team (product inquiries), Technical Support (equipment service), Quotation Request (pricing), Purchase Order (place orders), or General Inquiry (other questions).",
			},
			{
				q: "What are the Manila office details?",
				a: "Address: 305 Col. Bonny Serrano Ave, San Juan City, 1500 Metro Manila | Phone: +63 917 111 5008 | Email: customerservice@biosite.com.ph | Hours: Mon-Sat 8:30am-5:30pm",
			},
			{
				q: "What are the Cebu office details?",
				a: "Address: Block 2 Lot 2 Guadalupe Heights Village, Guadalupe, 6000 Cebu City | Phone: +63 917 111 5008 | Email: customerservice@biosite.com.ph | Hours: Mon-Sat 8:30am-5:30pm",
			},
			{
				q: "What are the Davao office details?",
				a: "Address: 555 Manga St., Juna Subd, Matina, 8000 Davao City | Phone: +63 917 111 5008 | Email: customerservice@biosite.com.ph | Hours: Mon-Sat 8am-5pm",
			},
		],
	},
];


// Animated 3D Biomi Avatar with Framer Motion
function BiomiAvatar({ size = 44, animationState = "idle" }) {
		// Animation variants
				const headVariants = {
					idle: { rotate: [0, 2, -2, 0], y: [0, 2, 0], transition: { duration: 3, repeat: Infinity, ease: easeInOut } },
					thinking: { rotate: 0, y: 0 },
					reply: { rotate: [0, 10, 0], y: [0, 2, 0], transition: { duration: 0.6 } },
				};
				const eyeVariants = {
					idle: { scaleY: [1, 1, 0.1, 1], transition: { duration: 3.5, times: [0, 0.85, 0.87, 1], repeat: Infinity, ease: easeInOut } },
					thinking: { scaleY: [1, 0.1, 1], transition: { duration: 0.4 } },
					reply: { scaleY: 1 },
				};
				// Robot mascot SVG
				return (
					<motion.span
						className="inline-block bg-white border-2 border-[#b2d6e6] rounded-full overflow-hidden"
						style={{ width: size, height: size }}
						initial="idle"
						animate={animationState}
					>
						<motion.svg
							width={size}
							height={size}
							viewBox="0 0 100 100"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							style={{ display: "block" }}
						>
							<motion.g variants={headVariants} animate={animationState}>
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
								<motion.circle
									cx="40"
									cy="60"
									r="3.5"
									fill="#3a6b7c"
									variants={eyeVariants}
									animate={animationState}
								/>
								<motion.circle
									cx="60"
									cy="60"
									r="3.5"
									fill="#3a6b7c"
									variants={eyeVariants}
									animate={animationState}
								/>
								{/* Smile */}
								<path d="M43 70 Q50 75 57 70" stroke="#3a6b7c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
							</motion.g>
						</motion.svg>
					</motion.span>
				);
}

export default function BiomiFAQ() {
	const [view, setView] = useState<'categories' | 'questions' | 'answer'>('categories');
	const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
	const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
	const [avatarState, setAvatarState] = useState<'idle' | 'thinking' | 'reply'>('idle');

	// Animation variants
	const cardVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -30 },
	};

	// Handlers
	const handleCategoryClick = (idx: number) => {
		setSelectedCategory(idx);
		setView('questions');
		setSelectedQuestion(null);
		setAvatarState('idle');
	};
	const handleQuestionClick = (idx: number) => {
		setAvatarState('reply');
		setSelectedQuestion(idx);
		setView('answer');
		setTimeout(() => setAvatarState('idle'), 700);
	};
	const handleBack = () => {
		if (view === 'answer') {
			setView('questions');
			setSelectedQuestion(null);
			setAvatarState('idle');
		} else {
			setView('categories');
			setSelectedCategory(null);
			setAvatarState('idle');
		}
	};
	
	// Main container styles
			return (
				<>
					{/* Custom style for specific screen size */}
					<style>{`
						@media (min-width: 1279px) and (max-width: 1281px) and (min-height: 664px) and (max-height: 666px) {
							#bg {
								height: 605px !important;
							}
							#userchatbot {
								transform: scale(0.8) !important;
								margin-top: -1.5rem !important;
							}
						}
					`}</style>
					<div id="bg" className="relative mb-6 sm:mb-[40px] md:mb-[60px] scale-90 sm:scale-95 md:scale-100 lg:scale-115 flex justify-center items-center min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-120px)] py-3 sm:py-5 md:py-8 lg:py-12 bg-transparent font-[Inter,Poppins,sans-serif] px-2 sm:px-3 md:px-6 lg:pt-12 pt-8 mt-8 max-[912px]:mb-16 max-[912px]:mt-0 max-[912px]:py-0 max-[912px]:pt-0 max-[912px]:pb-0 max-[912px]:px-0 max-[912px]:min-h-0">
			{/* PixelBlast Animated Background */}
			<PixelBlast
			    
				variant="circle"
				pixelSize={6}
				color="#2B3990"
				className="z-0"
				patternScale={3}
				patternDensity={1.2}
				pixelSizeJitter={0.5}
				enableRipples
				rippleSpeed={0.4}
				rippleThickness={0.12}
				rippleIntensityScale={1.5}
				liquid
				liquidStrength={0.12}
				liquidRadius={1.2}
				liquidWobbleSpeed={5}
				speed={0.6}
				edgeFade={0.25}
				transparent
			/>
			<motion.div
			    id="userchatbot"
				className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl p-0 overflow-hidden border border-gray-100 flex flex-col sm:flex-row min-h-[500px] sm:min-h-[520px] md:min-h-[550px] max-[912px]:min-h-0 max-[912px]:mt-0 max-[912px]:mb-0"
				initial={{ opacity: 0, scale: 0.96 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
				style={{ marginTop: 0, marginBottom: 0 }}
			>
				{/* Left: Header and categories/questions/answers */}
				<div className="flex-1 flex flex-col justify-between">
					{/* Header */}
					<div className="bg-[#0056D2] px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-7 flex items-center gap-3 sm:gap-4 rounded-t-xl sm:rounded-t-2xl rounded-bl-xl sm:rounded-bl-2xl relative min-h-[80px] sm:min-h-[90px] md:min-h-[110px] max-[912px]:py-2 max-[912px]:min-h-0">
						<div className="absolute left-4 sm:left-6 md:left-8 top-4 sm:top-5 md:top-7">
							<BiomiAvatar size={view === 'categories' ? 32 : 28} animationState={avatarState} />
						</div>
						<div className="flex flex-col justify-center items-start ml-10 sm:ml-12 md:ml-16">
							<h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold leading-tight">Hi there! <span className="align-middle text-base sm:text-lg md:text-xl">👋</span></h2>
							<p className="text-white text-sm sm:text-base opacity-90 mt-0.5 sm:mt-1">I'm Biomi, your guide to medical equipment & services!</p>
						</div>
					</div>
					{/* Main Content */}
					<div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 bg-[#f7fafd] flex-1 flex flex-col gap-4 sm:gap-5 md:gap-6 justify-start min-h-[350px] sm:min-h-[370px] md:min-h-[400px] max-[912px]:py-2 max-[912px]:min-h-0">
						<AnimatePresence mode="wait">
							{view === "categories" && (
								<motion.div
									key="categories"
									variants={cardVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="flex flex-col gap-4 sm:gap-5 md:gap-6"
								>
									<div className="text-base sm:text-lg md:text-xl font-semibold text-[#0056D2] mb-1 sm:mb-2">What would you like to know about?</div>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
										{FAQ_DATA.map((cat, idx) => (
											<button
												key={cat.category}
												className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-white border border-[#e3eaf7] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-[#0056D2] font-semibold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30"
												onClick={() => handleCategoryClick(idx)}
											>
												<span className="text-sm sm:text-base font-semibold text-center">{cat.category}</span>
											</button>
										))}
									</div>
								</motion.div>
							)}

							{view === "questions" && selectedCategory !== null && (
								<motion.div
									key="questions"
									variants={cardVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="flex flex-col gap-4 sm:gap-5 md:gap-6"
								>
									<button
										className="mb-1 sm:mb-2 text-xs text-[#0056D2] bg-[#e3eaf7] rounded-full px-3 sm:px-4 py-1 w-fit font-medium hover:bg-[#d0e0fa] transition-all"
										onClick={handleBack}
									>
										← Back to Categories
									</button>
									<div className="text-base sm:text-lg md:text-xl font-semibold text-[#0056D2] mb-1 sm:mb-2">{FAQ_DATA[selectedCategory].category}</div>
									<div className="flex flex-col gap-2 sm:gap-3">
										{FAQ_DATA[selectedCategory].questions.map((q, idx) => (
											<button
												key={q.q}
												className="text-left px-3 sm:px-4 md:px-5 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-white border border-[#e3eaf7] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-[#0056D2] font-medium focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30"
												onClick={() => handleQuestionClick(idx)}
											>
												<span className="text-sm sm:text-base">{q.q}</span>
											</button>
										))}
									</div>
								</motion.div>
							)}

							{view === "answer" && selectedCategory !== null && selectedQuestion !== null && (
								<motion.div
									key="answer"
									variants={cardVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="flex flex-col gap-4 sm:gap-5 md:gap-6"
								>
									<button
										className="mb-1 sm:mb-2 text-xs text-[#0056D2] bg-[#e3eaf7] rounded-full px-3 sm:px-4 py-1 w-fit font-medium hover:bg-[#d0e0fa] transition-all"
										onClick={handleBack}
									>
										← Back to Questions
									</button>
									{/* User question bubble */}
									<div className="flex items-end gap-1 sm:gap-2 justify-end max-[912px]:justify-end">
										<div className="rounded-xl sm:rounded-2xl bg-[#0056D2] text-white px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-sm sm:text-base font-medium max-w-[85%] sm:max-w-[80%] shadow-md max-[912px]:max-w-[80%]">
											{FAQ_DATA[selectedCategory].questions[selectedQuestion].q}
										</div>
									</div>
									{/* Biomi answer bubble */}
									<div className="flex items-start gap-1 sm:gap-2 justify-start max-[912px]:justify-start">
										<BiomiAvatar size={24} />
										<div className="rounded-xl sm:rounded-2xl bg-white border border-[#e3eaf7] text-[#0056D2] px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-sm sm:text-base font-medium max-w-[85%] sm:max-w-[80%] shadow-md max-[912px]:max-w-[75%]">
											{FAQ_DATA[selectedCategory].questions[selectedQuestion].a}
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{/* Footer */}
					<div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-[#f7fafd] rounded-b-xl sm:rounded-b-2xl text-center max-[912px]:py-2">
						<span className="text-xs text-gray-400">Powered by Biomi – Your Biosite AI Assistant.</span>
					</div>
				</div>

			
			</motion.div>
		</div>
		</>
	);
}
