import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import CreateWorkspaceForm from "./create-workspace-form";

export default function CreateWorkspaceModal() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="link" className="px-0">
					Create New Workspace
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Workspace</DialogTitle>
					<DialogDescription>
						Create a new workspace to collaborate with your team.
					</DialogDescription>
				</DialogHeader>
				<CreateWorkspaceForm />
			</DialogContent>
		</Dialog>
	);
}
