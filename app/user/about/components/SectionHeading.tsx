'use client';

import { motion } from 'framer-motion';
import { EASE } from './motionShared';

type Props = {
  /** Small uppercase kicker above the title (e.g. "ABOUT BIOSITE"). */
  eyebrow?: string;
  /** Main section title. */
  title: string;
  /** Optional supporting line under the title. */
  intro?: string;
  /** Center everything (default: left-aligned editorial). */
  align?: 'left' | 'center';
  /** id for aria-labelledby wiring on the parent <section>. */
  titleId?: string;
  className?: string;
};

/**
 * Shared eyebrow + heading used across every About section so the page reads as
 * one editorial system. Reveal uses the single signature EASE curve; the small
 * red rule under the title is the only place red appears in headings.
 */
const SectionHeading = ({
  eyebrow,
  title,
  intro,
  align = 'left',
  titleId,
  className = '',
}: Props) => {
  const alignItems = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const ruleAlign = align === 'center' ? 'mx-auto' : '';
  return (
    <motion.div
      className={`flex flex-col ${alignItems} ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {eyebrow && (
        <span className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#22409A]">
          {eyebrow}
        </span>
      )}
      <h2
        id={titleId}
        className="font-extrabold tracking-tight text-[#111827] leading-[1.1]"
        style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)' }}
      >
        {title}
      </h2>
      <span className={`mt-4 h-1 w-14 rounded-full bg-[#EE232E] ${ruleAlign}`} aria-hidden="true" />
      {intro && (
        <p
          className={`mt-5 max-w-2xl text-[#1F2937] leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}
          style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.125rem)' }}
        >
          {intro}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
