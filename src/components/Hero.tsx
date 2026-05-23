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
{/* Right column: Creative 3D Glass Phone Mockup */}
<div
  className="lg:col-span-5 flex justify-center lg:justify-end relative"
  style={{ perspective: '1200px' }}
>
  {/* Orbital rings */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-sky-500/20 animate-spin-slow pointer-events-none"
    style={{ animation: 'spin 20s linear infinite' }}>
    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_12px_#0ea5e9]" />
  </div>
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-teal-500/10 pointer-events-none"
    style={{ animation: 'spin 30s linear infinite reverse' }}>
    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_12px_#14b8a6]" />
  </div>

  {/* Floating stat card — top left */}
  <div className={`absolute top-12 -left-4 z-20 bg-slate-900/90 backdrop-blur-xl border border-white/8 rounded-xl p-3 shadow-2xl transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Course Duration</p>
    <p className="text-lg font-black text-white leading-tight">16 Weeks</p>
    <p className="text-[9px] font-bold text-teal-400">2 Semesters</p>
  </div>

  {/* Floating stat card — bottom right */}
  <div className={`absolute bottom-16 -right-2 z-20 bg-slate-900/90 backdrop-blur-xl border border-white/8 rounded-xl p-3 shadow-2xl transition-all duration-700 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Final Outcome</p>
    <p className="text-lg font-black text-white leading-tight">Published App</p>
    <p className="text-[9px] font-bold text-teal-400">Google Play Store</p>
  </div>

  {/* Floating tech stack card — mid left */}
  <div className={`absolute top-1/2 -left-6 z-20 bg-slate-900/90 backdrop-blur-xl border border-white/8 rounded-xl p-3 shadow-2xl transition-all duration-700 delay-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Stack</p>
    <div className="flex gap-1 flex-wrap">
      {['React Native', 'Firebase', 'Convex', 'AdMob'].map((t) => (
        <span key={t} className="text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-400 border border-sky-500/20">{t}</span>
      ))}
    </div>
  </div>

  {/* Phone shell */}
  <div
    className={`relative w-60 h-[460px] transition-all duration-1000 delay-300 ${mounted ? 'opacity-100' : 'opacity-0 scale-95'}`}
    style={{
      transform: mounted ? 'rotateY(-16deg) rotateX(8deg) rotateZ(-2deg)' : 'rotateY(-30deg) rotateX(15deg)',
      animation: 'float 6s ease-in-out infinite',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 60%, #1e293b 100%)',
      borderRadius: '38px',
      padding: '10px',
      border: '1px solid rgba(148,163,184,0.15)',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 40px 80px rgba(0,0,0,0.7), 0 0 40px rgba(14,165,233,0.15)',
    }}
  >
    {/* Inner screen */}
    <div className="w-full h-full bg-[#080d1a] rounded-[30px] overflow-hidden relative flex flex-col">

      {/* Dynamic Island */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-[22px] bg-black rounded-full z-20 flex items-center justify-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
        <div className="w-1.5 h-1.5 rounded-full bg-sky-500/60 animate-pulse" />
      </div>

      {/* Status bar */}
      <div className="flex justify-between items-center px-4 pt-10 pb-2 text-[8px] font-mono text-slate-500 font-bold">
        <span>09:41</span>
        <span>Yo-Tech</span>
        <span>▪▪▪</span>
      </div>

      {/* Screen content */}
      <div className="flex-1 px-3 pb-3 flex flex-col gap-2 overflow-hidden">

        {/* App header */}
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center text-sm shadow-[0_0_16px_rgba(14,165,233,0.4)]">�</div>
          <div>
            <p className="text-white text-[9px] font-bold tracking-tight leading-tight">YoTech News</p>
            <p className="text-teal-400 text-[7px] font-bold tracking-widest uppercase">React Native App</p>
          </div>
          <div className="ml-auto flex items-center gap-1 bg-teal-500/15 border border-teal-500/30 rounded-full px-2 py-0.5">
            <div className="w-1 h-1 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-400 text-[6px] font-black tracking-widest uppercase font-mono">Live</span>
          </div>
        </div>

        {/* Code block */}
        <div className="bg-sky-500/[0.06] border border-sky-500/15 rounded-lg p-2 font-mono text-[7.5px] leading-relaxed">
          <div><span className="text-violet-400">const</span> <span className="text-sky-400">news</span> <span className="text-slate-500">=</span> <span className="text-orange-400">useQuery</span><span className="text-slate-500">(</span><span className="text-green-400">api</span><span className="text-slate-500">.</span><span className="text-sky-400">news</span><span className="text-slate-500">.</span><span className="text-green-400">list</span><span className="text-slate-500">);</span></div>
          <div><span className="text-violet-400">return</span> <span className="text-slate-500">&lt;</span><span className="text-orange-400">NewsCard</span> <span className="text-sky-400">data</span><span className="text-slate-500">=</span><span className="text-orange-400">{'{news}'}</span> <span className="text-slate-500">/&gt;;</span></div>
          <div className="text-slate-600">{"// ✓ Convex backend sync"}</div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-1.5">
          {[{ label: 'Phases', value: '04', badge: '◉ Active' }, { label: 'Weeks', value: '12', badge: 'Full' }].map((s) => (
            <div key={s.label} className="bg-white/[0.03] border border-white/[0.07] rounded-lg p-1.5">
              <p className="text-[7px] uppercase tracking-widest text-slate-500 font-bold">{s.label}</p>
              <p className="text-white text-sm font-black leading-tight">{s.value}</p>
              <span className="text-[6px] font-bold text-teal-400 bg-teal-500/15 rounded px-1">{s.badge}</span>
            </div>
          ))}
        </div>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1">
          {[
            { label: 'React Native', cls: 'bg-sky-500/12 text-sky-400 border-sky-500/20' },
            { label: 'Expo', cls: 'bg-sky-500/12 text-sky-400 border-sky-500/20' },
            { label: 'Firebase', cls: 'bg-orange-500/12 text-orange-400 border-orange-500/20' },
            { label: 'Convex', cls: 'bg-teal-500/12 text-teal-400 border-teal-500/20' },
            { label: 'Zustand', cls: 'bg-violet-500/12 text-violet-400 border-violet-500/20' },
            { label: 'AdMob', cls: 'bg-emerald-500/12 text-emerald-400 border-emerald-500/20' },
          ].map((b) => (
            <span key={b.label} className={`text-[6.5px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border font-mono ${b.cls}`}>{b.label}</span>
          ))}
        </div>

        {/* Testimonial */}
        <div className="bg-white/[0.02] border border-white/[0.06] border-l-2 border-l-sky-500 rounded-r-lg pl-2 pr-2 py-1.5">
          <p className="text-[7px] text-slate-300/80 italic leading-relaxed">
            "Built my first published app with real backend and monetization in just 12 weeks!"
          </p>
          <div className="flex items-center gap-1 mt-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-sky-500 to-teal-500" />
            <span className="text-[6.5px] font-bold text-slate-400 font-mono">Student — Cohort 2024</span>
          </div>
        </div>

      </div>
    </div>
  </div>

  {/* Ambient glow beneath phone */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-44 h-10 bg-sky-500/20 rounded-full blur-2xl animate-pulse -z-10" />
  {/* Background orbs */}
  <div className="absolute -z-10 w-56 h-56 bg-sky-500/15 rounded-full blur-3xl top-0 right-0" />
  <div className="absolute -z-10 w-36 h-36 bg-teal-500/10 rounded-full blur-2xl bottom-10 left-10" />
</div>

      </div>
    </section>
  );
}
