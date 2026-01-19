"use client";
import React from "react";
import Image from "next/image";
const surfaceprostyles = `
/* 1280x665 Display - Fit entire page in viewport */
@media (min-width: 1279px) and (max-width: 1281px) and (min-height: 664px) and (max-height: 666px) {
  #about-us {
    min-height: 665px !important;
    height: 665px !important;
    max-height: 665px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    margin-top: 0 !important;
    overflow: hidden !important;
  }
  #about-us > div {
    transform: scale(1) !important;
    transform-origin: center center !important;
    height: 100% !important;
  }
  #about-us .aboutus-modern-title {
    font-size: 1.5rem !important;
    margin-bottom: 8px !important;
  }
  #about-us .aboutus-subtitle {
    font-size: 0.95rem !important;
    margin-bottom: 30px !important;
    padding-bottom: 12px !important;
    line-height: 1.3 !important;
  }
  #about-us .aboutus-paragraph {
    font-size: 0.75rem !important;
    line-height: 1.4 !important;
    max-width: 500px !important;
  }
  #about-us .aboutus-paragraph p {
    margin-bottom: 8px !important;
  }
  #about-us .lg\\:scale-130,
  #about-us .lg\\:scale-120 {
    transform: scale(1) !important;
  }
  // /* Hide right overlay image to prevent text overlap */
  // #about-us > div > div:last-child {
  //   display: none !important;
  // }
}
/* Surface Pro 13" (912x1368) */
@media (min-width: 911px) and (max-width: 913px) and (min-height: 1367px) and (max-height: 1369px) {
  #about-us {
    min-height: 700px !important;
    height: 700px !important;
  }
  #about-us .aboutus-modern-title,
  #about-us .aboutus-subtitle,
  #about-us .aboutus-paragraph {
    transform: scale(1) !important;
  }
}
/* Mobile: 344x882 */
@media (min-width: 343px) and (max-width: 345px) and (min-height: 881px) and (max-height: 883px) {
  #about-us .aboutus-modern-title,
  #about-us .aboutus-subtitle {
    text-align: center !important;
    justify-content: center !important;
    align-items: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  #about-us .aboutus-paragraph {
    text-align: justify !important;
    text-justify: inter-word !important;
    word-break: break-word !important;
    hyphens: auto !important;
    transform: scale(1) !important;
  }
  #about-us .aboutus-modern-title,
  #about-us .aboutus-subtitle {
    transform: scale(1) !important;
  }
}
/* Tablet/iPad: 853x1280 */
@media (min-width: 852px) and (max-width: 854px) and (min-height: 1279px) and (max-height: 1281px) {
  #about-us .aboutus-modern-title,
  #about-us .aboutus-subtitle {
    text-align: center !important;
    justify-content: center !important;
    align-items: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
    transform: scale(1) !important;
  }
  #about-us .aboutus-paragraph {
    text-align: justify !important;
    text-justify: inter-word !important;
    word-break: break-word !important;
    hyphens: auto !important;
    transform: scale(1) !important;
  }
}
/* Tablet/iPad: 768x1024 */
@media (min-width: 767px) and (max-width: 769px) and (min-height: 1023px) and (max-height: 1025px) {
  #about-us .aboutus-modern-title,
  #about-us .aboutus-subtitle {
    text-align: center !important;
    justify-content: center !important;
    align-items: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
    transform: scale(1) !important;
  }
  #about-us .aboutus-paragraph {
    text-align: justify !important;
    text-justify: inter-word !important;
    word-break: break-word !important;
    hyphens: auto !important;
    transform: scale(1) !important;
  }
}
/* Tablet/iPad: 820x1180 */
@media (min-width: 819px) and (max-width: 821px) and (min-height: 1179px) and (max-height: 1181px) {
  #about-us .aboutus-modern-title,
  #about-us .aboutus-subtitle {
    text-align: center !important;
    justify-content: center !important;
    align-items: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
    transform: scale(1) !important;
  }
  #about-us .aboutus-paragraph {
    text-align: justify !important;
    text-justify: inter-word !important;
    word-break: break-word !important;
    hyphens: auto !important;
    transform: scale(1) !important;
  }
}
/* Tablet/iPad: 1024x1366 */
@media (min-width: 1023px) and (max-width: 1025px) and (min-height: 1365px) and (max-height: 1367px) {
  #about-us .aboutus-modern-title,
  #about-us .aboutus-subtitle {
    text-align: center !important;
    justify-content: center !important;
    align-items: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
    transform: scale(1) !important;
  }
  #about-us .aboutus-paragraph {
    text-align: justify !important;
    text-justify: inter-word !important;
    word-break: break-word !important;
    hyphens: auto !important;
    transform: scale(1) !important;
  }
}
/* Tablet/iPad: 1024x600 */
@media (min-width: 1023px) and (max-width: 1025px) and (min-height: 599px) and (max-height: 601px) {
  #about-us .aboutus-modern-title,
  #about-us .aboutus-subtitle {
    text-align: center !important;
    justify-content: center !important;
    align-items: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
    transform: scale(1) !important;
  }
  #about-us .aboutus-paragraph {
    text-align: justify !important;
    text-justify: inter-word !important;
    word-break: break-word !important;
    hyphens: auto !important;
    transform: scale(1) !important;
  }
}
/* Tablet/iPad: 1280x800 */
@media (min-width: 1279px) and (max-width: 1281px) and (min-height: 799px) and (max-height: 801px) {
  #about-us .aboutus-modern-title,
  #about-us .aboutus-subtitle {
    text-align: center !important;
    justify-content: center !important;
    align-items: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
    transform: scale(1) !important;
  }
  #about-us .aboutus-paragraph {
    text-align: justify !important;
    text-justify: inter-word !important;
    word-break: break-word !important;
    hyphens: auto !important;
    transform: scale(1) !important;
  }
}
/* Mobile: 912x1368 (repeat for completeness) */
@media (min-width: 911px) and (max-width: 913px) and (min-height: 1367px) and (max-height: 1369px) {
  #about-us .aboutus-modern-title,
  #about-us .aboutus-subtitle {
    text-align: center !important;
    justify-content: center !important;
    align-items: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
    transform: scale(1) !important;
  }
  #about-us .aboutus-paragraph {
    text-align: justify !important;
    text-justify: inter-word !important;
    word-break: break-word !important;
    hyphens: auto !important;
    transform: scale(1) !important;
  }
}
/* 1920x1200 Display */
@media (min-width: 1900px) and (max-width: 1940px) and (min-height: 1180px) and (max-height: 1220px) {
  #about-us {
    min-height: 900px !important;
  }
  #about-us .aboutus-modern-title {
    font-size: 2.5rem !important;
    margin-bottom: 28px !important;
    transform: scale(1) !important;
  }
  #about-us .aboutus-subtitle {
    font-size: 1.4rem !important;
    margin-bottom: 36px !important;
    max-width: 650px !important;
    transform: scale(1) !important;
    line-height: 1.6 !important;
  }
  #about-us .aboutus-paragraph {
    font-size: 1rem !important;
    line-height: 1.9 !important;
    max-width: 700px !important;
    transform: scale(1) !important;
    padding-bottom: 20px !important;
  }
  #about-us .aboutus-paragraph p {
    margin-bottom: 24px !important;
  }
}
`;
const AboutUs = () => {
  React.useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = surfaceprostyles;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);
  return (
  <section id="about-us" className="w-full min-h-screen bg-white flex flex-col lg:flex-row items-stretch relative overflow-hidden mt-6 sm:mt-8 lg:mt-20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-blue-50 to-gray-50 pointer-events-none" />

      

      <div className="flex flex-col lg:flex-row w-full h-full min-h-screen items-stretch px-0 m-0 relative z-10 ">
        {/* Left: Image with modern overlay effects */}
        <div className="relative w-full lg:w-1/2 h-[200px] sm:h-[250px] md:h-[300px] lg:h-auto min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-screen flex items-center justify-center overflow-hidden m-0 p-0 group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-10" />
          <Image
            src="https://res.cloudinary.com/dmvyhrewy/image/upload/w_800,q_auto:low,f_auto/v1763530574/biosite-assets/Screenshot_2025-10-03_102205.png"
            alt="Biosite Building"
            fill
            loading="lazy"
            quality={75}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Modern corner accent */}
          <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-tl from-[#2356a8]/20 to-transparent opacity-60" />
        </div>

        {/* Right: Enhanced text content with modern typography */}
  <div className="flex flex-col justify-center items-start w-full lg:w-1/2 px-3 sm:px-4 md:px-6 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 lg:py-16 xl:py-20 relative z-30">
          {/* Modern title with accent line */}
          <div className="relative mb-4 sm:mb-6 lg:mb-8 w-full aboutus-modern-title flex flex-col items-center lg:items-start justify-center lg:justify-start text-center lg:text-left">
            <div className="absolute -left-1 sm:-left-2 top-0 w-0.5 sm:w-1 h-full bg-gradient-to-b from-[#2356a8] to-[#2356a8]/50 rounded-full transform scale-y-0 hover:scale-y-100 transition-transform duration-500 ease-out origin-top hidden lg:block" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-[#222] tracking-tight uppercase relative group">
              ABOUT US
              <div className="absolute -bottom-1 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 w-0 h-0.5 bg-[#2356a8] group-hover:w-20 transition-all duration-500 ease-out" />
            </h2>
          </div>

          {/* Enhanced content with modern spacing and hover effects */}
          <div className="aboutus-paragraph text-[#444] text-sm sm:text-base md:text-base lg:text-sm xl:text-base leading-relaxed space-y-4 sm:space-y-5 lg:space-y-4 xl:space-y-5 w-full max-w-full lg:max-w-xl xl:max-w-2xl text-justify group">
            <p className="transform hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-300 ease-out hover:text-[#333] cursor-default relative pl-3 sm:pl-4 border-l-2 border-transparent hover:border-[#2356a8]/30">
              <span className="font-semibold text-[#2356a8]">Biosite Medical Instruments, Inc. (BMI)</span> is a Philippine-based, ISO 9001:2015–certified healthcare company committed to advancing healthcare through innovation, service excellence, and nationwide impact. Established on September 21, 2005, BMI has been a trusted partner of the Philippine healthcare industry for twenty-one years.
            </p>

            <p className="transform hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-300 ease-out hover:text-[#333] cursor-default relative pl-3 sm:pl-4 border-l-2 border-transparent hover:border-[#2356a8]/30">
              <span className="font-semibold text-[#2356a8]">We specialize</span> in the importation and distribution of high-quality diagnostic instruments, laboratory and medical supplies, medical equipment, and imaging solutions. With an extensive and diversified portfolio, we support hospitals, laboratories, and healthcare institutions across the country—enabling accurate diagnostics, operational efficiency, and improved patient outcomes.
            </p>

            <p className="transform hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-300 ease-out hover:text-[#333] cursor-default relative pl-3 sm:pl-4 border-l-2 border-transparent hover:border-[#2356a8]/30">
              Driven by a vision to be the most trusted partner in healthcare advancement, Biosite Medical Instruments delivers innovative medical solutions backed by responsive, reliable, and customer-focused service. Our commitment goes beyond products; we work closely with healthcare professionals, institutions, and partners to strengthen clinical capabilities and elevate standards of care nationwide.
            </p>

            <p className="transform hover:translate-x-1 sm:hover:translate-x-2 transition-transform duration-300 ease-out hover:text-[#333] cursor-default relative pl-3 sm:pl-4 border-l-2 border-transparent hover:border-[#2356a8]/30">
              Our tagline, <span className="font-semibold text-[#2356a8]">"Because Every Life Deserves the Best Care,"</span> embodies our dedication to compassionate, high-quality healthcare and reflects our belief that every Filipino deserves access to reliable, innovative, and life-enhancing medical solutions at every stage of life.
            </p>
          </div>
        </div>
        {/* Right-side image for large screens */}
      <div className="hidden lg:block absolute top-0 right-0 h-full w-1/2 z-20">
        <Image
          src="https://res.cloudinary.com/dmvyhrewy/image/upload/w_800,q_auto:low,f_auto/v1763530561/biosite-assets/rightside.png"
          alt="Right Side Visual"
          fill
          loading="lazy"
          quality={75}
          sizes="50vw"
          className="object-cover object-right"
        />
      </div>
      </div>
    </section>
  );
};

export default AboutUs;