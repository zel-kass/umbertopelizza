import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pelizza Production",
  description: "Umberto Maria Pelizza - Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
			<head>
				<link rel="stylesheet" href="https://use.typekit.net/mzx0ndo.css"/>
			</head>
      <body>
        {children}
      </body>
    </html>
  );
}
