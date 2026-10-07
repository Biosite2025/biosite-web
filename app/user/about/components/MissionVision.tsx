'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/* ============================================================================
 * CONFIG — colors, split ratios, durations and easings in one place.
 * ========================================================================== */
const CONFIG = {
  color: {
    base: '#23409B', // resting band fill
    hovered: '#2A4CB5', // hovered half lightens
    dimmed: '#1B3480', // the other half darkens
    divider: '#FF2D2D',
    dividerGlow: '0 0 24px rgba(255, 45, 45, 0.45)',
  },
  /** Flex ratios for the two halves. */
  split: { rest: 50, active: 58, inactive: 42 },
  divider: { width: 4 },
  /** Matches the Stats band's visual height so the two blue bands read as a pair. */
  band: { height: 'clamp(280px, 34vh, 360px)' },
  ease: {
    enter: [0.16, 1, 0.3, 1] as const,
    exit: [0.7, 0, 0.84, 0] as const,
    enterCss: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  duration: {
    width: 0.7,
    labelExit: 0.3,
    detail: 0.45,
    depth: 0.5,
    reduced: 0.15,
  },
  /** Detail sequence starts mid-exit so the half is never blank. */
  delay: {
    detailStart: 0.18,
    rule: 0.12, // after the eyebrow
    statement: 0.2, // after the eyebrow
  },
  /**
   * Statement sizing. `maxWidth` is in `em` and applied to the <p> itself, so
   * it scales with the font size — that keeps characters-per-line (~46, i.e.
   * three lines for both statements) constant at every desktop width instead
   * of reflowing. It also prevents reflow while the column resizes on hover.
   */
  statementMaxWidth: '40em',
  statementSize: 'clamp(0.85rem, 1.2vw, 1.5rem)',
  padX: 'clamp(2rem, 6vw, 5rem)',
  padRight: 'clamp(1.5rem, 3vw, 2.5rem)',
} as const;

const PANELS = [
  {
    id: 'mission',
    label: 'Mission',
    eyebrow: 'Our Mission',
    statement:
      'To deliver innovative medical solutions and exceptional customer service that empower healthcare professionals, institutions, and partners.',
  },
  {
    id: 'vision',
    label: 'Vision',
    eyebrow: 'Our Vision',
    statement:
      'To be the most trusted partner in advancing healthcare — providing innovative medical solutions that ensure every life receives the best care.',
  },
];

/* --- motion variants ------------------------------------------------------ */
const buildVariants = (reduced: boolean) => {
  if (reduced) {
    // Cross-fade only: no width shift, no blur, no drift.
    const t = { duration: CONFIG.duration.reduced };
    return {
      label: { rest: { opacity: 1, transition: t }, active: { opacity: 0, transition: t } },
      eyebrow: { rest: { opacity: 0, transition: t }, active: { opacity: 1, transition: t } },
      rule: { rest: { opacity: 0, transition: t }, active: { opacity: 1, transition: t } },
      statement: { rest: { opacity: 0, transition: t }, active: { opacity: 1, transition: t } },
    } as Record<string, Variants>;
  }

  return {
    label: {
      rest: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: CONFIG.duration.detail, ease: CONFIG.ease.enter, delay: CONFIG.delay.detailStart },
      },
      active: {
        opacity: 0,
        scale: 0.94,
        y: -20,
        filter: 'blur(6px)',
        transition: { duration: CONFIG.duration.labelExit, ease: CONFIG.ease.exit },
      },
    },
    eyebrow: {
      rest: {
        clipPath: 'inset(0 0 0 100%)', // wipes out to the right
        y: 12,
        opacity: 0,
        transition: { duration: CONFIG.duration.labelExit, ease: CONFIG.ease.exit },
      },
      active: {
        clipPath: 'inset(0 0 0 0)',
        y: 0,
        opacity: 1,
        transition: { duration: CONFIG.duration.detail, ease: CONFIG.ease.enter, delay: CONFIG.delay.detailStart },
      },
    },
    rule: {
      rest: { scaleX: 0, transition: { duration: CONFIG.duration.labelExit, ease: CONFIG.ease.exit } },
      active: {
        scaleX: 1,
        transition: {
          duration: CONFIG.duration.detail,
          ease: CONFIG.ease.enter,
          delay: CONFIG.delay.detailStart + CONFIG.delay.rule,
        },
      },
    },
    statement: {
      rest: {
        opacity: 0,
        y: 16,
        filter: 'blur(8px)',
        transition: { duration: CONFIG.duration.labelExit, ease: CONFIG.ease.exit },
      },
      active: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: CONFIG.duration.detail,
          ease: CONFIG.ease.enter,
          delay: CONFIG.delay.detailStart + CONFIG.delay.statement,
        },
      },
    },
  } as Record<string, Variants>;
};

/* --- panel ----------------------------------------------------------------
 * Declared at module scope on purpose. If this lived inside <MissionVision>,
 * every setActive() would create a NEW component type, React would unmount and
 * remount the subtree, and framer-motion would re-mount with initial={false} —
 * making the detail text snap in instantly instead of animating.
 * ------------------------------------------------------------------------- */
type PanelProps = {
  panel: (typeof PANELS)[number];
  state: 'rest' | 'active';
  isDesktop: boolean;
  fill: string;
  variants: Record<string, Variants>;
  onActivate: () => void;
  onDeactivate: () => void;
};

