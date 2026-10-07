'use client';

import Footer from './components/Footer';
import Biomi from './components/Biomi';

export default function Page() {
  return (
    // overflow-x-clip: Biomi scales its backdrop to 115% on large screens,
    // which would otherwise add a horizontal scrollbar.
    <div className="min-h-screen overflow-x-clip bg-gradient-to-b from-white to-gray-50 pt-16 lg:pt-0">
      <Biomi />
      <Footer />
    </div>
  );
}
