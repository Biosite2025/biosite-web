'use client';

import Footer from './components/Footer';
import { useAuthGuard } from '../../../../src/lib/auth';
import Preloader from '../../../../src/components/layout/Preloader';
import EventCalendar from './components/EventCalendar';
import EventShowcase from './components/EventShowcase';
import EventGallery from './components/EventGallery';

export default function Page() {
  const [isAuth, loading] = useAuthGuard();
  if (loading) {
    return <Preloader />;
  }
  if (!isAuth) return null;
  return (
    <div className="min-h-screen">
      <EventCalendar />
      <EventShowcase />
      <EventGallery />
      <Footer />
    </div>
  );
}
