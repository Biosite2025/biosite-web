'use client';

import Footer from './components/Footer';
import Biomi from './components/Biomi';
import { useAuthGuard } from '../../../../src/lib/auth';
import Preloader from '../../../../src/components/layout/Preloader';

export default function Page() {
  const [isAuth, loading] = useAuthGuard();
  if (loading) {
    return <Preloader />;
  }
  if (!isAuth) return null;
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Biomi />
      <Footer />
    </div>
  );
}
