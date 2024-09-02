"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "./ui/button";

export default function Navbar() {
	const { signOut } = useAuthActions();
	return (
		<div className="">
			<h1>Hello world</h1>
			<Button onClick={() => signOut()}>Sign out</Button>
		</div>
	);
}
