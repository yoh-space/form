import { isAuthenticated } from "@/lib/auth-server";
// Force rebuild
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const authenticated = await isAuthenticated();

    if (!authenticated) {
        redirect("/auth/signin");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />
            <main className="container mx-auto p-4">
                {children}
            </main>
        </div>
    );
}
