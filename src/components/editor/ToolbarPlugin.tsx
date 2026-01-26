"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
    $getSelection,
    $isRangeSelection,
    FORMAT_TEXT_COMMAND,
    FORMAT_ELEMENT_COMMAND,
    UNDO_COMMAND,
    REDO_COMMAND,
    $insertNodes,
} from "lexical";
import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    REMOVE_LIST_COMMAND,
    $isListNode,
    ListNode,
} from "@lexical/list";
import { $getNearestNodeOfType } from "@lexical/utils";
import {
    Bold,
    Italic,
    Underline,
    Code,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Undo,
    Redo,
    List,
    ListOrdered,
    Image,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { $createImageNode } from "./ImageNode";

const LowPriority = 1;

export default function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isCode, setIsCode] = useState(false);
    const [listType, setListType] = useState<"bullet" | "number" | null>(null);

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat("bold"));
            setIsItalic(selection.hasFormat("italic"));
            setIsUnderline(selection.hasFormat("underline"));
            setIsCode(selection.hasFormat("code"));

            const anchorNode = selection.anchor.getNode();
            const element =
                anchorNode.getKey() === "root"
                    ? anchorNode
                    : anchorNode.getTopLevelElementOrThrow();

            const elementDOM = editor.getElementByKey(element.getKey());
            if (elementDOM !== null) {
                const parentList = $getNearestNodeOfType(anchorNode, ListNode);
                if ($isListNode(parentList)) {
                    const type = parentList.getListType();
                    setListType(type === "number" ? "number" : "bullet");
                } else {
                    setListType(null);
                }
            }
        }
    }, [editor]);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    updateToolbar();
                });
            })
        );
    }, [editor, updateToolbar]);

    const formatBulletList = () => {
        if (listType === "bullet") {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        }
    };

    const formatNumberedList = () => {
        if (listType === "number") {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file");
            return;
        }

        // Validate file size (max 5MB before compression)
        if (file.size > 5 * 1024 * 1024) {
            alert("Image size must be less than 5MB");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement("img");
            img.onload = () => {
                // Compress image using canvas
                const canvas = document.createElement("canvas");
                const maxWidth = 800;
                const maxHeight = 600;
                let { width, height } = img;

                // Calculate new dimensions
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                ctx.drawImage(img, 0, 0, width, height);

                // Convert to base64 with compression
                const base64 = canvas.toDataURL("image/jpeg", 0.7);

                editor.update(() => {
                    const imageNode = $createImageNode({ src: base64, altText: file.name });
                    $insertNodes([imageNode]);
                });
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);

        // Reset input so same file can be selected again
        event.target.value = "";
    };

    const triggerImageUpload = () => {
        const input = document.getElementById("image-upload-input") as HTMLInputElement;
        input?.click();
    };

    return (
        <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg sticky top-0 z-10 flex-wrap">
            <button
                onClick={() => {
                    editor.dispatchCommand(UNDO_COMMAND, undefined);
                }}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="Undo"
            >
                <Undo className="w-4 h-4" />
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(REDO_COMMAND, undefined);
                }}
                className="p-2 hover:bg-gray-200 rounded transition-colors mr-2"
                title="Redo"
            >
                <Redo className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                }}
                className={`p-2 rounded transition-colors ${isBold ? "bg-gray-200 text-blue-600" : "hover:bg-gray-200"
                    }`}
                title="Bold"
            >
                <Bold className="w-4 h-4" />
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                }}
                className={`p-2 rounded transition-colors ${isItalic ? "bg-gray-200 text-blue-600" : "hover:bg-gray-200"
                    }`}
                title="Italic"
            >
                <Italic className="w-4 h-4" />
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
                }}
                className={`p-2 rounded transition-colors ${isUnderline ? "bg-gray-200 text-blue-600" : "hover:bg-gray-200"
                    }`}
                title="Underline"
            >
                <Underline className="w-4 h-4" />
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
                }}
                className={`p-2 rounded transition-colors ${isCode ? "bg-gray-200 text-blue-600" : "hover:bg-gray-200"
                    }`}
                title="Code"
            >
                <Code className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            <button
                onClick={formatBulletList}
                className={`p-2 rounded transition-colors ${listType === "bullet" ? "bg-gray-200 text-blue-600" : "hover:bg-gray-200"
                    }`}
                title="Bullet List"
            >
                <List className="w-4 h-4" />
            </button>
            <button
                onClick={formatNumberedList}
                className={`p-2 rounded transition-colors ${listType === "number" ? "bg-gray-200 text-blue-600" : "hover:bg-gray-200"
                    }`}
                title="Numbered List"
            >
                <ListOrdered className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            <input
                id="image-upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
            />
            <button
                onClick={triggerImageUpload}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="Upload Image"
                type="button"
            >
                <Image className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-2" />

            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
                }}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="Align Left"
            >
                <AlignLeft className="w-4 h-4" />
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
                }}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="Align Center"
            >
                <AlignCenter className="w-4 h-4" />
            </button>
            <button
                onClick={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
                }}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="Align Right"
            >
                <AlignRight className="w-4 h-4" />
            </button>
        </div>
    );
}
