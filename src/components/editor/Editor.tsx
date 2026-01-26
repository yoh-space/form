"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import theme from "./theme";
import ToolbarPlugin from "./ToolbarPlugin";
import { ImageNode } from "./ImageNode";

function Placeholder() {
    return <div className="editor-placeholder absolute top-[70px] left-4 text-gray-400 pointer-events-none">Enter some rich text...</div>;
}

const editorConfig = {
    namespace: "MentorshipEditor",
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
};

interface EditorProps {
    initialState?: string;
    onChange: (editorState: string) => void;
}

export default function Editor({ initialState, onChange }: EditorProps) {
    // Only use initialState if it's a non-empty valid JSON string
    const editorState = initialState && initialState.trim() ? initialState : undefined;

    return (
        <LexicalComposer initialConfig={{ ...editorConfig, editorState }}>
            <div className="editor-container border border-gray-300 rounded-lg shadow-sm bg-white relative min-h-[400px]">
                <ToolbarPlugin />
                <div className="editor-inner relative">
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="editor-input min-h-[350px] p-4 outline-none" />}
                        placeholder={<Placeholder />}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <HistoryPlugin />
                    <AutoFocusPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                    <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                    <OnChangePlugin
                        onChange={(editorState) => {
                            const jsonString = JSON.stringify(editorState.toJSON());
                            onChange(jsonString);
                        }}
                    />
                </div>
            </div>
        </LexicalComposer>
    );
}
