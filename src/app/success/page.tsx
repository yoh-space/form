"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Success() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/30 to-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-20 left-[15%] text-6xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`} style={{ animation: 'float 6s ease-in-out infinite' }}>🎉</div>
        <div className={`absolute top-32 right-[20%] text-5xl transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`} style={{ animation: 'float 7s ease-in-out infinite reverse' }}>🚀</div>
        <div className={`absolute bottom-32 left-[25%] text-4xl transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animation: 'float 8s ease-in-out infinite' }}>✨</div>
        <div className={`absolute bottom-40 right-[15%] text-5xl transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animation: 'float 6s ease-in-out infinite reverse' }}>📱</div>
      </div>

      <div className={`max-w-md w-full text-center transition-all duration-700 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 p-10 relative overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 animate-shimmer opacity-50" />
          
          <div className={`relative z-10 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl shadow-green-500/30" style={{ animation: 'bounce-slow 2s ease-in-out infinite' }}>
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Application Submitted!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your interest in the React Native Mentorship Program. 
              We'll be in touch soon via Telegram or email.
            </p>
            
            <div className="space-y-3">
              <Link 
                href="/verify"
                className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 hover:-translate-y-1"
              >
                View Course Syllabus
              </Link>
              
              <Link 
                href="/"
                className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
              >
                Back to Home
              </Link>
              
              <a 
                href="https://yotech.space"
                target="_blank"
                rel="noopener"
                className="block w-full bg-gray-100 text-gray-700 px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-all duration-300"
              >
                Visit yotech.space →
              </a>
            </div>
          </div>
        </div>

        <p className={`mt-8 text-gray-500 text-sm transition-all duration-700 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          Powered by <a href="https://yotech.space" target="_blank" rel="noopener" className="text-blue-500 hover:underline">Yo-Tech Solution</a>
        </p>
      </div>
    </div>
  );
}
