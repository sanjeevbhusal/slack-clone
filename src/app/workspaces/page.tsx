"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useCurrentUser from "@/features/authentication/hooks/use-current-user";
import useGetWorkspaces from "@/features/workspaces/hooks/use-get-workspaces";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Workspaces() {
	const router = useRouter();

	const { isLoading, workspaces } = useGetWorkspaces();
	const { user } = useCurrentUser();

	if (isLoading || !user) {
		return (
			<div className="flex items-center flex-col gap-2 justify-center h-screen">
				<Loader2 className="w-10 h-10 animate-spin" />
				Loading workspaces...
			</div>
		);
	}

	if (workspaces.length === 1) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="flex flex-col gap-y-4">
					<h1>You donot have any workspaces. Please create a workspace.</h1>
					<Button onClick={() => router.push("/workspaces/create")}>
						Create New Workspace
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="h-full flex items-center justify-center">
			<div>
				<h1 className="text-2xl font-semibold">Workspaces for {user.email}</h1>
				<div className="flex flex-col w-[600px] border px-6 mt-4">
					{workspaces.map((workspace) => (
						<div
							key={workspace._id}
							className="flex justify-between border-b py-4"
						>
							<div className="flex gap-4">
								<Avatar className="w-12 h-12 rounded-none">
									<AvatarImage src={workspace.image} className="rounded-none" />
									<AvatarFallback className="rounded-none">
										{workspace.name.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col">
									<h1 className="text-lg font-semibold">{workspace.name}</h1>
									<span className="text-sm text-gray-500">2 members</span>
								</div>
							</div>
							<Button
								variant="link"
								onClick={() => {
									router.push(`/workspaces/${workspace._id}`);
								}}
							>
								Open Workspace <ArrowRight className="w-4 h-4 ml-2" />
							</Button>
						</div>
					))}
				</div>
				<Button
					onClick={() => router.push("/workspaces/create")}
					variant="link"
					className="px-0"
				>
					Create New Workspace
				</Button>
			</div>
		</div>
	);
}
