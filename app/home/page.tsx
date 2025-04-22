'use client'

import ReactLenis from "lenis/react"
import OptimizedVideo from "@/app/components/optimized-video"
import HorizontalSection from "@/app/components/horizontal-section"

export default function Home() {

	return (
    <ReactLenis root>
      <main className="flex flex-col">
        <div className="w-full h-screen aspect-video z-[-1]">
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