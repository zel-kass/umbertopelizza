'use client';

import gsap from "gsap";
import Image from "next/image";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect, useState, MouseEvent } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
	floating1,
	floating2,
	floating3,
	floating4,
	floating5,
	floating6,
	floating7,
	floating8
} from '@/lib/data'
import Footer from "./footer";

export default function HorizontalSection () {
	const sectionRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLDivElement>(null);

	gsap.registerPlugin(ScrollTrigger);
	gsap.registerPlugin(useGSAP);

	useEffect(() => {
		const pin = gsap.fromTo(sectionRef.current, {
			translateX: 0,
		}, {
			translateX: "-200vw",
			ease: "none",
			duration: 1,
			scrollTrigger: {
				trigger: triggerRef.current,
				start: "top top",
				end: "1000 top",
				scrub: 1,
				pin: true,
			}
		})

		return () => {
			pin.kill();
		}
	})

	return (
		<section className="overflow-hidden">
			<div ref={triggerRef}>
				<div ref={sectionRef} className="scroll-section-inner">
					<div className="scroll-section">
						<Section1 />
					</div>
					<div className="scroll-section">
						<Section2 />
					</div>
					<div className="scroll-section">
						<Section3 />
					</div>
				</div>
			</div>
			<Footer />
		</section>
	);
}

function Section1 () {
	const container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const text = new SplitType("#info p", {
			types: "lines",
			tagName: "div",
			lineClass: "line"
		});

		text.lines?.forEach((line) => {
			const content = line.innerHTML;
			line.innerHTML = `<span>${content}</span>`;
		})

		gsap.set("#info p .line span", {
			y: 400,
			display: "block",
			opacity: 0,
		})

		gsap.to("#info p .line span", {
			y: 0,
			opacity: 1,
			stagger: 0.05,
			duration: 1,
			ease: "power4.out",
			scrollTrigger: {
				trigger: "#info",
				start: "75 bottom",
		}})

		return () => {
			if (text)
				text.revert();
		}
	}, [container])

	return (
		<main className="flex flex-col justify-end uppercase gap-[20vh]">
			<div className='flex flex-col justify-center items-center gap-10 text-center text-zinc-900 px-[5vw]' ref={container} id="info">
				<h3 className="text-lg 2xl:text-2xl">services</h3>
				<p className="lg:text-2xl xl:text-5xl 2xl:text-7xl">
				nous sommes une agence créative avec un style visuel unique et une écoute attentive. Chaque projet est une collaboration : nous mêlons nos idées à vos besoins pour créer des contenus qui vous ressemblent. De la conception au tournage, jusqu&apos;à la livraison finale, nous prenons en charge chaque étape pour vous offrir des formats sur-mesure, adaptés à vos envies et à votre univers.
				</p>
			</div>
		</main>
	)
}

