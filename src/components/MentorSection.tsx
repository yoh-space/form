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
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Become a Professional Mobile App Developer in 6 Months</h2>
          <p className="text-xl text-gray-600 mb-2">An exclusive, intensive mentorship program.</p>
          <p className="text-lg text-gray-600">Learn React Native, publish your app, and start earning.</p>
          <h3 className="text-2xl font-semibold text-blue-600 mt-6">React Native Mobile App Development Mentorship</h3>
          <p className="text-red-600 font-medium">(Limited to 15 Students)</p>
        </div>

        {/* Key Learning Outcomes */}
        <div className={`bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 mb-12 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">What You'll Learn</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Build & publish a real app on the Google Play Store.",
              "Master Expo, Dev Build, and Bare Workflow.",
              "Learn Next.js fundamentals for web development.",
              "Integrate AI tools to accelerate development.",
              "Discover app monetization strategies.",
              "Learn vulnerability scanning for mobile & web apps.",
              "Compete for rewards as a top performer."
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-green-500 text-xl">✅</span>
                <p className="text-gray-700">{outcome}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Program Details */}
        <div className={`bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">Program Details</h4>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-gray-900">Duration:</h5>
                <p className="text-gray-700">6 Months</p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">Format:</h5>
                <p className="text-gray-700">Live Online Sessions + Hands-on Projects</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-gray-900">Support:</h5>
                <p className="text-gray-700">Zoom & Telegram Group</p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">Seats:</h5>
                <p className="text-red-600 font-semibold">15 Students Only</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
