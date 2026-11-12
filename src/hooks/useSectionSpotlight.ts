'use client';

import { useEffect } from 'react';

/**
 * Keeps the section under the middle of the screen in focus and marks the
 * rest with data-spotlight="off" (styled in globals.css as blurred and dimmed).
 * Keyboard focus moving into a section makes that section the active one.
 */
export function useSectionSpotlight(ids: string[]) {
  const key = ids.join(',');

  useEffect(() => {
    const sections = () =>
      key.split(',').map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);

    let active: HTMLElement | null = null;
    const setActive = (next: HTMLElement | null) => {
      if (!next || next === active) return;
      active = next;
      for (const el of sections()) el.dataset.spotlight = el === next ? 'on' : 'off';
    };

    // A section entered with the keyboard keeps the spotlight until the user
    // scrolls on purpose (wheel, touch, click or a scrolling key).
    let focusLock: HTMLElement | null = null;
    const releaseLock = () => {
      if (!focusLock) return;
      focusLock = null;
      onScroll();
    };
    const SCROLL_KEYS = new Set(['PageUp', 'PageDown', 'Home', 'End', ' ', 'ArrowUp', 'ArrowDown']);
    const onKeyDown = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key) && !(e.target as HTMLElement)?.closest?.('input, textarea, select, [contenteditable]')) releaseLock();
    };

    // The active section is the one crossing the line 45% down the screen.
    const pick = () => {
      if (focusLock && focusLock.contains(document.activeElement)) return;
      focusLock = null;
      const line = window.innerHeight * 0.45;
      const list = sections();
      const hit =
        list.find((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= line && r.bottom > line;
        }) ??
        // Between sections or past the last one: take the nearest.
        list.reduce<HTMLElement | null>((best, el) => {
          const r = el.getBoundingClientRect();
          const d = Math.min(Math.abs(r.top - line), Math.abs(r.bottom - line));
          if (!best) return el;
          const b = best.getBoundingClientRect();
          return d < Math.min(Math.abs(b.top - line), Math.abs(b.bottom - line)) ? el : best;
        }, null);
      setActive(hit);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        pick();
      });
    };
    const onFocusIn = (e: FocusEvent) => {
      const owner = sections().find((el) => el.contains(e.target as Node));
      if (!owner) return;
      focusLock = owner;
      setActive(owner);
    };

    pick();
    // Sections load content after mount (gallery, videos, calendar), which moves
    // their edges; re-check when the page height changes.
    const resize = new ResizeObserver(onScroll);
    resize.observe(document.body);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    document.addEventListener('focusin', onFocusIn);
    window.addEventListener('wheel', releaseLock, { passive: true });
    window.addEventListener('touchstart', releaseLock, { passive: true });
    window.addEventListener('pointerdown', releaseLock);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('wheel', releaseLock);
      window.removeEventListener('touchstart', releaseLock);
      window.removeEventListener('pointerdown', releaseLock);
      window.removeEventListener('keydown', onKeyDown);
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('focusin', onFocusIn);
      for (const el of sections()) delete el.dataset.spotlight;
    };
  }, [key]);
}
