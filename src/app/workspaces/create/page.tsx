import CreateWorkspaceForm from "@/features/workspaces/create-workspace-form";

export const metadata = {
	title: "Create Workspace - Chatterbox",
};

export default function CreateWorkspacePage() {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="flex flex-col gap-y-4 w-[400px]">
				<h1 className="text-2xl font-semibold">Create New Workspace</h1>
				<CreateWorkspaceForm />
			</div>
		</div>
	);
}
