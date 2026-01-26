"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ProgressRingProps {
    percentage: number;
}

export default function ProgressRing({ percentage }: ProgressRingProps) {
    const data = [
        { value: percentage },
        { value: 100 - percentage },
    ];

    return (
        <div className="relative w-32 h-32 mx-auto">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={60}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        stroke="none"
                    >
                        <Cell fill="#2563eb" /> {/* Blue-600 */}
                        <Cell fill="#e5e7eb" /> {/* Gray-200 */}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
            </div>
        </div>
    );
}
