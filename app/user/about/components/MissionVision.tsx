'use client';

import { motion } from 'framer-motion';

// iPad Air and iPad Pro comprehensive responsive styles
const ipadMissionVisionStyles = `
  @media (min-width: 911px) and (max-width: 913px) and (min-height: 1367px) and (max-height: 1369px) {
  .mission-vision-main-container {
      padding: 40px 24px !important;
      min-height: 105vh !important;
      overflow-y: hidden !important;
    }
    #mission-vision {
      overflow-y: hidden !important;
    }
    
    .mission-vision-content-wrapper {
      max-width: 100% !important;
      gap: 32px !important;
      flex-direction: column !important;
      align-items: center !important;
      overflow: hidden !important;
    }
    .mission-vision-cards-container {
      width: 100% !important;
      max-width: 90% !important;
      min-width: 90% !important;
      gap: 20px !important;
      order: 1 !important;
    }
    .mission-vision-card {
      padding: 24px !important;
      margin: 0 !important;
    }
    .mission-vision-card-title {
      font-size: 1.3rem !important;
      margin-bottom: 16px !important;
    }
    .mission-vision-card-text {
      font-size: 1rem !important;
      line-height: 1.6 !important;
      margin-bottom: 20px !important;
    }
    .mission-vision-card-button {
      padding: 12px 24px !important;
      font-size: 1rem !important;
    }
    .team-cards-container {
      gap: 22px !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      max-width: 90vw !important;
      min-width: 90vw !important;
    }
    .team-card {
      border-radius: 18px !important;
      padding: 22px 18px !important;
      margin: 0 !important;
      font-size: 1.08rem !important;
      box-shadow: 0 4px 24px 0 rgba(35,86,168,0.10) !important;
    }
    .team-card-title {
      font-size: 1.13rem !important;
      margin-bottom: 10px !important;
    }
    .team-card-text {
      font-size: 0.98rem !important;
      line-height: 1.6 !important;
    }
    .team-card-icon {
      padding: 10px !important;
      min-width: 36px !important;
      min-height: 36px !important;
    }
    .team-card-icon svg {
      width: 20px !important;
      height: 20px !important;
    }
      .team-card:not(:last-child) {
      margin-bottom: 18px !important;
    }
}
  @media (min-width: 767px) and (max-width: 769px) and (min-height: 1023px) and (max-height: 1025px) {
    /* iPad Mini 768x1024 - Team card layout improvements */
    .mission-vision-main-container {
      padding: 40px 24px !important;
      min-height: 105vh !important;
      overflow-y: hidden !important;
    }
    #mission-vision {
      overflow-y: hidden !important;
    }
    
    .mission-vision-content-wrapper {
      max-width: 100% !important;
      gap: 32px !important;
      flex-direction: column !important;
      align-items: center !important;
      overflow: hidden !important;
    }
    .mission-vision-cards-container {
      width: 100% !important;
      max-width: 90% !important;
      min-width: 90% !important;
      gap: 20px !important;
      order: 1 !important;
    }
    .mission-vision-card {
      padding: 24px !important;
      margin: 0 !important;
    }
    .mission-vision-card-title {
      font-size: 1.3rem !important;
      margin-bottom: 16px !important;
    }
    .mission-vision-card-text {
      font-size: 1rem !important;
      line-height: 1.6 !important;
      margin-bottom: 20px !important;
    }
    .mission-vision-card-button {
      padding: 12px 24px !important;
      font-size: 1rem !important;
    }
    .team-cards-container {
      gap: 22px !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      max-width: 90vw !important;
      min-width: 90vw !important;
    }
    .team-card {
      border-radius: 18px !important;
      padding: 22px 18px !important;
      margin: 0 !important;
      font-size: 1.08rem !important;
      box-shadow: 0 4px 24px 0 rgba(35,86,168,0.10) !important;
    }
    .team-card-title {
      font-size: 1.13rem !important;
      margin-bottom: 10px !important;
    }
    .team-card-text {
      font-size: 0.98rem !important;
      line-height: 1.6 !important;
    }
    .team-card-icon {
      padding: 10px !important;
      min-width: 36px !important;
      min-height: 36px !important;
    }
    .team-card-icon svg {
      width: 20px !important;
      height: 20px !important;
    }
      .team-card:not(:last-child) {
      margin-bottom: 18px !important;
    }
  }
  @media (min-width: 810px) and (max-width: 830px) and (min-height: 1170px) and (max-height: 1190px) {
    /* iPad Air 820x1180 */
    .mission-vision-main-container {
      padding: 40px 24px !important;
      min-height: 105vh !important;
      overflow-y: hidden !important;
    }
    #mission-vision {
      overflow-y: hidden !important;
    }
    .team-card:not(:last-child) {
      margin-bottom: 18px !important;
    }
    .mission-vision-content-wrapper {
      max-width: 100% !important;
      gap: 32px !important;
      flex-direction: column !important;
      align-items: center !important;
      overflow: hidden !important;
    }
    .mission-vision-cards-container {
      width: 100% !important;
      max-width: 90% !important;
      min-width: 90% !important;
      gap: 20px !important;
      order: 1 !important;
    }
    .mission-vision-card {
      padding: 24px !important;
      margin: 0 !important;
    }
    .mission-vision-card-title {
      font-size: 1.3rem !important;
      margin-bottom: 16px !important;
    }
    .mission-vision-card-text {
      font-size: 1rem !important;
      line-height: 1.6 !important;
      margin-bottom: 20px !important;
    }
    .mission-vision-card-button {
      padding: 12px 24px !important;
      font-size: 1rem !important;
    }
    .team-section-container {
      width: 100% !important;
      max-width: 100% !important;
      order: 2 !important;
      margin-top: 32px !important;
    }
    .team-letters-container {
      flex-direction: row !important;
      justify-content: center !important;
      gap: 20px !important;
      margin-bottom: 32px !important;
    }
    .team-letter-container {
      padding: 20px !important;
      min-width: 90px !important;
      min-height: 90px !important;
      max-width: 100px !important;
      max-height: 100px !important;
    }
    .team-letter-text {
      font-size: 3rem !important;
    }
    .team-cards-container {
      width: 100% !important;
      max-width: 90% !important;
      min-width: 90% !important;
      margin: 0 auto !important;
      gap: 28px !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      box-sizing: border-box !important;
    }
    .team-card {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      padding: 26px !important;
      margin: 0 !important;
    }
    .team-card-icon {
      padding: 12px !important;
    }
    .team-card-icon svg {
      width: 20px !important;
      height: 20px !important;
    }
    .team-card-title {
      font-size: 1.2rem !important;
      margin-bottom: 12px !important;
    }
    .team-card-text {
      font-size: 0.95rem !important;
    }
  }
  
  @media (min-width: 1024px) and (max-width: 1034px) and (min-height: 1360px) and (max-height: 1380px) {
    /* iPad Pro 11" 1024x1366 - Use iPad Air lse iPainstead of laptop/PC layout
    .mission-vision-main-container {
      padding: 40px 24px !important;
      min-height: 105vh !important;
      overflow-y: hidden !important;
    }
    #mission-vision {
      overf32pxy: hidden !important;
    }
    .team-card:not(:last-child) {
      overflow: hidden !important;
      overflow: hidden !important;
      overflow: hidden !important;
      margin-bottom: 18px !important;
      overflow-y: hidden !important;
    }
    #mission-vision {
      overflow-y: hidden !important;
    }
    .team-section-container {
      width: 100% !important;
      max-width: 650px !important;
      order: 2 !important;
      margin-top: 40px !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
    }
    /* Show the team letters container and center it horizontally */
    .team-letters-container {
      display: flex !important;
      flex-direction: row !important;
      justify-content: center !important;
      align-items: center !important;
      gap: 20px !important;
      margin-bottom: 30px !important;
      width: 100% !important;
    }
    .team-letter-container {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 20px !important;
      min-width: 80px !important;
      min-height: 80px !important;
      max-width: 90px !important;
      max-height: 90px !important;
      background: rgba(35,86,168,0.1) !important;
      border-radius: 16px !important;
      box-shadow: 0 2px 12px 0 rgba(35,86,168,0.08) !important;
    }
    .team-letter-text {
      font-size: 2.5rem !important;
      font-weight: 700 !important;
      color: #2356a8 !important;
      text-align: center !important;
    }
    /* Center the team cards below the letters */
    .team-cards-container {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 100% !important;
      margin: 0 auto !important;
      gap: 20px !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      box-sizing: border-box !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
    }
    .team-card {
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      padding: 24px !important;
      margin: 0 !important;
    }
    .team-card-icon {
      padding: 12px !important;
    }
    .team-card-icon svg {
      width: 20px !important;
      height: 20px !important;
    }
    .team-card-title {
      font-size: 1.15rem !important;
      margin-bottom: 10px !important;
    }
    .team-card-text {
      font-size: 0.95rem !important;
      line-height: 1.6 !important;
    }
  }
  
  @media (min-width: 1365px) and (max-width: 1375px) and (min-height: 1020px) and (max-height: 1030px) {
    /* iPad Pro 12.9" 1366x1024 */
    .mission-vision-main-container {
      padding: 80px 60px !important;
      min-height: 100vh !important;
    }
    .mission-vision-content-wrapper {
      max-width: 100% !important;
      gap: 64px !important;
      flex-direction: row !important;
      align-items: flex-start !important;
    }
    .mission-vision-cards-container {
      width: auto !important;
      max-width: 400px !important;
      min-width: 350px !important;
      gap: 40px !important;
      order: 1 !important;
    }
    .mission-vision-card {
      padding: 36px !important;
      margin: 0 !important;
    }
    .mission-vision-card-title {
      font-size: 1.6rem !important;
      margin-bottom: 24px !important;
    }
    .mission-vision-card-text {
      font-size: 1.2rem !important;
      line-height: 1.8 !important;
      margin-bottom: 28px !important;
    }
    .mission-vision-card-button {
      padding: 16px 32px !important;
      font-size: 1.2rem !important;
    }
    .team-section-container {
      width: auto !important;
      max-width: none !important;
      flex: 1 !important;
      order: 2 !important;
      margin-top: 0 !important;
    }
    .team-letters-container {
      flex-direction: column !important;
      justify-content: flex-start !important;
      gap: 48px !important;
      margin-bottom: 0 !important;
      margin-right: 48px !important;
    }
    .team-letter-container {
      padding: 32px !important;
      min-width: 140px !important;
      min-height: 140px !important;
      max-width: 160px !important;
      max-height: 160px !important;
    }
    .team-letter-text {
      font-size: 5rem !important;
    }
    .team-cards-container {
      max-width: 100% !important;
      margin: 0 !important;
      gap: 32px !important;
    }
    .team-card {
      padding: 32px !important;
      margin: 0 !important;
    }
    .team-card-icon {
      padding: 20px !important;
    }
    .team-card-icon svg {
      width: 28px !important;
      height: 28px !important;
    }
    .team-card-title {
      font-size: 1.5rem !important;
      margin-bottom: 20px !important;
    }
    .team-card-text {
      font-size: 1.15rem !important;
    }
  }
`;

