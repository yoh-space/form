"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Editor from "@/components/editor/Editor";
import { Calendar, CalendarDays, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Id } from "../../../../../convex/_generated/dataModel";

export default function EditActivityPage() {
    const params = useParams();
    const activityId = params.id as Id<"activities">;

    const activity = useQuery(api.activities.getById, { id: activityId });
    const update = useMutation(api.activities.update);
    const router = useRouter();

    const [formData, setFormData] = useState<{
        type: "biweekly" | "monthly";
        title: string;
        content: string;
        startDate: string;
        endDate: string;
        published: boolean;
    }>({
        type: "biweekly",
        title: "",
        content: "",
        startDate: "",
        endDate: "",
        published: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (activity && !isLoaded) {
            setFormData({
                type: activity.type,
                title: activity.title,
                content: activity.content,
                startDate: new Date(activity.startDate).toISOString().split("T")[0],
                endDate: new Date(activity.endDate).toISOString().split("T")[0],
                published: activity.published,
            });
            setIsLoaded(true);
        }
    }, [activity, isLoaded]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await update({
                id: activityId,
                type: formData.type,
                title: formData.title,
                content: formData.content,
                startDate: new Date(formData.startDate).getTime(),
                endDate: new Date(formData.endDate).getTime(),
                published: formData.published,
            });
            router.push("/admin/activities");
        } catch (error) {
            console.error("Failed to update activity:", error);
            setIsSubmitting(false);
        }
    };

    if (!activity) {
        return (
            <div className="max-w-3xl mx-auto">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
                    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                        <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
                        <div className="space-y-6">
                            <div className="h-10 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                            <div className="h-64 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <Link
                href="/admin/activities"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Activities
            </Link>

            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    {formData.type === "biweekly" ? (
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <Calendar className="w-6 h-6 text-emerald-600" />
                        </div>
                    ) : (
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <CalendarDays className="w-6 h-6 text-amber-600" />
                        </div>
                    )}
                    <h1 className="text-2xl font-bold text-gray-900">
                        Edit {formData.type === "biweekly" ? "Bi-Weekly" : "Monthly"} Plan
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <div className="flex gap-4">
                            <label
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${formData.type === "biweekly"
                                        ? "border-emerald-500 bg-emerald-50"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="type"
                                    value="biweekly"
                                    checked={formData.type === "biweekly"}
                                    onChange={() => setFormData({ ...formData, type: "biweekly" })}
                                    className="sr-only"
                                />
                                <Calendar className={`w-5 h-5 ${formData.type === "biweekly" ? "text-emerald-600" : "text-gray-400"}`} />
                                <span className={formData.type === "biweekly" ? "text-emerald-700 font-medium" : "text-gray-600"}>
                                    Bi-Weekly
                                </span>
                            </label>
                            <label
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${formData.type === "monthly"
                                        ? "border-amber-500 bg-amber-50"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="type"
                                    value="monthly"
                                    checked={formData.type === "monthly"}
                                    onChange={() => setFormData({ ...formData, type: "monthly" })}
                                    className="sr-only"
                                />
                                <CalendarDays className={`w-5 h-5 ${formData.type === "monthly" ? "text-amber-600" : "text-gray-400"}`} />
                                <span className={formData.type === "monthly" ? "text-amber-700 font-medium" : "text-gray-600"}>
                                    Monthly
                                </span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="e.g., Week 1-2: React Native Fundamentals"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <input
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        {isLoaded && (
                            <Editor
                                initialState={formData.content}
                                onChange={(jsonString) => setFormData({ ...formData, content: jsonString })}
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="published"
                            checked={formData.published}
                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="published" className="text-sm text-gray-700">
                            Published
                        </label>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Link
                            href="/admin/activities"
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2 text-white rounded-lg font-medium transition-colors ${formData.type === "biweekly"
                                    ? "bg-emerald-600 hover:bg-emerald-700"
                                    : "bg-amber-600 hover:bg-amber-700"
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
