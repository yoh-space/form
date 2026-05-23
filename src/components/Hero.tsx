"use client";

import { useEffect, useState } from "react";
import { FaGooglePlay, FaGlobe, FaArrowRight } from "react-icons/fa";
import Button3D from "./Button3D";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative py-28 px-4 overflow-hidden min-h-[90vh] flex items-center justify-center matrix-grid">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left column: Text & Trust details */}
        <div className="lg:col-span-7 text-left flex flex-col items-start">

          
          {/* Main Headline */}
          <h1 className={`text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Master Web & Mobile
            <br />
            <span className="text-sky-400 font-extrabold">
              Full-Stack Engineering
            </span>
          </h1>
          
          {/* Program Subheading */}
          <p className={`text-base md:text-lg text-slate-300 mb-8 max-w-xl transition-all duration-700 delay-200 leading-relaxed ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            A comprehensive, high-octane <strong>6-month mentorship</strong> structured across two specialized semesters (Frontend & Backend) offered by <strong>Yotech Digitals</strong>. Learn to build and launch production-grade apps.
          </p>

          {/* Social Proof & Credentials Cards */}
          <div className={`grid grid-cols-2 gap-4 w-full max-w-lg mb-8 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            
            <a 
              href="https://play.google.com/store/apps/dev?id=6112063894787389964" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-4 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl flex flex-col gap-2 hover:border-teal-500/30 transition-all duration-300 hover:bg-slate-900/60"
            >
              <div className="flex items-center gap-2 text-teal-400">
                <FaGooglePlay className="text-xl group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Play Store</span>
              </div>
              <span className="text-sm font-semibold text-white">Yotech Digitals</span>
              <p className="text-[11px] text-slate-400 leading-normal">Explore verified published apps & production work on Google Play.</p>
            </a>

            <a 
              href="https://yotech.space" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-4 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl flex flex-col gap-2 hover:border-amber-500/30 transition-all duration-300 hover:bg-slate-900/60"
            >
              <div className="flex items-center gap-2 text-amber-400">
                <FaGlobe className="text-xl group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Yotech Space</span>
              </div>
              <span className="text-sm font-semibold text-white">Our Main Site</span>
              <p className="text-[11px] text-slate-400 leading-normal">Check recent products, live student projects & client testimonials.</p>
            </a>

          </div>
          
          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 w-full sm:w-auto transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Button3D className="font-bold gap-1">
              Start Enrollment
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button3D>
            
            <a 
              href="https://yotech.space/#testimonials" 
              target="_blank" 
              rel="noopener" 
              className="inline-flex items-center justify-center gap-2 bg-slate-900/60 backdrop-blur-md text-slate-300 px-8 py-4 rounded-xl font-semibold border border-slate-800 hover:border-slate-700 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Read Testimonials
            </a>
          </div>

        </div>

        {/* Right column: Beautiful 3D Glass Phone Mockup / Display */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative" style={{ perspective: '1200px' }}>
          <div 
            className={`w-64 h-[28rem] bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] p-3 shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100' : 'opacity-0 scale-95'}`} 
            style={{ 
              transform: mounted ? 'rotateY(-16deg) rotateX(8deg) rotateZ(-2deg)' : 'rotateY(-30deg) rotateX(15deg)',
              animation: 'float 6s ease-in-out infinite'
            }}
          >
            {/* Inner Phone Screen */}
            <div className="w-full h-full bg-slate-950 rounded-[2rem] border border-slate-800/80 overflow-hidden relative p-5 flex flex-col justify-between">
              
              {/* Phone Camera Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-full border border-slate-800" />
              
              {/* Top Details */}
              <div className="mt-4 flex justify-between items-center text-slate-500 text-[10px] font-bold tracking-widest uppercase">
                <span>Semester 01</span>
                <span>Active</span>
              </div>

              {/* Central Premium Content */}
              <div className="text-center py-6 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-sky-500 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(13,148,136,0.3)]">
                  📱
                </div>
                <div>
                  <h3 className="text-white text-base font-bold tracking-tight">Expo & React Native</h3>
                  <p className="text-xs text-teal-400 font-semibold mt-1">Yo-Tech Digital Lab</p>
                </div>
                
                {/* Floating Tech Badges on Screen */}
                <div className="flex flex-wrap gap-1.5 justify-center mt-2">
                  {["Next.js", "Convex", "Expo", "AI Integration"].map((badge, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-[9px] font-medium text-slate-400 rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Testimonial Quote on Screen */}
              <div className="bg-slate-900/60 border border-slate-800/50 p-3 rounded-xl mb-2">
                <p className="text-[10px] text-slate-300 italic line-clamp-2 leading-relaxed">
                  "Yotech's hands-on approach completely changed my understanding of full stack."
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-sky-500" />
                  <span className="text-[9px] font-semibold text-slate-400">Yohannes D. (Student)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Abstract background decorative orb behind phone */}
          <div className="absolute -z-10 w-48 h-44 bg-sky-500/20 rounded-full blur-2xl top-1/4 right-0" />
        </div>

      </div>
    </section>
  );
}
