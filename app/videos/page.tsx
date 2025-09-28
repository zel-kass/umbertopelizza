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
					<div className="h-[25em] w-full flex items-end relative">
						<h1>SELECTED WORKS</h1>
					</div>
					<div className="h-content">
						<div className="grid lg:grid-cols-2 grid-rows-auto">
							{videos.map((video, index) => (
								<div className="relative lg:p-4 flex flex-col items-center" key={index}>
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
									<div className="w-full flex flex-row justify-between items-start pr-2">
										<h2>{video.name}</h2>
										<div className="flex flex-col">
											{video.keywords.map((keyword, keywordIndex) => (
												<span key={keywordIndex}>{keyword}</span>
											))}
										</div>
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