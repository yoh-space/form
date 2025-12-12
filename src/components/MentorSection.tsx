"use client";

import { useEffect, useState, useRef } from "react";

export default function MentorSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Your Mentor</h2>
          <p className="text-gray-600">Experienced developer ready to guide your journey</p>
        </div>

        <div className={`bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* 3D Avatar */}
            <div className="relative" style={{ perspective: '500px' }}>
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-5xl font-bold shadow-2xl transform hover:rotate-y-12 transition-transform duration-500" style={{ transformStyle: 'preserve-3d' }}>
                <img src={'yoh.jpg'}>
                </img>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg animate-bounce-slow">
                ✓
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2"> React Native Developer</h3>
              <p className="text-gray-600 mb-4">
                Built over 4 production apps , passionate about teaching and helping developers 
                level up their skills through practical, hands-on mentorship.
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {["React Native", "TypeScript", "Node.js", "Firebase", "JSX"].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: "🎯", title: "Personalized Path", desc: "Curriculum tailored to your goals" },
            { icon: "💻", title: "Real Projects", desc: "Build apps you can showcase" },
            { icon: "🚀", title: "Career Ready", desc: "Job-ready skills & portfolio" }
          ].map((feature, i) => (
            <div 
              key={i}
              className={`bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500 cursor-default ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
