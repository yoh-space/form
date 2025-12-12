"use client";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="https://yotech.space" target="_blank" rel="noopener" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm transform group-hover:rotate-12 transition-transform duration-300">
            Y
          </div>
          <span className="font-semibold text-lg text-gray-800">Yo-Tech Solution</span>
        </a>
        <a href="#enroll" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5">
          Enroll Now
        </a>
      </div>
    </nav>
  );
}
