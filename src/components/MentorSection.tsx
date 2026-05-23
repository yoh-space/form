"use client";

import { useEffect, useState, useRef } from "react";
import { FaGraduationCap, FaCode, FaServer, FaGooglePlay, FaUsers, FaArrowUpRightFromSquare, FaCircleCheck, FaLaptopCode, FaGlobe, FaCertificate } from "react-icons/fa6";

export default function MentorSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 px-4 bg-dot-grid relative">
      {/* Visual Accents */}
      <div className="absolute left-[10%] top-[40%] w-72 h-72 rounded-full bg-teal-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute right-[10%] bottom-[20%] w-80 h-80 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header section with credentials */}
        <div className={`text-center mb-16 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold border border-teal-500/20 mb-4">
            <FaGraduationCap /> 6-Month Intensive Roadmap
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
            Launch Your Professional Developer Career
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            A high-touch learning experience directed by Yohannes Damtie at Yotech Digitals, designed to guide you from basic scripts to production-grade mobile and web applications.
          </p>
          <div className="mt-4 flex items-center justify-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-rose-400 text-xs font-bold uppercase tracking-widest bg-rose-500/10 px-3 py-0.5 rounded-full">
              Strictly Limited to 15 Active Seats
            </span>
          </div>
        </div>

        {/* 2 Semesters Curriculum Layout */}
        <div className={`grid md:grid-cols-2 gap-8 mb-16 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Semester 1: Frontend */}
          <div className="glass-card rounded-[2rem] p-8 border border-slate-800/80 hover:border-teal-500/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(13,148,136,0.15)]">
                <FaCode />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full">
                  Semester 01 • 3 Months
                </span>
                <h3 className="text-xl font-black text-white mt-1.5">Frontend Engineering & Mobile Architecture</h3>
              </div>
            </div>

            <p className="text-slate-400 text-xs md:text-sm mb-6 leading-relaxed">
              Master state-of-the-art UI structures, responsive screen layouts, local storage, state management, and compiled native workflows.
            </p>

            <ul className="space-y-3.5">
              {[
                "Fundamentals to Mobile Application & App Idea validation",
                "React Native Components & JavaScript (Var, Const, Let, Template literals)",
                "Creating Expo App & GitHub CI/CD",
                "React Native Core Components (View, Button, TouchableOpacity, Text, StyleSheet API)",
                "Third Party Packages (react-native-safe-area-context, react-native-paper)",
                "React State Management (useEffect, useState, useContext) & Context Provider",
                "Async Storage using @react-native-async-storage/async-storage",
                "Animation using lottie-react-native & Onboarding Screen design",
                "Expo router, local parameter passing & Expo Drawer navigation"
              ].map((topic, idx) => (
                <li key={idx} className="flex gap-3 text-xs md:text-sm text-slate-300 items-start">
                  <FaCircleCheck className="text-teal-400 text-sm mt-0.5 flex-shrink-0" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Semester 2: Backend */}
          <div className="glass-card rounded-[2rem] p-8 border border-slate-800/80 hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <FaServer />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                  Semester 02 • 3 Months
                </span>
                <h3 className="text-xl font-black text-white mt-1.5">Backend Engineering, APIs & Production Launch</h3>
              </div>
            </div>

            <p className="text-slate-400 text-xs md:text-sm mb-6 leading-relaxed">
              Build high-performance real-time servers, relational schemas, secure auth sessions, server actions, and deploy your product globally.
            </p>

            <ul className="space-y-3.5">
              {[
                "Scroll & List Rendering (FlatList, Dynamic list rendering, Image integration)",
                "Zustand Global State (Store creation, Cross-screen data sharing)",
                "Firebase Authentication (Signup, Login, Logout flows, Auth state handling)",
                "Admin Role Detection (Role-based logic, Conditional rendering)",
                "Convex Backend Read (Data fetching from Convex, UI synchronization)",
                "Convex Backend Write (CRUD operations, Admin news management)",
                "Forms & Image Handling (Form inputs, Image handling with URLs)",
                "AdMob Integration (Banner ads, App monetization)",
                "Environment Variables & AI Tools (.env basics, API key security)",
                "App Publishing (APK/AAB build, Google Play Console setup)"
              ].map((topic, idx) => (
                <li key={idx} className="flex gap-3 text-xs md:text-sm text-slate-300 items-start">
                  <FaCircleCheck className="text-emerald-400 text-sm mt-0.5 flex-shrink-0" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Meet the Mentor Card */}
        <div className={`glass-card rounded-[2rem] p-8 md:p-10 border border-slate-800/80 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid md:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Avatar placeholder & stats */}
            <div className="md:col-span-4 flex flex-col items-center text-center gap-4">
              <div className="relative group">
                <img
                  src="/mentor-image.png"
                  alt="Yohannes Damtie"
                  className="w-32 h-32 rounded-3xl object-cover shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105"
                />
                {/* Glow Ring */}
                <div className="absolute -inset-2 rounded-[2rem] bg-sky-500/20 blur-md group-hover:opacity-40 transition-opacity duration-500" />
              </div>

              <div>
                <h4 className="text-xl font-black text-white">Yohannes Damtie</h4>
                <p className="text-xs text-teal-400 font-semibold uppercase tracking-wider mt-1">Full Stack Developer</p>
                <span className="text-[11px] text-slate-500 font-medium">Founder of Yotech Digitals</span>
              </div>
            </div>

            {/* Right Col: Biography & Credentials */}
            <div className="md:col-span-8 space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white mb-3">Learn Directly from an Active Publisher</h3>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                  Yohannes Damtie is a professional full-stack engineer who builds web solutions and mobile apps daily. Rather than theoretical lectures, you participate in live code-alongs, solve real debugging cases, and publish your own application.
                </p>
              </div>

              {/* Links and Stats Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                
                <a 
                  href="https://play.google.com/store/apps/dev?id=6112063894787389964" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-slate-950/40 border border-slate-900 rounded-2xl flex items-center gap-3.5 hover:border-teal-500/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-teal-400 flex items-center justify-center text-lg">
                    <FaGooglePlay />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Google Play</span>
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1 hover:text-white">
                      Dev Account <FaArrowUpRightFromSquare className="text-[9px] text-slate-500" />
                    </span>
                  </div>
                </a>

                <a 
                  href="https://yotech.space" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 bg-slate-950/40 border border-slate-900 rounded-2xl flex items-center gap-3.5 hover:border-emerald-500/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center text-lg">
                    <FaGlobe />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Yotech Website</span>
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1 hover:text-white">
                      yotech.space <FaArrowUpRightFromSquare className="text-[9px] text-slate-500" />
                    </span>
                  </div>
                </a>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
