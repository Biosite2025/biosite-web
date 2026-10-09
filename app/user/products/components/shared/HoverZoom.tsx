'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';

/** How far the photo magnifies while hovered. */
const ZOOM = 2;

/**
 * Hover-to-zoom for product photos in the details modal.
 *
 * Wrap a `fill` <Image> (its parent must be positioned). While a mouse is over
 * it, the photo scales up from the cursor position and pans as the cursor
 * moves, so details can be inspected; it eases back out on leave.
 *
 * Mouse only: touch "hover" is a tap, which would leave the photo stuck
 * zoomed, so phones and tablets keep the plain photo. The transform is set
 * directly on the element (no React state), so tracking the cursor never
 * re-renders the modal.
 */
export default function HoverZoom({ children }: { children: ReactNode }) {
	const layer = useRef<HTMLDivElement>(null);

	const track = (e: PointerEvent<HTMLDivElement>) => {
		if (e.pointerType !== 'mouse' || !layer.current) return;
		const r = e.currentTarget.getBoundingClientRect();
		const x = ((e.clientX - r.left) / r.width) * 100;
		const y = ((e.clientY - r.top) / r.height) * 100;
		layer.current.style.transformOrigin = `${x}% ${y}%`;
		layer.current.style.transform = `scale(${ZOOM})`;
	};

	const reset = () => {
		if (layer.current) layer.current.style.transform = 'scale(1)';
	};

	return (
		<div
			className="absolute inset-0 overflow-hidden rounded-[inherit] [@media(hover:hover)]:cursor-zoom-in"
			onPointerEnter={track}
			onPointerMove={track}
			onPointerLeave={reset}
		>
			<div
				ref={layer}
				className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none"
			>
				{children}
			</div>
		</div>
	);
}
