import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Chatterbox",
	description: "Chatterbox",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ConvexAuthNextjsServerProvider>
			<html lang="en" className="h-screen">
				<body className={clsx(inter.className, "h-screen")}>
					<ConvexClientProvider>{children}</ConvexClientProvider>
				</body>
			</html>
		</ConvexAuthNextjsServerProvider>
	);
}
