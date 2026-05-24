"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Compass, Blocks, Brain, Wrench, Zap, TrendingUp, Video, FileText, Eye, MessageSquare, CheckCircle2, Award, Rocket, Target, Calendar } from "lucide-react";

const phases = [
  {
    phase: 1,
    title: "First Semester: Fundamentals & Foundation",
    duration: "Weeks 1–8",
    Icon: Compass,
    color: "bg-sky-500",
    description: "Build a strong foundation in React Native, JavaScript, and mobile development fundamentals.",
    topics: [
      "Fundamentals to Mobile Application",
      "App idea brainstorming",
      "App Idea validation",
      "More About React Native and React",
      "Expo and Expo Snack",
      "How JavaScript works with React Native",
      "Node.js Environment setup",
      "Git, GitHub, Reddit, X, Quora, Stack Overflow Introduction",
      "React Native Components",
      "JavaScript (Var, Const, Let, Template literals, arrays)",
      "Creating Expo App",
      "GitHub CI/CD",
      "React Native Core Components (View, Button, TouchableOpacity, Text, StyleSheet API)",
      "Third Party Packages (react-native-safe-area-context, react-native-paper)",
      "Passing Props to components",
      "Basic function declaration",
      "React State Management (useEffect, useState, useContext)",
      "Implementation of setInterval() method inside useEffect",
      "Context Provider implementation",
      "Community Component & Packages usage",
      "Introduction to local build with assembleRelease",
      "Async Storage using @react-native-async-storage/async-storage",
      "Animation using lottie-react-native",
      "Onboarding Screen design using react-native-onboarding-swiper",
      "Other utility packages (react-native-edge-to-edge, react-native-safe-area-context, react-native-paper)",
      "Expo router and local parameter passing implementation",
      "Expo Drawer navigation"
    ],
    deliverables: [
      "Complete development environment setup",
      "Strong understanding of React Native fundamentals",
      "Working GitHub workflow",
      "Foundation app with navigation and state management"
    ]
  },
  {
    phase: 2,
    title: "Second Semester: App Building (Weeks 1-3)",
    duration: "Weeks 9–11",
    Icon: Blocks,
    color: "bg-emerald-500",
    description: "Build the foundation of your news app with UI, state management, and backend integration.",
    topics: [
      "Week 1: Project Setup & UI Foundation (Project structure, Expo Router, Basic UI design)",
      "Week 2: Scroll & List Rendering (ScrollView vs FlatList, Dynamic list rendering, Image integration)",
      "Week 3: Zustand Global State (Global state definition, Store creation, Cross-screen data sharing)",
      "Week 4: Firebase Authentication (Signup, Login, Logout flows, Auth state handling)",
      "Week 5: Admin Role Detection (Role-based logic, Conditional rendering, Feature visibility control)",
      "Week 6: Convex Backend Read (Backend fundamentals, Data fetching from Convex, UI synchronization)"
    ],
    deliverables: [
      "Home screen with news card component",
      "News feed with seamless scrolling",
      "Zustand store for news data management",
      "Login screen with main app protection",
      "Admin detection and feature visibility",
      "News data loaded from Convex backend"
    ]
  },
  {
    phase: 3,
    title: "Second Semester: Advanced Features (Weeks 4-6)",
    duration: "Weeks 12–14",
    Icon: Wrench,
    color: "bg-teal-500",
    description: "Implement CRUD operations, forms, and monetization features.",
    topics: [
      "Week 7: Convex Backend Write Data (Create and delete operations, Admin news addition/deletion)",
      "Week 8: Forms & Image Handling (Form inputs, Image handling with URLs or assets)",
      "Week 9: AdMob Integration (Banner ads, App monetization principles)"
    ],
    deliverables: [
      "Admin panel for news management",
      "Add News screen with form validation",
      "AdMob integration in news screen"
    ]
  },
  {
    phase: 4,
    title: "Second Semester: Deployment & Launch (Weeks 7-9)",
    duration: "Weeks 15–17",
    Icon: Zap,
    color: "bg-amber-500",
    description: "Secure configuration, AI tools, and app publishing to Google Play Store.",
    topics: [
      "Week 10: Environment Variables + AI Tools (.env basics, API key security, Effective AI tool usage)",
      "Week 11-12: App Publishing (APK/AAB build process, Google Play Console setup, Store listing optimization)"
    ],
    deliverables: [
      "Secure configuration with environment variables",
      "Debugging with AI assistance",
      "Published app on Google Play Store",
      "App Store Optimization (ASO)"
    ]
  }
];

