import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { switzer } from "@/app/styles/fonts";

export const metadata: Metadata = {
	title: "Umberto Maria Pelizza",
	description: "Portfolio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-scroll-behavior="smooth" className={switzer.className}>
			<body className="antialiased">
				<ViewTransitions>
					{children}
				</ViewTransitions>
			</body>
		</html>
	);
}
