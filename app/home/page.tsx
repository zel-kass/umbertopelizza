'use client'

// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import NavBar from "@/app/components/nav-bar"
import Footer from "@/app/components/footer"
import OptimizedVideo from "@/app/components/optimized-video"

export default function Home() {
	// const lenis = new Lenis();

	// lenis.on('scroll', ScrollTrigger.update);

	// gsap.ticker.add((time) => {
	// 	lenis.raf(time * 1000);
	// });

	// Disable lag smoothing in GSAP to prevent any delay in scroll animations
	// gsap.ticker.lagSmoothing(0);

	return (
		<main className="flex flex-col gap-[5vh]">
			<div className="fixed w-full top-0 left-0 z-10">
				<NavBar />
			</div>
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
			<div className="flex flex-col h-screen justify-end h-content uppercase gap-12 lg:gap-[25vh]">
				<div className='flex flex-col justify-center items-center gap-10 text-center text-zinc-800 px-6 2xl:px-24'>
					<h3 className="text-lg 2xl:text-2xl">services</h3>
					<h3 className="lg:text-2xl xl:text-4xl 2xl:text-5xl">
					nous sommes une agence créative avec un style visuel unique et une écoute attentive. Chaque projet est une collaboration : nous mêlons nos idées à vos besoins pour créer des contenus qui vous ressemblent. De la conception au tournage, jusqu&apos;à la livraison finale, nous prenons en charge chaque étape pour vous offrir des formats sur-mesure, adaptés à vos envies et à votre univers.
					</h3>
				</div>
				<Footer />
			</div>
		</main>
	)
}