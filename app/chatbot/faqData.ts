// Biosite FAQ content. Source of truth for Biomi: the build script
// (scripts/build-biomi-index.js) indexes it, and the chat UI answers from it.
// Comprehensive FAQ data structure covering all website content
export const FAQ_DATA = [
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
