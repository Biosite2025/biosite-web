'use client';

import Footer from './components/Footer';
import Biomi from './components/Biomi';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Biomi />
      <Footer />
    </div>
  );
}
