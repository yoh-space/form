"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const lesson = useQuery(api.syllabus.getBySlug, { slug });
    const progress = useQuery(api.progress.getUserProgress);
    const updateProgress = useMutation(api.progress.updateProgress);

    const [isMarking, setIsMarking] = useState(false);

    const lessonProgress = progress?.find((p) => p.syllabusSlug === slug);
    const isCompleted = lessonProgress?.completed || false;

    const handleMarkComplete = async () => {
        setIsMarking(true);
        await updateProgress({
            syllabusSlug: slug,
            completed: true,
            percentComplete: 100,
        });
        setIsMarking(false);
    };

    if (!lesson) return <div className="p-4">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={() => router.push("/dashboard/syllabus")}
                className="mb-4 text-blue-600 hover:underline flex items-center gap-2"
            >
                ← Back to Syllabus
            </button>

            <div className="bg-white p-8 rounded-lg shadow">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">{lesson.title}</h1>
                    {isCompleted && (
                        <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                            ✓ Completed
                        </span>
                    )}
                </div>

                {lesson.description && (
                    <p className="text-gray-600 mb-6 text-lg">{lesson.description}</p>
                )}

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>Progress</span>
                        <span>{isCompleted ? "100%" : "0%"}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className="bg-green-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: isCompleted ? "100%" : "0%" }}
                        ></div>
                    </div>
                </div>

                <div className="prose max-w-none mb-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                            {lesson.content || "Content coming soon..."}
                        </pre>
                    </div>
                </div>

                <div className="border-t pt-6 flex justify-between items-center">
                    <div className="text-gray-500">Lesson {lesson.order}</div>
                    {!isCompleted ? (
                        <button
                            onClick={handleMarkComplete}
                            disabled={isMarking}
                            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 font-medium"
                        >
                            {isMarking ? "Marking..." : "Mark as Complete ✓"}
                        </button>
                    ) : (
                        <button
                            onClick={() => router.push("/dashboard/syllabus")}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-medium"
                        >
                            Continue to Next Lesson →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
