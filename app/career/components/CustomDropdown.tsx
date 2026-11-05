import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  id: number;
  title: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  enableSearch?: boolean;
}

export default function CustomDropdown({ options, value, onChange, placeholder }: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
        setSearchMode(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filtered options for search
  const filteredOptions = options.filter(option =>
    option.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={ref} className="relative w-full">
      <div className="flex w-full">
        <button
          type="button"
          className={`flex-1 text-left px-4 py-4 rounded-l-xl border-2 text-lg font-medium appearance-none bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2B3990]/20 ${value ? 'text-gray-900' : 'text-gray-400'} border-[#2B3990] hover:border-[#2B3990] focus:border-[#2B3990]`}
          onClick={() => { setSearchMode(true); setOpen(false); }}
        >
          {value || placeholder || "Select an option"}
        </button>
        <button
          type="button"
          className="px-3 py-4 rounded-r-xl border-2 border-l-0 border-[#2B3990] bg-white flex items-center justify-center"
          onClick={() => { setOpen((prev) => !prev); setSearchMode(false); }}
          tabIndex={-1}
        >
          <svg className="w-5 h-5 text-[#2B3990]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {/* Search Mode */}
      <AnimatePresence>
        {searchMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 top-full mt-2 w-full bg-white border-2 border-[#2B3990] rounded-xl shadow-2xl z-50"
            style={{ filter: 'drop-shadow(0 4px 24px rgba(43,57,144,0.15))' }}
          >
            <input
              type="text"
              autoFocus
              className="w-full px-4 py-3 border-b border-[#2B3990] rounded-t-xl text-lg focus:outline-none"
              placeholder="Search position..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <ul className="max-h-64 overflow-y-auto custom-scrollbar">
              {filteredOptions.length === 0 ? (
                <li className="px-4 py-3 text-gray-400">No results found</li>
              ) : (
                filteredOptions.map(option => (
                  <li
                    key={option.id}
                    className={`px-4 py-3 cursor-pointer text-[#2B3990] bg-white hover:bg-[#2B3990]/10 ${value === option.title ? "bg-[#2B3990]/10 font-semibold" : ""}`}
                    onClick={() => {
                      onChange(option.title);
                      setSearchMode(false);
                      setSearchTerm("");
                    }}
                  >
                    {option.title}
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Dropdown Mode */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 top-full mt-2 w-full bg-white border-2 border-[#2B3990] rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto custom-scrollbar"
            style={{ filter: 'drop-shadow(0 4px 24px rgba(43,57,144,0.15))' }}
          >
            {options.map((option) => (
              <li
                key={option.id}
                className={`px-4 py-3 cursor-pointer text-[#2B3990] bg-white hover:bg-[#2B3990]/10 ${value === option.title ? "bg-[#2B3990]/10 font-semibold" : ""}`}
                onClick={() => {
                  onChange(option.title);
                  setOpen(false);
                }}
              >
                {option.title}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
