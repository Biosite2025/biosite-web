"use client";
import { useState } from "react";
import Link from "next/link";

export function TopNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-gray-800">
            <Link href="/">Logo</Link>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              About
            </Link>

            {/* Dropdown Products */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center text-gray-700 hover:text-blue-600 transition"
              >
                Products
                <svg
                  className={`ml-1 h-4 w-4 transform transition ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute left-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link
                      href="/products/product1"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Product 1
                    </Link>
                    <Link
                      href="/products/product2"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Product 2
                    </Link>
                    <Link
                      href="/products/product3"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Product 3
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/career"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Career
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu placeholder */}
          <div className="md:hidden">
            {/* You can add a mobile hamburger menu here later */}
          </div>
        </div>
      </div>
    </nav>
  );
};
