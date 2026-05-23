"use client";

import React from "react";

export function Input({ label, value, onChange, type = "text", placeholder = "" }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  const inputId = label.toLowerCase().replace(/[^a-z0-9]/g, "-");

  return (
    <div className="glitch-input-wrapper my-3">
      <div className="input-container">
        <input
          type={type}
          id={inputId}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder=" "
          className="holo-input"
          required
        />
        <label htmlFor={inputId} className="input-label" data-text={label}>
          {label}
        </label>
        <div className="input-border" />
        <div className="input-scanline" />
        <div className="input-glow" />
        
        {/* Animated stream bars */}
        <div className="input-data-stream">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className="stream-bar"
              style={{ "--i": idx } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Techno cyber corners */}
        <div className="input-corners">
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />
        </div>
      </div>
    </div>
  );
}

export function Textarea({ label, value, onChange, placeholder = "" }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const inputId = label.toLowerCase().replace(/[^a-z0-9]/g, "-");

  return (
    <div className="glitch-input-wrapper my-3">
      <div className="input-container">
        <textarea
          id={inputId}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder=" "
          rows={3}
          className="holo-input h-24 py-3.5 resize-none"
          required
        />
        <label htmlFor={inputId} className="input-label" data-text={label}>
          {label}
        </label>
        <div className="input-border" />
        <div className="input-scanline" />
        <div className="input-glow" />
        
        {/* Animated stream bars */}
        <div className="input-data-stream">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className="stream-bar"
              style={{ "--i": idx } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Techno cyber corners */}
        <div className="input-corners">
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />
        </div>
      </div>
    </div>
  );
}

export function OptionButton({ selected, onClick, children, className = "" }: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative p-5 rounded-2xl border text-sm text-left transition-all duration-300 group overflow-hidden ${
        selected 
          ? "border-teal-500/50 bg-teal-950/30 text-white shadow-[0_0_20px_rgba(13,148,136,0.15)]" 
          : "border-slate-800 bg-slate-900/20 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50 hover:scale-[1.02]"
      } ${className}`}
    >
      <div className="relative z-10 flex flex-col h-full justify-between gap-1">
        {children}
      </div>
      
      {/* Background radial gradient spotlight for selected options */}
      {selected && (
        <span className="absolute inset-0 -z-0 bg-sky-500/10 opacity-100 transition-opacity duration-300" />
      )}
      
      {/* Hover background highlight effect */}
      <span className="absolute inset-0 -z-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
  );
}

export function TagButton({ selected, onClick, children }: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 overflow-hidden ${
        selected
          ? "bg-sky-500 text-white shadow-[0_0_15px_rgba(13,148,136,0.3)] scale-105 font-bold"
          : "bg-slate-900/50 border border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700 hover:scale-102"
      }`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="relative w-full">
      {/* Sleek track */}
      <div className="h-1.5 bg-slate-950/80 rounded-full overflow-hidden border border-slate-900">
        <div 
          className="h-full bg-sky-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(13,148,136,0.5)]"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
      
      {/* Numbers / Dots Indicator */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: total }, (_, i) => {
          const isActive = i + 1 <= step;
          const isCurrent = i + 1 === step;
          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div 
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-500 relative border ${
                  isActive 
                    ? 'bg-sky-500 text-white border-transparent shadow-[0_0_15px_rgba(13,148,136,0.3)] scale-110' 
                    : 'bg-slate-900/60 text-slate-500 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Glow ring around the current active step */}
                {isCurrent && (
                  <span className="absolute -inset-1.5 rounded-2xl bg-teal-500/20 blur-sm animate-pulse pointer-events-none" />
                )}
                {i + 1 < step ? (
                  <svg className="w-4 h-4 text-white font-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
