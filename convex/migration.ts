import { mutation } from "./_generated/server";

export const addExpectedPriceToExistingEnrollments = mutation({
  handler: async (ctx) => {
    const enrollments = await ctx.db.query("enrollments").collect();
    
    for (const enrollment of enrollments) {
      const updates: any = {};
      
      if (!enrollment.expectedPrice) {
        updates.expectedPrice = "5000 ETB";
      }
      
      // Remove paymentMethod if it exists
      if (enrollment.paymentMethod !== undefined) {
        updates.paymentMethod = undefined;
      }
      
      if (Object.keys(updates).length > 0) {
        await ctx.db.patch(enrollment._id, updates);
      }
    }
    
    return { updated: enrollments.length };
  },
});