import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getWorkspaces = query({
	handler: async (ctx) => {
		return await ctx.db.query("workspaces").collect();
	},
});

export const createWorkspace = mutation({
	handler: async (ctx, { name }: { name: string }) => {
		const userId = await getAuthUserId(ctx);
		if (userId === null) {
			throw new Error("User is not authenticated");
		}

		const existingWorkspace = await ctx.db
			.query("workspaces")
			.filter((q) => q.eq(q.field("name"), name))
			.first();

		if (existingWorkspace) {
			// throw new ConvexError({
			// 	message: "Workspace already exists",
			// 	code: 409,
			// });
			throw new Error("Workspace already exists");
		}

		const workspaceId = await ctx.db.insert("workspaces", {
			name,
			createdBy: userId,
			createdAt: Date.now(),
		});
		await ctx.db.insert("workspacesMembers", {
			workspaceId,
			userId,
		});
		return workspaceId;
	},
});
