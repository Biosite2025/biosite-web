import React from 'react';

const LETTERS = ['B', 'M', 'I'];

type Props = {
  /** Font size of the wordmark, e.g. "30px" or "2.5rem". */
  size?: string;
  /** Announced by screen readers in place of the individual letters. */
  label?: string;
  className?: string;
};

/**
 * The BMI "burst" wordmark loader — letters spring out of the centre,
 * overshoot into place, then blow apart and dissolve on a loop.
 * Styles live in globals.css under `.bmi-loader` so this stays dependency-free
 * and paints immediately (it's used by the site preloader).
 */
const BmiLoader = ({ size, label = 'Loading', className = '' }: Props) => (
  <span
    className={`bmi-loader ${className}`.trim()}
    role="img"
    aria-label={label}
    style={size ? ({ '--bmi-size': size } as React.CSSProperties) : undefined}
  >
    {LETTERS.map((char, i) => (
      <span key={i} className="bmi-letter" aria-hidden="true">
        {char}
      </span>
    ))}
  </span>
);

export default BmiLoader;
