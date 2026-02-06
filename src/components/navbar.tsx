"use client";

import UserAvatar from "@/features/authentication/components/user-avatar";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "./ui/button";

export default function Navbar() {
	const { signOut } = useAuthActions();

	return (
		<div className="h-12 w-full bg-primary flex items-center justify-end gap-4 px-4 py-2">
			<UserAvatar />
			<Button variant="secondary" size="sm" onClick={() => signOut()}>
				Sign out
			</Button>
		</div>
	);
}
