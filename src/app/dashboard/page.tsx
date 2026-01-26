"use client";
// Force rebuild

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ProgressRing from "@/components/dashboard/ProgressRing";
import NextLessonCard from "@/components/dashboard/NextLessonCard";
import RoadmapList from "@/components/dashboard/RoadmapList";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";

export default function DashboardPage() {
    const syllabus = useQuery(api.syllabus.getPublished);
    const progress = useQuery(api.progress.getUserProgress);

    // Calculate progress stats
    const totalLessons = syllabus?.length || 0;
    const completedLessons = progress?.filter((p) => p.completed).length || 0;
    const percentage = totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    // Determine next lesson
    // Find the first lesson that is NOT completed
    const nextLesson = syllabus?.find(item => {
        const isCompleted = progress?.some(p => p.syllabusSlug === item.slug && p.completed);
        return !isCompleted;
    }) || null;

    // Prepare roadmap items
    const roadmapItems = syllabus?.map(item => {
        const isCompleted = progress?.some(p => p.syllabusSlug === item.slug && p.completed);
        // A lesson is locked if it's not the next one and not completed
        // This enforces linear progression
        const isLocked = !isCompleted && item.slug !== nextLesson?.slug;

        return {
            _id: item._id,
            title: item.title,
            slug: item.slug,
            order: item.order,
            isCompleted: !!isCompleted,
            isLocked: isLocked
        };
    }) || [];

    if (!syllabus) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <WelcomeHeader />

            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="flex-shrink-0">
                    <ProgressRing percentage={percentage} />
                </div>
                <div className="flex-1 w-full">
                    <NextLessonCard lesson={nextLesson} />
                </div>
            </div>

            <RoadmapList items={roadmapItems} />
        </div>
    );
}
