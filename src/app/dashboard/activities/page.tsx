"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState, useEffect } from "react";
import { Calendar, CalendarDays, ChevronRight } from "lucide-react";
import Link from "next/link";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import theme from "@/components/editor/theme";
import { ImageNode } from "@/components/editor/ImageNode";

function ReadOnlyContent({ content }: { content: string }) {
    let initialConfig;
    try {
        const editorState = JSON.parse(content);
        initialConfig = {
            namespace: "ActivityReader",
            theme,
            onError(error: Error) {
                throw error;
            },
            nodes: [
                HeadingNode,
                ListNode,
                ListItemNode,
                QuoteNode,
                CodeNode,
                CodeHighlightNode,
                TableNode,
                TableCellNode,
                TableRowNode,
                AutoLinkNode,
                LinkNode,
                ImageNode,
            ],
            editable: false,
            editorState: JSON.stringify(editorState),
        };
    } catch {
        return (
            <div className="prose max-w-none">
                <p className="text-gray-600">{content}</p>
            </div>
        );
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="editor-container relative">
                <div className="editor-inner relative">
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="editor-input outline-none" />}
                        placeholder={null}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <ListPlugin />
                    <LinkPlugin />
                </div>
            </div>
        </LexicalComposer>
    );
}

export default function ActivitiesPage() {
    const activities = useQuery(api.activities.getPublished);
    const [activeTab, setActiveTab] = useState<"biweekly" | "monthly">("biweekly");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const filteredActivities = activities?.filter((a) => a.type === activeTab) || [];

    if (!activities) {
        return (
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="animate-pulse">
                    <div className="h-10 bg-gray-200 rounded w-64 mb-8"></div>
                    <div className="h-12 bg-gray-200 rounded mb-6"></div>
                    <div className="space-y-6">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
                    Dashboard
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">Activities</span>
            </nav>

            {/* Header */}
            <div className={`mb-8 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Key Activities</h1>
                <p className="text-gray-600">Stay on track with your bi-weekly and monthly mentorship plans.</p>
            </div>

            {/* Tabs */}
            <div className={`flex gap-4 mb-8 transition-all duration-500 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <button
                    onClick={() => setActiveTab("biweekly")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === "biweekly"
                            ? "bg-emerald-100 text-emerald-700 shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    <Calendar className="w-5 h-5" />
                    Bi-Weekly Plans
                </button>
                <button
                    onClick={() => setActiveTab("monthly")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === "monthly"
                            ? "bg-amber-100 text-amber-700 shadow-sm"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    <CalendarDays className="w-5 h-5" />
                    Monthly Plans
                </button>
            </div>

            {/* Activities List */}
            <div className="space-y-6">
                {filteredActivities.length === 0 ? (
                    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center transition-all duration-500 delay-200 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                        <div className="text-gray-300 mb-4">
                            {activeTab === "biweekly" ? (
                                <Calendar className="w-16 h-16 mx-auto" />
                            ) : (
                                <CalendarDays className="w-16 h-16 mx-auto" />
                            )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No {activeTab === "biweekly" ? "Bi-Weekly" : "Monthly"} Plans Yet
                        </h3>
                        <p className="text-gray-600">
                            Your mentor will post {activeTab === "biweekly" ? "bi-weekly" : "monthly"} plans here soon.
                        </p>
                    </div>
                ) : (
                    filteredActivities.map((activity, idx) => (
                        <div
                            key={activity._id}
                            className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                }`}
                            style={{ transitionDelay: `${(idx + 2) * 100}ms` }}
                        >
                            {/* Activity Header */}
                            <div
                                className={`px-6 py-4 border-b border-gray-100 ${activeTab === "biweekly"
                                        ? "bg-sky-50"
                                        : "bg-amber-50"
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-1">{activity.title}</h2>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            {activeTab === "biweekly" ? (
                                                <Calendar className="w-4 h-4 text-emerald-600" />
                                            ) : (
                                                <CalendarDays className="w-4 h-4 text-amber-600" />
                                            )}
                                            <span>
                                                {formatDate(activity.startDate)} — {formatDate(activity.endDate)}
                                            </span>
                                        </div>
                                    </div>
                                    <span
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${activeTab === "biweekly"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-amber-100 text-amber-700"
                                            }`}
                                    >
                                        {activeTab === "biweekly" ? "Bi-Weekly" : "Monthly"}
                                    </span>
                                </div>
                            </div>

                            {/* Activity Content */}
                            <div className="p-6">
                                <ReadOnlyContent content={activity.content} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
