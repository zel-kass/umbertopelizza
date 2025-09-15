'use client'

import { useRef } from "react"
import MuxPlayer from '@mux/mux-player-react'
import ReactLenis from "lenis/react"

import NavBar from "@/app/components/NavBar"
import videos from "@/lib/data/videos.json"
import Footer from "@/app/components/Footer"

export default function Videos() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRefs = useRef<any[]>([])

  const handleMouseEnter = (index: number) => {
    playerRefs.current[index]?.play?.()
  }

  const handleMouseLeave = (index: number) => {
    playerRefs.current[index]?.pause?.()
  }

	return (
		<ReactLenis root>
			<div className="min-h-screen max-w-screen relative">
				<NavBar />
				<div className="p-4 mb-16">
					<div className="h-[35em] w-full flex items-end relative">
						<div className="flex flex-row justify-between w-full text-white mix-blend-exclusion px-4 z-10">
							<h1>SELECTED WORKS</h1>
							<h1 className="text-end">&apos;22 &apos;25</h1>
						</div>
					</div>
					<div className="h-content">
						<div className="grid lg:grid-cols-2 grid-rows-auto">
							{videos.map((video, index) => (
								<div className="relative p-4 flex flex-col items-center" key={index}>
									<div
										className="w-full relative aspect-video mb-4 overflow-hidden"
										onMouseEnter={() => handleMouseEnter(index)}
										onMouseLeave={() => handleMouseLeave(index)}
									>
										<MuxPlayer
											ref={(el) => {
                        playerRefs.current[index] = el
                      }}
											playbackId={video.id}
											loop
											muted
											style={{
												width: '100%',
												height: '100%',
												pointerEvents: 'none'
											}}
										/>
									</div>
									<h1>&quot;{video.name}&quot;</h1>
									<div className="w-full border border-neutral-700 flex flex-row justify-around text-center">
										{video.keywords.map((keyword, keywordIndex) => (
											<div key={keywordIndex} className="flex w-full">
												<div className="flex w-full items-center justify-center">
													<h3>{keyword}</h3>
												</div>
												{keywordIndex !== video.keywords.length - 1 && (
													<div className="h-full w-[1px] bg-black" />
												)}
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</ReactLenis>
	)
}