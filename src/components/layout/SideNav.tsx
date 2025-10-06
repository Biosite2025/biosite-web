"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export function SideNav() {
	const [sideNavOpen, setSideNavOpen] = useState(false);
	return (
		<>
			
			<nav className="flex md:hidden items-center justify-between h-16 px-4 bg-white/95 border-b border-gray-200/50 shadow-sm z-50 relative">
				
				<Link href="/user/about" className="flex items-center h-full">
					<Image
						src="/asset/BMI logo.png"
						alt="Biosite Medical Instruments Logo"
						width={140}
						height={40}
						className="object-contain h-10 w-auto"
						priority
					/>
				</Link>
				
				<button
					className="ml-auto flex items-center justify-center w-10 h-10 rounded focus:outline-none"
					aria-label="Open menu"
					onClick={() => setSideNavOpen(true)}
				>
					<span className="sr-only">Open menu</span>
					<svg className="w-7 h-7 text-[#2B3990]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
			</nav>
			
			{sideNavOpen && (
				<div className="fixed inset-0 z-[999]">
					<div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" onClick={() => setSideNavOpen(false)} />
					<div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-[1000] flex flex-col pt-8 px-6 animate-slideIn">
						<button className="absolute top-4 right-4 p-2" onClick={() => setSideNavOpen(false)} aria-label="Close menu">
							<svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
						<nav className="flex flex-col gap-2 mt-8">
							<Link href="/user/about" className="py-3 px-2 text-lg font-semibold text-[#2B3990] hover:bg-gray-100 rounded transition" onClick={() => setSideNavOpen(false)}>
								About Biosite
							</Link>
							<div className="py-3 px-2 text-lg font-semibold text-[#2B3990]">Products</div>
							<div className="ml-4 flex flex-col gap-1">
								<Link href="#" className="py-2 px-2 text-base text-gray-700 hover:text-[#2B3990] transition" onClick={() => setSideNavOpen(false)}>CLINICAL CHEMISTRY</Link>
								<Link href="#" className="py-2 px-2 text-base text-gray-700 hover:text-[#2B3990] transition" onClick={() => setSideNavOpen(false)}>HBA1C–HPLC</Link>
								<Link href="#" className="py-2 px-2 text-base text-gray-700 hover:text-[#2B3990] transition" onClick={() => setSideNavOpen(false)}>HISTOPATHOLOGY</Link>
								<Link href="#" className="py-2 px-2 text-base text-gray-700 hover:text-[#2B3990] transition" onClick={() => setSideNavOpen(false)}>HEMATOLOGY</Link>
								<Link href="#" className="py-2 px-2 text-base text-gray-700 hover:text-[#2B3990] transition" onClick={() => setSideNavOpen(false)}>URINALYSIS</Link>
							</div>
							<Link href="/events" className="py-3 px-2 text-lg font-semibold text-[#2B3990] hover:bg-gray-100 rounded transition" onClick={() => setSideNavOpen(false)}>
								Events
							</Link>
							<Link href="/careers" className="py-3 px-2 text-lg font-semibold text-[#2B3990] hover:bg-gray-100 rounded transition" onClick={() => setSideNavOpen(false)}>
								Careers
							</Link>
							<Link href="/contact" className="py-3 px-2 text-lg font-semibold text-[#2B3990] hover:bg-gray-100 rounded transition" onClick={() => setSideNavOpen(false)}>
								Contact
							</Link>
							<Link href="/faq" className="py-3 px-2 text-lg font-semibold text-[#2B3990] hover:bg-gray-100 rounded transition" onClick={() => setSideNavOpen(false)}>
								FAQ
							</Link>
						</nav>
					</div>
				</div>
			)}
		</>
	);
}
