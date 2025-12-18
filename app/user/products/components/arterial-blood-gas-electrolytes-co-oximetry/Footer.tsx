'use client';

const Footer = () => {
  return (
  <footer id="footer" className="bg-gradient-to-b from-[#233b85] to-[#1a2c65] text-white pt-8 sm:pt-12 md:pt-16 pb-4 sm:pb-6 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 sm:top-6 md:top-8 lg:top-10 left-4 sm:left-6 md:left-8 lg:left-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-white rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 right-4 sm:right-6 md:right-8 lg:right-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-full blur-2xl sm:blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 sm:gap-8 md:gap-10 pb-6 sm:pb-8 md:pb-10 border-b border-blue-800/50">
          {/* Enhanced About Us */}
          <div className="md:w-1/4 w-full flex flex-col items-start group">
            <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-blue-200 transition-colors duration-300 relative">
              About Us
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-16 transition-all duration-300" />
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 mb-4 sm:mb-6 leading-relaxed group-hover:text-blue-50 transition-colors duration-300">
              <span className="font-semibold text-white">Biosite Medical Instruments</span> focuses on the importation and distribution of medical and diagnostic instruments as well as medical and laboratory consumables.
            </p>
            <div className="flex gap-3 sm:gap-4 mt-1 sm:mt-2">
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center border-2 border-blue-300/50 rounded-full hover:bg-white hover:text-[#233b85] hover:border-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                <svg width="14" height="14" className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.896 2.01h-13.792c-1.084 0-1.964.88-1.964 1.964v13.792c0 1.084.88 1.964 1.964 1.964h13.792c1.084 0 1.964-.88 1.964-1.964v-13.792c0-1.084-.88-1.964-1.964-1.964zm-6.896 15.99c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-14.5c-3.589 0-6.5 2.911-6.5 6.5s2.911 6.5 6.5 6.5 6.5-2.911 6.5-6.5-2.911-6.5-6.5-6.5zm0 12c-3.033 0-5.5-2.467-5.5-5.5s2.467-5.5 5.5-5.5 5.5 2.467 5.5 5.5-2.467 5.5-5.5 5.5zm0-10c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zm0 8c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center border-2 border-blue-300/50 rounded-full hover:bg-white hover:text-[#233b85] hover:border-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                <svg width="14" height="14" className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.867-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center border-2 border-blue-300/50 rounded-full hover:bg-white hover:text-[#233b85] hover:border-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                <svg width="14" height="14" className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
          {/* Enhanced Quick Links */}
          <div className="md:w-1/4 w-full flex flex-col items-start group">
            <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-blue-200 transition-colors duration-300 relative">
              Quick Links
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-20 transition-all duration-300" />
            </h3>
            <div className="flex flex-row gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 text-xs sm:text-sm w-full">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 group/item">
                  <span className="text-lg text-blue-300 group-hover/item:text-white transition-colors duration-200">&#8250;</span>
                  <a href="#" className="hover:text-blue-200 transition-colors duration-200 transform hover:translate-x-1">About Us</a>
                </li>
                <li className="flex items-center gap-2 group/item">
                  <span className="text-lg text-blue-300 group-hover/item:text-white transition-colors duration-200">&#8250;</span>
                  <a href="#" className="hover:text-blue-200 transition-colors duration-200 transform hover:translate-x-1">Products</a>
                </li>
                <li className="flex items-center gap-2 group/item">
                  <span className="text-lg text-blue-300 group-hover/item:text-white transition-colors duration-200">&#8250;</span>
                  <a href="#" className="hover:text-blue-200 transition-colors duration-200 transform hover:translate-x-1">Events</a>
                </li>
              </ul>
              <ul className="space-y-2 sm:space-y-3 ml-4 sm:ml-6 md:ml-8">
                <li className="flex items-center gap-2 group/item">
                  <span className="text-base sm:text-lg text-blue-300 group-hover/item:text-white transition-colors duration-200">&#8250;</span>
                  <a href="#" className="hover:text-blue-200 transition-colors duration-200 transform hover:translate-x-1">Careers</a>
                </li>
                <li className="flex items-center gap-2 group/item">
                  <span className="text-base sm:text-lg text-blue-300 group-hover/item:text-white transition-colors duration-200">&#8250;</span>
                  <a href="#" className="hover:text-blue-200 transition-colors duration-200 transform hover:translate-x-1">FAQ</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Enhanced Open Hours */}
          <div className="md:w-1/4 w-full flex flex-col items-start group">
            <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-blue-200 transition-colors duration-300 relative">
              Open Hours
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-20 transition-all duration-300" />
            </h3>
            <div className="text-xs sm:text-sm text-blue-100 w-full space-y-1 sm:space-y-2">
              {/* Mobile/Tablet (≤912px): inline, Desktop (≥913px): stacked */}
              <div className="flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start w-full max-w-xs py-1 rounded group/hour hover:bg-white/10 hover:px-2 transition-all duration-200">
                <span className="font-medium whitespace-nowrap">Monday - Friday</span>
                <span className="text-blue-200 ml-2 md:ml-0 md:mt-1">8:00 AM to <br /> 5:00 PM</span>
              </div>
              <div className="flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start w-full max-w-xs py-1 rounded group/hour hover:bg-white/10 hover:px-2 transition-all duration-200">
                <span className="font-medium whitespace-nowrap">Saturday</span>
                <span className="text-blue-200 ml-2 md:ml-0 md:mt-1">8:00 AM to <br /> 5:00 PM</span>
              </div>
              <div className="flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start w-full max-w-xs py-1 rounded group/hour hover:bg-white/10 hover:px-2 transition-all duration-200">
                <span className="font-medium whitespace-nowrap">Sunday</span>
                <span className="text-red-300 ml-2 md:ml-0 md:mt-1">Closed</span>
              </div>
            </div>
          </div>
          {/* Enhanced Stay Connected */}
          <div className="md:w-1/4 w-full flex flex-col items-start group">
            <h3 className="text-lg sm:text-xl font-bold mb-2 flex items-center group-hover:text-blue-200 transition-colors duration-300 relative">
              <span role="img" aria-label="pin" className="mr-1 sm:mr-2 text-sm sm:text-base group-hover:animate-bounce">📍</span>
              <span>Stay Connected</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 group-hover:w-32 transition-all duration-300" />
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 mb-3 sm:mb-4 leading-relaxed group-hover:text-blue-50 transition-colors duration-300">
              Follow us for updates on <span className="font-semibold text-white">medical training, innovations, and events</span>.
            </p>
            <div className="text-xs text-blue-200 mb-4 sm:mb-6 space-y-1 group-hover:text-blue-100 transition-colors duration-300">
              <div className="bg-white/10 px-2 py-1 rounded inline-block text-xs">#biositemedicalinstrumentsinc</div>
              <div className="bg-white/10 px-2 py-1 rounded inline-block text-xs">#HealthcareInnovation</div>
            </div>
            <form className="flex w-full max-w-xs group/form">
              <input
                type="email"
                placeholder="Email Address"
                className="rounded-l-lg px-3 sm:px-4 py-2 sm:py-3 text-[#233b85] bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 w-full text-xs sm:text-sm transition-all duration-300 group-focus-within/form:shadow-lg"
              />
              <button type="submit" className="bg-white text-[#233b85] px-3 sm:px-4 rounded-r-lg hover:bg-blue-100 transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg hover:shadow-xl">
                <svg width="14" height="14" className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] transform group-hover/form:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
        {/* Enhanced Copyright */}
        <div className="text-center text-blue-100 text-xs sm:text-sm pt-4 sm:pt-6 md:pt-8 pb-3 sm:pb-4 group hover:text-blue-50 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
            <span>© Copyright 2005 | All Rights Reserved by</span>
            <span className="font-semibold text-white bg-white/10 px-2 py-1 rounded group-hover:bg-white/20 transition-all duration-300">Biosite Medical Instruments</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;	