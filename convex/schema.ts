import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
	...authTables,
	workspaces: defineTable({
		name: v.string(),
		createdBy: v.id("users"),
		image: v.optional(v.string()),
		createdAt: v.number(),
	}),
	workspacesMembers: defineTable({
		workspaceId: v.id("workspaces"),
		userId: v.id("users"),
	}),
});

export default schema;
