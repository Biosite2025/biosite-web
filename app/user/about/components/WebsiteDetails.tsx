'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const WebsiteDetails = () => {
  return (
    <motion.section
      id="website-details"
      className="py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden min-h-screen"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Background image with Next.js Image for optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530481/biosite-assets/bg32.png"
          alt="Background"
          fill
          priority={false}
          quality={75}
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      <div style={{position:'absolute',inset:0,background:'rgba(255,255,255,0.75)',pointerEvents:'none',zIndex:1}} />
      <style>{`
        @media (min-width: 810px) and (max-width: 830px) and (min-height: 1170px) and (max-height: 1190px) {
          .website-details-img-ipad {
            max-height: 600px !important;
            min-height: 250px !important;
            object-fit: cover !important;
            width: 100% !important;
            border-radius: 24px !important;
          }
        }
      `}</style>
      {/* Responsive spacing and scaling */}
  <div className="max-w-6xl mx-auto relative z-10" style={{position:'relative',zIndex:2}}>
        {/* Enhanced Top Image - Responsive */}
        <motion.div
          className="w-full rounded-md sm:rounded-lg lg:rounded-xl overflow-hidden mb-3 sm:mb-4 lg:mb-6 shadow-lg group border border-gray-200 hover:border-[#2356a8]/30 transition-all duration-500"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(35,86,168,0.10)' }}
        >
          <div className="relative overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530500/biosite-assets/image.png"
              alt="Biosite Team"
              width={1200}
              height={430}
              priority={false}
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              className="website-details-img-ipad w-full h-[430px] object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              style={{ objectFit: 'cover' }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
        {/* Enhanced Title and Description - Responsive */}
        <motion.div
          className="group mb-3 sm:mb-4 lg:mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="bg-white/90 border-2 border-white rounded-xl shadow-lg p-4 sm:p-6 md:p-7 lg:p-8 mb-2">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-black group-hover:text-[#2356a8] transition-colors duration-500 relative">
              Biosite Medical Instruments
              <motion.div
                className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-[#2356a8] to-blue-500 rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: 96 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ pointerEvents: 'none' }}
              />
            </h2>
            <p className="text-gray-700 mb-2 text-xs sm:text-sm md:text-base leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
              As your trusted partner in advancing healthcare through cutting-edge medical technology, since our establishment, we have been committed to providing <span className="font-semibold text-[#2356a8]">mission-critical, high-quality solutions</span> that empower healthcare professionals and enhance patient outcomes.
            </p>
          </div>
        </motion.div>
        {/* Enhanced Quote Box - Responsive */}
        <motion.div
          className="bg-gradient-to-r from-[#2356a8] to-blue-700 text-white rounded-md sm:rounded-lg lg:rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 mb-3 sm:mb-4 lg:mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden"
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
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 mb-0 sm:mb-0 text-blue-200 flex-shrink-0 group-hover:text-white group-hover:scale-110 transition-all duration-300"
            fill="currentColor"
            viewBox="0 0 24 24"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.13, color: '#fff' }}
            transition={{ duration: 0.3 }}
          >
            <path d="M7.17 6.17A7.001 7.001 0 0 0 2 13a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H5.08a5.001 5.001 0 0 1 2.09-1.83zM17.17 6.17A7.001 7.001 0 0 0 12 13a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1.92a5.001 5.001 0 0 1 2.09-1.83z" />
          </motion.svg>
          <span className="text-xs sm:text-sm md:text-base font-medium leading-relaxed relative z-10">
            At <span className="font-bold bg-white/20 px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">Biosite Medical Instruments</span>, we are more than just a supplier – we are a partner in your journey toward excellence in healthcare. By combining our expertise with your commitment to patient care, we strive to deliver solutions that make a real impact.
          </span>
        </motion.div>
        {/* Enhanced Bottom Row: Image + Community Engagement - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 items-stretch">
          {/* Enhanced Left Image Box - Responsive */}
          <motion.div
            className="rounded-md sm:rounded-lg lg:rounded-xl overflow-hidden flex items-center justify-center p-0 bg-white shadow-md hover:shadow-lg transition-all duration-500 group border border-gray-100 hover:border-[#2356a8]/30 h-full order-2 lg:order-1"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(35,86,168,0.10)' }}
          >
            <Image
              src="https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530499/biosite-assets/image1.png"
              alt="Community Engagement"
              width={600}
              height={300}
              priority={false}
              quality={85}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-700 ease-out"
              style={{ minHeight: 180, maxHeight: 300, objectFit: 'cover' }}
            />
          </motion.div>
          {/* Enhanced Community Engagement Card - Responsive */}
          <motion.div
            className="bg-white rounded-lg sm:rounded-xl border border-gray-100 p-4 sm:p-5 md:p-6 flex flex-col justify-center hover:border-[#2356a8]/40 transition-all duration-500 group shadow-md hover:shadow-lg transform hover:-translate-y-1 relative overflow-hidden h-full order-1 lg:order-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.01, boxShadow: '0 8px 32px 0 rgba(35,86,168,0.10)' }}
          >
            {/* Blue left vertical accent line */}
            <div className="absolute left-0 top-0 h-full w-1 sm:w-1.5 bg-gradient-to-b from-[#2356a8] to-blue-500 rounded-l-lg sm:rounded-l-xl" style={{ zIndex: 12 }} />
            {/* Subtle background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#2356a8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-gray-800 group-hover:text-[#2356a8] transition-colors duration-300 relative z-10">
              Community Engagement and Support
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-[#2356a8]"
                initial={{ width: 0 }}
                whileHover={{ width: 48 }}
                transition={{ duration: 0.3 }}
                style={{ pointerEvents: 'none' }}
              />
            </h3>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed group-hover:text-gray-600 transition-colors duration-300 relative z-10">
              During the <span className="font-semibold text-[#2356a8]">COVID-19 pandemic</span>, BMI played a crucial role in supporting the Philippine Department of Health by supplying essential COVID-19 consumables and installing biosafety refrigerators nationwide, thereby contributing significantly to the country&apos;s healthcare response.<br /><br />
              Through these initiatives and partnerships, <span className="font-semibold text-[#2356a8]">BMI continues to strengthen its position</span> as a trusted provider of integrated medical and diagnostic solutions, dedicated to improving healthcare outcomes across the Philippines.
            </p>
          </motion.div>
        </div>
      </div>
  </motion.section>
  );
};

export default WebsiteDetails;