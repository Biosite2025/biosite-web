'use client';

import Link from 'next/link';

// Quick Links mirror the main navbar (TopNav) exactly, in navbar order.
// "Products" is a dropdown trigger in the navbar with no standalone page, so it
// is intentionally omitted rather than pointing at an invented URL.
const quickLinks = [
  { label: 'About Us', href: '/user/about' },
  { label: 'Events', href: '/user/events' },
  { label: 'Careers', href: '/user/career' },
  { label: 'Contact', href: '/user/contact' },
  { label: 'FAQ', href: '/user/chatbot' },
];

const socials = [
  {
    label: 'Visit Biosite on Facebook (opens in a new tab)',
    href: 'https://www.facebook.com/bmibiosite',
    path: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    label: 'Visit Biosite on LinkedIn (opens in a new tab)',
    href: 'https://www.linkedin.com/company/biosite-medical-instruments-inc/',
    path: (
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.867-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
    ),
  },
  {
    label: 'Contact Biosite (opens in a new tab)',
    href: 'https://biositeph.com/user/contact',
    path: (
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Zm21-1.762V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
    ),
  },
];

const focusRing =
  'focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a2c65]';

const Footer = () => {
  return (
    <footer id="footer" className="bg-gradient-to-b from-[#233b85] to-[#1a2c65] text-white pt-8 sm:pt-12 md:pt-16 pb-4 sm:pb-6 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-4 sm:top-6 md:top-8 lg:top-10 left-4 sm:left-6 md:left-8 lg:left-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-white rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 right-4 sm:right-6 md:right-8 lg:right-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-full blur-2xl sm:blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-6 sm:pb-8 md:pb-10 border-b border-blue-800/50">
          {/* About Us */}
          <div className="flex flex-col items-start group">
            <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-blue-200 transition-colors duration-300 relative">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-16 transition-all duration-300" />
            </h3>
            <p className="text-sm text-blue-100 leading-relaxed group-hover:text-blue-50 transition-colors duration-300">
              <span className="font-semibold text-white">Biosite Medical Instruments</span> focuses on the importation and distribution of medical and diagnostic instruments as well as medical and laboratory consumables.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer quick links" className="flex flex-col items-start group">
            <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-blue-200 transition-colors duration-300 relative">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-20 transition-all duration-300" />
            </h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href} className="flex items-center gap-2 group/item">
                  <span aria-hidden="true" className="text-lg text-blue-300 group-hover/item:text-white transition-colors duration-200">&#8250;</span>
                  <Link
                    href={link.href}
                    className={`rounded-sm px-0.5 text-blue-100 hover:text-white hover:translate-x-1 transition-all duration-200 ${focusRing}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Open Hours */}
          <div className="flex flex-col items-start group">
            <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-blue-200 transition-colors duration-300 relative">
              Open Hours
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-20 transition-all duration-300" />
            </h3>
            <div className="w-full max-w-xs space-y-3 text-sm">
              <div className="rounded-lg bg-white/5 px-3 py-2.5 border border-white/10">
                <p className="font-semibold text-white">Luzon</p>
                <p className="text-blue-100">Monday &ndash; Saturday</p>
                <p className="text-blue-200">8:30 AM &ndash; 5:30 PM</p>
              </div>
              <div className="rounded-lg bg-white/5 px-3 py-2.5 border border-white/10">
                <p className="font-semibold text-white">VisMin</p>
                <p className="text-blue-100">Monday &ndash; Saturday</p>
                <p className="text-blue-200">8:00 AM &ndash; 5:00 PM</p>
              </div>
            </div>
          </div>

          {/* Stay Connected */}
          <div className="flex flex-col items-start group">
            <h3 className="text-lg sm:text-xl font-bold mb-3 flex items-center group-hover:text-blue-200 transition-colors duration-300 relative">
              <span role="img" aria-label="pin" className="mr-2 text-sm sm:text-base group-hover:animate-bounce">📍</span>
              <span>Stay Connected</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-32 transition-all duration-300" />
            </h3>
            <p className="text-sm text-blue-100 mb-4 leading-relaxed group-hover:text-blue-50 transition-colors duration-300">
              Follow us for updates on <span className="font-semibold text-white">medical training, innovations, and events</span>.
            </p>
            <div className="flex flex-wrap gap-2 mb-5 text-xs text-blue-100">
              <span className="bg-white/10 px-2 py-1 rounded">#biositemedicalinstrumentsinc</span>
              <span className="bg-white/10 px-2 py-1 rounded">#HealthcareInnovation</span>
            </div>
            <div className="flex gap-3 sm:gap-4">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 flex items-center justify-center border-2 border-blue-300/50 rounded-full text-white hover:bg-white hover:text-[#233b85] hover:border-white transition-all duration-300 hover:scale-110 hover:shadow-lg ${focusRing}`}
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {social.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-blue-100 text-xs sm:text-sm pt-4 sm:pt-6 md:pt-8 pb-3 sm:pb-4 group hover:text-blue-50 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
            <span>© 2005&ndash;2026 | All Rights Reserved by</span>
            <span className="font-semibold text-white bg-white/10 px-2 py-1 rounded group-hover:bg-white/20 transition-all duration-300">Biosite Medical Instruments</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
