"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface NextLessonCardProps {
    lesson: {
        title: string;
        slug: string;
        description?: string;
    } | null;
}

export default function NextLessonCard({ lesson }: NextLessonCardProps) {
    const router = useRouter();

    if (!lesson) {
        return (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    All caught up!
                </h3>
                <p className="text-gray-600">
                    You've completed all available lessons. Great work!
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-blue-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-blue-50 rounded-full -mr-12 -mt-12 md:-mr-16 md:-mt-16 transition-transform group-hover:scale-110 duration-500" />

            <div className="relative z-10">
                <div className="text-sm font-medium text-blue-600 mb-2 uppercase tracking-wide">
                    Next Up
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {lesson.title}
                </h3>
                {lesson.description && (
                    <p className="text-gray-600 mb-6 max-w-xl">
                        {lesson.description}
                    </p>
                )}

                <button
                    onClick={() => router.push(`/dashboard/syllabus/${lesson.slug}`)}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-xl hover:shadow-blue-500/20"
                >
                    Continue Learning
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
