import type { ReactNode } from 'react';

/**
 * Layout shared by every Events section, so all of them line up on the same
 * left and right edges. The hero uses WRAP too.
 */
export const WRAP = 'mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8';

/** Each section fills about one screen on desktop, its content centred in it. */
export const SECTION = 'relative w-full py-16 md:py-24 lg:flex lg:min-h-[calc(var(--vh,1vh)*100)] lg:flex-col lg:justify-center';

/**
 * Section title row: the heading and its one-line intro on the left, an
 * optional action or fact on the right. No reveal animation: headings are
 * readable the moment they're on screen.
 */
export function EventsHeading({
  id,
  title,
  intro,
  aside,
}: {
  id: string;
  title: string;
  intro?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <h2
          id={id}
          className="font-extrabold leading-[1.05] tracking-tight text-[#0d1633] [text-wrap:balance]"
          style={{ fontSize: 'clamp(1.75rem, calc(var(--vw,1vw)*3.4), 2.75rem)' }}
        >
          {title}
        </h2>
        {intro && (
          <p
            className="mt-3 leading-relaxed text-[#374151] [text-wrap:pretty]"
            style={{ fontSize: 'clamp(0.95rem, calc(var(--vw,1vw)*1.3), 1.0625rem)' }}
          >
            {intro}
          </p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}

/**
 * The page's one button style. Hover steps it up 1px, a press sinks it and
 * scales to .985 (taste-skill's motion numbers). Transform and colour only.
 */
export const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ' +
  'transition-[transform,background-color,color,border-color] duration-150 ease-[cubic-bezier(.2,.8,.2,1)] ' +
  '[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-px active:translate-y-px active:scale-[.985] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EE232E] focus-visible:ring-offset-2';
