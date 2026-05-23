"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Plus, Edit, Trash2, Calendar, CalendarDays } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";

export default function ActivitiesPage() {
    const activities = useQuery(api.activities.getAll);
    const deleteActivity = useMutation(api.activities.deleteActivity);

    const handleDelete = async (id: Id<"activities">) => {
        if (confirm("Are you sure you want to delete this activity?")) {
            await deleteActivity({ id });
        }
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    if (!activities) {
        return (
            <div className="max-w-6xl mx-auto">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-24 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
                <div className="flex gap-3">
                    <Link
                        href="/admin/activities/new?type=biweekly"
                        className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                    >
                        <Calendar className="w-5 h-5" />
                        New Bi-Weekly
                    </Link>
                    <Link
                        href="/admin/activities/new?type=monthly"
                        className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                    >
                        <CalendarDays className="w-5 h-5" />
                        New Monthly
                    </Link>
                </div>
            </div>

            {activities.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
                    <div className="text-gray-400 mb-4">
                        <Calendar className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Activities Yet</h3>
                    <p className="text-gray-600 mb-6">Get started by creating your first bi-weekly or monthly plan.</p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href="/admin/activities/new?type=biweekly"
                            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Create Bi-Weekly Plan
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Title</th>
                                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Type</th>
                                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Date Range</th>
                                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Status</th>
                                <th className="text-right px-6 py-3 text-sm font-semibold text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {activities.map((activity) => (
                                <tr key={activity._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-gray-900">{activity.title}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${activity.type === "biweekly"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-amber-100 text-amber-700"
                                                }`}
                                        >
                                            {activity.type === "biweekly" ? (
                                                <Calendar className="w-3.5 h-3.5" />
                                            ) : (
                                                <CalendarDays className="w-3.5 h-3.5" />
                                            )}
                                            {activity.type === "biweekly" ? "Bi-Weekly" : "Monthly"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {formatDate(activity.startDate)} — {formatDate(activity.endDate)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${activity.published
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {activity.published ? "Published" : "Draft"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/activities/${activity._id}`}
                                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(activity._id)}
                                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
