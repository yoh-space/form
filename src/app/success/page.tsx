"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheck, FaBookOpen, FaHouse, FaGlobe } from "react-icons/fa6";
import Button3D from "@/components/Button3D";

export default function Success() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-dot-grid flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-20 left-[10%] w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`} />
        <div className={`absolute bottom-20 right-[10%] w-80 h-80 bg-teal-500/10 rounded-full blur-[120px] transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-24 left-[15%] text-5xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`} style={{ animation: 'float 6s ease-in-out infinite' }}>🎉</div>
        <div className={`absolute top-36 right-[20%] text-4xl transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`} style={{ animation: 'float-reverse 7s ease-in-out infinite' }}>🚀</div>
        <div className={`absolute bottom-32 left-[25%] text-3xl transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animation: 'float 8s ease-in-out infinite' }}>✨</div>
        <div className={`absolute bottom-40 right-[15%] text-4xl transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animation: 'float 6s ease-in-out infinite reverse' }}>📱</div>
      </div>

      <div className={`max-w-md w-full text-center transition-all duration-700 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="glass-card rounded-[2.5rem] border border-slate-800/80 p-8 md:p-10 relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          
          <div className={`relative z-10 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-20 h-24 mb-6 flex flex-col items-center justify-center mx-auto">
              <div 
                className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-[0_0_25px_rgba(16,185,129,0.4)]" 
                style={{ animation: 'float 6s ease-in-out infinite' }}
              >
                <FaCheck />
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-white mb-3">Application Submitted!</h1>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-8">
              Thank you for your interest in the React Native & Full-stack Mentorship Program. 
              We'll review your application and be in touch soon via Telegram or email.
            </p>
            
            <div className="space-y-3.5">
              <Button3D className="font-bold gap-2 w-full">
                <FaBookOpen />
                View Course Syllabus
              </Button3D>
              
              <Link 
                href="/"
                className="group flex items-center justify-center gap-2 w-full bg-slate-900/60 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-200 hover:text-white px-6 py-3.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
              >
                <FaHouse />
                Back to Home
              </Link>
              
              <a 
                href="https://yotech.space"
                target="_blank"
                rel="noopener"
                className="group flex items-center justify-center gap-2 w-full bg-slate-950/60 border border-slate-900 hover:bg-slate-900/60 hover:border-slate-850 text-slate-400 hover:text-slate-300 px-6 py-3.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
              >
                <FaGlobe />
                Visit yotech.space
              </a>
            </div>
          </div>
        </div>

        <p className={`mt-8 text-slate-500 text-xs font-semibold tracking-wider uppercase transition-all duration-700 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          Powered by <a href="https://yotech.space" target="_blank" rel="noopener" className="text-teal-400 hover:text-teal-300 transition-colors">Yotech Digitals</a>
        </p>
      </div>
    </div>
  );
}