const Panel = ({ panel, state, isDesktop, fill, variants, onActivate, onDeactivate }: PanelProps) => {
  const interactive = isDesktop;

  return (
    <div
      // Focusable so the reveal is reachable by keyboard, not just hover.
      tabIndex={interactive ? 0 : -1}
      onMouseEnter={interactive ? onActivate : undefined}
      onMouseLeave={interactive ? onDeactivate : undefined}
      onFocus={interactive ? onActivate : undefined}
      onBlur={interactive ? onDeactivate : undefined}
      className={`relative h-full w-full overflow-hidden ${
        interactive
          ? 'cursor-default focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset'
          : ''
      }`}
      style={{
        backgroundColor: fill,
        transition: `background-color ${CONFIG.duration.depth}s ${CONFIG.ease.enterCss}`,
      }}
    >
      {/* Resting label — desktop only; on touch the detail is always shown. */}
      {isDesktop && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          variants={variants.label}
          animate={state}
          initial={false}
        >
          <span
            className="font-extrabold uppercase leading-none text-white"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '0.02em' }}
          >
            {panel.label}
          </span>
        </motion.div>
      )}

      {/* Detail block — always in the DOM so AT and crawlers always get it. */}
      <div
        className={`flex h-full flex-col justify-center ${isDesktop ? 'absolute inset-0' : 'relative'}`}
        style={{
          paddingLeft: CONFIG.padX,
          paddingRight: CONFIG.padRight,
          paddingTop: isDesktop ? undefined : '3rem',
          paddingBottom: isDesktop ? undefined : '3rem',
        }}
      >
        <div>
          <motion.h3
            className="text-[1.1rem] font-bold uppercase tracking-wide text-white"
            variants={variants.eyebrow}
            animate={state}
            initial={false}
          >
            {panel.eyebrow}
          </motion.h3>

          <motion.span
            aria-hidden="true"
            className="mt-2 block h-0.5 w-40 origin-left"
            style={{ backgroundColor: CONFIG.color.divider }}
            variants={variants.rule}
            animate={state}
            initial={false}
          />

          <motion.p
            className="mt-6 font-bold uppercase text-white"
            style={{
              fontSize: CONFIG.statementSize,
              lineHeight: 1.45,
              maxWidth: CONFIG.statementMaxWidth, // em-based → scales with the font
            }}
            variants={variants.statement}
            animate={state}
            initial={false}
          >
            {panel.statement}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

const MissionVision = () => {
  const reducedMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState<number | null>(null);
  /**
   * Hover behaviour is desktop-only. Below 1024px (and during SSR) the panels
   * stack and render permanently expanded, so content is never hidden on touch.
   */
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Stable identity so framer-motion isn't handed fresh variant objects on
  // every hover tick.
  const V = useMemo(() => buildVariants(reducedMotion), [reducedMotion]);
  const activate = useCallback((i: number) => () => setActive(i), []);
  const deactivate = useCallback(() => setActive(null), []);

  // Grid tracks: `<half> <divider> <half>`. Transitioning grid-template-columns
  // moves the divider with the split without touching layout of the content.
  const { rest, active: on, inactive: off } = CONFIG.split;
  const cols =
    !isDesktop || reducedMotion || active === null
      ? `${rest}fr ${CONFIG.divider.width}px ${rest}fr`
      : active === 0
        ? `${on}fr ${CONFIG.divider.width}px ${off}fr`
        : `${off}fr ${CONFIG.divider.width}px ${on}fr`;

  const stateOf = (i: number) => (!isDesktop || active === i ? 'active' : 'rest');
  const fillOf = (i: number) => {
    if (!isDesktop || active === null) return CONFIG.color.base;
    return active === i ? CONFIG.color.hovered : CONFIG.color.dimmed;
  };

  return (
    <section
      id="mission-vision"
      aria-labelledby="mission-vision-title"
      className="relative"
    >
      {/* Keeps the section's accessible name now that the visible heading is
          gone — `aria-labelledby` above needs a real target. */}
      <h2 id="mission-vision-title" className="sr-only">
        Our Mission and Vision
      </h2>

      {/* Full-bleed band — fixed height so nothing below ever shifts. */}
      <div
        className="w-full"
        style={{
          backgroundColor: CONFIG.color.base,
          height: isDesktop ? CONFIG.band.height : undefined,
        }}
      >
        <div
          className="grid h-full w-full"
          style={{
            gridTemplateColumns: isDesktop ? cols : '1fr',
            gridTemplateRows: isDesktop ? '1fr' : 'auto auto auto',
            transition: reducedMotion
              ? undefined
              : `grid-template-columns ${CONFIG.duration.width}s ${CONFIG.ease.enterCss}`,
          }}
        >
          <Panel
            panel={PANELS[0]}
            state={stateOf(0)}
            isDesktop={isDesktop}
            fill={fillOf(0)}
            variants={V}
            onActivate={activate(0)}
            onDeactivate={deactivate}
          />

          {/* Crimson divider: vertical between halves on desktop, horizontal
              rule between the stacked panels on touch. */}
          <div
            aria-hidden="true"
            className="w-full"
            style={{
              backgroundColor: CONFIG.color.divider,
              height: isDesktop ? '100%' : `${CONFIG.divider.width}px`,
              boxShadow: isDesktop && active !== null ? CONFIG.color.dividerGlow : 'none',
              transition: `box-shadow ${CONFIG.duration.depth}s ${CONFIG.ease.enterCss}`,
            }}
          />

          <Panel
            panel={PANELS[1]}
            state={stateOf(1)}
            isDesktop={isDesktop}
            fill={fillOf(1)}
            variants={V}
            onActivate={activate(1)}
            onDeactivate={deactivate}
          />
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
