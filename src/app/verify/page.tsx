"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, Phone } from "lucide-react";

export default function Verify() {
  const router = useRouter();
  const [contact, setContact] = useState("");
  const [contactType, setContactType] = useState<"telegram" | "phone">("telegram");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/verify-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, contactType }),
      });

      if (!response.ok) {
        setError("Student not found. Please check your information.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      localStorage.setItem("studentVerified", "true");
      localStorage.setItem("studentContact", contact);
      router.push("/syllabus");
    } catch (err) {
      setError("Verification failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Access</h1>
          <p className="text-gray-600 mb-6">Enter your contact information to access the syllabus</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setContactType("telegram")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  contactType === "telegram"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Telegram
              </button>
              <button
                type="button"
                onClick={() => setContactType("phone")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  contactType === "phone"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Phone className="w-4 h-4 inline mr-2" />
                Phone
              </button>
            </div>

            <input
              type={contactType === "phone" ? "tel" : "text"}
              placeholder={contactType === "telegram" ? "@username" : "0911701858"}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              required
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify & Access Syllabus"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