function Section2 () {
	const plane1 = useRef<HTMLDivElement>(null);
	const plane2 = useRef<HTMLDivElement>(null);
	const plane3 = useRef<HTMLDivElement>(null);

	let requestAnimationFrameId: number | null = null;
	let xForce: number = 0;
	let yForce: number = 0;
	const easing: number = 0.08;
	const speed: number = 0.01;

	const manageMouseMove = (e: MouseEvent): void => {
		const { movementX, movementY } = e;
		xForce += movementX * speed;
		yForce += movementY * speed;
		if (requestAnimationFrameId === null) {
			requestAnimationFrameId = requestAnimationFrame(animate);
		}
	};

	const lerp = (start: number, target: number, amount: number): number => 
		start * (1 - amount) + target * amount;

	const animate = (): void => {
		xForce = lerp(xForce, 0, easing);
		yForce = lerp(yForce, 0, easing);
		
		gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
		gsap.set(plane2.current, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` });
		gsap.set(plane3.current, { x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}` });

		if (Math.abs(xForce) < 0.01) xForce = 0;
		if (Math.abs(yForce) < 0.01) yForce = 0;
		
		if (xForce !== 0 || yForce !== 0) {
			requestAnimationFrame(animate);
		} else {
			if (requestAnimationFrameId !== null) {
				cancelAnimationFrame(requestAnimationFrameId);
				requestAnimationFrameId = null;
			}
		}
	};

	return (
		<main onMouseMove={manageMouseMove} className="relative w-full h-full">
			<h1 className="absolute top-[45%] left-[50%] text-4xl cursor-pointer translate-x-[-50%] translate-y-[-50%] z-40">GALLERY</h1>
			<div ref={plane1} className="absolute w-full h-full">
				<Image 
					src={floating1}
					alt='image'
					width={300}
					className="absolute top-[65%] left-[85%]"
				/>
				<Image 
					src={floating2}
					alt='image'
					width={300}
					className="absolute top-[65%] left-[5%]"
				/>
				<Image 
					src={floating7}
					alt='image'
					width={225}
					className="absolute top-[0%] left-[35%]"
				/>
			</div>
			<div ref={plane2} className="absolute w-full h-full">
				<Image 
					src={floating4}
					alt='image'
					width={300}
					className="absolute top-[10%] left-[5%]"
				/>
				<Image 
					src={floating6}
					alt='image'
					width={250}
					className="absolute top-[10%] left-[85%]"
				/>
				<Image 
					src={floating8}
					alt='image'
					width={225}
					className="absolute top-[60%] left-[60%]"
				/>
			</div>
			<div ref={plane3} className="absolute w-full h-full">
				<Image 
					src={floating3}
					alt='image'
					width={300}
					className="absolute top-[2.5%] left-[65%]"
				/>
				<Image 
					src={floating5}
					alt='image'
					width={300}
					className="absolute top-[70%] left-[40%]"
				/>
			</div>
		</main>
	)
}

interface Project {
	title1: string;
	title2: string;
	src: string;
}

function Section3 () {
	const projects = [
		{
			title1: "VICTOR MARTINEZ",
			title2: "MARECHAL",
			src: "/videos/PREVIEWS/MARTINEZ_PREVIEW.png"
		},
		{
			title1: "AZOTE",
			title2: "WALLACE BOI",
			src: "/videos/PREVIEWS/AZOTE_PREVIEW.png"
		},
		{
			title1: "CITIZENK",
			title2: "CORTO MALTESE",
			src: "/videos/PREVIEWS/CORTO_PREVIEW.png"
		},
		{
			title1: "GEORGE",
			title2: "YUNG",
			src: "/videos/PREVIEWS/GEORGE_PREVIEW.png"
		},
		{
			title1: "WALLACE &",
			title2: "RYUK",
			src: "/videos/PREVIEWS/WALLACE_PREVIEW.png"
		},
		{
			title1: "MORCEAU",
			title2: "D'AMOUR",
			src: "/videos/PREVIEWS/MORCEAU_PREVIEW.png"
		},
	]

	return (
		<div className="flex flex-col items-center w-full mx-[5vw]">
			<h3 className="mb-6">PROJETS PHARES</h3>
			{projects.map((project) => (
				<Project key={project.title1} project={project} />
			))}
		</div>
	)
}

function Project({project} : {project: Project}) {
	const { title1, title2, src } = project;
	const preview = useRef<HTMLDivElement>(null);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (isActive) {
			gsap.to(preview.current, {
				transformOrigin: "center",
				width: 'auto',
				duration: 0.5,
				ease: "power4.out",
			})
		} else {
			gsap.to(preview.current, {
				width: '0',
				duration: 0.5,
				ease: "power4.out",
			})
		}
	}, [isActive])
	

	return (
			<div className="w-full flex items-center justify-center py-4 text-2xl lg:text-4xl 2xl:text-8xl border-t cursor-pointer" onMouseEnter={() => {setIsActive(true)}} onMouseLeave={() => {setIsActive(false)}}>
					<p>{title1}</p>
					<div className="overflow-hidden flex justify-center h-[10vh] w-0 px-2" ref={preview}>
						<img
							src={src}
							alt={title1}
							className="object-contain"
						/>
					</div>
					<p>{title2}</p>
			</div>
	)
}