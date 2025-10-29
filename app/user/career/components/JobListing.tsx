"use client";

import { useState, useRef, useLayoutEffect } from "react";
import CustomDropdown from "./CustomDropdown";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Available positions data
const availablePositions = [
  { id: 1, title: "Cash Disbursement Associate" },
  { id: 2, title: "Quotation Team Leader" },
  { id: 3, title: "Order Fulfillment Associate" },
  { id: 4, title: "Company Driver" },
  { id: 5, title: "Supply Chain Supervisor" },
  { id: 6, title: "Shipment Coordinator" },
  { id: 7, title: "Service Engineer Supervisor" },
  { id: 8, title: "Service Engineer" },
  { id: 9, title: "Technical Service Director" },
  { id: 10, title: "Service Engineer TL" },
  { id: 11, title: "Bidding Team Leader" },
  { id: 12, title: "Product Manager" },
  { id: 13, title: "Product Application Manager" },
  { id: 14, title: "Regional Sales Manager" },
  { id: 15, title: "District Sales Manager" },
  { id: 16, title: "IT Associate" },
  { id: 17, title: "Product Specialist" },
  { id: 18, title: "Logistics Staff" },
  { id: 19, title: "Medical Sales Representative" },
  { id: 20, title: "Bidding Associate" },
  { id: 21, title: "Regulatory Pharmacist" },
  { id: 22, title: "Procurement Team Lead" },
  { id: 23, title: "Refrigeration Technician" },
  { id: 24, title: "Operations Director" },
  { id: 25, title: "Procurement Assistant" },
  { id: 26, title: "Compliance Liaison" },
  { id: 27, title: "Equipment Coordinator" },
  { id: 28, title: "Cash Receipt Associate" },
  { id: 29, title: "Service Coordinator" },
  { id: 30, title: "Quotation Associate" },
  { id: 31, title: "Administrative Associate" },
  { id: 32, title: "Utility" },
  { id: 33, title: "Product Specialist" },
  { id: 34, title: "Picker" },
  { id: 35, title: "Dispatcher" },
  { id: 36, title: "Receiving Clerk" },
  { id: 37, title: "Accounts Payable (Non-Trade)" },
  { id: 38, title: "Inventory Encoder" },
  { id: 39, title: "District Sales Manager" },
  { id: 40, title: "Purchaser Staff" },
  { id: 41, title: "Bidding Team Leader" },
  { id: 42, title: "Bookkeeper" },
  { id: 43, title: "Personal Assistant" },
  { id: 44, title: "Credit and Collection TL" },
  { id: 45, title: "Rider" },
  { id: 46, title: "Credit and Collection Associate" },
  { id: 47, title: "Order Fulfillment Associate" },
  { id: 48, title: "Warehouse In Charge" },
  { id: 49, title: "Business Unit Head" },
  { id: 50, title: "Quotation Associate" },
  { id: 51, title: "Respiratory Therapist" },
  { id: 52, title: "Human Resource Officer" },
  { id: 53, title: "Executive Assistant" },
  { id: 54, title: "Customer Engagement Associate" },
  { id: 55, title: "Accounting Associate" },
  { id: 56, title: "Invoice Clerk" },
  { id: 57, title: "Logistics Staff" },
  { id: 58, title: "Bidding Associate - Reliever" },
  { id: 59, title: "Inventory Analyst" },
  { id: 60, title: "Credit & Collection" },
  { id: 61, title: "Warehouse Personel" },
  { id: 62, title: "Bidding Associate" },
  { id: 63, title: "General Manager" },
  { id: 64, title: "HR Payroll Specialist" },
  { id: 65, title: "Human Resource Assistant" },
  { id: 66, title: "Finance&Accounting Manager" },
  { id: 67, title: "Finance Associate" },
  { id: 68, title: "IT Officer" },
  { id: 69, title: "Product Application Specialist" },
  { id: 70, title: "Human Resource Officer Head" },
  { id: 71, title: "Logistics Staff" },
  { id: 72, title: "Marketing Director" },
  { id: 73, title: "Regional Sales Manager" },
  { id: 74, title: "HR/ Admin Officer" },
  { id: 75, title: "Human Resource Generalist" },
];

