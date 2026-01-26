"use client";

interface Enrollment {
    _id: string;
    fullName: string;
    email: string;
    mentorshipFocus: string;
    submittedAt: number;
}

interface RecentActivityProps {
    enrollments: Enrollment[];
}

export default function RecentActivity({ enrollments }: RecentActivityProps) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Enrollments</h3>

            {enrollments.length === 0 ? (
                <p className="text-gray-500">No recent activity.</p>
            ) : (
                <div className="space-y-4">
                    {enrollments.slice(0, 5).map((enrollment) => (
                        <div
                            key={enrollment._id}
                            className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                        >
                            <div>
                                <p className="font-medium text-gray-900">{enrollment.fullName}</p>
                                <p className="text-sm text-gray-500">{enrollment.email}</p>
                            </div>
                            <div className="text-right">
                                <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium mb-1">
                                    {enrollment.mentorshipFocus}
                                </span>
                                <p className="text-xs text-gray-400">
                                    {new Date(enrollment.submittedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
