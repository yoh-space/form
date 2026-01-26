"use client";

import Link from "next/link";
import { Plus, List, Calendar, CalendarDays } from "lucide-react";

export default function QuickActions() {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
                <Link
                    href="/admin/syllabus/new"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Write New Lesson
                </Link>
                <Link
                    href="/admin/activities/new?type=biweekly"
                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                    <Calendar className="w-5 h-5" />
                    Bi-Weekly Plan
                </Link>
                <Link
                    href="/admin/activities/new?type=monthly"
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                    <CalendarDays className="w-5 h-5" />
                    Monthly Plan
                </Link>
                <Link
                    href="/admin/syllabus"
                    className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                    <List className="w-5 h-5" />
                    Manage Syllabus
                </Link>
                <Link
                    href="/admin/activities"
                    className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                    <List className="w-5 h-5" />
                    Manage Activities
                </Link>
            </div>
        </div>
    );
}