export default function JobListing() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedPosition: "",
    location: "",
    resume: null as File | null,
    coverLetter: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState(false);
  const locationOptions = [
    { id: 1, title: "Manila" },
    { id: 2, title: "Cebu" },
    { id: 3, title: "Davao" }
  ];

  // For underline alignment
  const titleRef = useRef<HTMLSpanElement>(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  
  useLayoutEffect(() => {
    if (titleRef.current) {
      setUnderlineWidth(titleRef.current.offsetWidth);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Only allow PDF files and max 5MB
      const allowedTypes = ['application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, resume: "Only PDF files are allowed" }));
        return;
      }
      
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, resume: "File size must be less than 5MB" }));
        return;
      }
      
      setFormData(prev => ({ ...prev, resume: file }));
      setErrors(prev => ({ ...prev, resume: "" }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, resume: "Only PDF files are allowed" }));
        return;
      }
      
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, resume: "File size must be less than 5MB" }));
        return;
      }
      
      setFormData(prev => ({ ...prev, resume: file }));
      setErrors(prev => ({ ...prev, resume: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.selectedPosition) newErrors.selectedPosition = "Please select a position";
    if (!formData.location) newErrors.location = "Please select a location";
    if (!formData.resume) newErrors.resume = "Resume is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        selectedPosition: "",
        location: "",
        resume: null,
        coverLetter: ""
      });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @media (min-width: 810px) and (max-width: 830px) and (min-height: 1170px) and (max-height: 1190px) {
          .joblisting-section-ipad {
            margin-top: 3px !important;
          }
        }
        
         @media (min-width: 767px) and (max-width: 769px) and (min-height: 1023px) and (max-height: 1025px) {  
          .joblisting-section-ipadmini {
            margin-top: 1px !important;
          }
        }
        
      `}</style>

      <motion.section
        className="joblisting-section-ipad joblisting-section-ipadmini w-full min-h-screen -mt-15 flex items-center justify-center bg-gradient-to-br from-[#f7f9fc] via-gray-50 to-white py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
    
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-4 sm:top-6 md:top-8 lg:top-10 left-4 sm:left-6 md:left-8 lg:left-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-[#2B7CD3] rounded-full blur-2xl sm:blur-3xl opacity-10" />
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 right-4 sm:right-6 md:right-8 lg:right-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[#2B3990] rounded-full blur-2xl sm:blur-3xl opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-r from-[#2B3990]/5 to-[#2B7CD3]/5 rounded-full blur-2xl sm:blur-3xl" />
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full shadow-2xl mx-3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2B3990] mb-2">Application Submitted!</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Thank you for your interest. We'll review your application and get back to you soon.</p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="bg-[#2B3990] text-white px-4 sm:px-6 py-2 sm:py-2 text-sm sm:text-base rounded-lg hover:bg-[#1e2a6b] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full scale-90 sm:scale-95 md:scale-100 lg:scale-110 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center z-10 relative">
        {/* Left Side - Headline and Image */}
        <motion.div
          className="flex flex-col items-center justify-center relative h-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mb-4 sm:mb-6 md:mb-8 w-full">
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#6B7280] mb-2 sm:mb-3 md:mb-4 text-center lg:text-left px-2 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <span className="text-[#2B3990]">JOB LISTING </span> 
            </motion.h1>
            <motion.div
              className="h-0.5 sm:h-1 bg-gradient-to-r from-[#2B3990] to-[#2B7CD3] rounded-full mx-auto lg:mx-0 w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px]"
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </div>
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl h-[300px] sm:h-[350px] md:h-[400px] lg:h-[520px] flex items-center">
            {/* Job Listing PNG Container */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl p-0 shadow-lg sm:shadow-xl md:shadow-2xl relative overflow-hidden w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Image
                  src="/asset/Screenshot 2025-10-03 102205.png"
                  alt="Biosite Job Listing"
                  width={900}
                  height={520}
                  className="w-full h-full object-cover drop-shadow-lg sm:drop-shadow-xl rounded-2xl sm:rounded-3xl"
                  priority
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-2 sm:-top-3 md:-top-4 -right-2 sm:-right-3 md:-right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[#2B3990] rounded-full opacity-20 animate-pulse" />
              <div className="absolute -bottom-1 sm:-bottom-1.5 md:-bottom-2 -left-1 sm:-left-1.5 md:-left-2 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-[#2B7CD3] rounded-full opacity-30" />
            </div>
            {/* Award/Certificate Mockup */}
            
          </div>
        </motion.div>

        {/* Right Side - Application Form */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5 md:space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {/* Name Field */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 text-base sm:text-lg font-medium placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2B3990]/20 ${
                  errors.name 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-gray-200 bg-white hover:border-[#2B3990]/30 focus:border-[#2B3990]'
                }`}
              />
              {errors.name && (
                <motion.p
                  className="text-red-500 text-sm mt-1 ml-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.name}
                </motion.p>
              )}
            </div>

            {/* Email and Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 text-base sm:text-lg font-medium placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2B3990]/20 ${
                    errors.email 
                      ? 'border-red-400 bg-red-50' 
                      : 'border-gray-200 bg-white hover:border-[#2B3990]/30 focus:border-[#2B3990]'
                  }`}
                />
                {errors.email && (
                  <motion.p
                    className="text-red-500 text-sm mt-1 ml-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 text-base sm:text-lg font-medium placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2B3990]/20 ${
                    errors.phone 
                      ? 'border-red-400 bg-red-50' 
                      : 'border-gray-200 bg-white hover:border-[#2B3990]/30 focus:border-[#2B3990]'
                  }`}
                />
                {errors.phone && (
                  <motion.p
                    className="text-red-500 text-sm mt-1 ml-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Position and Location Selection - side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <CustomDropdown
                  options={availablePositions}
                  value={formData.selectedPosition}
                  onChange={(val) => {
                    setFormData(prev => ({ ...prev, selectedPosition: val }));
                    if (errors.selectedPosition) {
                      setErrors(prev => ({ ...prev, selectedPosition: "" }));
                    }
                  }}
                  placeholder="-- Select Position --"
                />
                {errors.selectedPosition && (
                  <motion.p
                    className="text-red-500 text-sm mt-1 ml-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.selectedPosition}
                  </motion.p>
                )}
              </div>
              <div>
                <CustomDropdown
                  options={locationOptions}
                  value={formData.location}
                  onChange={(val) => {
                    setFormData(prev => ({ ...prev, location: val }));
                    if (errors.location) {
                      setErrors(prev => ({ ...prev, location: "" }));
                    }
                  }}
                  placeholder="-- Select Location --"
                />
                {errors.location && (
                  <motion.p
                    className="text-red-500 text-sm mt-1 ml-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.location}
                  </motion.p>
                )}
              </div>
            </div>

            {/* File Upload */}
            <div>
              <div
                className={`relative border-2 border-dashed rounded-lg sm:rounded-xl p-4 sm:p-6 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-[#2B3990] bg-[#2B3990]/5' 
                    : errors.resume 
                      ? 'border-red-400 bg-red-50' 
                      : 'border-gray-300 hover:border-[#2B3990]/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-2">
                  
                  <div>
                    <button
                      type="button"
                      className=" bg-[#2B3990] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#e69500] transition-colors inline-flex items-center gap-2"
                    >
                      Choose File
                    </button>
                    <span className="ml-2 text-gray-600">
                      {formData.resume ? formData.resume.name : 'no file selected'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 italic">Only PDF files are allowed. Max size 5MB.</p>
                </div>
              </div>
              {errors.resume && (
                <motion.p
                  className="text-red-500 text-sm mt-1 ml-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.resume}
                </motion.p>
              )}
            </div>

            {/* Cover Letter */}
            <div>
              <textarea
                name="coverLetter"
                placeholder="Message (optional)"
                value={formData.coverLetter}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 text-lg font-medium placeholder-gray-400 resize-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2B3990]/20 hover:border-[#2B3990]/30 focus:border-[#2B3990]"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full  bg-[#2B3990]  text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#FFA500]/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </div>
              ) : (
                'Submit'
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
      </motion.section>
    </>
  );
}
