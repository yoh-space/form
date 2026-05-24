"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { FiUsers, FiCalendar, FiFilter, FiSearch, FiStar, FiTrendingUp, FiClock, FiMail, FiPhone, FiMessageSquare, FiDollarSign, FiTarget, FiZap, FiChevronDown, FiCheckCircle, FiBriefcase, FiCode, FiAward } from "react-icons/fi";

export default function AdminPage() {
  const enrollments = useQuery(api.enrollments.getAll);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [batchFilter, setBatchFilter] = useState<"all" | "first" | "second">("all");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  if (!enrollments) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-500 border-t-transparent mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg">Loading enrollments...</p>
        </div>
      </div>
    );
  }

  // Categorize by batch based on submission date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const categorizedEnrollments = enrollments.map(e => ({
    ...e,
    batch: new Date(e._creationTime) < today ? "first" : "second"
  }));

  const filteredEnrollments = categorizedEnrollments
    .filter(e => {
      const matchesFilter = 
        e.fullName.toLowerCase().includes(filter.toLowerCase()) ||
        e.email.toLowerCase().includes(filter.toLowerCase()) ||
        e.technicalBackground.toLowerCase().includes(filter.toLowerCase());
      
      const matchesBatch = 
        batchFilter === "all" || 
        (batchFilter === "first" && e.batch === "first") ||
        (batchFilter === "second" && e.batch === "second");
      
      return matchesFilter && matchesBatch;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return b._creationTime - a._creationTime;
      if (sortBy === "oldest") return a._creationTime - b._creationTime;
      if (sortBy === "name") return a.fullName.localeCompare(b.fullName);
      return 0;
    });

  const firstBatchCount = categorizedEnrollments.filter(e => e.batch === "first").length;
  const secondBatchCount = categorizedEnrollments.filter(e => e.batch === "second").length;

  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <FiUsers className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">Mentorship Enrollments</h1>
              </div>
              <p className="text-gray-400 mt-1">{enrollments.length} total applications</p>
            </div>
            
            {/* Stats Cards */}
            <div className="flex gap-4">
              <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-4 min-w-[140px]">
                <div className="flex items-center gap-2 mb-1">
                  <FiStar className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-400 text-sm font-semibold">1st Batch</span>
                </div>
                <p className="text-2xl font-bold text-white">{firstBatchCount}</p>
              </div>
              <div className="bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/30 rounded-2xl p-4 min-w-[140px]">
                <div className="flex items-center gap-2 mb-1">
                  <FiTrendingUp className="w-5 h-5 text-teal-400" />
                  <span className="text-teal-400 text-sm font-semibold">2nd Batch</span>
                </div>
                <p className="text-2xl font-bold text-white">{secondBatchCount}</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or background..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={batchFilter}
                  onChange={(e) => setBatchFilter(e.target.value as "all" | "first" | "second")}
                  className="pl-12 pr-10 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  <option value="all">All Batches</option>
                  <option value="first">1st Batch</option>
                  <option value="second">2nd Batch</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        {filter && (
          <div className="mb-6">
            <p className="text-gray-400">
              Showing <span className="text-teal-400 font-semibold">{filteredEnrollments.length}</span> of <span className="text-white">{enrollments.length}</span> enrollments
            </p>
          </div>
        )}

        {/* Enrollments Grid */}
        <div className="space-y-6">
          {filteredEnrollments.map((enrollment) => (
            <div 
              key={enrollment._id} 
              className={`group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-3xl ${
                enrollment.batch === "first" 
                  ? "bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-500/30" 
                  : "bg-gradient-to-br from-teal-900/30 to-emerald-900/30 border border-teal-500/30"
              }`}
            >
              {/* Batch Badge */}
              <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                enrollment.batch === "first"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                  : "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
              }`}>
                {enrollment.batch === "first" ? "1st Batch" : "2nd Batch"}
              </div>

              {/* Header */}
              <div className={`p-6 ${enrollment.batch === "first" ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20" : "bg-gradient-to-r from-teal-500/20 to-emerald-500/20"}`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        enrollment.batch === "first" ? "bg-amber-500/30" : "bg-teal-500/30"
                      }`}>
                        <FiBriefcase className={`w-6 h-6 ${enrollment.batch === "first" ? "text-amber-400" : "text-teal-400"}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{enrollment.fullName}</h3>
                        <p className="text-gray-300 text-sm">{enrollment.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        enrollment.batch === "first" ? "bg-amber-500/20 text-amber-300" : "bg-teal-500/20 text-teal-300"
                      }`}>
                        <FiTarget className="w-3.5 h-3.5" />
                        {enrollment.mentorshipFocus}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        enrollment.batch === "first" ? "bg-amber-500/20 text-amber-300" : "bg-teal-500/20 text-teal-300"
                      }`}>
                        <FiClock className="w-3.5 h-3.5" />
                        {enrollment.weeklyHours}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${
                      enrollment.batch === "first" ? "bg-amber-500/30 text-amber-300" : "bg-teal-500/30 text-teal-300"
                    }`}>
                      <FiCalendar className="w-4 h-4" />
                      {new Date(enrollment._creationTime).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Contact Info */}
                  <div className="space-y-4">
                    <h4 className={`font-semibold text-sm uppercase tracking-wider flex items-center gap-2 ${
                      enrollment.batch === "first" ? "text-amber-400" : "text-teal-400"
                    }`}>
                      <FiMail className="w-4 h-4" />
                      Contact
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          enrollment.batch === "first" ? "bg-amber-500/20" : "bg-teal-500/20"
                        }`}>
                          <FiPhone className={`w-4 h-4 ${enrollment.batch === "first" ? "text-amber-400" : "text-teal-400"}`} />
                        </div>
                        <span className="text-gray-300">{enrollment.phoneNumber || "Not provided"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          enrollment.batch === "first" ? "bg-amber-500/20" : "bg-teal-500/20"
                        }`}>
                          <FiMessageSquare className={`w-4 h-4 ${enrollment.batch === "first" ? "text-amber-400" : "text-teal-400"}`} />
                        </div>
                        <span className="text-gray-300">@{enrollment.telegramUsername}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          enrollment.batch === "first" ? "bg-amber-500/20" : "bg-teal-500/20"
                        }`}>
                          <FiDollarSign className={`w-4 h-4 ${enrollment.batch === "first" ? "text-amber-400" : "text-teal-400"}`} />
                        </div>
                        <span className="text-gray-300">{enrollment.expectedPrice || "Not provided"} ETB</span>
                      </div>
                    </div>
                  </div>

                  {/* Technical Background */}
                  <div className="space-y-4">
                    <h4 className={`font-semibold text-sm uppercase tracking-wider flex items-center gap-2 ${
                      enrollment.batch === "first" ? "text-amber-400" : "text-teal-400"
                    }`}>
                      <FiCode className="w-4 h-4" />
                      Background
                    </h4>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <span className="text-gray-500">Level:</span>
                        <span className="text-gray-300 ml-2">{enrollment.technicalBackground}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Built App:</span>
                        <span className="text-gray-300 ml-2">{enrollment.hasBuiltApp}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Learning:</span>
                        <span className="text-gray-300 ml-2">{enrollment.learningStyle}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Technologies:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {enrollment.technologiesUsed.map((tech, i) => (
                            <span 
                              key={i} 
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                                enrollment.batch === "first" 
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" 
                                  : "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Commitment & Goals */}
                  <div className="space-y-4">
                    <h4 className={`font-semibold text-sm uppercase tracking-wider flex items-center gap-2 ${
                      enrollment.batch === "first" ? "text-amber-400" : "text-teal-400"
                    }`}>
                      <FiZap className="w-4 h-4" />
                      Commitment
                    </h4>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <span className="text-gray-500">Has App Idea:</span>
                        <span className="text-gray-300 ml-2">{enrollment.hasAppIdea}</span>
                      </div>
                      {enrollment.appIdeaDescription && (
                        <div className={`p-3 rounded-xl text-xs ${
                          enrollment.batch === "first" ? "bg-amber-500/10 border border-amber-500/20" : "bg-teal-500/10 border border-teal-500/20"
                        }`}>
                          <span className="text-gray-500">App Idea:</span>
                          <p className="text-gray-300 mt-1">{enrollment.appIdeaDescription}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expand Button */}
                <button
                  onClick={() => toggleExpand(enrollment._id)}
                  className={`mt-6 w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    enrollment.batch === "first"
                      ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30"
                      : "bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30"
                  }`}
                >
                  {expandedCard === enrollment._id ? (
                    <>
                      <FiCheckCircle className="w-4 h-4" />
                      Hide Full Details
                    </>
                  ) : (
                    <>
                      <FiAward className="w-4 h-4" />
                      View Full Details
                    </>
                  )}
                </button>

                {/* Expandable Details */}
                {expandedCard === enrollment._id && (
                  <div className={`mt-6 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in ${
                    enrollment.batch === "first" ? "bg-amber-500/10 border border-amber-500/20" : "bg-teal-500/10 border border-teal-500/20"
                  }`}>
                    <div>
                      <h5 className={`font-semibold mb-2 flex items-center gap-2 ${enrollment.batch === "first" ? "text-amber-400" : "text-teal-400"}`}>
                        <FiTarget className="w-4 h-4" />
                        Expectations
                      </h5>
                      <p className="text-sm text-gray-300 leading-relaxed">{enrollment.expectations}</p>
                    </div>
                    <div>
                      <h5 className={`font-semibold mb-2 flex items-center gap-2 ${enrollment.batch === "first" ? "text-amber-400" : "text-teal-400"}`}>
                        <FiZap className="w-4 h-4" />
                        Why React Native
                      </h5>
                      <p className="text-sm text-gray-300 leading-relaxed">{enrollment.whyReactNative}</p>
                    </div>
                    <div>
                      <h5 className={`font-semibold mb-2 flex items-center gap-2 ${enrollment.batch === "first" ? "text-amber-400" : "text-teal-400"}`}>
                        <FiTrendingUp className="w-4 h-4" />
                        Long Term Goal
                      </h5>
                      <p className="text-sm text-gray-300 leading-relaxed">{enrollment.longTermGoal}</p>
                    </div>
                    <div>
                      <h5 className={`font-semibold mb-2 flex items-center gap-2 ${enrollment.batch === "first" ? "text-amber-400" : "text-teal-400"}`}>
                        <FiBriefcase className="w-4 h-4" />
                        Challenges
                      </h5>
                      <p className="text-sm text-gray-300 leading-relaxed">{enrollment.challenges}</p>
                    </div>
                    <div>
                      <h5 className={`font-semibold mb-2 flex items-center gap-2 ${enrollment.batch === "first" ? "text-amber-400" : "text-teal-400"}`}>
                        <FiUsers className="w-4 h-4" />
                        Mentor Needs
                      </h5>
                      <p className="text-sm text-gray-300 leading-relaxed">{enrollment.mentorNeeds}</p>
                    </div>
                    {enrollment.specialRequirements && (
                      <div>
                        <h5 className={`font-semibold mb-2 flex items-center gap-2 ${enrollment.batch === "first" ? "text-amber-400" : "text-teal-400"}`}>
                          <FiStar className="w-4 h-4" />
                          Special Requirements
                        </h5>
                        <p className="text-sm text-gray-300 leading-relaxed">{enrollment.specialRequirements}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredEnrollments.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800/50 flex items-center justify-center">
              <FiSearch className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No enrollments found</h3>
            <p className="text-gray-400">Try adjusting your search criteria or batch filter</p>
          </div>
        )}
      </div>
    </div>
  );
}