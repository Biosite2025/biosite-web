'use client';

import Footer from './components/Footer';
import EventCalendar from './components/EventCalendar';
import EventShowcase from './components/EventShowcase';
import EventGallery from './components/EventGallery';

export default function Page() {
  return (
    <div className="min-h-screen pt-16 lg:pt-0">
      <EventCalendar />
      <EventShowcase />
      <EventGallery />
      <Footer />
    </div>
  );
}
