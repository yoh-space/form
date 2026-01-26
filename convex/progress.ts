import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";

export const updateProgress = mutation({
    args: {
        syllabusSlug: v.string(),
        completed: v.boolean(),
        percentComplete: v.number(),
    },
    handler: async (ctx, args) => {
        const user = await authComponent.getAuthUser(ctx);
        if (!user) throw new Error("Unauthorized");

        const userId = user._id;
        const existing = await ctx.db
            .query("progress")
            .withIndex("by_user_syllabus", (q) =>
                q.eq("userId", userId).eq("syllabusSlug", args.syllabusSlug)
            )
            .unique();

        if (existing) {
            return await ctx.db.patch(existing._id, {
                completed: args.completed,
                percentComplete: args.percentComplete,
                lastUpdated: Date.now(),
            });
        } else {
            return await ctx.db.insert("progress", {
                userId: userId,
                syllabusSlug: args.syllabusSlug,
                completed: args.completed,
                percentComplete: args.percentComplete,
                lastUpdated: Date.now(),
            });
        }
    },
});

export const getUserProgress = query({
    handler: async (ctx) => {
        try {
            const user = await authComponent.getAuthUser(ctx);
            if (!user) return [];

            return await ctx.db
                .query("progress")
                .withIndex("by_user_syllabus", (q) => q.eq("userId", user._id))
                .collect();
        } catch (error) {
            console.error("Error in getUserProgress:", error);
            // Return empty progress on error to prevent crashing the UI
            return [];
        }
    },
});
