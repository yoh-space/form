import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";

// For MVP, we'll check admin by email. In production, you'd use a proper role system.
const ADMIN_EMAILS = ["yohansdam@gmail.com"];


async function checkAdmin(ctx: any) {
    const user = await authComponent.getAuthUser(ctx);
    if (!user || !ADMIN_EMAILS.includes(user.email)) {
        throw new Error("Unauthorized: Admin access required");
    }
    return user;
}

export const create = mutation({
    args: {
        slug: v.string(),
        title: v.string(),
        description: v.optional(v.string()),
        content: v.optional(v.string()),
        order: v.number(),
        published: v.boolean(),
    },
    handler: async (ctx, args) => {
        await checkAdmin(ctx);
        const existing = await ctx.db
            .query("syllabus")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
        if (existing) throw new Error("Slug already exists");

        return await ctx.db.insert("syllabus", {
            ...args,
            updatedAt: Date.now(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("syllabus"),
        slug: v.optional(v.string()),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        content: v.optional(v.string()),
        order: v.optional(v.number()),
        published: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        await checkAdmin(ctx);
        const { id, ...updates } = args;
        return await ctx.db.patch(id, {
            ...updates,
            updatedAt: Date.now(),
        });
    },
});

export const deleteSyllabus = mutation({
    args: { id: v.id("syllabus") },
    handler: async (ctx, args) => {
        await checkAdmin(ctx);
        return await ctx.db.delete(args.id);
    },
});

export const getPublished = query({
    handler: async (ctx) => {
        return await ctx.db
            .query("syllabus")
            .withIndex("by_order")
            .filter((q) => q.eq(q.field("published"), true))
            .collect();
    },
});

export const getAll = query({
    handler: async (ctx) => {
        // Allow all authenticated users to see all syllabus for admin list
        // The UI will be protected anyway
        return await ctx.db.query("syllabus").withIndex("by_order").collect();
    },
});

export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const item = await ctx.db
            .query("syllabus")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .unique();

        if (!item) return null;

        if (item.published) return item;

        const user = await authComponent.getAuthUser(ctx);
        if (user && ADMIN_EMAILS.includes(user.email)) return item;

        return null;
    },
});
