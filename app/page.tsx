'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import NavBar from "@/app/components/NavBar";
import OptimizedVideo from "@/app/components/OptimizedVideo"

export default function Home() {
	const preScreenRef = useRef<HTMLDivElement>(null);
	const contentDivRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (sessionStorage.getItem("isFirstVisit") === "true") {
			const tl = gsap.timeline();
			
			const viewportHeight = window.innerHeight;
			
			gsap.set(contentDivRef.current, {
				display: "none",
			});
			
			gsap.set(preScreenRef.current, {
				opacity: 1,
				y: 0,
			});
			
			tl.to(preScreenRef.current, {
				y: -viewportHeight,
				duration: 1.5,
        delay: 0.5,
				ease: "power4.inOut",
				onComplete: () => {
					gsap.set(preScreenRef.current, {display: "none"});
					gsap.set(contentDivRef.current, {display: "flex"});
				},
			});
			
			return () => {
				tl.kill();
			};
		}
	}, [])

	return (
		<div className="min-h-screen flex flex-col">
			<div
				className="absolute top-0 left-0 h-full w-full bg-white z-20 flex justify-center items-center text-8xl cursor-pointer overflow-hidden"
				ref={preScreenRef}
				id="pre-screen"
			>
				<h1>PELIZZA</h1>
			</div>
			<main className="flex flex-col gap-[10vh]">
				<div className="fixed top-0 left-0 z-10">
					<NavBar />
				</div>
					{/* <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-md z-10" /> */}
				<div className="w-full h-screen aspect-video relative overflow-hidden">
					<OptimizedVideo
						hlsSrc="/videos/BANDEDEMOFINAL.m3u8"
						mp4Src="/videos/BANDEDEMOFINAL_compressed.mp4"
						poster="/videos/BANDEDEMOFINAL-poster.jpg"
						autoPlay={true}
						loop={true}
						muted={true}
					/>
				</div>
				<div className="flex-col items-center justify-center px-8 h-screen uppercase gap-4" ref={contentDivRef}>
					<h3 className="text-4xl">services</h3>
					<h3 className="text-2xl leading-tight text-center tracking-wide">
					nous sommes une agence créative avec un style visuel unique et une écoute attentive. Chaque projet est une collaboration : nous mêlons nos idées à vos besoins pour créer des contenus qui vous ressemblent. De la conception au tournage, jusqu&apos;à la livraison finale, nous prenons en charge chaque étape pour vous offrir des formats sur-mesure, adaptés à vos envies et à votre univers.
					</h3>
				</div>
			</main>
		</div>
	)
}