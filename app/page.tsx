'use client';

import slideInOut from "@/lib/utils";
import { useTransitionRouter } from "next-view-transitions";

export default function Home() {
	const router = useTransitionRouter();

	return (
		<main className="min-h-screen flex flex-col">
			<a onClick={(e) => {
				e.preventDefault();
				router.push('/home', {
					onTransitionReady: slideInOut,
				});
			}}
				className="absolute top-0 left-0 flex-col gap-y-8 h-full w-full bg-white z-[100] flex justify-center items-center cursor-pointer overflow-hidden"
				id="pre-screen"
			>
				<h1>PELIZZA</h1>
				<h3>CLICK TO ENTER</h3>
			</a>
		</main>
	)
}