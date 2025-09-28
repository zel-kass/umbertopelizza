import localFont from "next/font/local";

export const switzer = localFont({
	src: [
		{
			path: "../fonts/Switzer-Light.otf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../fonts/Switzer-Semibold.otf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../fonts/Switzer-Bold.otf",
			weight: "600",
			style: "normal",
		},
		{
			path: "../fonts/Switzer-Black.otf",
			weight: "800",
			style: "normal",
		},
	],
	variable: "--font-switzer",
	display: "swap",
});