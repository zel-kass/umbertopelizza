'use client';

import slideInOut from "@/lib/utils";
import { useTransitionRouter } from "next-view-transitions";

export default function Home() {
	const router = useTransitionRouter();

	return (
		<div className="min-h-screen flex flex-col">
			<a  onClick={(e) => {
					e.preventDefault();
						router.push('/home', {
							onTransitionReady: slideInOut,
						});
				}}
				className="absolute top-0 left-0 h-full w-full bg-white z-20 flex justify-center items-center text-8xl cursor-pointer overflow-hidden"
				id="pre-screen"
			>
				<h1>PELIZZA</h1>
			</a>
		</div>
	)
}