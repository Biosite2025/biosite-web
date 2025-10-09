'use client';

import { motion } from 'framer-motion';

const WebsiteDetails = () => {
  return (
    <motion.section
      id="website-details"
      className="py-12 px-4 md:px-8 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden min-h-screen"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Adjusted spacing and scaling for default desktop view */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Top Image */}
        <motion.div
          className="w-full rounded-xl overflow-hidden mb-6 shadow-lg group border border-gray-200 hover:border-[#2356a8]/30 transition-all duration-500"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(35,86,168,0.10)' }}
        >
          <div className="relative overflow-hidden">
            <motion.img
              src="/asset/image.png"
              alt="Biosite Team"
              className="w-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              style={{ maxHeight: 500 }}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
        {/* Enhanced Title and Description */}
        <motion.div
          className="group mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-black group-hover:text-[#2356a8] transition-colors duration-500 relative">
            Biosite Medical Instruments
            <motion.div
              className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-[#2356a8] to-blue-500 rounded-full"
              initial={{ width: 0 }}
              whileHover={{ width: 96 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ pointerEvents: 'none' }}
            />
          </h2>
          <p className="text-gray-700 mb-2 text-sm md:text-base leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
            As your trusted partner in advancing healthcare through cutting-edge medical technology, since our establishment, we have been committed to providing <span className="font-semibold text-[#2356a8]">mission-critical, high-quality solutions</span> that empower healthcare professionals and enhance patient outcomes.
          </p>
        </motion.div>
        {/* Enhanced Quote Box */}
        <motion.div
          className="bg-gradient-to-r from-[#2356a8] to-blue-700 text-white rounded-xl p-5 md:p-6 mb-6 flex items-center gap-4 md:gap-5 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(35,86,168,0.10)' }}
        >
          {/* Subtle pattern overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.svg
            className="w-8 h-8 mb-[30px] text-blue-200 flex-shrink-0 group-hover:text-white group-hover:scale-110 transition-all duration-300"
            fill="currentColor"
            viewBox="0 0 24 24"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.13, color: '#fff' }}
            transition={{ duration: 0.3 }}
          >
            <path d="M7.17 6.17A7.001 7.001 0 0 0 2 13a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H5.08a5.001 5.001 0 0 1 2.09-1.83zM17.17 6.17A7.001 7.001 0 0 0 12 13a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1.92a5.001 5.001 0 0 1 2.09-1.83z" />
          </motion.svg>
          <span className="text-sm md:text-base font-medium leading-relaxed relative z-10">
            At <span className="font-bold bg-white/20 px-2 py-1 rounded">Biosite Medical Instruments</span>, we are more than just a supplier – we are a partner in your journey toward excellence in healthcare. By combining our expertise with your commitment to patient care, we strive to deliver solutions that make a real impact.
          </span>
        </motion.div>
        {/* Enhanced Bottom Row: Image + Community Engagement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
          {/* Enhanced Left Image Box */}
          <motion.div
            className="rounded-xl overflow-hidden flex items-center justify-center p-0 bg-white shadow-md hover:shadow-lg transition-all duration-500 group border border-gray-100 hover:border-[#2356a8]/30 h-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(35,86,168,0.10)' }}
          >
            <motion.img
              src="/asset/image1.png"
              alt="Community Engagement"
              className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-700 ease-out"
              style={{ minHeight: 200, maxHeight: 350 }}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          </motion.div>
          {/* Enhanced Community Engagement Card */}
          <motion.div
            className="bg-white rounded-xl border border-gray-100 p-5 md:p-6 flex flex-col justify-center hover:border-[#2356a8]/40 transition-all duration-500 group shadow-md hover:shadow-lg transform hover:-translate-y-1 relative overflow-hidden h-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(35,86,168,0.10)' }}
          >
            {/* Blue left vertical accent line */}
            <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#2356a8] to-blue-500 rounded-l-xl" style={{ zIndex: 12 }} />
            {/* Subtle background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#2356a8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-800 group-hover:text-[#2356a8] transition-colors duration-300 relative z-10">
              Community Engagement and Support
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-[#2356a8]"
                initial={{ width: 0 }}
                whileHover={{ width: 48 }}
                transition={{ duration: 0.3 }}
                style={{ pointerEvents: 'none' }}
              />
            </h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed group-hover:text-gray-600 transition-colors duration-300 relative z-10">
              During the <span className="font-semibold text-[#2356a8]">COVID-19 pandemic</span>, BMI played a crucial role in supporting the Philippine Department of Health by supplying essential COVID-19 consumables and installing biosafety refrigerators nationwide, thereby contributing significantly to the country's healthcare response.<br /><br />
              Through these initiatives and partnerships, <span className="font-semibold text-[#2356a8]">BMI continues to strengthen its position</span> as a trusted provider of integrated medical and diagnostic solutions, dedicated to improving healthcare outcomes across the Philippines.
            </p>
          </motion.div>
        </div>
      </div>
  </motion.section>
  );
};

export default WebsiteDetails;