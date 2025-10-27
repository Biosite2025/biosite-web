'use client';

import Footer from './components/Footer';
import Contact from './components/Contact';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-16 lg:pt-0">
      <Contact />
      <Footer />
    </div>
  );
}
