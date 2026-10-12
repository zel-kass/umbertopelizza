import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { switzer } from "@/app/styles/fonts";
import NavBar from "@/app/components/NavBar";
import { ReactLenis } from "lenis/react";

export const metadata: Metadata = {
	title: "Pelizza Pictures",
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
					<ReactLenis root>
						<NavBar />
						{children}
					</ReactLenis>
				</ViewTransitions>
			</body>
		</html>
	);
}
