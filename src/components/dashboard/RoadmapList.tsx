"use client";

import { CheckCircle2, Circle, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

interface RoadmapItem {
    _id: string;
    title: string;
    slug: string;
    order: number;
    isCompleted: boolean;
    isLocked: boolean;
}

interface RoadmapListProps {
    items: RoadmapItem[];
}

export default function RoadmapList({ items }: RoadmapListProps) {
    const router = useRouter();

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Roadmap</h2>
            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-100" />

                <div className="space-y-6">
                    {items.map((item, index) => (
                        <div
                            key={item._id}
                            className={`relative flex gap-4 ${item.isLocked ? "opacity-60" : "cursor-pointer group"
                                }`}
                            onClick={() => !item.isLocked && router.push(`/dashboard/syllabus/${item.slug}`)}
                        >
                            {/* Status Icon */}
                            <div className="relative z-10 flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-full border-2 border-white shadow-sm">
                                {item.isCompleted ? (
                                    <CheckCircle2 className="w-8 h-8 text-green-500 fill-green-50" />
                                ) : item.isLocked ? (
                                    <Lock className="w-6 h-6 text-gray-300" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full border-4 border-blue-500 bg-white" />
                                )}
                            </div>

                            {/* Content */}
                            <div className={`flex-1 pt-2 pb-4 border-b border-gray-100 ${!item.isLocked && "group-hover:translate-x-1 transition-transform"
                                }`}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-500">
                                        Module {item.order}
                                    </span>
                                    {item.isCompleted && (
                                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                            Completed
                                        </span>
                                    )}
                                </div>
                                <h3 className={`text-lg font-semibold ${item.isLocked ? "text-gray-500" : "text-gray-900"
                                    }`}>
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
