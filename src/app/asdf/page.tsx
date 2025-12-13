"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

export default function AdminPage() {
  const enrollments = useQuery(api.enrollments.getAll);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  if (!enrollments) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading enrollments...</p>
        </div>
      </div>
    );
  }

  const filteredEnrollments = enrollments
    .filter(e => 
      e.fullName.toLowerCase().includes(filter.toLowerCase()) ||
      e.email.toLowerCase().includes(filter.toLowerCase()) ||
      e.technicalBackground.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") return b._creationTime - a._creationTime;
      if (sortBy === "oldest") return a._creationTime - b._creationTime;
      if (sortBy === "name") return a.fullName.localeCompare(b.fullName);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mentorship Enrollments</h1>
              <p className="text-gray-600 mt-1">{enrollments.length} total applications</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search by name, email, or background..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {filteredEnrollments.length} of {enrollments.length} enrollments
            </p>
          </div>
        )}

        {/* Enrollments Grid */}
        <div className="space-y-6">
          {filteredEnrollments.map((enrollment) => (
            <div key={enrollment._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{enrollment.fullName}</h3>
                    <p className="text-blue-100 mt-1">{enrollment.email}</p>
                  </div>
                  <div className="mt-3 md:mt-0 text-right">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/20">
                      {enrollment.mentorshipFocus}
                    </div>
                    <p className="text-blue-100 text-sm mt-1">
                      {new Date(enrollment._creationTime).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Contact Info */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">Contact</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Phone:</span> {enrollment.phoneNumber || "Not provided"}</p>
                      <p><span className="text-gray-500">Telegram:</span> @{enrollment.telegramUsername}</p>
                      <p><span className="text-gray-500">Payment:</span> {enrollment.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Technical Background */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">Background</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Level:</span> {enrollment.technicalBackground}</p>
                      <p><span className="text-gray-500">Built App:</span> {enrollment.hasBuiltApp}</p>
                      <p><span className="text-gray-500">Learning:</span> {enrollment.learningStyle}</p>
                      <div>
                        <span className="text-gray-500">Technologies:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {enrollment.technologiesUsed.map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Commitment & Goals */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">Commitment</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Weekly Hours:</span> {enrollment.weeklyHours}</p>
                      <p><span className="text-gray-500">Has App Idea:</span> {enrollment.hasAppIdea}</p>
                      {enrollment.appIdeaDescription && (
                        <div>
                          <span className="text-gray-500">App Idea:</span>
                          <p className="text-gray-700 mt-1 text-xs bg-gray-50 p-2 rounded">
                            {enrollment.appIdeaDescription}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable Details */}
                <details className="mt-6">
                  <summary className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium">
                    View Full Details
                  </summary>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Expectations</h5>
                      <p className="text-sm text-gray-700">{enrollment.expectations}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Why React Native</h5>
                      <p className="text-sm text-gray-700">{enrollment.whyReactNative}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Long Term Goal</h5>
                      <p className="text-sm text-gray-700">{enrollment.longTermGoal}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Challenges</h5>
                      <p className="text-sm text-gray-700">{enrollment.challenges}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Mentor Needs</h5>
                      <p className="text-sm text-gray-700">{enrollment.mentorNeeds}</p>
                    </div>
                    {enrollment.specialRequirements && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Special Requirements</h5>
                        <p className="text-sm text-gray-700">{enrollment.specialRequirements}</p>
                      </div>
                    )}
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>

        {filteredEnrollments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No enrollments found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
