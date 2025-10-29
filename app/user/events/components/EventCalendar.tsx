"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
// Removed invalid AutoHeightPlugin import; not needed for auto-resizing
import type { EventClickArg, EventContentArg } from '@fullcalendar/core';

interface Event {
  id: string;
  title: string;
  date: string;
  category: 'corporate' | 'outreach' | 'training' | 'conference';
  description?: string;
  location?: string;
  time?: string;
}

const EventCalendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sample events with categories and colors matching your website theme
  const events: Event[] = [
    {
      id: '1',
      title: 'Corporate Strategy Meeting',
      date: '2025-01-12',
      category: 'corporate',
      description: 'Annual strategic planning session for the upcoming year',
      location: 'Conference Room A',
      time: '9:00 AM'
    },
    {
      id: '2',
      title: 'Training Workshop',
      date: '2025-02-25',
      category: 'training',
      description: 'Professional development workshop for laboratory staff',
      location: 'Training Center',
      time: '2:00 PM'
    },
    {
      id: '3',
      title: 'Annual Outreach Program',
      date: '2025-05-10',
      category: 'outreach',
      description: 'Community health screening and awareness program',
      location: 'Community Center',
      time: '8:00 AM'
    },
    {
      id: '4',
      title: 'Company Anniversary',
      date: '2025-08-17',
      category: 'corporate',
      description: 'Celebrating years of excellence in healthcare innovation',
      location: 'Main Auditorium',
      time: '6:00 PM'
    },
    {
      id: '5',
      title: 'TLS - CCHIS Conference',
      date: '2025-10-15',
      category: 'conference',
      description: 'Technical Laboratory Services Conference on Clinical Chemistry',
      location: 'San Juan Convention Center',
      time: '9:00 AM'
    },
    {
      id: '6',
      title: 'Laboratory Equipment Training',
      date: '2025-11-08',
      category: 'training',
      description: 'Advanced training on new laboratory equipment',
      location: 'Lab Facility',
      time: '10:00 AM'
    },
    {
      id: '7',
      title: 'Healthcare Innovation Summit',
      date: '2025-12-03',
      category: 'conference',
      description: 'Industry summit on latest healthcare technologies',
      location: 'Metro Manila',
      time: '8:30 AM'
    }
  ];

  // Color scheme based on your website colors
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'corporate':
        return '#2B3990'; // Your primary blue
      case 'outreach':
        return '#10B981'; // Green for community
      case 'training':
        return '#F59E0B'; // Orange for learning
      case 'conference':
        return '#8B5CF6'; // Purple for conferences
      default:
        return '#6B7280'; // Gray fallback
    }
  };

  // Transform events for FullCalendar
  const calendarEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    date: event.date,
    backgroundColor: getCategoryColor(event.category),
    borderColor: getCategoryColor(event.category),
    textColor: '#ffffff',
    extendedProps: {
      category: event.category,
      description: event.description,
      location: event.location,
      time: event.time
    }
  }));

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = events.find(e => e.id === clickInfo.event.id);
    if (event) {
      setSelectedEvent(event);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Close modal on scroll (all devices)
  useEffect(() => {
    if (!isModalOpen) return;
    const handleScroll = () => {
      closeModal();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isModalOpen]);

  const handleDatesSet = (dateInfo: any) => {
    setCurrentMonth(dateInfo.view.title);
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setIsLoading(true);
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      if (direction === 'prev') {
        calendarApi.prev();
      } else {
        calendarApi.next();
      }
    }
    setTimeout(() => setIsLoading(false), 300);
  };

  const goToToday = () => {
    setIsLoading(true);
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.today();
    }
    setTimeout(() => setIsLoading(false), 300);
  };

  // Get event stats for the current month
  const getEventStats = () => {
    const currentDate = new Date();
    const currentMonthEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentDate.getMonth() && 
             eventDate.getFullYear() === currentDate.getFullYear();
    });

    const categories = ['corporate', 'training', 'outreach', 'conference'];
    return categories.map(category => ({
      category,
      count: currentMonthEvents.filter(e => e.category === category).length,
      color: getCategoryColor(category)
    }));
  };

  // Custom event content renderer
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div className="fc-event-main-frame overflow-hidden">
        <div className="fc-event-title-container">
          <div className="fc-event-title fc-sticky text-xs font-medium truncate">
            {eventInfo.event.title}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="relative w-full min-h-screen flex justify-center items-start py-10 px-2 -mt-15 lg:px-0"
      style={{
        backgroundImage: "url('/asset/bg1.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for opacity */}
      <div className="absolute inset-0 bg-white/80 pointer-events-none z-0" />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[900px] mx-auto p-2 lg:p-2 px-4 lg:px-2 mb-[150px] lg:mb-[150px] mb-16 pt-8 lg:pt-8 pt-6"
      >
      {/* Header Section */}
      <div className="text-center mb-6 lg:mb-8 px-2 mt-5">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl lg:text-4xl font-bold text-gray-800 mb-3"
        >
          Event Calendar
        </motion.h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="h-1 bg-[#2B3990] mx-auto mb-4 rounded-full"
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-gray-600 max-w-2xl mx-auto text-sm lg:text-base -mt-3 px-4 lg:px-0"
        >
          Stay updated with our upcoming activities and programs.
        </motion.p>
      </div>

      {/* Event Statistics Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-5 lg:-mt-3 px-2"
      >
        {getEventStats().map((stat, index) => (
          <motion.div
            key={stat.category}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-3 lg:p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-gray-600 capitalize">{stat.category}</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-800">{stat.count}</p>
              </div>
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: stat.color }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Custom Calendar Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-t-xl shadow-lg border border-gray-200 border-b-0 mx-2 lg:mx-0"
      >
        <div className="flex items-center justify-between p-3 lg:p-4 bg-gradient-to-r from-[#2B3990] to-[#1e2875] text-white rounded-t-xl">
          <div className="flex items-center space-x-2 lg:space-x-4">
            <button
              onClick={() => handleMonthChange('prev')}
              className="p-1.5 lg:p-2 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-105"
              disabled={isLoading}
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-base lg:text-lg font-bold min-w-[140px] lg:min-w-[180px] text-center">
              {currentMonth || 'October 2025'}
            </h2>
            <button
              onClick={() => handleMonthChange('next')}
              className="p-1.5 lg:p-2 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-105"
              disabled={isLoading}
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <button
            onClick={goToToday}
            className="px-3 py-1.5 lg:px-4 lg:py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 font-medium hover:scale-105 text-xs lg:text-sm"
            disabled={isLoading}
          >
            Today
          </button>
        </div>
      </motion.div>

      {/* Calendar Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`bg-white rounded-b-xl shadow-lg border border-gray-200 border-t-0 overflow-visible transition-opacity duration-300 mx-2 lg:mx-0 ${isLoading ? 'opacity-70' : 'opacity-100'}`}
      >
        <div className="p-1 lg:p-2 pt-0">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            datesSet={handleDatesSet}
            headerToolbar={false} // We're using custom header
            height="auto" // Let calendar auto-resize
            dayMaxEvents={2}
            moreLinkClick="popover"
            eventDisplay="block"
            displayEventTime={false}
            dayHeaderClassNames="bg-[#f8fafc] text-[#2B3990] font-semibold py-2 lg:py-3 text-xs lg:text-sm uppercase tracking-wide"
            dayCellClassNames="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            eventClassNames="hover:opacity-80 hover:scale-105 transition-all duration-200 cursor-pointer rounded-md mx-1 mb-1 shadow-sm"
            buttonText={{
              today: 'Today',
              month: 'Month'
            }}
            titleFormat={{ year: 'numeric', month: 'long' }}
            fixedWeekCount={false} // Allow variable number of weeks per month
            showNonCurrentDates={false}
            // contentHeight removed; height="auto" and fixedWeekCount={false} handle auto-resizing
            scrollTimeReset={true} // Prevent scroll position retention
            handleWindowResize={true} // Respond to window resize
          />
        </div>
      </motion.div>

      {/* Event Details Modal with AnimatePresence for exit animation */}
      <AnimatePresence>
        {isModalOpen && selectedEvent && (
          <>
            {/* Invisible overlay to prevent background clicks */}
            <motion.div
              key="modal-overlay"
              className="fixed inset-0 z-40 bg-black/50 lg:bg-transparent"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              key="modal-content"
              className="fixed inset-4 z-50 flex items-center justify-center max-[912px]:inset-2 max-[912px]:items-center max-[912px]:justify-center max-[912px]:pt-0 lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:inset-auto lg:w-full lg:max-w-md lg:mx-4 lg:flex-none"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-2xl p-4 lg:p-6 w-full border-2 border-gray-200 max-h-[85vh] overflow-y-auto max-[912px]:max-h-[80vh] max-[912px]:mx-2">
                {/* Modal Header */}
                <div className="flex justify-between items-start mb-3 lg:mb-4">
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-1">
                      {selectedEvent.title}
                    </h3>
                    <span 
                      className="inline-block px-2 lg:px-3 py-1 rounded-full text-xs font-medium text-white capitalize"
                      style={{ backgroundColor: getCategoryColor(selectedEvent.category) }}
                    >
                      {selectedEvent.category}
                    </span>
                  </div>
                  <button
                    onClick={closeModal}
                    aria-label="Close"
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none transition-colors duration-200 ml-2 focus:outline-none focus:ring-2 focus:ring-[#2B3990]/40 rounded"
                    type="button"
                  >
                    ×
                  </button>
                </div>

                {/* Modal Content */}
                <div className="space-y-3 lg:space-y-4">
                  <div className="bg-gray-50 rounded-lg p-3 lg:p-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3 text-[#2B3990]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium text-sm lg:text-base">
                        {new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>

                    {selectedEvent.time && (
                      <div className="flex items-center text-gray-600 mb-2">
                        <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3 text-[#2B3990]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm lg:text-base">{selectedEvent.time}</span>
                      </div>
                    )}

                    {selectedEvent.location && (
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3 text-[#2B3990]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm lg:text-base">{selectedEvent.location}</span>
                      </div>
                    )}
                  </div>

                  {selectedEvent.description && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm lg:text-base">Description</h4>
                      <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg text-sm lg:text-base">
                        {selectedEvent.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                {/* Modal Footer removed as requested */}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom FullCalendar Styles */}
      <style jsx global>{`
        .fc {
          font-family: inherit;
          width: 100% !important;
        }
        .fc-scrollgrid {
          width: 100% !important;
        }
        .fc-scrollgrid-sync-table {
          width: 100% !important;
          table-layout: fixed !important;
        }
        .fc-daygrid-day,
        .fc-col-header-cell {
          width: 14.2857% !important;
          min-width: 60px !important;
        }
        @media (min-width: 1024px) {
          .fc-daygrid-day,
          .fc-col-header-cell {
            min-width: 110px !important;
          }
        }
        .fc-daygrid-day-frame {
          height: 4rem !important;
          min-height: 4rem !important;
          max-height: 4rem !important;
          position: relative !important;
          overflow: hidden !important;
        }
        @media (min-width: 1024px) {
          .fc-daygrid-day-frame {
            height: 5.5rem !important;
            min-height: 5.5rem !important;
            max-height: 5.5rem !important;
          }
        }
        
        .fc-toolbar {
          display: none !important; /* Hide default toolbar since we're using custom */
        }
        
        .fc-toolbar-title {
          font-size: 1.5rem !important;
          font-weight: 700 !important;
          color: #1f2937 !important;
        }
        
        .fc-button-primary {
          background-color: #2B3990 !important;
          border-color: #2B3990 !important;
          color: white !important;
          font-weight: 500 !important;
          border-radius: 0.5rem !important;
          padding: 0.5rem 1rem !important;
          transition: all 0.2s !important;
        }
        
        .fc-button-primary:hover {
          background-color: #1e2875 !important;
          border-color: #1e2875 !important;
          transform: translateY(-1px) !important;
        }
        
        .fc-button-primary:focus {
          box-shadow: 0 0 0 3px rgba(43, 57, 144, 0.1) !important;
        }
        
        .fc-daygrid-day:hover {
          background-color: #f9fafb !important;
        }
        
        .fc-daygrid-day-top {
          padding: 0.25rem !important;
        }
        @media (min-width: 1024px) {
          .fc-daygrid-day-top {
            padding: 0.5rem !important;
          }
        }
        
        .fc-day-today {
          background-color: #dbeafe !important;
        }
        
        .fc-day-today .fc-daygrid-day-number {
          background-color: #2B3990 !important;
          color: white !important;
          border-radius: 100% !important;
          width: 1.5rem !important;
          height: 1.5rem !important;
          line-height: 1.5rem !important;
          text-align: center !important;
          font-weight: 600 !important;
          font-size: 0.75rem !important;
        }
        
        .fc-event {
          border-radius: 0.375rem !important;
          border: none !important;
          font-size: 0.625rem !important;
          font-weight: 500 !important;
          margin: 0.125rem !important;
          padding: 0.125rem 0.25rem !important;
        }
        @media (min-width: 1024px) {
          .fc-event {
            font-size: 0.75rem !important;
            padding: 0.25rem 0.5rem !important;
          }
        }
        
        .fc-col-header-cell {
          background-color: #f8fafc !important;
          color: #2B3990 !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          font-size: 0.625rem !important;
          letter-spacing: 0.05em !important;
          padding: 0.5rem !important;
          border-bottom: 2px solid #e5e7eb !important;
        }
        @media (min-width: 1024px) {
          .fc-col-header-cell {
            font-size: 0.75rem !important;
            padding: 0.75rem !important;
          }
        }
        
        .fc-scrollgrid {
          border-radius: 0.5rem !important;
          overflow: hidden !important;
          border: 1px solid #e5e7eb !important;
        }
        
        .fc-daygrid-day-number {
          padding: 0.25rem !important;
          font-weight: 500 !important;
          color: #374151 !important;
          font-size: 0.75rem !important;
        }
        @media (min-width: 1024px) {
          .fc-daygrid-day-number {
            padding: 0.5rem !important;
            font-size: 0.875rem !important;
          }
        }
        
        .fc-day-today .fc-daygrid-day-number {
          background: linear-gradient(135deg, #2B3990, #1e2875) !important;
          color: white !important;
          border-radius: 50% !important;
          width: 1.5rem !important;
          height: 1.5rem !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-weight: 600 !important;
          margin: 0.125rem !important;
          font-size: 0.75rem !important;
        }
        @media (min-width: 1024px) {
          .fc-day-today .fc-daygrid-day-number {
            width: 2rem !important;
            height: 2rem !important;
            margin: 0.25rem !important;
            font-size: 0.875rem !important;
          }
        }
        
        .fc-more-link {
          color: #2B3990 !important;
          font-weight: 500 !important;
          font-size: 0.75rem !important;
          padding: 0.25rem 0.5rem !important;
          border-radius: 0.375rem !important;
          background-color: #f3f4f6 !important;
          margin: 0.125rem !important;
          transition: all 0.2s !important;
        }
        
        .fc-more-link:hover {
          color: white !important;
          background-color: #2B3990 !important;
          transform: scale(1.05) !important;
        }
        
        .fc-daygrid-event-harness {
          margin: 0.125rem !important;
        }
        
        .fc-h-event {
          border-radius: 0.375rem !important;
          font-size: 0.625rem !important;
          font-weight: 500 !important;
          padding: 0.125rem 0.25rem !important;
          margin: 0.125rem 0 !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
          border: none !important;
        }
        @media (min-width: 1024px) {
          .fc-h-event {
            font-size: 0.75rem !important;
            padding: 0.25rem 0.5rem !important;
          }
        }
      `}</style>
      </motion.div>
    </div>
  );
};

export default EventCalendar;