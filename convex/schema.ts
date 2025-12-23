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
    // Link to user
    userId: v.optional(v.string()),
  }),
  syllabus: defineTable({
    slug: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    content: v.optional(v.string()), // Markdown
    order: v.number(),
    published: v.boolean(),
    updatedAt: v.optional(v.number()),
  }).index("by_slug", ["slug"]).index("by_order", ["order"]),
  progress: defineTable({
    userId: v.string(),
    syllabusSlug: v.string(),
    completed: v.boolean(),
    percentComplete: v.number(),
    lastUpdated: v.number(),
  }).index("by_user_syllabus", ["userId", "syllabusSlug"]),
  admin_posts: defineTable({
    slug: v.string(),
    title: v.string(),
    body: v.string(),
    tags: v.array(v.string()),
    publishAt: v.number(),
    createdBy: v.string(),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]),
});
