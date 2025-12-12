"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      {/* Floating 3D Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-[10%] w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl opacity-20 transform rotate-12 transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-20' : '-translate-y-10 opacity-0'}`} style={{ animation: 'float 6s ease-in-out infinite' }} />
        <div className={`absolute top-40 right-[15%] w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl opacity-20 transform -rotate-12 transition-all duration-1000 delay-200 ${mounted ? 'translate-y-0 opacity-20' : '-translate-y-10 opacity-0'}`} style={{ animation: 'float 8s ease-in-out infinite reverse' }} />
        <div className={`absolute bottom-20 left-[20%] w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg opacity-20 transform rotate-45 transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-20' : 'translate-y-10 opacity-0'}`} style={{ animation: 'float 7s ease-in-out infinite' }} />
        <div className={`absolute top-32 left-[40%] w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-md opacity-15 transition-all duration-1000 delay-500 ${mounted ? 'scale-100' : 'scale-0'}`} style={{ animation: 'pulse-slow 4s ease-in-out infinite' }} />
        <div className={`absolute bottom-32 right-[25%] w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl opacity-15 transform -rotate-6 transition-all duration-1000 delay-400 ${mounted ? 'translate-y-0 opacity-15' : 'translate-y-10 opacity-0'}`} style={{ animation: 'float 9s ease-in-out infinite' }} />
      </div>

      {/* 3D Phone Mockup */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 hidden lg:block" style={{ perspective: '1000px' }}>
        <div className={`w-48 h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[2rem] p-2 shadow-2xl transition-all duration-1000 ${mounted ? 'opacity-100 rotate-y-0' : 'opacity-0'}`} style={{ transform: mounted ? 'rotateY(-15deg) rotateX(5deg)' : 'rotateY(-30deg) rotateX(10deg)', animation: 'phone-float 6s ease-in-out infinite' }}>
          <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-[1.5rem] flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-4xl mb-2">📱</div>
              <div className="text-xs font-medium opacity-80">React Native</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className={`inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Now Accepting Applications
        </div>
        
        <h1 className={`text-4xl md:text-6xl font-bold text-gray-900 mb-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            React Native
          </span>
          <br />
          <span className="text-gray-800">Mentorship Program</span>
        </h1>
        
        <p className={`text-lg text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Transform your ideas into real mobile apps. Join our hands-on mentorship program 
          and learn to build cross-platform applications with React Native.
        </p>
        
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <a href="#enroll" className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1">
            Start Your Journey
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a href="https://yotech.space/#projects" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-full font-medium border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            View Our Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div className={`mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {[
            { value: "ONLY 15", label: "Students" },
            { value: "24", label: "Weeks" },
            { value: "ACTIVE", label: "Mentoring" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
