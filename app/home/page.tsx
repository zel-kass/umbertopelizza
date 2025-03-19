'use client'

import ReactLenis from "lenis/react"
import NavBar from "@/app/components/nav-bar"
import Footer from "@/app/components/footer"
import OptimizedVideo from "@/app/components/optimized-video"

export default function Home() {

	return (
    <ReactLenis root>
      <main className="flex flex-col gap-[20vh]">
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
        <div className="flex flex-col justify-end h-content uppercase gap-[20vh]">
          <div className='flex flex-col justify-center items-center gap-10 text-center text-zinc-800 px-[5vw]'>
            <h3 className="text-lg 2xl:text-2xl">services</h3>
            <p className="lg:text-2xl xl:text-5xl 2xl:text-6xl">
            nous sommes une agence créative avec un style visuel unique et une écoute attentive. Chaque projet est une collaboration : nous mêlons nos idées à vos besoins pour créer des contenus qui vous ressemblent. De la conception au tournage, jusqu&apos;à la livraison finale, nous prenons en charge chaque étape pour vous offrir des formats sur-mesure, adaptés à vos envies et à votre univers.
            </p>
          </div>
          <Footer />
        </div>
      </main>
    </ReactLenis>
	)
}