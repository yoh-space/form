"use client";

import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewSyllabus() {
    const create = useMutation(api.syllabus.create);
    const router = useRouter();

    const [formData, setFormData] = useState({
        slug: "",
        title: "",
        description: "",
        content: "",
        order: 0,
        published: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await create(formData);
        router.push("/admin/syllabus");
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
            <h1 className="text-2xl font-bold mb-6">New Syllabus Item</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Slug</label>
                    <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Order</label>
                    <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        rows={3}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Content (Markdown)</label>
                    <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 font-mono"
                        rows={10}
                    />
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Published</label>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}
