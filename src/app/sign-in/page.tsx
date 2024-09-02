import SignInCard from "@/features/authentication/components/sign-in-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "SignIn - Chatterbox",
};

export default function SignInPage() {
	return <SignInCard />;
}
