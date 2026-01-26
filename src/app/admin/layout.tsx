import { fetchAuthQuery, isAuthenticated } from "@/lib/auth-server";
import { api } from "../../../convex/_generated/api";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import Breadcrumb from "@/components/ui/Breadcrumb";

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
        <div className="min-h-screen bg-gray-50">
            <AdminHeader />
            <main className="container mx-auto p-8">
                <Breadcrumb homeHref="/admin" homeLabel="Admin" />
                {children}
            </main>
        </div>
    );
}

