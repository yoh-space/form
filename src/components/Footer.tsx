"use client";

import { FaArrowUpRightFromSquare, FaGlobe } from "react-icons/fa6";
import Button3D from "./Button3D";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* CTA Banner */}
        <div className="relative overflow-hidden bg-sky-900 rounded-[2rem] p-8 md:p-10 mb-12 border border-white/10 shadow-[0_0_30px_rgba(13,148,136,0.15)] text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          </div>
          
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            <h3 className="text-xl md:text-3xl font-black text-white mb-3">Explore Our Recent Lab Work</h3>
            <p className="text-slate-200 text-xs md:text-sm mb-6 leading-relaxed">
              Check live user applications, software products, and verified student testimonials on our official digital portfolio space.
            </p>
            <a href="https://yotech.space" target="_blank" rel="noopener noreferrer">
              <Button3D className="font-extrabold gap-2">
                Visit yotech.space
                <FaArrowUpRightFromSquare className="text-xs" />
              </Button3D>
            </a>
          </div>
        </div>

        {/* Footer Base block */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3.5">
            <img 
              src="/yotechlogo.png" 
              alt="Yotech Digitals Logo" 
              className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(13,148,136,0.3)]"
            />
            <div>
              <div className="font-extrabold text-sm text-white">Yotech Digitals</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Building the future, one deploy at a time</div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <a href="https://yotech.space" target="_blank" rel="noopener" className="hover:text-teal-400 transition-colors flex items-center gap-1.5">
              <FaGlobe /> yotech.space
            </a>
            <span>•</span>
            <span className="normal-case text-slate-600 font-medium">© {new Date().getFullYear()} Yotech Digitals</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
