"use client";

export function Input({ label, value, onChange, type = "text", placeholder = "" }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="group">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-gray-300"
      />
    </div>
  );
}

export function Textarea({ label, value, onChange, placeholder = "" }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 resize-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 hover:border-gray-300"
      />
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
      className={`p-4 rounded-xl border text-sm text-left transition-all duration-300 hover:scale-[1.02] ${
        selected 
          ? "border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-md shadow-blue-500/10" 
          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
      } ${className}`}
    >
      {children}
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
      className={`px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105 ${
        selected
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

export function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="relative">
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, i) => (
          <div 
            key={i}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
              i + 1 <= step 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-110' 
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {i + 1 < step ? '✓' : i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
