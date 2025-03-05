import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";

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
		<ViewTransitions>
			<html lang="en">
				<head>
					<link rel="stylesheet" href="https://use.typekit.net/mzx0ndo.css"/>
				</head>
				<body>
					{children}
				</body>
			</html>
		</ViewTransitions>
  );
}
