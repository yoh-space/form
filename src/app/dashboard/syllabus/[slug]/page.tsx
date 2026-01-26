"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { CheckCircle2, Circle } from "lucide-react";
import { useMutation } from "convex/react";
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
        // Try to parse as JSON (Lexical format)
        const editorState = JSON.parse(content);
        initialConfig = {
            namespace: "MentorshipReader",
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
            editorState: JSON.stringify(editorState),
            editable: false,
        };
    } catch (e) {
        // Fallback for plain text/markdown (legacy content)
        return (
            <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{content}</p>
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

export default function LessonPage() {
    const params = useParams();
    const slug = params.slug as string;

    const lesson = useQuery(api.syllabus.getBySlug, { slug });
    const progress = useQuery(api.progress.getUserProgress);
    const updateProgress = useMutation(api.progress.updateProgress);

    if (!lesson) return <div className="p-8">Loading...</div>;

    const userProgress = progress?.find((p) => p.syllabusSlug === slug);
    const isCompleted = userProgress?.completed || false;

    const handleToggleComplete = async () => {
        await updateProgress({
            syllabusSlug: slug,
            completed: !isCompleted,
            percentComplete: !isCompleted ? 100 : 0,
        });
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <div className="mb-8 border-b border-gray-100 pb-8">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        Module {lesson.order}
                    </span>
                    <button
                        onClick={handleToggleComplete}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isCompleted
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {isCompleted ? (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                Completed
                            </>
                        ) : (
                            <>
                                <Circle className="w-5 h-5" />
                                Mark as Complete
                            </>
                        )}
                    </button>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>
                {lesson.description && (
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {lesson.description}
                    </p>
                )}
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <ReadOnlyContent content={lesson.content || ""} />
            </div>
        </div>
    );
}
