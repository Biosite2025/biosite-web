'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerParent, FOCUS_RING } from './motionShared';
import SectionHeading from './SectionHeading';

const PHONE_DISPLAY = '+63 917 111 5008';
const PHONE_HREF = 'tel:+639171115008';

const offices = [
  { city: 'Manila', address: '305 Col. Bonny Serrano Ave, San Juan City, 1500 Metro Manila' },
  { city: 'Cebu', address: 'Block 2 Lot 2 Guadalupe Heights Village, Guadalupe, 6000 Cebu City' },
  { city: 'Davao', address: '555 Manga St., Juna Subd, Matina, 8000 Davao City' },
];

const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const OurOffices = () => {
  return (
    <section
      id="offices"
      aria-labelledby="offices-title"
      className="border-t border-[#E5E7EB] bg-[#F8FAFC]/70 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          
          title="THREE OFFICES, NATIONWIDE REACH"
          intro="Reach our teams in Luzon, the Visayas, and Mindanao."
          align="center"
          titleId="offices-title"
        />

        <motion.ul
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {offices.map((o) => (
            <motion.li
              key={o.city}
              variants={fadeUp}
              className="group flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#22409A] hover:shadow-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#22409A]/10 text-[#22409A]">
                  <PinIcon />
                </span>
                <h3 className="text-xl font-bold uppercase tracking-wide text-[#111827]">{o.city}</h3>
              </div>
              <address className="not-italic text-sm leading-relaxed text-[#374151]">{o.address}</address>
              <a
                href={PHONE_HREF}
                className={`mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#22409A] transition-colors duration-200 hover:text-[#EE232E] ${FOCUS_RING}`}
                aria-label={`Call the ${o.city} office at ${PHONE_DISPLAY}`}
              >
                <PhoneIcon />
                {PHONE_DISPLAY}
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `Biosite Medical Instruments ${o.address}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7280] transition-colors duration-200 hover:text-[#22409A] ${FOCUS_RING}`}
                aria-label={`Open the ${o.city} office location in Google Maps (opens in a new tab)`}
              >
                View on map
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default OurOffices;
