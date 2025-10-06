
'use client';

import { motion } from 'framer-motion';

const MissionVision = () => {
  return (
    <motion.section
      id="mission-vision"
      className="relative py-16 px-4 md:px-8 min-h-[80vh] flex items-center justify-center bg-blue-500/90 overflow-hidden"
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
        {/* Enhanced Mission & Vision Cards */}
        <div className="w-full flex flex-col md:flex-row gap-8 justify-center mb-12">
          {/* Mission Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 flex-1 min-w-[300px] max-w-md flex flex-col group hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-white/20 backdrop-blur-sm relative overflow-hidden"
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
            className="bg-white rounded-2xl shadow-2xl p-8 flex-1 min-w-[300px] max-w-md flex flex-col group hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-white/20 backdrop-blur-sm relative overflow-hidden"
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
        {/* Enhanced Values Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
          {/* Unity */}
          <motion.div
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col min-h-[280px] group hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 ease-out border border-white/30 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            whileHover={{ scale: 1.025, boxShadow: '0 8px 32px 0 rgba(35,86,168,0.10)' }}
          >
            {/* Animated blue line on hover */}
            <span
              className="pointer-events-none absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2356a8] to-blue-500 rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            />
            <h4 className="text-2xl text-black font-bold mb-4 group-hover:text-[#2356a8] transition-colors duration-300 relative">
              Unity
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-[#2356a8]"
                initial={{ width: 0 }}
                whileHover={{ width: 48 }}
                transition={{ duration: 0.3 }}
                style={{ pointerEvents: 'none' }}
              />
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
              We are one big family. We nurture a culture of understanding among our employees regardless of age, ethnicity, and religious affiliations. We endeavor to maintain harmonious relationships by involving them in activities that promote the development of an inclusive organization. We support undertakings that foster team building, solidarity, and camaraderie.
            </p>
            {/* Subtle corner accent */}
            <motion.div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#2356a8]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
          {/* Excellence */}
          <motion.div
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col min-h-[280px] group hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 ease-out border border-white/30 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            whileHover={{ scale: 1.025, boxShadow: '0 8px 32px 0 rgba(35,86,168,0.10)' }}
          >
            {/* Animated blue line on hover */}
            <span
              className="pointer-events-none absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2356a8] to-blue-500 rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            />
            <h4 className="text-2xl text-black font-bold mb-4 group-hover:text-[#2356a8] transition-colors duration-300 relative">
              Excellence
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-[#2356a8]"
                initial={{ width: 0 }}
                whileHover={{ width: 64 }}
                transition={{ duration: 0.3 }}
                style={{ pointerEvents: 'none' }}
              />
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
              We make it seamless. Our team is guided by the highest of ethical standards. We commit to deliver the right solutions with supreme after sales to exceed client expectations. Our experience, principles, methods, and technology allow us to overcome challenges and catapult our company to unimaginable success.
            </p>
            {/* Subtle corner accent */}
            <motion.div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#2356a8]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
          {/* Respect */}
          <motion.div
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col min-h-[280px] group hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 ease-out border border-white/30 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            whileHover={{ scale: 1.025, boxShadow: '0 8px 32px 0 rgba(35,86,168,0.10)' }}
          >
            {/* Animated blue line on hover */}
            <span
              className="pointer-events-none absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2356a8] to-blue-500 rounded-t-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            />
            <h4 className="text-2xl text-black font-bold mb-4 group-hover:text-[#2356a8] transition-colors duration-300 relative">
              Respect
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-[#2356a8]"
                initial={{ width: 0 }}
                whileHover={{ width: 48 }}
                transition={{ duration: 0.3 }}
                style={{ pointerEvents: 'none' }}
              />
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
              We value the diversity of our people. We recognize their potential and respect individuality. We acknowledge the importance of their personal and professional growth by valuing their opinions and keeping them involved in matters relevant to their rights and privileges.
            </p>
            {/* Subtle corner accent */}
            <motion.div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#2356a8]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </div>
       
      </div>
  </motion.section>
  );
};

export default MissionVision;