const monthlyOutcomes = [
  {
    month: 1,
    title: "First Semester: Foundations",
    items: [
      "Development environment ready (Node.js, Expo, Git)",
      "GitHub workflow set with CI/CD",
      "App idea defined and validated",
      "React Native fundamentals mastered",
      "JavaScript basics (Var, Const, Let, arrays, functions)"
    ]
  },
  {
    month: 2,
    title: "First Semester: Core Skills",
    items: [
      "React Native components and styling mastered",
      "State management (useState, useEffect, useContext)",
      "Navigation with Expo Router implemented",
      "Third-party packages integration",
      "Local build and deployment basics"
    ]
  },
  {
    month: 3,
    title: "Second Semester: App Building",
    items: [
      "Project structure and UI foundation complete",
      "News feed with scrolling and list rendering",
      "Zustand global state management implemented",
      "Firebase authentication (Login/Signup)",
      "Admin role detection and conditional rendering",
      "Convex backend integration for data fetching"
    ]
  },
  {
    month: 4,
    title: "Second Semester: Advanced & Launch",
    items: [
      "Admin panel for news management (CRUD)",
      "Forms and image handling implemented",
      "AdMob banner ads integrated",
      "Environment variables and AI tools setup",
      "App published on Google Play Store",
      "App Store Optimization (ASO) completed"
    ]
  }
];

