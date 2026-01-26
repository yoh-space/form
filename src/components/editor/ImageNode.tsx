"use client";

import React from "react";
import {
    DecoratorNode,
    DOMConversionMap,
    DOMExportOutput,
    EditorConfig,
    LexicalNode,
    NodeKey,
    SerializedLexicalNode,
    Spread,
} from "lexical";

export type SerializedImageNode = Spread<
    {
        src: string;
        altText: string;
    },
    SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<React.ReactElement> {
    __src: string;
    __altText: string;

    static getType(): string {
        return "image";
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(node.__src, node.__altText, node.__key);
    }

    constructor(src: string, altText: string, key?: NodeKey) {
        super(key);
        this.__src = src;
        this.__altText = altText;
    }

    createDOM(config: EditorConfig): HTMLElement {
        const span = document.createElement("span");
        const theme = config.theme;
        const className = theme.image;
        if (className !== undefined) {
            span.className = className;
        }
        return span;
    }

    updateDOM(): false {
        return false;
    }

    static importJSON(serializedNode: SerializedImageNode): ImageNode {
        const { src, altText } = serializedNode;
        const node = $createImageNode({ src, altText });
        return node;
    }

    exportJSON(): SerializedImageNode {
        return {
            type: "image",
            version: 1,
            src: this.__src,
            altText: this.__altText,
        };
    }

    exportDOM(): DOMExportOutput {
        const element = document.createElement("img");
        element.setAttribute("src", this.__src);
        element.setAttribute("alt", this.__altText);
        element.style.maxWidth = "100%";
        element.style.borderRadius = "8px";
        return { element };
    }

    static importDOM(): DOMConversionMap | null {
        return {
            img: () => ({
                conversion: (domNode: Node) => {
                    if (domNode instanceof HTMLImageElement) {
                        const src = domNode.getAttribute("src") || "";
                        const altText = domNode.getAttribute("alt") || "";
                        const node = $createImageNode({ src, altText });
                        return { node };
                    }
                    return null;
                },
                priority: 0,
            }),
        };
    }

    decorate(): React.ReactElement {
        return (
            <img
                src={this.__src}
                alt={this.__altText}
                className="max-w-full rounded-lg my-4 block mx-auto"
                style={{ maxHeight: "400px", objectFit: "contain" }}
            />
        );
    }
}

export function $createImageNode({
    src,
    altText,
}: {
    src: string;
    altText: string;
}): ImageNode {
    return new ImageNode(src, altText);
}

export function $isImageNode(
    node: LexicalNode | null | undefined
): node is ImageNode {
    return node instanceof ImageNode;
}
