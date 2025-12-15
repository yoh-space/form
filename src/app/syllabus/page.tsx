"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Compass, Blocks, Brain, Wrench, Zap, TrendingUp, Video, FileText, Eye, MessageSquare, CheckCircle2, Award, Rocket, Target, Calendar } from "lucide-react";

const phases = [
  {
    phase: 0,
    title: "Orientation & App Idea Formation",
    duration: "Weeks 1–2",
    Icon: Compass,
    color: "from-blue-500 to-cyan-500",
    description: "Give you clarity, direction, and motivation before coding begins.",
    topics: [
      "Program onboarding and expectations",
      "App idea brainstorming and refinement",
      "Problem → user → solution thinking",
      "Basic market validation using AppBrain",
      "Creating a personal learning plan"
    ],
    deliverables: [
      "One clear app idea or problem statement",
      "Simple feature list for your app",
      "Ready development environment"
    ]
  },
  {
    phase: 1,
    title: "Technology Fundamentals",
    duration: "Month 1",
    Icon: Blocks,
    color: "from-purple-500 to-pink-500",
    description: "Build a strong foundation and remove confusion about tools and technologies.",
    topics: [
      "JavaScript fundamentals",
      "Node.js basics and ecosystem",
      "React fundamentals",
      "Introduction to React Native",
      "Expo ecosystem overview",
      "Firebase basics",
      "Git & GitHub fundamentals"
    ],
    deliverables: [
      "Understand what each technology does and why it matters",
      "Have a complete development setup",
      "Use GitHub to manage your code"
    ]
  },
  {
    phase: 2,
    title: "Core Concepts & App Building",
    duration: "Month 2–3",
    Icon: Brain,
    color: "from-green-500 to-emerald-500",
    description: "Learn core concepts and start building real app features.",
    topics: [
      "Node.js basics and APIs",
      "React fundamentals (components, state, props, hooks)",
      "React Native core components and styling",
      "Essential libraries (Axios, Firebase, Navigation, etc.)",
      "Performance basics"
    ],
    deliverables: [
      "Build real app screens",
      "Connect your app to data",
      "Navigate between screens",
      "Understand how apps actually work"
    ]
  },
  {
    phase: 3,
    title: "Workflows, Tooling & Publishing Basics",
    duration: "Month 4",
    Icon: Wrench,
    color: "from-orange-500 to-red-500",
    description: "Understand production workflows and prepare for publishing.",
    topics: [
      "React Native workflows (Expo Managed, Prebuild, Development Build, Bare)",
      "GitHub best practices",
      "Introduction to CI/CD",
      "Firebase project setup",
      "Google Play Console basics",
      "App signing and build concepts"
    ],
    deliverables: [
      "Understand how production apps are prepared",
      "Choose the correct workflow confidently",
      "Be ready for publishing steps"
    ]
  },
  {
    phase: 4,
    title: "AI-Assisted Development & Productivity",
    duration: "Month 5",
    Icon: Zap,
    color: "from-indigo-500 to-blue-500",
    description: "Leverage AI tools to work faster and smarter.",
    topics: [
      "Using free AI tools responsibly",
      "Writing good prompts",
      "Debugging and improving code with AI",
      "Planning features using agentic tools",
      "UI/UX inspiration sources",
      "Component libraries and starter projects"
    ],
    deliverables: [
      "Work faster without losing understanding",
      "Design cleaner app interfaces",
      "Improve productivity and confidence"
    ]
  },
  {
    phase: 5,
    title: "Product Thinking, Monetization & Launch",
    duration: "Month 6",
    Icon: TrendingUp,
    color: "from-rose-500 to-pink-500",
    description: "Finalize your app and prepare for real-world launch.",
    topics: [
      "Market research using AppBrain",
      "Competitor analysis",
      "Monetization basics (ads, subscriptions, freemium)",
      "Performance optimization",
      "Security awareness",
      "Launch strategy"
    ],
    deliverables: [
      "Publish or prepare your app for release",
      "Understand how apps make money",
      "Plan next improvements"
    ]
  }
];

const monthlyOutcomes = [
  {
    month: 1,
    title: "Foundations",
    items: [
      "Development environment ready",
      "GitHub workflow set",
      "App idea defined and validated"
    ]
  },
  {
    month: 2,
    title: "Core Skills",
    items: [
      "Basic app screens built",
      "Strong understanding of fundamentals",
      "First version of app UI"
    ]
  },
  {
    month: 3,
    title: "Features",
    items: [
      "App connected to backend/Firebase",
      "Authentication and data storage",
      "Navigation implemented"
    ]
  },
  {
    month: 4,
    title: "Production Readiness",
    items: [
      "Correct workflow selected",
      "App configured for production",
      "Publishing process understood"
    ]
  },
  {
    month: 5,
    title: "AI & Productivity",
    items: [
      "Faster development with AI",
      "Improved UI/UX",
      "Feature refinement"
    ]
  },
  {
    month: 6,
    title: "Launch & Growth",
    items: [
      "App published or ready",
      "Monetization plan defined",
      "Portfolio-ready project",
      "Clear next career steps"
    ]
  }
];

export default function Syllabus() {
  const [mounted, setMounted] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 hover:text-blue-600 transition-colors">
            <Rocket className="w-6 h-6 text-blue-600" />
            Yo-Tech
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Home
            </Link>
            <a href="https://yotech.space" target="_blank" rel="noopener" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              About
            </a>
            <Link href="/" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              Enroll
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="relative overflow-hidden border-b border-gray-200/50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Rocket className="w-10 h-10 text-blue-600" />
              React Native Mentorship
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              A 6-month journey to build real apps, master modern development, and launch your career.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="font-medium">6 Months</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Video className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Live Sessions + Hands-on</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Build Your Own App</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Principle */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className={`bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-2xl p-8 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
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
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${phase.color} text-white`}>
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
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
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
              className={`bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-200/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
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
        <div className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white transition-all duration-700 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
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

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Journey?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
            >
              Enroll Now
            </Link>
            <a
              href="https://yotech.space"
              target="_blank"
              rel="noopener"
              className="inline-block bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Learn More →
            </a>
          </div>
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
