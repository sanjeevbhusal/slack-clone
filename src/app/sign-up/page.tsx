import SignUpCard from "@/features/authentication/components/sign-up-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "SignUp - Chatterbox",
};

export default function SignUpPage() {
	return <SignUpCard />;
}
