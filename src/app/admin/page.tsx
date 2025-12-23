"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6"];

export default function AdminDashboard() {
    const syllabus = useQuery(api.syllabus.getAll);
    const enrollments = useQuery(api.enrollments.getAll);

    const publishedCount = syllabus?.filter((s) => s.published).length || 0;
    const draftCount = syllabus?.filter((s) => !s.published).length || 0;

    const syllabusData = [
        { name: "Published", value: publishedCount },
        { name: "Draft", value: draftCount },
    ];

    // Enrollment stats by focus area
    const focusStats =
        enrollments?.reduce(
            (acc, e) => {
                acc[e.mentorshipFocus] = (acc[e.mentorshipFocus] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>
        ) || {};

    const focusData = Object.entries(focusStats).map(([name, value]) => ({
        name,
        value,
    }));

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-500">Total Syllabus</h3>
                    <p className="text-3xl font-bold text-blue-600">
                        {syllabus?.length || 0}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-500">Published</h3>
                    <p className="text-3xl font-bold text-green-600">{publishedCount}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-500">Drafts</h3>
                    <p className="text-3xl font-bold text-orange-600">{draftCount}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-500">Enrollments</h3>
                    <p className="text-3xl font-bold text-purple-600">
                        {enrollments?.length || 0}
                    </p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Syllabus Status</h3>
                    {syllabus && syllabus.length > 0 && (
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={syllabusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        `${name}: ${(percent * 100).toFixed(0)}%`
                                    }
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    <Cell fill="#22c55e" />
                                    <Cell fill="#f59e0b" />
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Enrollments by Focus</h3>
                    {focusData.length > 0 && (
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={focusData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="flex gap-4">
                    <Link
                        href="/admin/syllabus/new"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        + New Syllabus
                    </Link>
                    <Link
                        href="/admin/syllabus"
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Manage Syllabus
                    </Link>
                </div>
            </div>

            {/* Recent Enrollments Table */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Recent Enrollments</h3>
                {enrollments && enrollments.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Focus
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Hours/Week
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Submitted
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {enrollments.slice(0, 10).map((e) => (
                                    <tr key={e._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {e.fullName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{e.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {e.mentorshipFocus}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {e.weeklyHours}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(e.submittedAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">No enrollments yet.</p>
                )}
            </div>
        </div>
    );
}
