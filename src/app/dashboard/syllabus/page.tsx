"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function StudentSyllabusList() {
    const router = useRouter();
    const syllabus = useQuery(api.syllabus.getPublished);
    const progress = useQuery(api.progress.getUserProgress);

    if (!syllabus) return <div className="p-4">Loading...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Course Syllabus</h1>

            <div className="space-y-4">
                {syllabus.map((item) => {
                    const itemProgress = progress?.find(
                        (p) => p.syllabusSlug === item.slug
                    );
                    const isCompleted = itemProgress?.completed || false;

                    return (
                        <div
                            key={item._id}
                            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition cursor-pointer"
                            onClick={() => router.push(`/dashboard/syllabus/${item.slug}`)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${isCompleted
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {isCompleted ? "✓" : item.order}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{item.title}</h3>
                                        <p className="text-gray-500">{item.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {isCompleted ? (
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                            Completed
                                        </span>
                                    ) : (
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                            Start
                                        </span>
                                    )}
                                    <span className="text-gray-400 text-2xl">→</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
