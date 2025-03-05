'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import NavBar from "@/app/components/NavBar";
import OptimizedVideo from "@/app/components/OptimizedVideo"

export default function Home() {
	const preScreenRef = useRef<HTMLDivElement>(null);
	const contentDivRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);

	useEffect(() => {
		const tl = gsap.timeline({paused: true});
		timelineRef.current = tl;

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
			ease: "power4.inOut",
			onComplete: () => {
				gsap.set(preScreenRef.current, {display: "none"});
				gsap.set(contentDivRef.current, {display: "block"});
			},
		});

		return () => {
			tl.kill();
		};
	}, [])

	const handlePreScreenClick = () => {
		if (timelineRef.current) {
			timelineRef.current.play();
		}
	}


	return (
		<div className="min-h-screen flex flex-col">
			<div
				className="absolute top-0 left-0 h-full w-full bg-white z-20 flex justify-center items-center text-8xl cursor-pointer overflow-hidden"
				ref={preScreenRef}
				id="pre-screen"
				onClick={handlePreScreenClick}
			>
				<h1>PELIZZA</h1>
			</div>
			<NavBar />
			<main className="flex flex-col justify-center px-4 gap-[10vh]">
				<div className="w-full max-h-[90vh] aspect-video rounded-2xl overflow-hidden relative">
					<div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-md z-10" />
					<OptimizedVideo
						hlsSrc="/videos/BANDEDEMOFINAL.m3u8"
						mp4Src="/videos/BANDEDEMOFINAL_compressed.mp4"
						poster="/videos/BANDEDEMOFINAL-poster.jpg"
						autoPlay={true}
						loop={true}
						muted={true}
					/>
				</div>
				<div className="flex items-center justify-center px-8" ref={contentDivRef}>
					<h3 className="uppercase text-4xl leading-tight text-center">
					nous sommes une agence créative avec un style visuel unique et une écoute attentive. Chaque projet est une collaboration : nous mêlons nos idées à vos besoins pour créer des contenus qui vous ressemblent. De la conception au tournage, jusqu'à la livraison finale, nous prenons en charge chaque étape pour vous offrir des formats sur-mesure, adaptés à vos envies et à votre univers.
					</h3>
				</div>
			</main>
		</div>
	)
}