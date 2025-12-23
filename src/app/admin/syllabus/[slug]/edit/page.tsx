"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditSyllabus() {
    const params = useParams();
    const slug = params.slug as string;
    const router = useRouter();

    const syllabus = useQuery(api.syllabus.getBySlug, { slug });
    const update = useMutation(api.syllabus.update);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        order: 0,
        published: false,
    });

    useEffect(() => {
        if (syllabus) {
            setFormData({
                title: syllabus.title,
                description: syllabus.description || "",
                content: syllabus.content || "",
                order: syllabus.order,
                published: syllabus.published,
            });
        }
    }, [syllabus]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!syllabus) return;

        await update({
            id: syllabus._id,
            ...formData,
        });
        router.push("/admin/syllabus");
    };

    if (!syllabus) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Edit Syllabus Item</h1>
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
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
