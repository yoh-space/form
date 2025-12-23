import { fetchAuthQuery, isAuthenticated } from "@/lib/auth-server";
import { api } from "../../../convex/_generated/api";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";

// For MVP, we'll check admin by email. In production, you'd use a proper role system.
const ADMIN_EMAILS = ["yohansdam@gmail.com"];


export default async function AdminLayout({ children }: { children: ReactNode }) {
    const authenticated = await isAuthenticated();

    if (!authenticated) {
        redirect("/auth/signin");
    }

    let user;
    try {
        user = await fetchAuthQuery(api.auth.getCurrentUser, {});
    } catch {
        redirect("/auth/signin");
    }

    if (!user || !ADMIN_EMAILS.includes(user.email)) {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <aside className="w-64 bg-white shadow-md">
                <div className="p-4 font-bold text-xl">Admin</div>
                <nav className="mt-4 flex flex-col">
                    <Link href="/admin" className="p-4 hover:bg-gray-50">Overview</Link>
                    <Link href="/admin/syllabus" className="p-4 hover:bg-gray-50">Syllabus</Link>
                    <Link href="/admin/users" className="p-4 hover:bg-gray-50">Users</Link>
                </nav>
            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
