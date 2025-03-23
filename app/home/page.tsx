'use client'

import ReactLenis from "lenis/react"
import NavBar from "@/app/components/nav-bar"
import OptimizedVideo from "@/app/components/optimized-video"
import HorizontalSection from "@/app/components/horizontal-section"

export default function Home() {

	return (
    <ReactLenis root>
      <main className="flex flex-col">
        <div className="fixed w-full top-0 left-0 z-10">
          <NavBar />
        </div>
        <div className="w-full h-screen aspect-video relative overflow-hidden">
          <OptimizedVideo
            hlsSrc="/videos/BANDEDEMO/BANDEDEMOFINAL.m3u8"
            mp4Src="/videos/BANDEDEMO/BANDEDEMOFINAL_compressed.mp4"
            poster="/videos/BANDEDEMO/BANDEDEMOFINAL-poster.jpg"
            autoPlay={true}
            loop={true}
            muted={true}
          />
        </div>
      </main>
			<HorizontalSection />
    </ReactLenis>
	)
}