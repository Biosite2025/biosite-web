'use client';

const AboutUs = () => {
  return (
    <section id="about-us" className="w-full bg-white py-0 flex items-start relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-blue-50 to-gray-50 pointer-events-none" />
      
      <div className="w-full flex flex-col md:flex-row items-stretch md:items-start px-0 m-0 relative z-10">
        {/* Left: Image with modern overlay effects */}
        <div className="relative w-full md:w-[54%] min-h-[350px] md:min-h-[800px] h-[320px] md:h-[800px] flex items-center justify-start overflow-hidden m-0 p-0 group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-10" />
          <img
            src="/asset/Screenshot 2025-10-03 102205.png"
            alt="Biosite Building"
            className="w-full h-auto object-cover object-center m-0 p-0 transform group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ maxHeight: '100%', maxWidth: '100%' }}
            loading="eager"
          />
          {/* Modern corner accent */}
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#2356a8]/20 to-transparent opacity-60" />
        </div>
        
        {/* Right: Enhanced text content with modern typography */}
        <div className="mt-[40px] w-full md:w-[46%] flex flex-col justify-start items-start px-6 md:px-16   md:pt-20 pb-0 transform hover:translate-x-2 transition-transform duration-500 ease-out">
          {/* Modern title with accent line */}
          <div className="relative mb-2">
            <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-[#2356a8] to-[#2356a8]/50 rounded-full transform scale-y-0 hover:scale-y-100 transition-transform duration-500 ease-out origin-top" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#222] mb-3 tracking-tight uppercase relative group">
              ABOUT US
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2356a8] group-hover:w-20 transition-all duration-500 ease-out" />
            </h2>
          </div>
          
          {/* Subtitle with modern styling */}
          <div className="text-lg md:text-[15px] font-bold text-[#2356a8] mb-6 pr-[70px] relative">
            <span className="relative z-10 bg-gradient-to-r from-[#2356a8] to-[#2356a8]/80 bg-clip-text text-transparent">
              A company that nurtures a safe and healthy working environment.
            </span>
            <div className="absolute inset-0 bg-[#2356a8]/5 rounded-lg transform scale-x-0 hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
          </div>
          
          {/* Enhanced content with modern spacing and hover effects */}
          <div className="text-[#444] text-base md:text-[11px] leading-relaxed space-y-5 text-justify pr-[100px] group">
            <p className="transform hover:translate-x-2 transition-transform duration-300 ease-out hover:text-[#333] cursor-default relative pl-4 border-l-2 border-transparent hover:border-[#2356a8]/30">
              <span className="font-semibold text-[#2356a8]">We specialize</span> in Quality Diagnostic Instruments, Laboratory and Medical Supplies, Medical Equipment, and Imaging.
            </p>
            
            <p className="transform hover:translate-x-2 transition-transform duration-300 ease-out hover:text-[#333] cursor-default relative pl-4 border-l-2 border-transparent hover:border-[#2356a8]/30">
              <span className="font-semibold text-[#2356a8]">Biosite Medical Instruments, Inc. (BMI)</span> is a Philippine-based company, established on September 21, 2005. Biosite Medical Instruments has been in the healthcare industry for almost 20 years. The core business focuses on the importation and distribution of medical and diagnostic instruments as well as medical and laboratory consumables.
            </p>
            
            <p className="transform hover:translate-x-2 transition-transform duration-300 ease-out hover:text-[#333] cursor-default relative pl-4 border-l-2 border-transparent hover:border-[#2356a8]/30">
              The products range from a very wide range of diagnostic devices, laboratory, and medical supplies, to medical equipment and imaging.
            </p>
            
            <p className="transform hover:translate-x-2 transition-transform duration-300 ease-out hover:text-[#333] cursor-default relative pl-4 border-l-2 border-transparent hover:border-[#2356a8]/30">
              Biosite Medical Instruments is reaffirming its vision of becoming a leader and being admired for offering a diverse portfolio of medical and diagnostic solutions and services for companies, institutions, and communities in the country. <span className="inline-block px-2 py-1 bg-[#2356a8]/10 rounded text-[#2356a8] font-medium">Biosite Medical Instruments got its Quality Management System certification for ISO 9001:2015</span> for the Trading and Distribution of Medical Devices, such as medical instruments, laboratory equipment, reagents, and consumables, in 2022.
            </p>
            
            <p className="transform hover:translate-x-2 transition-transform duration-300 ease-out hover:text-[#333] cursor-default relative pl-4 border-l-2 border-transparent hover:border-[#2356a8]/30">
              During the worldwide pandemic of <span className="font-semibold text-[#2356a8]">COVID-19</span>, Biosite Medical Instruments played an important role in supplying the different needs of the Department of Health, Philippines in its quest to fight and mitigate the spread of the COVID-19 virus. One of its most important contributions was supplying COVID-19 consumables and installing biosafety refrigerators all over the Philippines. This was a big help to the healthcare industry in the Philippines.
            </p>
          </div>
          
         
          
        </div>
      </div>
    </section>
  );
};

export default AboutUs;