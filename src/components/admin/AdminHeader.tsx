"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Shield, LogOut, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function AdminHeader() {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
                {/* Logo / Brand */}
                <Link href="/admin" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold shadow-sm group-hover:shadow-md transition-all">
                        <Shield className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-gray-900 tracking-tight">Mentor Admin</span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-1 bg-gray-50/50 p-1 rounded-full border border-gray-100">
                    <Link
                        href="/admin"
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${pathname === "/admin"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        Overview
                    </Link>
                    <Link
                        href="/admin/syllabus"
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${isActive("/admin/syllabus")
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        Syllabus
                    </Link>
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-1">
                    <Link
                        href="/admin/profile"
                        className={`p-2 rounded-lg transition-colors ${isActive("/admin/profile")
                            ? "text-purple-600 bg-purple-50"
                            : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                            }`}
                        title="Profile"
                    >
                        <User className="w-5 h-5" />
                    </Link>
                    <button
                        onClick={async () => {
                            await authClient.signOut();
                            router.push("/auth/signin");
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Sign Out"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </nav>
    );
}

