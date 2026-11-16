import BiomiFloat from './shared/BiomiFloat';

/** Every product page gets the floating Biomi button (shown only over the product cards). */
export default function ProductsLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children}
			<BiomiFloat />
		</>
	);
}
