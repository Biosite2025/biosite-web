
'use client';

import { motion } from 'framer-motion';

const MissionVision = () => {
  return (
    <motion.section
      id="mission-vision"
      className="relative py-24 px-2 md:px-12 min-h-[110vh] flex items-center justify-center bg-blue-500/90 overflow-hidden"
      style={{
        backgroundImage: `url('/asset/istockphoto-511061090-612x612.jpg')`,
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
      <div className="absolute inset-0 bg-blue-500/80 backdrop-blur-sm z-0" />
  <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Professional TEAM Section with Mission & Vision on the Left */}
  <div className="w-full flex flex-col lg:flex-row gap-8 scale-90 lg:gap-12 items-start justify-center scale-120">
          
          {/* Enhanced Mission & Vision Cards - Left Side */}
          <div className="flex flex-col gap-8 lg:scale-90 min-w-[300px] max-w-md">
            {/* Mission Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col group hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-white/20 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(35,86,168,0.10)' }}
            >
              <div className="flex items-center mb-6">
                <motion.div
                  className="bg-gradient-to-br from-[#2356a8] to-blue-700 text-white rounded-full p-4 mr-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
                  whileHover={{ scale: 1.13 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </motion.div>
                <h3 className="text-2xl text-black font-bold group-hover:text-[#2356a8] transition-colors duration-300">Our Mission</h3>
              </div>
              <p className="text-gray-700 flex-1 mb-6 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">To help our business partners, customers, and communities by providing innovative, high-quality healthcare solutions and services that improve lives.</p>
              <motion.button
                className="mt-auto self-start bg-gradient-to-r from-[#2356a8] to-blue-700 hover:from-blue-700 hover:to-[#2356a8] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
            
            {/* Vision Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col group hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-white/20 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(35,86,168,0.10)' }}
            >
              <div className="flex items-center mb-6">
                <motion.div
                  className="bg-gradient-to-br from-[#2356a8] to-blue-700 text-white rounded-full p-4 mr-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
                  whileHover={{ scale: 1.13 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </motion.div>
                <h3 className="text-2xl text-black font-bold group-hover:text-[#2356a8] transition-colors duration-300">Our Vision</h3>
              </div>
              <p className="text-gray-700 flex-1 mb-6 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">We believe that health is the greatest gift. We envision to be the most trusted partner in healthcare, delivering excellence and compassion to every life we touch.</p>
              <motion.button
                className="mt-auto self-start bg-gradient-to-r from-[#2356a8] to-blue-700 hover:from-blue-700 hover:to-[#2356a8] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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

          {/* TEAM Section - Right Side */}
          <div className="w-full max-w-4xl mx-auto scale-100 ">
          

          {/* TEAM Letters Layout */}
          <div className="flex flex-col mt-[40px] ml-4 lg:flex-row items-start justify-center gap-8 lg:gap-12">
            {/* Vertical TEAM Letters - Left Side with Stair Layout */}
            <div className="flex lg:flex-col flex-row justify-center lg:justify-start items-center lg:items-start gap-2 lg:gap-6">
              {['T', 'E', 'A', 'M'].map((letter, index) => (
                <motion.div
                  key={letter}
                   className={`relative group${letter === 'E' ? ' ml-12' : ''} && ${letter === 'A' ? ' ml-24' : ''} && ${letter === 'M' ? ' ml-36 ' : ''}`}                  initial={{ 
                    opacity: 0, 
                    y: 80 + (index * 20), // Stair effect: each letter starts from different heights
                    x: index * 15, // Slight horizontal offset for stair layout
                    scale: 0.6,
                    rotateY: -90 // 3D flip effect
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
                    delay: index * 0.25, // Staggered delay for stair effect
                    ease: [0.25, 0.25, 0.25, 0.75], // Custom easing for smooth stair motion
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-white/20 shadow-2xl group-hover:bg-white/20 transition-all duration-500 relative overflow-hidden">
                    {/* Letter with enhanced 3D effect */}
                    <span
                    className="font-black text-white drop-shadow-2xl group-hover:text-blue-100 transition-colors duration-300 block relative z-10"
                     style={{ fontSize: '50px'}} // <-- Adjust this value as needed
                      >
                    {letter}
                    </span>   
                    
                    {/* Enhanced background glow */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-blue-300/30 to-white/20 rounded-2xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (index * 0.25) + 0.5, duration: 0.6 }}
                    />
                  </div>
                  
                  {/* Enhanced glow effect with stair timing */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: (index * 0.25) + 0.3, duration: 0.8 }}
                  />
                  
                  {/* Ripple effect on appear */}
                  <motion.div
                    className="absolute inset-0 border-2 border-white/40 rounded-2xl"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: [0, 1.5], opacity: [1, 0] }}
                    transition={{ delay: (index * 0.25) + 0.2, duration: 1 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Content Details - Right Side with Sequential Left-to-Right Animation */}
            <div className="flex-1 space-y-6 lg:space-y-8 max-w-[600px]">
              {/* T - Teamwork */}
              <motion.div
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-[30px] mt-[2px] shadow-2xl border border-white/30 group hover:shadow-3xl hover:bg-white transition-all duration-500 relative overflow-hidden -ml-[190px] "
                initial={{ 
                  opacity: 0, 
                  x: 120, // Start further right for more dramatic effect
                  y: 20,
                  scale: 0.9,
                  rotateX: 15 // Slight 3D tilt
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
                  delay: 1.2, // Wait for TEAM letters to finish (4 letters * 0.25 + 0.2 buffer)
                  ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth slide
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                }}
                // Removed hover zoom-in effect
              >
                <div className="flex items-start gap-6">
                  <motion.div 
                    className="bg-gradient-to-br  from-[#2356a8] to-blue-700 text-white rounded-full p-4 shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"
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
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl  font-bold text-[#2356a8] mb-2 group-hover:text-blue-700 transition-colors duration-300"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                    >
                      Teamwork
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 text-sm leading-relaxed"
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

              {/* E - Excellence */}
              <motion.div
                className="bg-white/95 backdrop-blur-sm mb-[27px] -mt-[8px] rounded-2xl p-[20px] shadow-2xl border border-white/30 group hover:shadow-3xl hover:bg-white transition-all duration-500 relative overflow-hidden -ml-[140px] "
                initial={{ 
                  opacity: 0, 
                  x: 130, 
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
                  delay: 1.6, // Sequential delay after first card
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                }}
                
              >
                <div className="flex items-start gap-6">
                  <motion.div 
                    className="bg-gradient-to-br from-[#2356a8] to-blue-700 text-white rounded-full p-4 shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"
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
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl font-bold text-[#2356a8] mb-2 group-hover:text-blue-700 transition-colors duration-300"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.9, duration: 0.5 }}
                    >
                      Excellence
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 text-sm leading-relaxed"
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

              {/* A - Accountability */}
              <motion.div
                className="bg-white/95 backdrop-blur-sm  rounded-2xl mb-[27px] -ml-[85px] p-[20px] shadow-2xl border border-white/30 group hover:shadow-3xl hover:bg-white transition-all duration-500 relative overflow-hidden"
                initial={{ 
                  opacity: 0, 
                  x: 140, 
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
                  delay: 2.0, // Sequential delay after second card
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                }}
                
              >
                <div className="flex items-start gap-6">
                  <motion.div 
                    className="bg-gradient-to-br from-[#2356a8] to-blue-700 text-white rounded-full p-4 shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"
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
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl font-bold text-[#2356a8] mb-2 group-hover:text-blue-700 transition-colors duration-300"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 2.3, duration: 0.5 }}
                    >
                      Accountability  
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 text-sm leading-relaxed"
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

              {/* M - Mission Driven */}
              <motion.div
                className="bg-white/95 backdrop-blur-sm rounded-2xl -ml-[25px] p-[20px] shadow-2xl border border-white/30 group hover:shadow-3xl hover:bg-white transition-all duration-500 relative overflow-hidden "
                initial={{ 
                  opacity: 0, 
                  x: 150, 
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
                  delay: 2.4, // Final sequential delay
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 80,
                  damping: 20
                }}
                
              >
                <div className="flex items-start gap-6">
                  <motion.div 
                    className="bg-gradient-to-br from-[#2356a8] to-blue-700 text-white rounded-full p-4 shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"
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
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl font-bold text-[#2356a8] mb-2 group-hover:text-blue-700 transition-colors duration-300"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 2.7, duration: 0.5 }}
                    >
                      Mission Driven
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 text-sm leading-relaxed"
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
  );
};

export default MissionVision;