"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { User, Mail, Save, Loader2, Shield } from "lucide-react";

export default function AdminProfilePage() {
    const { data: session } = authClient.useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const [formData, setFormData] = useState({
        name: session?.user?.name || "",
    });

    // Update form when session loads
    useState(() => {
        if (session?.user) {
            setFormData({
                name: session.user.name || "",
            });
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        try {
            await authClient.updateUser({
                name: formData.name,
            });
            setMessage({ type: "success", text: "Profile updated successfully!" });
        } catch (error) {
            console.error("Failed to update profile:", error);
            setMessage({ type: "error", text: "Failed to update profile. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Breadcrumb homeHref="/admin" homeLabel="Admin" />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                            {session.user?.image ? (
                                <img
                                    src={session.user.image}
                                    alt={session.user.name || "Profile"}
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                            ) : (
                                <User className="w-10 h-10 text-white" />
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-2xl font-bold text-white">{session.user?.name || "Admin"}</h1>
                                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    <Shield className="w-3 h-3" />
                                    Admin
                                </span>
                            </div>
                            <p className="text-purple-100">{session.user?.email}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {message && (
                        <div className={`p-4 rounded-lg ${message.type === "success"
                                ? "bg-green-50 text-green-800 border border-green-200"
                                : "bg-red-50 text-red-800 border border-red-200"
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <User className="w-4 h-4 inline mr-2" />
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Mail className="w-4 h-4 inline mr-2" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={session.user?.email || ""}
                            disabled
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
