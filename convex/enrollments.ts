import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    telegramUsername: v.string(),
    phoneNumber: v.optional(v.string()),
    technicalBackground: v.string(),
    technologiesUsed: v.array(v.string()),
    hasBuiltApp: v.string(),
    appDescription: v.optional(v.string()),
    expectations: v.string(),
    whyReactNative: v.string(),
    longTermGoal: v.string(),
    mentorshipFocus: v.string(),
    focusOther: v.optional(v.string()),
    weeklyHours: v.string(),
    learningStyle: v.string(),
    challenges: v.string(),
    mentorNeeds: v.string(),
    specialRequirements: v.optional(v.string()),
    hasAppIdea: v.string(),
    appIdeaDescription: v.optional(v.string()),
    paymentMethod: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("enrollments", {
      ...args,
      submittedAt: Date.now(),
    });
  },
});

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("enrollments").order("desc").collect();
  },
});
