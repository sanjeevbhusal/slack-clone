import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function useGetWorkspaces() {
	const workspaces = useQuery(api.workspaces.getWorkspaces);
	return { isLoading: workspaces === undefined, workspaces: workspaces ?? [] };
}
