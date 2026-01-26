"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbProps {
    homeHref?: string;
    homeLabel?: string;
}

// Map of path segments to human-readable labels
const pathLabels: Record<string, string> = {
    dashboard: "Dashboard",
    admin: "Admin",
    syllabus: "Syllabus",
    activities: "Activities",
    new: "New",
    edit: "Edit",
    profile: "Profile",
    users: "Users",
    settings: "Settings",
};

export default function Breadcrumb({ homeHref = "/", homeLabel = "Home" }: BreadcrumbProps) {
    const pathname = usePathname();

    // Generate breadcrumb items from pathname
    const generateBreadcrumbs = (): BreadcrumbItem[] => {
        const segments = pathname.split("/").filter(Boolean);
        const breadcrumbs: BreadcrumbItem[] = [];

        let currentPath = "";

        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            currentPath += `/${segment}`;

            // Skip dynamic segments (like [slug]) but use a readable label
            const isLastSegment = i === segments.length - 1;
            const isDynamicSegment = segment.startsWith("[") && segment.endsWith("]");

            // Get label from mapping or capitalize the segment
            let label = pathLabels[segment.toLowerCase()] ||
                segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

            // For dynamic segments that aren't in our mapping, use a generic label
            if (!pathLabels[segment.toLowerCase()] && !isDynamicSegment) {
                // This might be a slug - use it as-is but formatted
                label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
            }

            breadcrumbs.push({
                label,
                href: currentPath,
            });
        }

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    if (breadcrumbs.length === 0) {
        return null;
    }

    return (
        <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center flex-wrap gap-1 text-sm">
                {/* Home link */}
                <li className="flex items-center">
                    <Link
                        href={homeHref}
                        className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        <span className="hidden sm:inline">{homeLabel}</span>
                    </Link>
                </li>

                {/* Breadcrumb items */}
                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    return (
                        <li key={item.href} className="flex items-center">
                            <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                            {isLast ? (
                                <span className="font-medium text-gray-900 truncate max-w-[150px] sm:max-w-none">
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-gray-500 hover:text-gray-700 transition-colors truncate max-w-[100px] sm:max-w-none"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
