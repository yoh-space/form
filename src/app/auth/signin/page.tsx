"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        await authClient.signIn.email(
            { email, password },
            {
                onSuccess: () => router.push("/dashboard"),
                onError: (ctx) => alert(ctx.error.message),
            }
        );
        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
                    <p className="text-gray-500 mt-2">Sign in to your account</p>
                </div>

                {/* Google */}
                <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center gap-3 w-full rounded-xl border border-gray-200 py-3 font-medium hover:bg-gray-50 transition"
                >
                    <FcGoogle className="text-xl" />
                    Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="px-3 text-sm text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Email Form */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 space-y-3">
                    <button
                        onClick={handleSignIn}
                        disabled={loading}
                        className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 transition disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                    {/* Dev Sign Up */}
                    <button
                        onClick={async () => {
                            await authClient.signUp.email(
                                { email, password, name: "Test User" },
                                {
                                    onSuccess: () => router.push("/dashboard"),
                                    onError: (ctx) => alert(ctx.error.message),
                                }
                            );
                        }}
                        className="w-full rounded-xl border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        Create account (Dev)
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    By continuing, you agree to our{' '}
                    <span className="text-indigo-600 font-medium cursor-pointer">Terms</span>
                    {' '}and{' '}
                    <span className="text-indigo-600 font-medium cursor-pointer">Privacy Policy</span>
                </p>
            </div>
        </div>
    );
}
