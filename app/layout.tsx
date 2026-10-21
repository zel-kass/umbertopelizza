import type { Metadata } from "next";
import "./globals.css";
import { ViewTransition } from "react";
import { switzer } from "@/app/styles/fonts";
import NavBar from "@/app/components/NavBar";
import { ReactLenis } from "lenis/react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
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
				<ReactLenis root>
					<NavBar />
					<ViewTransition default="none" update={{ page: "auto", default: "none" }}>
						{children}
					</ViewTransition>
				</ReactLenis>
			</body>
			<PrismicPreview repositoryName={repositoryName} />
		</html>
	);
}
