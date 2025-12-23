"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { useState } from "react";

export default function SyllabusList() {
    const syllabus = useQuery(api.syllabus.getAll);
    const [search, setSearch] = useState("");

    if (!syllabus) return <div className="p-4">Loading...</div>;

    const filtered = syllabus.filter(
        (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.slug.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
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
                                    <Link
                                        href={`/admin/syllabus/${item.slug}/edit`}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Edit
                                    </Link>
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
