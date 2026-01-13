"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import CustomDropdown from "./CustomDropdown";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
  const [availablePositions, setAvailablePositions] = useState<Array<{ id: number; title: string }>>([]);
  const [locationOptions, setLocationOptions] = useState<Array<{ id: number; title: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  // For underline alignment
  const titleRef = useRef<HTMLSpanElement>(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  
  useLayoutEffect(() => {
    if (titleRef.current) {
      setUnderlineWidth(titleRef.current.offsetWidth);
    }
  }, []);

  // Fetch job positions and locations from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch job positions
        const positionsResponse = await fetch('/api/job-positions');
        const positionsData = await positionsResponse.json();
        
        // Fetch locations
        const locationsResponse = await fetch('/api/locations');
        const locationsData = await locationsResponse.json();
        
        if (positionsData.success) {
          setAvailablePositions(positionsData.data);
        }
        
        if (locationsData.success) {
          setLocationOptions(locationsData.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Real-time validation for phone
    if (name === "phone") {
      if (!/^\d*$/.test(value)) {
        setErrors(prev => ({ ...prev, phone: "Only numbers allowed." }));
      } else if (value.length > 0 && value.length !== 11) {
        setErrors(prev => ({ ...prev, phone: "Enter 11 digits." }));
      } else {
        setErrors(prev => ({ ...prev, phone: "" }));
      }
    } else if (name === "email") {
      if (value.length > 0 && !/^\S+@\S+\.\S+$/.test(value)) {
        setErrors(prev => ({ ...prev, email: "Invalid email." }));
      } else {
        setErrors(prev => ({ ...prev, email: "" }));
      }
    } else if (errors[name]) {
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
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 11 digits";
    }
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
    
    try {
      let resumeUrl = null;
      let resumeFileName = null;

      // Upload resume to Cloudinary if present
      if (formData.resume) {
        resumeFileName = formData.resume.name;
        
        // Read file as base64
        const reader = new FileReader();
        const fileBase64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(formData.resume!);
        });

        // Upload to Cloudinary
        const uploadResponse = await fetch('/api/upload-resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file: fileBase64,
            fileName: resumeFileName,
          }),
        });

        const uploadData = await uploadResponse.json();
        
        if (!uploadData.success) {
          console.error('Upload failed:', uploadData);
          alert(`Failed to upload resume: ${uploadData.error || 'Unknown error'}`);
          return;
        }
        
        console.log('✅ Resume uploaded to Cloudinary:', uploadData.url);
        resumeUrl = uploadData.url;
      }

      const response = await fetch('/api/applicants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          position: formData.selectedPosition,
          location: formData.location,
          resumeUrl: resumeUrl,
          resumeFileName: resumeFileName,
          message: formData.coverLetter,
        }),
      });

      const data = await response.json();

      if (data.success) {
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
      } else {
        alert(data.error || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.section
        className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f9fc] via-gray-50 to-white pt-4 md:pt-6 lg:pt-8 pb-8 md:pb-12 lg:pb-16 xl:pb-20 px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
    
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-8 md:top-10 lg:top-12 left-8 md:left-10 lg:left-12 w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-[#2B7CD3] rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-8 md:bottom-10 lg:bottom-12 right-8 md:right-10 lg:right-12 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 bg-[#2B3990] rounded-full blur-3xl opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] xl:w-[40rem] xl:h-[40rem] bg-gradient-to-r from-[#2B3990]/5 to-[#2B7CD3]/5 rounded-full blur-3xl" />
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
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Thank you for your interest. We&apos;ll review your application and get back to you soon.</p>
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

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center z-10 relative scale-90 md:scale-95 lg:scale-100 xl:scale-100 2xl:scale-105 transition-transform duration-300">
        {/* Left Side - Headline and Image */}
        <motion.div
          className="flex flex-col items-center justify-center relative h-full"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mb-6 md:mb-8 lg:mb-10 xl:mb-12 w-full">
            <motion.h1
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-[#6B7280] mb-3 md:mb-4 lg:mb-5 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <span className="text-[#2B3990]">JOB LISTING </span> 
            </motion.h1>
            <motion.div
              className="underline-bar h-1 md:h-1.5 bg-gradient-to-r from-[#2B3990] to-[#2B7CD3] rounded-full mx-auto lg:mx-0 w-[150px] md:w-[180px] lg:w-[200px] xl:w-[220px] 2xl:w-[250px]"
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </div>
          <div className="image-container relative w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[550px] flex items-center">
            {/* Job Listing PNG Container */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl md:rounded-3xl p-0 shadow-xl md:shadow-2xl relative overflow-hidden w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Image
                  src="https://res.cloudinary.com/dmvyhrewy/image/upload/v1763530574/biosite-assets/Screenshot_2025-10-03_102205.png"
                  alt="Biosite Job Listing"
                  width={900}
                  height={520}
                  className="w-full h-full object-cover drop-shadow-xl rounded-2xl md:rounded-3xl"
                  priority
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-3 md:-top-4 -right-3 md:-right-4 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-[#2B3990] rounded-full opacity-20 animate-pulse" />
              <div className="absolute -bottom-2 md:-bottom-3 -left-2 md:-left-3 w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-[#2B7CD3] rounded-full opacity-30" />
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
            className="space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-7"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 md:px-5 py-3 md:py-4 lg:py-4.5 rounded-lg md:rounded-xl border-2 text-base md:text-lg lg:text-xl font-medium placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2B3990]/20 ${
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
                  className={`w-full px-4 md:px-5 py-3 md:py-4 lg:py-4.5 rounded-lg md:rounded-xl border-2 text-base md:text-lg lg:text-xl font-medium placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2B3990]/20 ${
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
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
                  enableSearch={true}
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
                className={`relative border-2 border-dashed rounded-lg md:rounded-xl p-4 md:p-6 lg:p-7 text-center transition-all duration-300 ${
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
                      className="bg-[#2B3990] text-white px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-semibold hover:bg-[#e69500] transition-colors inline-flex items-center gap-2 text-sm md:text-base lg:text-lg"
                    >
                      Choose File
                    </button>
                    <span className="ml-2 text-gray-600 text-sm md:text-base lg:text-lg">
                      {formData.resume ? formData.resume.name : 'no file selected'}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-gray-500 italic">Only PDF files are allowed. Max size 5MB.</p>
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
                className="w-full px-4 md:px-5 py-4 md:py-4.5 rounded-xl border-2 border-gray-200 text-base md:text-lg lg:text-xl font-medium placeholder-gray-400 resize-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2B3990]/20 hover:border-[#2B3990]/30 focus:border-[#2B3990]"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#2B3990] text-white font-bold py-4 md:py-4.5 lg:py-5 px-8 md:px-10 lg:px-12 rounded-xl text-base md:text-lg lg:text-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#FFA500]/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
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
