'use client';

import Footer from './components/Footer';
import JobListing from './components/JobListing';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <JobListing />
      <Footer />
    </div>
  );
}
