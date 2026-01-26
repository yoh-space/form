"use client";

import { Users, BookOpen, FileEdit } from "lucide-react";

interface StatsOverviewProps {
    totalStudents: number;
    publishedLessons: number;
    draftLessons: number;
}

export default function StatsOverview({
    totalStudents,
    publishedLessons,
    draftLessons,
}: StatsOverviewProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Students */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Students</p>
                        <h3 className="text-2xl font-bold text-gray-900">{totalStudents}</h3>
                    </div>
                </div>
            </div>

            {/* Published */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Published Lessons</p>
                        <h3 className="text-2xl font-bold text-gray-900">{publishedLessons}</h3>
                    </div>
                </div>
            </div>

            {/* Drafts */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-600">
                        <FileEdit className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Draft Lessons</p>
                        <h3 className="text-2xl font-bold text-gray-900">{draftLessons}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
