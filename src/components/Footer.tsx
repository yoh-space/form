"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-3">See Our Latest Projects</h3>
            <p className="text-white/80 mb-6">Discover what we&apos;ve built at Yo-Tech Solution</p>
            <a 
              href="https://yotech.space" 
              target="_blank" 
              rel="noopener"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Visit yotech.space
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
              Y
            </div>
            <div>
              <div className="font-semibold">Yo-Tech Solution</div>
              <div className="text-sm text-gray-400">Building the future, one app at a time</div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="https://yotech.space" target="_blank" rel="noopener" className="hover:text-white transition-colors">
              yotech.space
            </a>
            <span>•</span>
            <span>© 2024 Yo-Tech Solution</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
