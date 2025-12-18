
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function SideNav() {
		const [sideNavOpen, setSideNavOpen] = useState(false);
		const [expandedSection, setExpandedSection] = useState<string | null>(null);
		const pathname = usePathname();
		// Scroll hide/show logic (exact copy from TopNav)
		const [showNav, setShowNav] = useState(true);
		const [scrollY, setScrollY] = useState(0);
		const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
		
		React.useEffect(() => {
			let lastScrollY = window.scrollY;
			let ticking = false;
			const handleScroll = () => {
				if (!ticking) {
					window.requestAnimationFrame(() => {
						const currentScrollY = window.scrollY;
						setScrollY(currentScrollY);
						
						// Only apply on mobile screens (lg:hidden), apply to ALL pages
						const isMobile = window.innerWidth < 1024;
						
						if (isMobile) {
							// Mobile scroll logic - same as TopNav but for mobile screens only
							const scrollDifference = Math.abs(currentScrollY - lastScrollY);
							
							if (currentScrollY > lastScrollY && currentScrollY > 100 && scrollDifference > 5) {
								// Scrolling down - hide nav
								setScrollDirection('down');
								setShowNav(false);
							} else if (currentScrollY < lastScrollY && scrollDifference > 5) {
								// Scrolling up - show nav
								setScrollDirection('up');
								setShowNav(true);
							}
							
							// Always show nav when at top
							if (currentScrollY <= 50) {
								setShowNav(true);
							}
						} else {
							// Desktop - always show (this component is hidden on desktop anyway)
							setShowNav(true);
						}
						lastScrollY = currentScrollY;
						ticking = false;
					});
					ticking = true;
				}
			};
			window.addEventListener('scroll', handleScroll, { passive: true });
			return () => window.removeEventListener('scroll', handleScroll);
		}, []);

		const closeSideNav = () => {
			setSideNavOpen(false);
			setExpandedSection(null); // Reset expanded sections when closing
		};

		// Handle keyboard navigation
		useEffect(() => {
			const handleKeyDown = (event: KeyboardEvent) => {
				if (event.key === 'Escape' && sideNavOpen) {
					closeSideNav();
				}
			};

			if (sideNavOpen) {
				document.addEventListener('keydown', handleKeyDown);
				// Prevent body scroll when menu is open
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'unset';
			}

			return () => {
				document.removeEventListener('keydown', handleKeyDown);
				document.body.style.overflow = 'unset';
			};
		}, [sideNavOpen]);
	
	const toggleSection = (section: string) => {
		// Prevent event bubbling and handle nested expansions better
		if (section === 'products') {
			// If clicking products, toggle it and reset any nested sections
			if (expandedSection === 'products') {
				setExpandedSection(null);
			} else {
				setExpandedSection('products');
			}
		} else {
			// For nested categories, don't close the products section
			if (expandedSection === section) {
				setExpandedSection('products'); // Go back to products level
			} else {
				setExpandedSection(section);
			}
		}
	};

	const productCategories = {
		clinical: {
			title: "I. Clinical",
			items: [
				{ name: "Clinical Chemistry", href: "/user/products/components/clinical-chemistry" },
				{ name: "HBA1C - HPLC", href: "/user/products/components/hba1c-hplc" },
				{ name: "Immunology", href: "/user/products/components/immunology" },
				{ name: "Coagulation", href: "/user/products/components/coagulation" },
				{ name: "Blood Bank", href: "/user/products/components/blood-bank" },
				{ name: "Arterial Blood Gas, Electrolytes & Co-Oximetry", href: "/user/products/components/arterial-blood-gas-electrolytes-co-oximetry" },
				{ name: "POCT (Point of Care)", href: "/user/products/components/poct" },
				{ name: "Microbiology", href: "/user/products/components/microbiology" },
				{ name: "Clinical Microscopy", href: "/user/products/components/clinical-microscopy" },
				{ name: "Hematology", href: "/user/products/components/hematology" },
				{ name: "Molecular Diagnostics", href: "/user/products/components/molecular-diagnostics" },
				{ name: "Rapid Test Kits", href: "#" }
			]
		},
		histopathology: {
			title: "II. Histopathology",
			items: [
				{ name: "Sakura", href: "/user/products/components/sakura" },
				{ name: "Dakewe", href: "/user/products/components/dakewe" },
				{ name: "Hiplaas", href: "#" },
				{ name: "Vitro", href: "/user/products/components/vitro" },
				{ name: "Biogenex", href: "/user/products/components/biogenex" },
				{ name: "Nikon Microscopes", href: "/user/products/components/nikonmicroscopes" },
				{ name: "Motic Slide Scanners", href: "/user/products/components/moticsliderscanner" },
				{ name: "Hamamatsu Slide Scanners", href: "/user/products/components/hamamatsusliderscanner" },
				{ name: "Fuji Synapse PACS for Digital Pathology", href: "#" }
			]
		},
		generalLab: {
			title: "III. General Lab Equipments",
			items: [
				{ name: "Microscopes", href: "#" },
				{ name: "Centrifuges", href: "/user/products/components/centrifuges" },
				{ name: "Pipettors", href: "/user/products/components/pipettors" },
				{ name: "Biorefrigerators", href: "/user/products/components/biorefrigerators" },
				{ name: "Biomedical Freezers, Ultra Low Freezers, Cryo Freezers, Liquid Nitrogen Storage", href: "/user/products/components/biomedical-freezers" },
				{ name: "Biosafety Cabinets & Laminar Flow Cabinets", href: "/user/products/components/biosafety-cabinets" },
				{ name: "Lab Oven, Lab Incubator, CO₂ Incubator", href: "/user/products/components/lab-oven-incubator" },
				{ name: "Sterilizer & Autoclave", href: "#" },
				{ name: "Dry Bath, Vortex Mixer, Rotator, Pipette Shaker, Passbox, Eye Wash Station", href: "/user/products/components/lab-equipment" }
			]
		},
		medical: {
			title: "IV. Medical & Hospital Equipments",
			items: [
				{ name: "Medical Diagnostic Imaging", href: "/user/products/components/medical-diagnostic-imaging" },
				{ name: "ICU Equipments", href: "#" },
				{ name: "OR Equipments", href: "#" },
				{ name: "ER Equipments", href: "#" },
				{ name: "OB Gyn Equipments", href: "#" },
				{ name: "Gastro & Endo", href: "#" },
				{ name: "Anesthesia Equipments", href: "#" },
				{ name: "Autoclave, Plasma Sterilizers, Washers", href: "#" },
				{ name: "Neonatal Intensive Care Products (NICU)", href: "#" },
				{ name: "Hospital Medical Furnitures", href: "#" }
			]
		},
		disposables: {
			title: "V. Disposables / Consumables",
			items: [
				{ name: "Laboratory Disposables", href: "/user/products/components/laboratory-disposables" },
				{ name: "Hospital Disposables", href: "#" },
				{ name: "Histopathology Chemicals & Consumables", href: "#" },
				{ name: "Surgical Disposables", href: "#" }
			]
		}
	};

	return (
		<>
			{/* Mobile/Tablet Top Bar - Show only on screens < 1024px, with scroll hide/show transition */}
			<motion.nav
				initial={false}
				animate={showNav ? { y: 0, opacity: 1, boxShadow: '0 4px 24px 0 rgba(35,86,168,0.08)' } : { y: -100, opacity: 0, boxShadow: 'none' }}
				transition={{
					y: { type: 'spring', stiffness: 400, damping: 40, duration: 0.6 },
					opacity: { duration: 0.4, ease: 'easeInOut' },
					boxShadow: { duration: 0.4, ease: 'easeInOut' }
				}}
				whileHover={{ scale: 1.01, boxShadow: '0 4px 24px 0 rgba(35,86,168,0.12)' }}
				className="flex lg:hidden items-center justify-between h-16 px-4 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm z-50 fixed top-0 w-full sidenav-component"
				style={{ background: '#ffffff', backgroundColor: '#ffffff' }}
			>
				{/* Logo Section */}
				<Link href="/user/about" className="flex items-center h-full touch-manipulation">
					<Image
						src="https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530483/biosite-assets/BMI_logo.png"
						alt="Biosite Medical Instruments Logo"
						width={140}
						height={40}
						className="object-contain h-10 w-auto transform hover:scale-105 transition-transform duration-300"
						priority
					/>
				</Link>
				{/* Tagline - Hidden on very small screens */}
				<div className="hidden sm:flex flex-1 justify-center px-4">
					<span className="text-gray-700 font-medium text-sm italic tracking-wide text-center opacity-80">
						Because Every Life deserves the Best Care
					</span>
				</div>
				{/* Hamburger Menu Button */}
				<button
					className="ml-auto flex items-center justify-center w-12 h-12 rounded-lg hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2B3990]/20 transition-all duration-200 touch-manipulation"
					aria-label="Open menu"
					onClick={() => setSideNavOpen(true)}
				>
					<span className="sr-only">Open menu</span>
					<svg className="w-7 h-7 text-[#2B3990]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
			</motion.nav>
		
			{/* Side Navigation Overlay */}
			<AnimatePresence>
				{sideNavOpen && (
					<div className="fixed inset-0 z-[99999] lg:hidden">
						{/* Backdrop */}
						<motion.div 
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="absolute inset-0 bg-black/40 backdrop-blur-sm mobile-nav-backdrop" 
							onClick={closeSideNav} 
						/>
						
						{/* Side Panel */}
						<motion.div 
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
							className="fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-white shadow-2xl z-[99999] flex flex-col overflow-hidden"
							style={{ height: '100vh', minHeight: '100vh' }}
						>
							{/* Header */}
							<div className="flex items-center justify-between p-4 border-b border-gray-200/50 bg-gradient-to-r from-[#2B3990] to-[#3d4db0]">
								<div className="flex items-center space-x-3">
									<Image
										src="https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530483/biosite-assets/BMI_logo.png"
										alt="BMI Logo"
										width={80}
										height={24}
										className="object-contain h-10 w-auto brightness-0 invert"
									/>
									
								</div>
								<button 
									className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20 transition-all duration-200 touch-manipulation" 
									onClick={closeSideNav} 
									aria-label="Close menu"
									tabIndex={0}
								>
									<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>

							{/* Navigation Content */}
							<div className="flex-1 overflow-y-auto overscroll-contain mobile-nav-scroll" style={{ minHeight: 0 }}>
								<nav className="p-4 space-y-2 pb-20">
									{/* About Link */}
									<Link 
										href="/user/about" 
										className={`block py-3 px-4 rounded-lg font-semibold transition-all duration-200 mobile-nav-item touch-manipulation ${
											pathname === '/user/about' 
												? 'bg-[#2B3990]/10 text-[#2B3990] border-l-4 border-[#2B3990]' 
												: 'text-gray-700 hover:bg-gray-50 hover:text-[#2B3990] active:bg-gray-100'
										}`}
										onClick={closeSideNav}
									>
										ABOUT
									</Link>

									{/* Products Section with Expandable Categories */}
									<div className="space-y-1">
										<button 
											className="w-full flex items-center justify-between py-3 px-4 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#2B3990] active:bg-gray-100 transition-all duration-200 mobile-nav-item touch-manipulation"
											onClick={(e) => {
												e.stopPropagation();
												toggleSection('products');
											}}
										>
											<span>PRODUCTS</span>
											<svg 
												className={`w-5 h-5 transition-transform duration-200 ${expandedSection === 'products' || Object.keys(productCategories).includes(expandedSection || '') ? 'rotate-180' : ''}`} 
												fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
											>
												<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
											</svg>
										</button>
										
										<AnimatePresence>
											{(expandedSection === 'products' || Object.keys(productCategories).includes(expandedSection || '')) && (
												<motion.div
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: "auto", opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													transition={{ duration: 0.3, ease: "easeInOut" }}
													className="overflow-hidden"
												>
													<div className="ml-4 space-y-2 py-2">
														{Object.entries(productCategories).map(([key, category]) => (
															<div key={key} className="space-y-1">
																<button
																	className="w-full flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium text-[#2B3990] hover:bg-[#2B3990]/5 active:bg-[#2B3990]/10 transition-all duration-200 mobile-nav-item touch-manipulation"
																	onClick={(e) => {
																		e.stopPropagation();
																		toggleSection(key);
																	}}
																>
																	<span className="text-left">{category.title}</span>
																	<svg 
																		className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${expandedSection === key ? 'rotate-180' : ''}`} 
																		fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
																	>
																		<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
																	</svg>
																</button>
																
																<AnimatePresence>
																	{expandedSection === key && (
																		<motion.div
																			initial={{ height: 0, opacity: 0 }}
																			animate={{ height: "auto", opacity: 1 }}
																			exit={{ height: 0, opacity: 0 }}
																			transition={{ duration: 0.25, ease: "easeInOut" }}
																			className="overflow-hidden"
																		>
																			<div className="ml-4 space-y-1 py-1">
																				{category.items.map((item, index) => (
																					<Link
																						key={index}
																						href={item.href}
																						className="block py-2 px-3 text-xs text-gray-600 hover:text-[#2B3990] hover:bg-[#2B3990]/5 rounded-md transition-all duration-200 leading-relaxed"
																						onClick={closeSideNav}
																					>
																						{item.name}
																					</Link>
																				))}
																			</div>
																		</motion.div>
																	)}
																</AnimatePresence>
															</div>
														))}
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</div>

									{/* Other Navigation Links */}
									<Link 
										href="/user/events" 
										className={`block py-3 px-4 rounded-lg font-semibold transition-all duration-200 mobile-nav-item touch-manipulation ${
											pathname === '/user/events' 
												? 'bg-[#2B3990]/10 text-[#2B3990] border-l-4 border-[#2B3990]' 
												: 'text-gray-700 hover:bg-gray-50 hover:text-[#2B3990] active:bg-gray-100'
										}`}
										onClick={closeSideNav}
									>
										EVENTS
									</Link>

									<Link 
										href="/user/career" 
										className={`block py-3 px-4 rounded-lg font-semibold transition-all duration-200 mobile-nav-item touch-manipulation ${
											pathname === '/user/career' 
												? 'bg-[#2B3990]/10 text-[#2B3990] border-l-4 border-[#2B3990]' 
												: 'text-gray-700 hover:bg-gray-50 hover:text-[#2B3990] active:bg-gray-100'
										}`}
										onClick={closeSideNav}
									>
										CAREERS
									</Link>

									<Link 
										href="/user/contact" 
										className={`block py-3 px-4 rounded-lg font-semibold transition-all duration-200 mobile-nav-item touch-manipulation ${
											pathname === '/user/contact' 
												? 'bg-[#2B3990]/10 text-[#2B3990] border-l-4 border-[#2B3990]' 
												: 'text-gray-700 hover:bg-gray-50 hover:text-[#2B3990] active:bg-gray-100'
										}`}
										onClick={closeSideNav}
									>
										CONTACT
									</Link>

									<Link 
										href="/user/chatbot" 
										className={`block py-3 px-4 rounded-lg font-semibold transition-all duration-200 mobile-nav-item touch-manipulation ${
											pathname === '/user/chatbot' 
												? 'bg-[#2B3990]/10 text-[#2B3990] border-l-4 border-[#2B3990]' 
												: 'text-gray-700 hover:bg-gray-50 hover:text-[#2B3990] active:bg-gray-100'
										}`}
										onClick={closeSideNav}
									>
										FAQ
									</Link>
								</nav>

								{/* Footer Section */}
								<div className="mt-auto p-4 border-t border-gray-200/50 bg-gray-50/50">
									<div className="text-center">
										<p className="text-xs text-gray-500 italic">
											Because Every Life deserves the Best Care
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
}
