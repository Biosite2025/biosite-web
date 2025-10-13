'use client';

import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import MissionVision from './components/MissionVision';
import WebsiteDetails from './components/WebsiteDetails';
import AwardsRecognitions from './components/AwardsRecognitions';
import Footer from './components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <HeroSection />
      <AboutUs />
      <MissionVision />
      <WebsiteDetails />
      <AwardsRecognitions />
      <Footer />
    </div>
  );
}