export default function Syllabus() {
  const [mounted, setMounted] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="relative overflow-hidden border-b border-gray-200/50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Rocket className="w-10 h-10 text-blue-600" />
              Detailed Roadmap
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Your 6-month journey to build real apps, master modern development, and launch your career.
            </p>
          </div>
        </div>
      </div>

      {/* Core Principle */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className={`bg-sky-50 border border-blue-200/50 rounded-2xl p-8 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <p className="text-lg text-gray-800">
            <span className="font-bold text-blue-600">Core Principle:</span> You will learn by building <span className="font-semibold">your own app idea</span>. Every topic, tool, and exercise is connected to a real project.
          </p>
        </div>
      </div>

      {/* Phases */}
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
          <Compass className="w-8 h-8 text-blue-600" />
          Learning Phases
        </h2>

        <div className="space-y-6">
          {phases.map((phase, idx) => (
            <div
              key={phase.phase}
              className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${(idx + 1) * 100}ms` }}
            >
              <button
                onClick={() => setExpandedPhase(expandedPhase === phase.phase ? null : phase.phase)}
                className="w-full text-left"
              >
                <div className={`bg-white border border-gray-200/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <phase.Icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            Phase {phase.phase}: {phase.title}
                          </h3>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${phase.color} text-white`}>
                            {phase.duration}
                          </span>
                        </div>
                        <p className="text-gray-600">{phase.description}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedPhase === phase.phase ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Expanded Content */}
                  {expandedPhase === phase.phase && (
                    <div className="mt-6 pt-6 border-t border-gray-200/50 space-y-6 animate-fade-in">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-600" /> Key Topics
                        </h4>
                        <ul className="space-y-2">
                          {phase.topics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700">
                              <span className="text-blue-500 font-bold mt-0.5">•</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600" /> By the End of This Phase
                        </h4>
                        <ul className="space-y-2">
                          {phase.deliverables.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700">
                              <span className="text-green-500 font-bold mt-0.5">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Outcomes */}
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
          <Calendar className="w-8 h-8 text-blue-600" /> Monthly Outcomes Map
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {monthlyOutcomes.map((outcome, idx) => (
            <div
              key={outcome.month}
              className={`bg-white border border-gray-200/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${(idx + 1) * 50}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold">
                  {outcome.month}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{outcome.title}</h3>
              </div>
              <ul className="space-y-2">
                {outcome.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-blue-500 mt-1">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
          <Target className="w-8 h-8 text-blue-600" /> Key Features
        </h2>

        <div className="space-y-8">
          {/* User Features */}
          <div className={`bg-sky-50 border border-blue-200/50 rounded-xl p-6 transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-blue-600" /> User Features
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-blue-500 font-bold mt-0.5">•</span>
                <span><strong>News Article Viewing:</strong> Users can browse and read news articles within the application.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-blue-500 font-bold mt-0.5">•</span>
                <span><strong>News Feed Scrolling:</strong> A seamless scrolling experience for navigating through the news feed.</span>
              </li>
            </ul>
          </div>

          {/* Admin Features */}
          <div className={`bg-emerald-50 border border-emerald-200/50 rounded-xl p-6 transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Wrench className="w-6 h-6 text-emerald-600" /> Admin Features
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-emerald-500 font-bold mt-0.5">•</span>
                <span><strong>News Article Management:</strong> Administrators possess the capability to add new news articles.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-emerald-500 font-bold mt-0.5">•</span>
                <span><strong>News Article Deletion:</strong> Administrators can remove existing news articles from the platform.</span>
              </li>
            </ul>
          </div>

          {/* Authentication */}
          <div className={`bg-amber-50 border border-amber-200/50 rounded-xl p-6 transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-amber-600" /> Authentication
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span><strong>Login/Signup:</strong> Secure user authentication through login and registration functionalities.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span><strong>Role Detection:</strong> Automatic detection of user roles (admin/standard user) based on email.</span>
              </li>
            </ul>
          </div>

          {/* Backend */}
          <div className={`bg-teal-50 border border-teal-200/50 rounded-xl p-6 transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Brain className="w-6 h-6 text-teal-600" /> Backend
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-teal-500 font-bold mt-0.5">•</span>
                <span><strong>Convex Integration:</strong> News data is securely stored and managed within the Convex backend.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-teal-500 font-bold mt-0.5">•</span>
                <span><strong>Real-time Sync:</strong> Ensures that data updates are reflected instantly across the application.</span>
              </li>
            </ul>
          </div>

          {/* State Management */}
          <div className={`bg-violet-50 border border-violet-200/50 rounded-xl p-6 transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-violet-600" /> State Management
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-violet-500 font-bold mt-0.5">•</span>
                <span><strong>Zustand:</strong> Utilizes Zustand for efficient and scalable global state management throughout the application.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-violet-500 font-bold mt-0.5">•</span>
                <span><strong>Performance:</strong> Minimal re-renders and clean store architecture.</span>
              </li>
            </ul>
          </div>

          {/* Monetization */}
          <div className={`bg-rose-50 border border-rose-200/50 rounded-xl p-6 transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-rose-600" /> Monetization
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-rose-500 font-bold mt-0.5">•</span>
                <span><strong>AdMob Banner Ads:</strong> Integration of AdMob banner advertisements to facilitate revenue generation.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-rose-500 font-bold mt-0.5">•</span>
                <span><strong>Strategic Placement:</strong> Balancing revenue with optimal user experience.</span>
              </li>
            </ul>
          </div>

          {/* Deployment */}
          <div className={`bg-green-50 border border-green-200/50 rounded-xl p-6 transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Rocket className="w-6 h-6 text-green-600" /> Deployment
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-green-500 font-bold mt-0.5">•</span>
                <span><strong>Google Play Store:</strong> The final application will be published and made available on the Google Play Store.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700">
                <span className="text-green-500 font-bold mt-0.5">•</span>
                <span><strong>ASO:</strong> App Store Optimization for better discoverability.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Support System */}
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
          <Award className="w-8 h-8 text-blue-600" /> Mentorship Support System
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { Icon: Video, title: "Weekly Live Sessions", desc: "Interactive learning with real-time Q&A" },
            { Icon: FileText, title: "Guided Assignments", desc: "Structured exercises connected to your app" },
            { Icon: Eye, title: "Code Reviews", desc: "Personalized feedback on your code" },
            { Icon: MessageSquare, title: "Telegram Support", desc: "Private group for quick questions" },
            { Icon: CheckCircle2, title: "Accountability Check-ins", desc: "Stay on track with progress reviews" },
            { Icon: Award, title: "Performance Rewards", desc: "Recognition and incentives for milestones" }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`bg-gray-50 border border-gray-200/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${(idx + 1) * 50}ms` }}
            >
              <item.Icon className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Outcome */}
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className={`bg-sky-600 rounded-2xl p-12 text-white transition-all duration-700 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Award className="w-8 h-8" /> Final Outcome
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              "Think like a developer",
              "Build and ship a real app",
              "Understand modern app workflows",
              "Be ready for jobs, freelancing, or startups"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-lg font-semibold italic">
            You are not just learning code — you are building your future.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200/50 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center text-gray-600 text-sm">
          <p>
            Powered by <a href="https://yotech.space" target="_blank" rel="noopener" className="text-blue-600 hover:underline font-medium">Yo-Tech Solution</a>
          </p>
        </div>
      </div>
    </div>
  );
}
