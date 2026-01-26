"use client";

import { authClient } from "@/lib/auth-client";

export default function WelcomeHeader() {
    const { data: session } = authClient.useSession();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    const firstName = session?.user?.name?.split(" ")[0] || "Student";

    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
                {getGreeting()}, {firstName}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
                Continue your learning journey
            </p>
        </div>
    );
}
