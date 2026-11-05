'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(var(--vh,1vh)*100)] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Something went wrong</h1>
      <p className="mt-3 max-w-md text-gray-600">
        Please try again. If the problem continues, our team is happy to help.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="rounded-full bg-[#2B3990] px-6 py-3 font-semibold text-white transition hover:bg-[#1f2a6b]">
          Try again
        </button>
        <Link href="/contact" className="rounded-full border border-[#2B3990] px-6 py-3 font-semibold text-[#2B3990] transition hover:bg-gray-50">
          Contact us
        </Link>
      </div>
    </div>
  );
}
