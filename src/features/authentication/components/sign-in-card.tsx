"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Terminal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { z } from "zod";

const formSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export default function SignInCard() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const [error, setError] = useState<string | null>(null);

	const { signIn } = useAuthActions();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			await signIn("password", {
				email: values.email,
				password: values.password,
				flow: "signIn",
			});
		} catch (error) {
			// TODO: figure out what error actually occurred and display error message accordingly. Right now, the error doesnot doesnot have much context and i couldn't find anything in convex docs.
			setError("Invalid email or password");
		}
	}

	return (
		<div className="flex items-center justify-center h-screen">
			<Card className="w-96">
				<CardHeader>
					<CardTitle>Sign in</CardTitle>
					<CardDescription>Sign in to your account</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-y-4">
					{error && !form.formState.isSubmitting && (
						<Alert variant="destructive">
							<AlertCircle className="h-4 w-4" />
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="Email"
												required
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Password"
												required
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								className="w-full"
								type="submit"
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting ? "Signing in..." : "Sign in"}
							</Button>
						</form>
					</Form>

					<div className="flex flex-col gap-y-4">
						<Separator />
						<Button
							variant="outline"
							type="button"
							className="w-full"
							onClick={() => signIn("google")}
						>
							<FcGoogle className="mr-2 size-5" />
							Sign in with Google
						</Button>
						<Button
							variant="outline"
							type="button"
							className="w-full"
							onClick={() => signIn("github")}
						>
							<FaGithub className="mr-2 size-5" />
							Sign in with Github
						</Button>
					</div>
					<p className="text-sm text-muted-foreground">
						Don't have an account?{" "}
						<Link href="/sign-up" className="text-primary underline">
							Sign up
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