const MissionVision = () => {
  return (
  <>
    <style>{ipadMissionVisionStyles}</style>
    <motion.section
      id="mission-vision"
      className="mission-vision-main-container relative py-8 sm:py-12 md:py-16 lg:py-24 px-3 sm:px-4 md:px-6 lg:px-12 min-h-screen sm:min-h-[100vh] md:min-h-[110vh] flex items-center justify-center bg-blue-500/90 overflow-hidden mt-0"
      style={{
        backgroundImage: `url('/asset/slide (3).png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Overlay */}
  <div className="absolute inset-0 bg-blue-500/80 z-0" />
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Responsive flex: stack on mobile/tablet, row on xl+ */}
        <div className="mission-vision-content-wrapper w-full flex flex-col xl:flex-row gap-4 sm:gap-6 xl:gap-12 items-start xl:items-start justify-center scale-90 sm:scale-95 md:scale-100 xl:scale-120 max-[1365px]:overflow-x-hidden max-[912px]:gap-6">
          {/* Mission & Vision Cards - always order-1 on mobile, order-1 on xl+ */}
          <div className="mission-vision-cards-container flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 scale-95 sm:scale-100 lg:scale-90 xl:scale-100 min-w-full sm:min-w-[300px] md:min-w-[320px] xl:min-w-[300px] max-w-full sm:max-w-md xl:max-w-md order-1 xl:order-1 max-[1365px]:w-full max-[1365px]:mx-auto max-[912px]:gap-4">
            {/* Mission Card - Responsive */}
            <motion.div
              className="mission-vision-card bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col group hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-white/20 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(35,86,168,0.10)' }}
            >
              <div className="flex items-center mb-3 sm:mb-4 lg:mb-6">
                <motion.div
                  className="bg-gradient-to-br from-[#2356a8] to-blue-700 text-white rounded-full p-2 sm:p-3 lg:p-4 mr-2 sm:mr-3 lg:mr-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
                  whileHover={{ scale: 1.13 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </motion.div>
                <h3 className="mission-vision-card-title text-base sm:text-lg md:text-xl lg:text-2xl text-black font-bold group-hover:text-[#2356a8] transition-colors duration-300">Our Mission</h3>
              </div>
              <p className="mission-vision-card-text text-gray-700 flex-1 mb-3 sm:mb-4 lg:mb-6 text-xs sm:text-sm lg:text-base leading-relaxed group-hover:text-gray-600 transition-colors duration-300">To help our business partners, customers, and communities by providing innovative, high-quality healthcare solutions and services that improve lives.</p>
              <motion.button
                className="mission-vision-card-button mt-auto self-start bg-gradient-to-r from-[#2356a8] to-blue-700 hover:from-blue-700 hover:to-[#2356a8] text-white font-semibold px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-md sm:rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-sm lg:text-base"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3 }}
              >
                Read More
              </motion.button>
              {/* Animated blue line on hover */}
              <span
                className="pointer-events-none absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2356a8] to-blue-500 rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              />
            </motion.div>
            
            {/* Vision Card - Responsive */}
            <motion.div
              className="mission-vision-card bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col group hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-white/20 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(35,86,168,0.10)' }}
            >
              <div className="flex items-center mb-3 sm:mb-4 lg:mb-6">
                <motion.div
                  className="bg-gradient-to-br from-[#2356a8] to-blue-700 text-white rounded-full p-2 sm:p-3 lg:p-4 mr-2 sm:mr-3 lg:mr-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
                  whileHover={{ scale: 1.13 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </motion.div>
                <h3 className="mission-vision-card-title text-base sm:text-lg md:text-xl lg:text-2xl text-black font-bold group-hover:text-[#2356a8] transition-colors duration-300">Our Vision</h3>
              </div>
              <p className="mission-vision-card-text text-gray-700 flex-1 mb-3 sm:mb-4 lg:mb-6 text-xs sm:text-sm lg:text-base leading-relaxed group-hover:text-gray-600 transition-colors duration-300">We believe that health is the greatest gift. We envision to be the most trusted partner in healthcare, delivering excellence and compassion to every life we touch.</p>
              <motion.button
                className="mission-vision-card-button mt-auto self-start bg-gradient-to-r from-[#2356a8] to-blue-700 hover:from-blue-700 hover:to-[#2356a8] text-white font-semibold px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-md sm:rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-sm lg:text-base"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.3 }}
              >
                Read More
              </motion.button>
              {/* Animated blue line on hover */}
              <span
                className="pointer-events-none absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2356a8] to-blue-500 rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              />
            </motion.div>
          </div>
          {/* TEAM Section - order-2 on mobile/tablet, order-2 on xl+ */}
          <div className="team-section-container w-full max-w-4xl mx-auto scale-95 sm:scale-100 order-2 xl:order-2 mt-4 sm:mt-6 xl:mt-0 max-[1365px]:order-2 max-[1365px]:w-full max-[1365px]:mx-auto max-[912px]:mt-6">
            {/* TEAM Letters Layout - Responsive */}
            <div className="flex flex-col lg:flex-row mt-3 sm:mt-4 md:mt-6 xl:mt-[40px] ml-0 sm:ml-2 md:ml-4 items-start justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-12 max-[1365px]:ml-0 max-[1365px]:w-full max-[1024px]:flex-col max-[912px]:mt-0 max-[912px]:gap-4">
              {/* Vertical TEAM Letters - Left Side with Stair Layout - Responsive */}
              <div className="team-letters-container flex lg:flex-col flex-row justify-center lg:justify-start items-center lg:items-start gap-1 sm:gap-2 md:gap-3 lg:gap-6 max-[1365px]:flex-row max-[1365px]:justify-center max-[1365px]:items-center max-[1365px]:gap-4 max-[1024px]:gap-6 max-[640px]:gap-8 max-[1365px]:w-full max-[1024px]:flex-row max-[912px]:gap-4 max-[912px]:justify-center max-[912px]:mb-4">
                {['T', 'E', 'A', 'M'].map((letter, index) => (
                  <motion.div
                    key={letter}
                    className={`relative group ${letter === 'E' ? 'lg:ml-12' : ''} ${letter === 'A' ? 'lg:ml-24' : ''} ${letter === 'M' ? 'lg:ml-36 max-[830px]:ml-0' : ''}`}
                    initial={{ 
                      opacity: 0, 
                      y: 80 + (index * 20), 
                      x: index * 15, 
                      scale: 0.6,
                      rotateY: -90 
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0, 
                      x: 0,
                      scale: 1,
                      rotateY: 0
                    }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1.2, 
                      delay: index * 0.25, 
                      ease: [0.25, 0.25, 0.25, 0.75], 
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 8,
                      y: -10,
                      transition: { duration: 0.1, ease: 'easeOut' }
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: 1000
                    }}
                  >
                    <div className="team-letter-container bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 max-[1365px]:p-6 max-[640px]:p-3 border border-white/20 shadow-2xl group-hover:bg-white/20 transition-all duration-500 relative overflow-hidden flex items-center justify-center scale-90 sm:scale-100 max-[1365px]:scale-110 max-[640px]:scale-100 max-[1365px]:flex-1 max-[1365px]:min-w-0 w-full max-[912px]:p-4 max-[912px]:scale-100 max-[912px]:min-w-[60px] max-[912px]:max-w-[80px]">
                      <span
                        className="team-letter-text font-black text-white drop-shadow-2xl group-hover:text-blue-100 transition-colors duration-300 block relative z-10 text-[32px] sm:text-[40px] md:text-[50px] max-[1365px]:text-[64px] max-[640px]:text-[28px] w-full text-center max-[1365px]:w-full max-[1365px]:text-center max-[912px]:text-[36px]"
                      >
                        {letter}
                      </span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-blue-300/30 to-white/20 rounded-2xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (index * 0.25) + 0.5, duration: 0.6 }}
                      />
                    </div>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ delay: (index * 0.25) + 0.3, duration: 0.8 }}
                    />
                    <motion.div
                      className="absolute inset-0 border-2 border-white/40 rounded-2xl"
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: [0, 1.5], opacity: [1, 0] }}
                      transition={{ delay: (index * 0.25) + 0.2, duration: 1 }}
                    />
                  </motion.div>
                ))}
            </div>

            {/* Content Details - Right Side with Sequential Left-to-Right Animation - Responsive */}
            <div className="team-cards-container flex-1 space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-8 w-full max-w-full md:max-w-[600px] max-[1365px]:w-full max-[1024px]:mt-3 max-[912px]:space-y-3 max-[912px]:mt-0">
              {/* T - Teamwork - Responsive */}
              <motion.div
                className="team-card bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-[30px] mt-0 sm:mt-[2px] shadow-2xl border border-white/30 group hover:shadow-3xl hover:bg-white transition-all duration-500 relative overflow-hidden ml-0 sm:-ml-4 md:-ml-8 lg:-ml-[120px] xl:-ml-[190px] max-[1365px]:ml-0 max-[640px]:mb-[15px] max-[912px]:ml-0 max-[912px]:p-3"
                initial={{ 
                  opacity: 0, 
                  x: 60, 
                  y: 20,
                  scale: 0.9,
                  rotateX: 15
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0, 
                  y: 0,
                  scale: 1,
                  rotateX: 0
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1, 
                  delay: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                }}
              >
                <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
                  <motion.div 
                    className="team-card-icon bg-gradient-to-br  from-[#2356a8] to-blue-700 text-white rounded-full p-2 sm:p-3 lg:p-4 shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 1.4, // Slightly after card appears
                      duration: 0.6,
                      type: "spring",
                      stiffness: 150
                    }}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3 
                      className="team-card-title text-base sm:text-lg lg:text-xl font-bold text-[#2356a8] mb-1 sm:mb-2 group-hover:text-blue-700 transition-colors duration-300"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                    >
                      Teamwork
                    </motion.h3>
                    <motion.p 
                      className="team-card-text text-gray-600 text-xs sm:text-sm leading-relaxed"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.6, duration: 0.5 }}
                    >
                      Working together towards common goals, fostering collaboration and unity.
                    </motion.p>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2356a8] to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>

              {/* E - Excellence - Responsive */}
              <motion.div
                className="team-card bg-white/95 backdrop-blur-sm mb-4 sm:mb-6 md:mb-[27px] -mt-2 sm:-mt-[8px] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-[20px] shadow-2xl border border-white/30 group hover:shadow-3xl hover:bg-white transition-all duration-500 relative overflow-hidden ml-0 sm:-ml-4 md:-ml-8 lg:-ml-[80px] xl:-ml-[140px] max-[1365px]:ml-0 max-[912px]:ml-0 max-[912px]:p-3 max-[912px]:mb-3"
                initial={{ 
                  opacity: 0, 
                  x: 80, 
                  y: 25,
                  scale: 0.9,
                  rotateX: 15
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0, 
                  y: 0,
                  scale: 1,
                  rotateX: 0
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1, 
                  delay: 1.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                }}
              >
                <div className="flex items-start gap-6 max-[912px]:gap-3">
                  <motion.div 
                    className="team-card-icon bg-gradient-to-br from-[#2356a8] to-blue-700 text-white rounded-full p-4 shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300 max-[912px]:p-3"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 1.8, // After Excellence card appears
                      duration: 0.6,
                      type: "spring",
                      stiffness: 150
                    }}
                  >
                    <svg className="w-6 h-6 max-[912px]:w-4 max-[912px]:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3 
                      className="team-card-title text-xl font-bold text-[#2356a8] mb-2 group-hover:text-blue-700 transition-colors duration-300 max-[912px]:text-lg max-[912px]:mb-1"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.9, duration: 0.5 }}
                    >
                      Excellence
                    </motion.h3>
                    <motion.p 
                      className="team-card-text text-gray-600 text-sm leading-relaxed max-[912px]:text-xs"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 2.0, duration: 0.5 }}
                    >
                      Consistently striving to perform the highest standards in all aspects of our work and service delivery.
                    </motion.p>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2356a8] to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>

              {/* A - Accountability - Responsive */}
              <motion.div
                className="team-card bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl mb-4 sm:mb-6 md:mb-[27px] ml-0 sm:-ml-2 md:-ml-4 lg:-ml-[50px] xl:-ml-[85px] p-3 sm:p-4 md:p-[20px] shadow-2xl border border-white/30 group hover:shadow-3xl hover:bg-white transition-all duration-500 relative overflow-hidden max-[1365px]:ml-0"
                initial={{ 
                  opacity: 0, 
                  x: 90, 
                  y: 30,
                  scale: 0.9,
                  rotateX: 15
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0, 
                  y: 0,
                  scale: 1,
                  rotateX: 0
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1, 
                  delay: 2.0,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                }}
              >
                <div className="flex items-start gap-6 max-[912px]:gap-3">
                  <motion.div 
                    className="team-card-icon bg-gradient-to-br from-[#2356a8] to-blue-700 text-white rounded-full p-4 shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300 max-[912px]:p-3"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 2.2, // After Accountability card appears
                      duration: 0.6,
                      type: "spring",
                      stiffness: 150
                    }}
                  >
                    <svg className="w-6 h-6 max-[912px]:w-4 max-[912px]:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3 
                      className="team-card-title text-xl font-bold text-[#2356a8] mb-2 group-hover:text-blue-700 transition-colors duration-300 max-[912px]:text-lg max-[912px]:mb-1"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 2.3, duration: 0.5 }}
                    >
                      Accountability  
                    </motion.h3>
                    <motion.p 
                      className="team-card-text text-gray-600 text-sm leading-relaxed max-[912px]:text-xs"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 2.4, duration: 0.5 }}
                    >
                      Taking ownership of our actions and decisions, ensuring transparency and reliability.
                    </motion.p>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2356a8] to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>

              {/* M - Mission Driven - Responsive */}
              <motion.div
                className="team-card bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl ml-0 md:-ml-1 lg:-ml-[25px] xl:-ml-[25px] p-3 sm:p-4 md:p-[20px] shadow-2xl border border-white/30 group hover:shadow-3xl hover:bg-white transition-all duration-500 relative overflow-hidden max-[1365px]:ml-0"
                initial={{ 
                  opacity: 0, 
                  x: 100, 
                  y: 35,
                  scale: 0.9,
                  rotateX: 15
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0, 
                  y: 0,
                  scale: 1,
                  rotateX: 0
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1, 
                  delay: 2.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                }}
              >
                <div className="flex items-start gap-6 max-[912px]:gap-3">
                  <motion.div 
                    className="team-card-icon bg-gradient-to-br from-[#2356a8] to-blue-700 text-white rounded-full p-4 shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300 max-[912px]:p-3"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 2.6, // After Mission Driven card appears
                      duration: 0.6,
                      type: "spring",
                      stiffness: 150
                    }}
                  >
                    <svg className="w-6 h-6 max-[912px]:w-4 max-[912px]:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3 
                      className="team-card-title text-xl font-bold text-[#2356a8] mb-2 group-hover:text-blue-700 transition-colors duration-300 max-[912px]:text-lg max-[912px]:mb-1"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 2.7, duration: 0.5 }}
                    >
                      Mission Driven
                    </motion.h3>
                    <motion.p 
                      className="team-card-text text-gray-600 text-sm leading-relaxed max-[912px]:text-xs"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 2.8, duration: 0.5 }}
                    >
                      We stay focused on our purpose, aligning every decision with our long-term goals and values.
                    </motion.p>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2356a8] to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
  </>
  );
}

export default MissionVision;