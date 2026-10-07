'use client';

/**
 * Shared motion language for the About page.
 *
 * Every section imports from here so the whole page eases with ONE curve
 * and reveals feel like one system. Tweak values here to retune the page:
 *  - EASE        → the signature settle curve (fast start, long soft landing)
 *  - REVEAL_Y    → how far elements rise as they fade in (px)
 *  - STAGGER     → delay between siblings in a staggered reveal (s)
 */

import React, { useEffect, useState } from 'react';
import { useReducedMotion, type Variants } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]; // signature curve — "clinical settle"
export const REVEAL_Y = 32;
export const STAGGER = 0.12;

/**
 * Brand palette — hex values sampled directly from public/asset/BMI logo.png.
 *   BLUE  #22409A  (the "Biosite" wordmark)
 *   RED   #EE232E  (the logo dot — used as a punctuation accent only)
 * Red is intentionally rare: dot accents, focus rings, one keyword highlight.
 */
export const BRAND = {
  blue: '#22409A',
  blueDark: '#1A3078',
  blueSoft: '#2E52C0',
  red: '#EE232E',
  ink: '#111827',
  slate: '#374151',
  muted: '#6B7280',
  hairline: '#E5E7EB',
  surface: '#F8FAFC',
} as const;

/** Reusable focus-visible ring for interactive elements (WCAG AA). */
export const FOCUS_RING =
  'focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE232E] focus-visible:ring-offset-2';

/** Rise-and-fade reveal for a single element. Use with whileInView. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: REVEAL_Y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

/** Parent container that staggers its fadeUp children. */
export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
};

/** True on devices with no hover (phones/tablets) — used to disable tilt. */
export function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    setIsTouch(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isTouch;
}

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Max tilt angle in degrees. Keep ≤ 10 for a premium (not gimmicky) feel. */
  maxAngle?: number;
  /** Slight scale-up while hovered. */
  scale?: number;
  /** Enable the moving light-glare sweep. */
  glare?: boolean;
};

/**
 * 3D tilt wrapper that reacts to the cursor.
 * Falls back to a plain div on touch devices and for users who prefer
 * reduced motion — content renders identically, just without the tilt.
 */
export const TiltCard = ({
  children,
  className,
  maxAngle = 7,
  scale = 1.02,
  glare = true,
}: TiltCardProps) => {
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();

  if (isTouch || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Tilt
      className={className}
      tiltMaxAngleX={maxAngle}
      tiltMaxAngleY={maxAngle}
      scale={scale}
      transitionSpeed={1200}
      glareEnable={glare}
      glareMaxOpacity={0.15}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="16px"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </Tilt>
  );
};
