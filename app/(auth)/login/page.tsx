"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect to /user/about if already logged in
  React.useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("biosite-auth") === "true") {
      router.replace("/user/about");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Mock authentication
    if (username === "admin" && password === "admin123") {
      // Set a simple session (localStorage for demo)
      localStorage.setItem("biosite-auth", "true");
      router.replace("/user/about");
    } else {
      setError("Invalid username or password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background image with overlay and animation */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center animate-bg-fade"
        style={{
          backgroundImage: "url('/asset/4c3c5489-639f-4cff-9eed-2e1e2d2172fe.jpg')",
          filter: 'blur(1.5px) brightness(1.08) scale(1.03)',
          transition: 'filter 1.2s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
  <div className="absolute inset-0 bg-gradient-to-br from-[#2B3990]/40 via-blue-100/20 to-white/40" />
      </div>
      <div
        className="relative z-10 w-full max-w-md p-8 bg-white/90 rounded-2xl shadow-2xl flex flex-col items-center animate-card-in"
        style={{ boxShadow: "0 8px 32px 0 rgba(43,57,144,0.10)" }}
      >
        <img
          src="/asset/BMI logo.png"
          alt="Biosite Medical Instruments Logo"
          className="mb-8 w-60 h-auto object-contain drop-shadow-sm"
        />
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B3990] bg-white text-gray-900 shadow-sm transition"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2B3990] bg-white text-gray-900 shadow-sm transition pr-12"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              tabIndex={0}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#2B3990] focus:outline-none p-1"
              style={{ top: '60%', bottom: '70%' }}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                // Eye open icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              ) : (
                // Eye closed icon
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.477 10.477A3 3 0 0112 9c1.657 0 3 1.343 3 3 0 .523-.134 1.015-.366 1.44m-1.157 1.157A3 3 0 019 12c0-.523.134-1.015.366-1.44" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5c2.042 0 3.93.5 5.57 1.36M21.75 12s-3.75 7.5-9.75 7.5c-2.042 0-3.93-.5-5.57-1.36" />
                </svg>
              )}
            </button>
          </div>
          {error && (
            <div className="text-red-600 text-sm font-semibold text-center animate-fade-in">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 bg-[#2B3990] text-white font-bold rounded-lg shadow-md hover:bg-blue-800 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="w-full flex justify-end mt-3">
          <a
            href="#"
            className="text-sm text-blue-700 hover:underline hover:text-[#2B3990] transition"
            tabIndex={-1}
          >
            Forgot Password?
          </a>
        </div>
      </div>
      <style jsx global>{`
        @keyframes bg-fade {
          from { opacity: 0; transform: scale(1.08); filter: blur(8px) brightness(0.7); }
          to { opacity: 1; transform: scale(1.03); filter: blur(1.5px) brightness(1.08); }
        }
        .animate-bg-fade {
          animation: bg-fade 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes card-in {
          from { opacity: 0; transform: translateY(48px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-card-in {
          animation: card-in 0.9s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </div>
  );
}
