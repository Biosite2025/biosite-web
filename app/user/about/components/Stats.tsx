'use client';

import { motion } from 'framer-motion';
import { fadeUp, staggerParent } from './motionShared';

// Verifiable facts only — every figure traces to approved content.
const stats = [
  { value: '2005', label: 'Founded' },
  { value: '21', label: 'Years of service' },
  { value: '3', label: 'Offices nationwide' },
  { value: 'ISO 9001:2015', label: 'Quality certified' },
  { value: '8', label: 'Industry awards' },
  { value: '5', label: 'Global partner brands' },
];

const Stats = () => {
  return (
    <section aria-label="Biosite at a glance" className="bg-[#22409A]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <motion.ul
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((s) => (
            <motion.li key={s.label} variants={fadeUp} className="flex flex-col items-center text-center">
              {/* Bottom-aligned in a fixed-height box so every figure sits on the
                  same baseline — a value that wraps (ISO 9001:2015) grows upward
                  instead of floating out of line with the single-line numbers. */}
              <span
                className="flex items-end justify-center text-center font-extrabold leading-tight text-white"
                style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.4rem)', minHeight: '2.5em' }}
              >
                {s.value}
              </span>
              <span className="mt-3 h-0.5 w-8 rounded-full bg-[#EE232E]" aria-hidden="true" />
              <span className="mt-3 text-xs font-medium uppercase tracking-wide text-blue-100 sm:text-sm">
                {s.label}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Stats;
