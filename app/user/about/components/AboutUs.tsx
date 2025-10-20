'use client';

const AboutUs = () => {
  return (
    <section id="about-us" className="w-full min-h-screen bg-white flex flex-col lg:flex-row items-stretch relative overflow-hidden mb-6 sm:mb-8 lg:mb-20 mt-6 sm:mt-8 lg:mt-20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-blue-50 to-gray-50 pointer-events-none" />

      <div className="flex flex-col lg:flex-row w-full h-full min-h-screen items-stretch px-0 m-0 relative z-10">
        {/* Left: Image with modern overlay effects */}
        <div className="relative w-full lg:w-1/2 h-[200px] sm:h-[250px] md:h-[300px] lg:h-auto min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-screen flex items-center justify-center overflow-hidden m-0 p-0 group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-10" />
          <img
            src="/asset/Screenshot 2025-10-03 102205.png"
            alt="Biosite Building"
            className="w-full h-full object-cover object-center m-0 p-0 transform group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ maxHeight: '100%', maxWidth: '100%' }}
            loading="eager"
          />
          {/* Modern corner accent */}
          <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-tl from-[#2356a8]/20 to-transparent opacity-60" />
        </div>

        {/* Right: Enhanced text content with modern typography */}
        <div className="flex flex-col justify-center items-start w-full lg:w-1/2 px-3 sm:px-4 md:px-6 lg:px-16 py-4 sm:py-6 md:py-8 lg:py-20 scale-95 sm:scale-100 lg:scale-110">
          {/* Modern title with accent line */}
          <div className="relative mb-2 w-full">
            <div className="absolute -left-1 sm:-left-2 top-0 w-0.5 sm:w-1 h-full bg-gradient-to-b from-[#2356a8] to-[#2356a8]/50 rounded-full transform scale-y-0 hover:scale-y-100 transition-transform duration-500 ease-out origin-top" />
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#222] mb-2 sm:mb-3 tracking-tight uppercase relative group">
              ABOUT US
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2356a8] group-hover:w-16 sm:group-hover:w-20 transition-all duration-500 ease-out" />
            </h2>
          </div>

          {/* Subtitle with modern styling */}
          <div className="text-base sm:text-lg md:text-xl lg:text-[23px] font-extrabold text-[#2356a8] mb-4 sm:mb-6 lg:mb-8 w-full max-w-full lg:w-[500px] relative">
            <span className="relative z-10 bg-gradient-to-r from-[#2356a8] to-[#2356a8]/80 bg-clip-text text-transparent">
              A company that nurtures a safe and healthy working environment.
            </span>
            <div className="absolute inset-0 bg-[#2356a8]/5 rounded-lg transform scale-x-0 hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
          </div>

          {/* Enhanced content with modern spacing and hover effects */}
          <div className="text-[#444] text-xs sm:text-sm md:text-base lg:text-[13px] leading-relaxed space-y-3 sm:space-y-4 lg:space-y-5 w-full max-w-full lg:w-[500px] lg:max-w-2xl text-left sm:text-justify group">
            <p className="transform hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-300 ease-out hover:text-[#333] cursor-default relative pl-2 sm:pl-4 border-l-2 border-transparent hover:border-[#2356a8]/30">
              <span className="font-semibold text-[#2356a8]">We specialize</span> in Quality Diagnostic Instruments, Laboratory and Medical Supplies, Medical Equipment, and Imaging.
            </p>

            <p className="transform hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-300 ease-out hover:text-[#333] cursor-default relative pl-2 sm:pl-4 border-l-2 border-transparent hover:border-[#2356a8]/30">
              <span className="font-semibold text-[#2356a8]">Biosite Medical Instruments, Inc. (BMI)</span> is a Philippine-based company, established on September 21, 2005. Biosite Medical Instruments has been in the healthcare industry for almost 20 years. The core business focuses on the importation and distribution of medical and diagnostic instruments as well as medical and laboratory consumables.
            </p>

            <p className="transform hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-300 ease-out hover:text-[#333] cursor-default relative pl-2 sm:pl-4 border-l-2 border-transparent hover:border-[#2356a8]/30">
              The products range from a very wide range of diagnostic devices, laboratory, and medical supplies, to medical equipment and imaging.
            </p>

            <p className="transform hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-300 ease-out hover:text-[#333] cursor-default relative pl-2 sm:pl-4 border-l-2 border-transparent hover:border-[#2356a8]/30">
              Biosite Medical Instruments is reaffirming its vision of becoming a leader and being admired for offering a diverse portfolio of medical and diagnostic solutions and services for companies, institutions, and communities in the country. <span className="inline-block px-1 sm:px-2 py-1 bg-[#2356a8]/10 rounded text-[#2356a8] font-medium text-xs sm:text-sm">Biosite Medical Instruments got its Quality Management System certification for ISO 9001:2015</span> for the Trading and Distribution of Medical Devices, such as medical instruments, laboratory equipment, reagents, and consumables, in 2022.
            </p>

            <p className="transform hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-300 ease-out hover:text-[#333] cursor-default relative pl-2 sm:pl-4 border-l-2 border-transparent hover:border-[#2356a8]/30">
              During the worldwide pandemic of <span className="font-semibold text-[#2356a8]">COVID-19</span>, Biosite Medical Instruments played an important role in supplying the different needs of the Department of Health, Philippines in its quest to fight and mitigate the spread of the COVID-19 virus. One of its most important contributions was supplying COVID-19 consumables and installing biosafety refrigerators all over the Philippines. This was a big help to the healthcare industry in the Philippines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;