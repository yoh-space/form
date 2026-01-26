"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import StatsOverview from "@/components/admin/StatsOverview";
import QuickActions from "@/components/admin/QuickActions";
import RecentActivity from "@/components/admin/RecentActivity";

export default function AdminDashboard() {
    const syllabus = useQuery(api.syllabus.getAll);
    const enrollments = useQuery(api.enrollments.getAll);

    const publishedCount = syllabus?.filter((s) => s.published).length || 0;
    const draftCount = syllabus?.filter((s) => !s.published).length || 0;

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

            <StatsOverview
                totalStudents={enrollments?.length || 0}
                publishedLessons={publishedCount}
                draftLessons={draftCount}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <QuickActions />
                    {/* Future: Add more detailed charts or reports here if needed */}
                </div>
                <div>
                    <RecentActivity enrollments={enrollments || []} />
                </div>
            </div>
        </div>
    );
}
