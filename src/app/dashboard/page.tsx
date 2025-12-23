"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from "recharts";

const COLORS = ["#22c55e", "#e5e7eb"];

export default function DashboardPage() {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const syllabus = useQuery(api.syllabus.getPublished);
    const progress = useQuery(api.progress.getUserProgress);

    // Calculate progress stats
    const totalLessons = syllabus?.length || 0;
    const completedLessons = progress?.filter((p) => p.completed).length || 0;
    const overallProgress =
        totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    const progressData = [
        { name: "Completed", value: completedLessons },
        { name: "Remaining", value: totalLessons - completedLessons },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                    Welcome, {session?.user?.name || "Student"}
                </h2>
                <button
                    onClick={async () => {
                        await authClient.signOut();
                        router.push("/auth/signin");
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Sign Out
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Progress Card */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Overall Progress</h3>
                    <div className="text-4xl font-bold text-blue-600">
                        {overallProgress}%
                    </div>
                    <p className="text-gray-500 mt-1">
                        {completedLessons} of {totalLessons} lessons completed
                    </p>
                </div>

                {/* Next Lesson Card */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Next Lesson</h3>
                    {syllabus && syllabus.length > 0 ? (
                        <>
                            <p className="text-gray-700">{syllabus[0]?.title}</p>
                            <button
                                onClick={() =>
                                    router.push(`/dashboard/syllabus/${syllabus[0]?.slug}`)
                                }
                                className="mt-2 text-blue-600 hover:underline"
                            >
                                Continue Learning →
                            </button>
                        </>
                    ) : (
                        <p className="text-gray-500">No lessons available yet</p>
                    )}
                </div>

                {/* Stats Card */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Your Stats</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Total Lessons</span>
                            <span className="font-semibold">{totalLessons}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Completed</span>
                            <span className="font-semibold text-green-600">
                                {completedLessons}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Remaining</span>
                            <span className="font-semibold text-orange-600">
                                {totalLessons - completedLessons}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Progress Overview</h3>
                {totalLessons > 0 && (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={progressData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) =>
                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                }
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {progressData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* Course Syllabus */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Course Syllabus</h3>
                <div className="space-y-3">
                    {syllabus?.map((item, index) => {
                        const isCompleted = progress?.some(
                            (p) => p.syllabusSlug === item.slug && p.completed
                        );
                        return (
                            <div
                                key={item._id}
                                className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer"
                                onClick={() => router.push(`/dashboard/syllabus/${item.slug}`)}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? "bg-green-500 text-white" : "bg-gray-200"
                                            }`}
                                    >
                                        {isCompleted ? "✓" : index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium">{item.title}</p>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                    </div>
                                </div>
                                <span className="text-gray-400">→</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
