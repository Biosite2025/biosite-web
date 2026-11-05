'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { SITE_URL } from '@/lib/site';

export const productSlug = (name: string) =>
	name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/**
 * Gives every product modal a shareable link: opening a product sets
 * ?product=<slug>, closing removes it, and loading a page with the parameter
 * opens that product.
 */
export function useProductDeepLink<T extends { name: string }>(
	products: T[],
	selected: T | null,
	open: (product: T) => void,
) {
	const restored = useRef(false);

	useEffect(() => {
		if (restored.current || !products.length) return;
		restored.current = true;
		const slug = new URLSearchParams(window.location.search).get('product');
		const match = slug && products.find((p) => productSlug(p.name) === slug);
		if (match) open(match);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [products]);

	const selectedSlug = selected ? productSlug(selected.name) : null;
	useEffect(() => {
		const url = new URL(window.location.href);
		if (url.searchParams.get('product') === selectedSlug) return;
		if (selectedSlug) url.searchParams.set('product', selectedSlug);
		else url.searchParams.delete('product');
		window.history.replaceState(window.history.state, '', url);
	}, [selectedSlug]);
}

/** schema.org list of a page's products, rendered into the server HTML. */
export function ProductListJsonLd({ products }: {
	products: { name: string; image?: string; description?: string; brandName?: string }[];
}) {
	const pathname = usePathname();
	const data = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		itemListElement: products.map((p, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			item: {
				'@type': 'Product',
				name: p.name,
				url: `${SITE_URL}${pathname}?product=${productSlug(p.name)}`,
				...(p.image && { image: p.image }),
				...(p.description && { description: p.description }),
				...(p.brandName && { brand: { '@type': 'Brand', name: p.brandName } }),
			},
		})),
	};
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
		/>
	);
}
