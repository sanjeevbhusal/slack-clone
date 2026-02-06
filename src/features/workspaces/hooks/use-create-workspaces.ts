import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

export default function useCreateWorkspace(options?: UseMutationOptions) {
	const router = useRouter();
	const mutation = useMutation({
		mutationFn: useConvexMutation(api.workspaces.createWorkspace),
		onSuccess: (id: Id<"workspaces">) => {
			router.push(`/workspaces/${id}`);
		},
	});

	return mutation;
}
