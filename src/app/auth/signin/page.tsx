"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        await authClient.signIn.email({
            email,
            password,
        }, {
            onSuccess: () => {
                router.push("/dashboard");
            },
            onError: (ctx) => {
                alert(ctx.error.message);
            }
        });
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <div className="flex flex-col gap-2 w-full max-w-md">
                <button
                    onClick={handleGoogleSignIn}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Sign in with Google
                </button>
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded"
                />
                <button
                    onClick={handleSignIn}
                    className="bg-green-500 text-white p-2 rounded"
                >
                    Sign in with Email
                </button>
                <button
                    onClick={async () => {
                        await authClient.signUp.email({
                            email,
                            password,
                            name: "Test User",
                        }, {
                            onSuccess: () => {
                                router.push("/dashboard");
                            },
                            onError: (ctx) => {
                                alert(ctx.error.message);
                            }
                        })
                    }}
                    className="bg-gray-500 text-white p-2 rounded"
                >
                    Sign Up (Dev)
                </button>
            </div>
        </div>
    );
}
