

      "use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LocationData {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapUrl: string;
}

const locations: LocationData[] = [
  {
    id: "manila",
    name: "Manila",
    address: "305 Col. Bonny Serrano Ave, San Juan City, 1500 Metro Manila, Philippines",
    phone: "+63 917 111 5008",
    email: "customerservice@biosite.com.ph",
    hours: "Mon - Sat: 8:30am - 5:30pm",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.8942557716846!2d121.0362043!3d14.605099200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9c697e3dbc5%3A0xb4508f101b56968!2sBiosite%20Medical%20Instruments!5e0!3m2!1sen!2sph!4v1759977055681!5m2!1sen!2sph"
  
  },{
    id: "cebu",
    name: "Cebu",
    address: "Block 2 Lot 2 Guadalupe Heights Village, Guadalupe, 6000 Cebu City, Philippines",
    phone: "+63 917 111 5008",
    email: "customerservice@biosite.com.ph",
    hours: "Mon - Sat: 8:30am - 5:30pm",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31401.755228087386!2d123.86957824230191!3d10.324318766011094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99f07c3f8315b%3A0xcf97a325d3ad40a2!2sBiosite%20Medical%20Instruments!5e0!3m2!1sen!2sph!4v1759977278795!5m2!1sen!2sph"
  },
  {
    id: "davao",
    name: "Davao",
    address: "555 Manga St., Juna Subd, Matina, 8000 Davao City, Philippines",
    phone: "+63 917 111 5008",
    email: "customerservice@biosite.com.ph",
    hours: "Mon - Sat: 8am - 5pm",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d628.9643936654292!2d125.5952493!3d7.0531431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f9729deae3f0e1%3A0x997a35c6f3cea61c!2sBiosite%20Medical%20Instruments%20Inc.!5e0!3m2!1sen!2sph!4v1660000000000!5m2!1sen!2sph"
  }
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeLocation, setActiveLocation] = useState<string>("davao");
  const [mounted, setMounted] = useState(false);

  // Ensure proper hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLocation = locations.find(loc => loc.id === activeLocation) || locations[2];

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="w-full min-h-[700px] flex flex-col items-center justify-center bg-gradient-to-br from-[#f7f9fc] via-gray-50 to-white py-12 px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B3990]"></div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      
      // Add custom subject with location
      formData.set("subject", `Contact Form: ${form.subject || 'New Inquiry'} - ${currentLocation.name} Branch`);
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Form submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @media (min-width: 810px) and (max-width: 830px) and (min-height: 1170px) and (max-height: 1190px) {
          .contact-cards-ipad {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            margin-top: 36px !important;
          }
          .contact-card-ipad {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            padding: 32px 24px !important;
            font-size: 1.15rem !important;
          }
        }
      `}</style>
      <motion.section
      className="w-full min-h-[100vh] flex flex-col items-center justify-start bg-gradient-to-br from-[#f7f9fc] via-gray-50 to-white py-2 sm:py-4 md:py-6 lg:py-12 px-3 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden lg:pt-12 max-[912px]:pt-2"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-4 sm:top-6 md:top-8 lg:top-10 left-4 sm:left-6 md:left-8 lg:left-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-[#2B7CD3] rounded-full blur-2xl sm:blur-3xl opacity-10" />
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 right-4 sm:right-6 md:right-8 lg:right-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[#2B3990] rounded-full blur-2xl sm:blur-3xl opacity-10" />
      </div>

  {/* Always visible Contact Us title for mobile/tablet */}
  <div className="block lg:hidden w-full z-20 pt-4 pb-2">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B3990] tracking-tight mb-2 px-2">
          CONTACT US
        </h1>
        <div className="mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-[#2B3990] to-blue-500" />
      </div>

    
      {/* Desktop title and tabs side-by-side for 1365x945 screens (actual code, no extra media query) */}
      <div className="hidden lg:flex w-full max-w-6xl mx-auto mb-4 sm:mb-6 md:mb-8 z-10 relative items-end justify-between gap-0">
        <div className="text-left mb-0">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2B3990] mb-2">
            <span className="relative inline-block">
              CONTACT US
              <motion.span
                className="block h-1.5 bg-gradient-to-r from-[#2B3990] to-blue-500 rounded-full mt-3"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ position: 'absolute', left: '0', right: '0', bottom: -8 }}
              />
            </span>
          </h1>
        </div>
        {/* Location Tabs - to the right of CONTACT US */}
        <div className="flex justify-start mb-0 ml-8">
          <div className="bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg border border-gray-200/50 inline-flex flex-wrap justify-center gap-0 w-auto max-w-md">
            {locations.map((location) => (
              <motion.button
                key={location.id}
                onClick={() => setActiveLocation(location.id)}
                className={`px-6 py-3 font-semibold text-sm rounded-xl transition-all duration-300 relative flex-initial ${
                  activeLocation === location.id
                    ? 'text-white shadow-md'
                    : 'text-gray-600 hover:text-[#2B3990] hover:bg-white/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeLocation === location.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#2B3990] to-blue-600 rounded-xl"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{location.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/tablet location tabs (unchanged) */}
      <div className="block lg:hidden w-full max-w-6xl mx-auto mb-2 z-10 relative">
        <div className="flex justify-center">
          <div className="bg-white/80 backdrop-blur-sm p-1 rounded-xl shadow-lg border border-gray-200/50 inline-flex flex-wrap justify-center gap-1 w-full max-w-md">
            {locations.map((location) => (
              <motion.button
                key={location.id}
                onClick={() => setActiveLocation(location.id)}
                className={`px-4 py-2 font-semibold text-sm rounded-lg transition-all duration-300 relative flex-1 ${
                  activeLocation === location.id
                    ? 'text-white shadow-md'
                    : 'text-gray-600 hover:text-[#2B3990] hover:bg-white/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeLocation === location.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#2B3990] to-blue-600 rounded-lg"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{location.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 z-10 relative">
        {/* Map */}
        <motion.div
          className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl h-[250px] sm:h-[300px] md:h-[350px] lg:h-[420px] order-1"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.iframe
              key={activeLocation}
              title={`Biosite Medical Instruments ${currentLocation.name} Map`}
              src={currentLocation.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', height: '100%' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </AnimatePresence>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className=" bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 flex flex-col justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:h-[420px]  order-2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#2B3990] mb-2 flex items-center gap-2">
            <span className="relative inline-block">
              Get in Touch
              <motion.span
                className="block h-0.5 sm:h-1 bg-gradient-to-r from-[#2B3990] to-blue-500 rounded-full mt-1 sm:mt-2"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ position: 'absolute', left: 0, right: 0, bottom: -4 }}
              />
            </span>
          </h2>
          <p className="text-gray-600 mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base">If you have any questions please feel free to contact with us.</p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}
          
          <form className="space-y-2 sm:space-y-3 md:space-y-4" onSubmit={handleSubmit}>
            {/* Web3Forms Access Key */}
            <input type="hidden" name="access_key" value="ef98e53f-33cf-4511-ac85-c37695a96267" />
            
            {/* Redirect */}
            <input type="hidden" name="redirect" value="false" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <input
                type="text"
                name="name" 
                placeholder="Name"
                className="rounded-lg border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-[#2B3990]/40 focus:outline-none transition-all shadow-sm bg-white text-[#2B3990] placeholder-[#7a8bbd] placeholder:font-medium"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="rounded-lg border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-[#2B3990]/40 focus:outline-none transition-all shadow-sm bg-white text-[#2B3990] placeholder-[#7a8bbd] placeholder:font-medium"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="rounded-lg border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-[#2B3990]/40 focus:outline-none transition-all shadow-sm bg-white text-[#2B3990] placeholder-[#7a8bbd] placeholder:font-medium"
                value={form.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="rounded-lg border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-[#2B3990]/40 focus:outline-none transition-all shadow-sm bg-white text-[#2B3990] placeholder-[#7a8bbd] placeholder:font-medium"
                value={form.subject}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="rounded-lg border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-[#2B3990]/40 focus:outline-none transition-all shadow-sm bg-white min-h-[60px] sm:min-h-[80px] md:min-h-[100px] text-[#2B3990] placeholder-[#7a8bbd] placeholder:font-medium lg:col-span-2"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <motion.button
              type="submit"
              disabled={submitting}
              className={`w-full rounded-lg bg-gradient-to-r from-[#2B3990] to-blue-600 text-white font-semibold py-2 sm:py-3 text-base sm:text-lg shadow-md hover:from-blue-700 hover:to-[#2B3990] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2B3990]/40 mt-1 sm:mt-2 ${
                submitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              whileTap={submitting ? {} : { scale: 0.97 }}
            >
              {submitting ? "Sending..." : submitted ? "Sent!" : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
      {/* Contact Info Cards */}
      <style>{`
        @media (min-width: 768px) and (max-width: 912px) {
          .contact-cards-ipad {
            display: grid !important;
            grid-template-columns: 1fr 1fr 1fr !important;
            gap: 24px !important;
            margin-top: 36px !important;
          }
          .contact-card-ipad {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100% !important;
            padding: 28px 18px !important;
            font-size: 1.08rem !important;
          }
        }
      `}</style>
      <motion.div
        key={`cards-${activeLocation}`}
        className="contact-cards-ipad w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12 lg:mt-16 z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Phone Card */}
        <motion.div
          className="contact-card-ipad bg-[#2B3990] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center text-white shadow-lg sm:shadow-xl gap-2 transition-all duration-300 hover:shadow-xl sm:hover:shadow-2xl hover:scale-[1.02] sm:hover:scale-[1.04] hover:bg-[#2B3990]/95 group cursor-pointer col-span-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          onMouseEnter={() => setHoveredCard(0)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <motion.span
            className="mb-1 sm:mb-2"
            animate={
              hoveredCard === 0
                ? window.innerWidth <= 912
                  ? {
                      y: [0, -10, 0, -6, 0],
                      scale: [1, 1.12, 1, 1.06, 1],
                      transition: {
                        duration: 1.2,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'easeInOut',
                      },
                    }
                  : {
                      rotate: [0, 10, -10, 8, -8, 4, -4, 0],
                      transition: {
                        duration: 1.2,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'easeInOut',
                      },
                    }
                : { rotate: 0, y: 0, scale: 1 }
            }
            style={{ display: 'inline-block' }}
          >
            {/* Classic phone handset icon */}
            <svg width="24" height="24" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v2a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3.09 5.18 2 2 0 0 1 5.11 3h2a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z" fill="#fff"/>
            </svg>
          </motion.span>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-center">{currentLocation.phone}</div>
          <div className="text-xs sm:text-sm md:text-s opacity-90 text-center px-2">{currentLocation.email}</div>
        </motion.div>

        {/* Location Card */}
        <motion.div
          className="contact-card-ipad bg-[#2B3990] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center text-white shadow-lg sm:shadow-xl gap-2 transition-all duration-300 hover:shadow-xl sm:hover:shadow-2xl hover:scale-[1.02] sm:hover:scale-[1.04] hover:bg-[#2B3990]/95 group cursor-pointer col-span-1 lg:col-span-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <motion.span
            className="mb-1 sm:mb-2"
            animate={
              hoveredCard === 1
                ? window.innerWidth <= 912
                  ? {
                      y: [0, -10, 0, -6, 0],
                      scale: [1, 1.12, 1, 1.06, 1],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'easeInOut',
                      },
                    }
                  : {
                      y: [0, -12, 0, -6, 0],
                      scale: [1, 1.12, 1, 1.06, 1],
                      transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'easeInOut',
                      },
                    }
                : { y: 0, scale: 1 }
            }
            style={{ display: 'inline-block' }}
          >
            {/* Location icon */}
            <svg width="24" height="24" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M12 21c-4.418 0-8-5.373-8-10A8 8 0 0 1 20 11c0 4.627-3.582 10-8 10z" />
              <circle cx="12" cy="11" r="3" />
            </svg>
          </motion.span>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-center">{currentLocation.name.toUpperCase()}</div>
          <div className="text-xs sm:text-sm md:text-base opacity-90 text-center px-2">{currentLocation.address}</div>
        </motion.div>

        {/* Hours Card */}
        <motion.div
          className="contact-card-ipad bg-[#2B3990] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center text-white shadow-lg sm:shadow-xl gap-2 transition-all duration-300 hover:shadow-xl sm:hover:shadow-2xl hover:scale-[1.02] sm:hover:scale-[1.04] hover:bg-[#2B3990]/95 group cursor-pointer col-span-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <motion.span
            className="mb-1 sm:mb-2"
            animate={
              hoveredCard === 2
                ? window.innerWidth <= 912
                  ? {
                      rotate: 10,
                      scale: 1.1,
                      transition: {
                        repeat: Infinity,
                        duration: 1.5,
                        ease: 'easeInOut',
                        repeatType: 'loop',
                      },
                    }
                  : {
                      rotate: 360,
                      transition: {
                        repeat: Infinity,
                        duration: 12,
                        ease: 'linear',
                        repeatType: 'loop',
                      },
                    }
                : { rotate: 0, scale: 1 }
            }
            style={{ display: 'inline-block', transformOrigin: '50% 50%' }}
          >
            <svg width="24" height="24" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              {/* Only Hour hand */}
              <line x1="12" y1="12" x2="12" y2="7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </motion.span>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-center">{currentLocation.hours}</div>
          <div className="text-xs sm:text-sm md:text-base opacity-90 text-center">Sunday Closed</div>
        </motion.div>
      </motion.div>
      </motion.section>

      {/* Success Popup Modal */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSubmitted(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
             
            >
              {/* Success Icon */}
              <div className="flex justify-center mb-4">
                <motion.div
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                    />
                  </svg>
                </motion.div>
              </div>
              
              {/* Success Message */}
              <h3 className="text-2xl font-bold text-center text-[#2B3990] mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Thank you for contacting us. We'll get back to you soon.
              </p>
              
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}