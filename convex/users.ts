import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";

export const getCurrentUser = query({
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		if (userId === null) {
			throw new Error("User is not authenticated");
		}
		// userId is of type Id<"users">. Convex recognizes that we are trying to get a user detail. Hence, we don't have to specific which table we want to query from.
		return await ctx.db.get(userId);
	},
});
