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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <motion.section
      className="w-full min-h-[700px] flex flex-col items-center justify-start bg-gradient-to-br from-[#f7f9fc] via-gray-50 to-white py-12 px-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#2B7CD3] rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#2B3990] rounded-full blur-3xl opacity-10" />
      </div>
      
      {/* Location Tabs and Heading */}
      <div className="w-full max-w-6xl mx-auto mb-8 z-10 relative">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2B3990] mb-4 md:mb-0 flex items-center gap-2">
            <span className="relative inline-block">
              CONTACT US
              <motion.span
                className="block h-1 bg-gradient-to-r from-[#2B3990] to-blue-500 rounded-full mt-2"
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ position: 'absolute', left: 0, right: 0, bottom: -6 }}
              />
            </span>
          </h1>
          <div className="bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg border border-gray-200/50 inline-flex">
            {locations.map((location) => (
              <motion.button
                key={location.id}
                onClick={() => setActiveLocation(location.id)}
                className={`px-6 py-3 font-semibold text-sm rounded-xl transition-all duration-300 relative ${
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

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative">
        {/* Map */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-xl h-[420px]"
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
          className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-center h-[420px]"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#2B3990] mb-2 flex items-center gap-2">
            <span className="relative inline-block">
              Get in Touch
              <motion.span
                className="block h-1 bg-gradient-to-r from-[#2B3990] to-blue-500 rounded-full mt-2"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ position: 'absolute', left: 0, right: 0, bottom: -6 }}
              />
            </span>
          </h2>
          <p className="text-gray-600 mb-6 text-base">If you have any questions please feel free to contact with us.</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name" 
                placeholder="Name"
                className="rounded-lg border border-gray-200 px-4 py-3 text-base focus:ring-2 focus:ring-[#2B3990]/40 focus:outline-none transition-all shadow-sm bg-white text-[#2B3990] placeholder-[#7a8bbd] placeholder:font-medium"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="rounded-lg border border-gray-200 px-4 py-3 text-base focus:ring-2 focus:ring-[#2B3990]/40 focus:outline-none transition-all shadow-sm bg-white text-[#2B3990] placeholder-[#7a8bbd] placeholder:font-medium"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="rounded-lg border border-gray-200 px-4 py-3 text-base focus:ring-2 focus:ring-[#2B3990]/40 focus:outline-none transition-all shadow-sm bg-white text-[#2B3990] placeholder-[#7a8bbd] placeholder:font-medium"
                value={form.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="rounded-lg border border-gray-200 px-4 py-3 text-base focus:ring-2 focus:ring-[#2B3990]/40 focus:outline-none transition-all shadow-sm bg-white text-[#2B3990] placeholder-[#7a8bbd] placeholder:font-medium"
                value={form.subject}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="rounded-lg border border-gray-200 px-4 py-3 text-base focus:ring-2 focus:ring-[#2B3990]/40 focus:outline-none transition-all shadow-sm bg-white min-h-[100px] text-[#2B3990] placeholder-[#7a8bbd] placeholder:font-medium md:col-span-2"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-[#2B3990] to-blue-600 text-white font-semibold py-3 text-lg shadow-md hover:from-blue-700 hover:to-[#2B3990] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2B3990]/40 mt-2"
              whileTap={{ scale: 0.97 }}
            >
              {submitted ? "Sent!" : "Send"}
            </motion.button>
          </form>
        </motion.div>
      </div>
      {/* Contact Info Cards */}
      <motion.div
        key={`cards-${activeLocation}`}
        className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 z-10 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
          {/* Phone Card */}
          <motion.div
            className="bg-[#2B3990] rounded-2xl p-8 flex flex-col items-center text-white shadow-xl gap-2 transition-all duration-300 hover:shadow-2xl hover:scale-[1.04] hover:bg-[#2B3990]/95 group cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <motion.span
              className="mb-2"
              animate={hoveredCard === 0 ? {
                rotate: [0, 10, -10, 8, -8, 4, -4, 0],
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }
              } : { rotate: 0 }}
              style={{ display: 'inline-block' }}
            >
              {/* Classic phone handset icon */}
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v2a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3.09 5.18 2 2 0 0 1 5.11 3h2a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z" fill="#fff"/>
              </svg>
            </motion.span>
            <div className="text-xl font-bold">{currentLocation.phone}</div>
            <div className="text-base opacity-90">{currentLocation.email}</div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            className="bg-[#2B3990] rounded-2xl p-8 flex flex-col items-center text-white shadow-xl gap-2 transition-all duration-300 hover:shadow-2xl hover:scale-[1.04] hover:bg-[#2B3990]/95 group cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <motion.span
              className="mb-2"
              animate={hoveredCard === 1 ? {
                y: [0, -12, 0, -6, 0],
                scale: [1, 1.12, 1, 1.06, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }
              } : { y: 0, scale: 1 }}
              style={{ display: 'inline-block' }}
            >
              {/* Location icon */}
              <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M12 21c-4.418 0-8-5.373-8-10A8 8 0 0 1 20 11c0 4.627-3.582 10-8 10z" />
                <circle cx="12" cy="11" r="3" />
              </svg>
            </motion.span>
            <div className="text-xl font-bold">{currentLocation.name.toUpperCase()}</div>
            <div className="text-base opacity-90 text-center">{currentLocation.address}</div>
          </motion.div>

          {/* Hours Card */}
          <motion.div
            className="bg-[#2B3990] rounded-2xl p-8 flex flex-col items-center text-white shadow-xl gap-2 transition-all duration-300 hover:shadow-2xl hover:scale-[1.04] hover:bg-[#2B3990]/95 group cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <motion.span
              className="mb-2"
              animate={hoveredCard === 2 ? {
                rotate: 360,
                transition: {
                  repeat: Infinity,
                  duration: 12,
                  ease: "linear",
                  repeatType: "loop"
                }
              } : { rotate: 0 }}
              style={{ display: 'inline-block', transformOrigin: '50% 50%' }}
            >
              <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                {/* Only Hour hand */}
                <line x1="12" y1="12" x2="12" y2="7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </motion.span>
            <div className="text-xl font-bold">{currentLocation.hours}</div>
            <div className="text-base opacity-90">Sunday Closed</div>
          </motion.div>
        </motion.div>
    </motion.section>
  );
}