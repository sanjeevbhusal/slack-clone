"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConvexError } from "convex/values";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { ConvexErrorPayloadType } from "../types";
import useCreateWorkspace from "./hooks/use-create-workspaces";

const formSchema = z.object({
	name: z.string().min(1),
});

export default function CreateWorkspaceForm() {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	const { mutate, isPending: isCreating } = useCreateWorkspace({
		onError: (error) => {
			console.log("error occurred");
			if (
				error instanceof ConvexError
				// (error.data as ConvexErrorPayloadType).code === 409
			) {
				console.log("convex error");
				form.setError("name", {
					message: "Workspace already exists",
				});
			} else {
				console.log("other error");
			}
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((values) => mutate(values))}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Workspace Name</FormLabel>
							<FormControl>
								<Input type="text" required {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isCreating}>
					{isCreating ? "Creating workspace..." : "Create Workspace"}
				</Button>
			</form>
		</Form>
	);
}
