"use client";

import { useState } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";

// FAQ data structure
const FAQ_DATA = [
	{
		category: "General Information",
		questions: [
			{
				q: "What is Biosite Medical Instruments, and what do you offer?",
				a: "Biosite Medical Instruments specializes in providing high-quality medical devices, equipment, and solutions for healthcare professionals. We also offer training, calibration, and maintenance services to support the medical industry.",
			},
			{
				q: "Where are you located?",
				a: "Our main office is located at San Juan, Metro Manila, Cebu City, and Davao, but we cater to clients nationwide and offer shipping options for remote areas.",
			},
			{
				q: "Do you offer warranties for your products?",
				a: "Yes, all our products come with a warranty. The duration and terms vary depending on the product category. Please refer to the product manual or contact us for more details.",
			},
			{
				q: "How can I request a demonstration of a product?",
				a: "You can request a product demonstration by filling out the form on our 'Request Demo' page or contacting our sales team directly.",
			},
			{
				q: "Are your products ISO certified?",
				a: "Yes, many of our products meet international ISO certification standards. Please check specific product details for compliance information.",
			},
		],
	},
	{
		category: "Ordering & Payment",
		questions: [
			{
				q: "How do I place an order?",
				a: "Orders can be placed through our website's 'Request Purchase Order' page or by contacting our sales team directly.",
			},
			{
				q: "What payment methods do you accept?",
				a: "We accept bank transfers, credit cards, and other secure payment options. For more details, refer to our payment guidelines on the 'Contact' page.",
			},
			{
				q: "Is there a minimum order quantity?",
				a: "Some products may have a minimum order quantity. This will be specified in the product details or during the quotation process.",
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
		category: "Returns & Refunds",
		questions: [
			{
				q: "What is your return policy?",
				a: "Returns are accepted within 30 days of purchase for unused and undamaged items in their original packaging. Certain conditions and restocking fees may apply.",
			},
			{
				q: "How do I request a refund or replacement?",
				a: "To request a refund or replacement, contact our customer service team with your order number and details about the issue.",
			},
		],
	},
	{
		category: "Service & Support",
		questions: [
			{
				q: "How can I contact customer service?",
				a: "You can reach our customer service team via email at customerservice@biosite.com.ph, by phone at +639 172345958, or through the 'Contact' page on our website.",
			},
			{
				q: "Do you provide product maintenance or repair services?",
				a: "Yes, we offer maintenance and repair services for most of our products. Please visit our 'Services' page for more details.",
			},
		],
	},
	{
		category: "Quotations & Pricing",
		questions: [
			{
				q: "How can I request a quotation?",
				a: "Quotations can be requested through the 'Request Quotation' page on our website. Fill out the form, and our team will respond promptly.",
			},
			{
				q: "Are there discounts for bulk purchases?",
				a: "Yes, we offer discounts for bulk purchases. Contact our sales team for more information and a customized quote.",
			},
		],
	},
	{
		category: "Events & Training",
		questions: [
			{
				q: "How do I sign up for training sessions or workshops?",
				a: "Training and workshop registrations can be done through the 'Events & Training' page on our website. Details about upcoming sessions are also listed there.",
			},
			{
				q: "Are there fees for attending your events?",
				a: "Some events and workshops are free, while others may have a registration fee. Event-specific details will be provided on the registration page.",
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
					<div className="mb-6 sm:mb-[40px] md:mb-[60px] scale-90 sm:scale-95 md:scale-100 lg:scale-115 flex justify-center items-center min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-120px)] py-3 sm:py-5 md:py-8 lg:py-12 bg-transparent font-[Inter,Poppins,sans-serif] px-2 sm:px-3 md:px-6 lg:pt-12 pt-8 max-[912px]:mb-16 max-[912px]:mt-0 max-[912px]:py-0 max-[912px]:pt-0 max-[912px]:pb-0 max-[912px]:px-0 max-[912px]:min-h-0">
			<motion.div
				className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl p-0 overflow-hidden border border-gray-100 flex flex-col sm:flex-row min-h-[350px] sm:min-h-[380px] md:min-h-[420px] max-[912px]:min-h-0 max-[912px]:mt-0 max-[912px]:mb-0"
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
							<p className="text-white text-sm sm:text-base opacity-90 mt-0.5 sm:mt-1">How can Biomi help you today?</p>
						</div>
					</div>
					{/* Main Content */}
					<div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 bg-[#f7fafd] flex-1 flex flex-col gap-4 sm:gap-5 md:gap-6 justify-center min-h-[240px] sm:min-h-[280px] md:min-h-[320px] max-[912px]:py-2 max-[912px]:min-h-0">
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
									<div className="text-base sm:text-lg md:text-xl font-semibold text-[#0056D2] mb-1 sm:mb-2">Select a category:</div>
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
									<div className="flex items-end gap-1 sm:gap-2 self-end">
										<div className="rounded-xl sm:rounded-2xl bg-[#0056D2] text-white px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-sm sm:text-base font-medium max-w-[85%] sm:max-w-[80%] shadow-md">
											{FAQ_DATA[selectedCategory].questions[selectedQuestion].q}
										</div>
									</div>
									{/* Biomi answer bubble */}
									<div className="flex items-start gap-1 sm:gap-2">
										<BiomiAvatar size={24} />
										<div className="rounded-xl sm:rounded-2xl bg-white border border-[#e3eaf7] text-[#0056D2] px-3 sm:px-4 md:px-5 py-2 sm:py-3 text-sm sm:text-base font-medium max-w-[85%] sm:max-w-[80%] shadow-md">
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
	);
}
