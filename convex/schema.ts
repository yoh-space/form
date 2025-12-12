import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  enrollments: defineTable({
    // Personal Info
    fullName: v.string(),
    email: v.string(),
    telegramUsername: v.string(),
    phoneNumber: v.optional(v.string()),
    // Background
    technicalBackground: v.string(),
    technologiesUsed: v.array(v.string()),
    hasBuiltApp: v.string(),
    appDescription: v.optional(v.string()),
    // Goals
    expectations: v.string(),
    whyReactNative: v.string(),
    longTermGoal: v.string(),
    // Focus
    mentorshipFocus: v.string(),
    focusOther: v.optional(v.string()),
    // Commitment
    weeklyHours: v.string(),
    learningStyle: v.string(),
    // Needs
    challenges: v.string(),
    mentorNeeds: v.string(),
    specialRequirements: v.optional(v.string()),
    // App Idea
    hasAppIdea: v.string(),
    appIdeaDescription: v.optional(v.string()),
    // Payment
    paymentMethod: v.string(),
    // Meta
    submittedAt: v.number(),
  }),
});
