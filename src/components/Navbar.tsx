"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGraduationCap } from "react-icons/fa6";
import Button3D from "./Button3D";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const scrollToEnroll = () => {
    const enrollSection = document.getElementById('enroll');
    if (enrollSection) {
      enrollSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-slate-950/60 backdrop-blur-xl border-b border-slate-900 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Glowing Logo */}
        <a href="https://yotech.space" target="_blank" rel="noopener" className="flex items-center gap-3.5 group">
          <img 
            src="/yotechlogo.png" 
            alt="Yotech Digitals Logo" 
            className="w-9 h-9 object-contain transform group-hover:rotate-12 transition-all duration-300 drop-shadow-[0_0_8px_rgba(13,148,136,0.5)]"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-sm md:text-base text-white tracking-tight group-hover:text-teal-400 transition-colors">
              Yotech Digitals
            </span>
            <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">
              Web & Mobile Labs
            </span>
          </div>
        </a>

        {/* Action Links */}
        <div className="flex items-center gap-5">
          {/* {session ? (
            <>
              <Link href="/dashboard" className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="/syllabus" className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors">
                Roadmap
              </Link>
            </>
          ) : (
            <Link href="/auth/signin" className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors">
              Login
            </Link>
          )} */}
          <Button3D className="font-bold gap-1 !text-xs !py-1.5 !px-2.5" onClick={scrollToEnroll}>
            <FaGraduationCap />
            Enroll Now
          </Button3D>
        </div>

      </div>
    </nav>
  );
}
