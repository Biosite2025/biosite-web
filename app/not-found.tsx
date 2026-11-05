import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(var(--vh,1vh)*100)] flex-col items-center justify-center px-6 text-center">
      <p className="text-6xl font-bold text-[#2B3990]">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-gray-600">
        The page you are looking for may have moved. Our team can still help you find what you need.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/about" className="rounded-full bg-[#2B3990] px-6 py-3 font-semibold text-white transition hover:bg-[#1f2a6b]">
          Go to home page
        </Link>
        <Link href="/contact" className="rounded-full border border-[#2B3990] px-6 py-3 font-semibold text-[#2B3990] transition hover:bg-gray-50">
          Contact us
        </Link>
      </div>
    </div>
  );
}
