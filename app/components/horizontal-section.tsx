'use client';

import gsap from "gsap";
import SplitType from "split-type";
import FloatingGallery from "@/app/components/floating-gallery";
import ProjectList from "@/app/components/project-list";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Footer from "./footer";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalSection () {
	const sectionRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLDivElement>(null);


	return (
		<section className="overflow-hidden">
			<div ref={triggerRef}>
				<div ref={sectionRef} className="scroll-section-inner">
					<div className="scroll-section">
						<Section1 />
					</div>
					<div className="scroll-section">
						<FloatingGallery />
					</div>
					<div className="scroll-section">
						<ProjectList />
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
				<p className="lg:text-2xl xl:text-5xl 2xl:text-[3vw]">
				nous sommes une agence créative avec un style visuel unique et une écoute attentive. Chaque projet est une collaboration : nous mêlons nos idées à vos besoins pour créer des contenus qui vous ressemblent. De la conception au tournage, jusqu&apos;à la livraison finale, nous prenons en charge chaque étape pour vous offrir des formats sur-mesure, adaptés à vos envies et à votre univers.
				</p>
			</div>
		</main>
	)
}