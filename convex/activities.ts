import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";

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
        type: v.union(v.literal("biweekly"), v.literal("monthly")),
        title: v.string(),
        content: v.string(),
        startDate: v.number(),
        endDate: v.number(),
        published: v.boolean(),
    },
    handler: async (ctx, args) => {
        await checkAdmin(ctx);
        return await ctx.db.insert("activities", {
            ...args,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("activities"),
        type: v.optional(v.union(v.literal("biweekly"), v.literal("monthly"))),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        startDate: v.optional(v.number()),
        endDate: v.optional(v.number()),
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

export const deleteActivity = mutation({
    args: { id: v.id("activities") },
    handler: async (ctx, args) => {
        await checkAdmin(ctx);
        return await ctx.db.delete(args.id);
    },
});

export const getAll = query({
    handler: async (ctx) => {
        return await ctx.db.query("activities").order("desc").collect();
    },
});

export const getPublished = query({
    handler: async (ctx) => {
        return await ctx.db
            .query("activities")
            .withIndex("by_published", (q) => q.eq("published", true))
            .order("desc")
            .collect();
    },
});

export const getByType = query({
    args: { type: v.union(v.literal("biweekly"), v.literal("monthly")) },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("activities")
            .withIndex("by_type", (q) => q.eq("type", args.type))
            .order("desc")
            .collect();
    },
});

export const getById = query({
    args: { id: v.id("activities") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});
