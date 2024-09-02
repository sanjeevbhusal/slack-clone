"use client";

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
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { z } from "zod";

const formSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export default function SignUpCard() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const { signIn } = useAuthActions();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			await signIn("password", {
				email: values.email,
				password: values.password,
				flow: "signUp",
			});
		} catch (error) {
			// TODO: figure out what error actually occurred and display error message accordingly. Right now, the error doesnot doesnot have much context and i couldn't find anything in convex docs.
			form.setError("email", {
				message: "Email is already in use",
			});
		}
	}

	return (
		<div className="flex items-center justify-center h-screen">
			<Card className="w-96">
				<CardHeader>
					<CardTitle>Sign up</CardTitle>
					<CardDescription>Create a account</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-y-4">
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
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Confirm Password"
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
								{form.formState.isSubmitting ? "Signing up..." : "Sign up"}
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
							Sign up with Google
						</Button>
						<Button
							variant="outline"
							type="button"
							className="w-full"
							onClick={() => signIn("github")}
						>
							<FaGithub className="mr-2 size-5" />
							Sign up with Github
						</Button>
					</div>
					<p className="text-sm text-muted-foreground">
						Already have an account?{" "}
						<Link href="/sign-in" className="text-primary underline">
							Sign in
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
