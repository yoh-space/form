"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";
import { useState } from "react";
import { Trash2, X, Pencil } from "lucide-react";

interface DeleteModalProps {
    isOpen: boolean;
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDeleting: boolean;
}

function DeleteConfirmModal({ isOpen, title, onConfirm, onCancel, isDeleting }: DeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">Confirm Delete</h3>
                        <button
                            onClick={onCancel}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            disabled={isDeleting}
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                    <p className="text-gray-600 mb-2">
                        Are you sure you want to delete this syllabus item?
                    </p>
                    <p className="font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg mb-4">
                        &quot;{title}&quot;
                    </p>
                    <p className="text-sm text-red-600 mb-6">
                        This action cannot be undone. All associated content will be permanently removed.
                    </p>
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={onCancel}
                            disabled={isDeleting}
                            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {isDeleting ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SyllabusList() {
    const syllabus = useQuery(api.syllabus.getAll);
    const deleteSyllabus = useMutation(api.syllabus.deleteSyllabus);
    const [search, setSearch] = useState("");
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: Id<"syllabus"> | null; title: string }>({
        isOpen: false,
        id: null,
        title: "",
    });
    const [isDeleting, setIsDeleting] = useState(false);

    if (!syllabus) return <div className="p-4">Loading...</div>;

    const filtered = syllabus.filter(
        (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.slug.toLowerCase().includes(search.toLowerCase())
    );

    const handleDeleteClick = (id: Id<"syllabus">, title: string) => {
        setDeleteModal({ isOpen: true, id, title });
    };

    const handleConfirmDelete = async () => {
        if (!deleteModal.id) return;
        setIsDeleting(true);
        try {
            await deleteSyllabus({ id: deleteModal.id });
            setDeleteModal({ isOpen: false, id: null, title: "" });
        } catch (error) {
            console.error("Failed to delete:", error);
            alert("Failed to delete syllabus item");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleCancelDelete = () => {
        if (!isDeleting) {
            setDeleteModal({ isOpen: false, id: null, title: "" });
        }
    };

    return (
        <div className="space-y-6">
            <DeleteConfirmModal
                isOpen={deleteModal.isOpen}
                title={deleteModal.title}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isDeleting={isDeleting}
            />

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Syllabus Management</h1>
                <Link
                    href="/admin/syllabus/new"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    + Add New
                </Link>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-lg shadow">
                <input
                    type="text"
                    placeholder="Search syllabus..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Slug
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filtered.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {item.order}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium">
                                    {item.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                    {item.slug}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${item.published
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                            }`}
                                    >
                                        {item.published ? "Published" : "Draft"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/syllabus/${item.slug}/edit`}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteClick(item._id, item.title)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No syllabus items found.
                    </div>
                )}
            </div>
        </div>
    );
}
