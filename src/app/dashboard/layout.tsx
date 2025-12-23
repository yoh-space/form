import { isAuthenticated } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const authenticated = await isAuthenticated();

    if (!authenticated) {
        redirect("/auth/signin");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Mentorship Dashboard</h1>
                    <div className="flex gap-4">
                        <Link href="/dashboard" className="hover:text-blue-600">Home</Link>
                        <Link href="/dashboard/syllabus" className="hover:text-blue-600">Syllabus</Link>
                    </div>
                </div>
            </nav>
            <main className="container mx-auto p-4">
                {children}
            </main>
        </div>
    );
}
