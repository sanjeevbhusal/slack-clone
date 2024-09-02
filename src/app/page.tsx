import Navbar from "@/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home - Chatterbox",
};

export default function Home() {
	return <Navbar />;
}
