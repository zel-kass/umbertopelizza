'use client'

import { useRef, useState } from "react"
import MuxPlayer from '@mux/mux-player-react'
import ReactLenis from "lenis/react"

import NavBar from "@/app/components/NavBar"
import videos from "@/lib/data/videos.json"
import Footer from "@/app/components/Footer"

export default function Videos() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const playerRefs = useRef<any[]>([])
	const isFullscreenRef = useRef<boolean[]>([])
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
	const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const handleMouseEnter = (index: number) => {
		playerRefs.current[index]?.play?.()
		setHoveredIndex(index)
	}

	const handleMouseLeave = (index: number) => {
		// Don't pause if the video is in fullscreen
		if (!isFullscreenRef.current[index]) {
			playerRefs.current[index]?.pause?.()
			setHoveredIndex(null)
		}
	}

	const handleMouseMove = (index: number) => {
		// Only handle mouse move if in fullscreen
		if (isFullscreenRef.current[index]) {
			setHoveredIndex(index)
			
			// Clear existing timeout
			if (hideControlsTimeoutRef.current) {
				clearTimeout(hideControlsTimeoutRef.current)
			}
			
			// Hide controls after 3 seconds of inactivity in fullscreen
			hideControlsTimeoutRef.current = setTimeout(() => {
				if (isFullscreenRef.current[index]) {
					setHoveredIndex(null)
				}
			}, 3000)
		}
	}

	const handleVideoClick = (index: number, e: React.MouseEvent) => {
		// Check if click is on the time range (progress bar)
		const target = e.target as HTMLElement
		if (target.closest('media-time-range') || target.closest('[slot="time-range"]')) {
			return // Let the time range handle its own clicks
		}

		const player = playerRefs.current[index]
		if (player) {
			// Mark as fullscreen
			isFullscreenRef.current[index] = true
			setHoveredIndex(index)
			
			// Request fullscreen on the media element
			const mediaElement = player.media
			if (mediaElement) {
				// Ensure video is playing
				player.play()
				
				if (mediaElement.requestFullscreen) {
					mediaElement.requestFullscreen()
				} else if (mediaElement.webkitRequestFullscreen) {
					mediaElement.webkitRequestFullscreen()
				} else if (mediaElement.mozRequestFullScreen) {
					mediaElement.mozRequestFullScreen()
				} else if (mediaElement.msRequestFullscreen) {
					mediaElement.msRequestFullscreen()
				}
				
				// Listen for fullscreen exit
				const handleFullscreenChange = () => {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const doc = document as any
					if (!document.fullscreenElement && 
						!doc.webkitFullscreenElement && 
						!doc.mozFullScreenElement && 
						!doc.msFullscreenElement) {
						isFullscreenRef.current[index] = false
						setHoveredIndex(null)
						if (hideControlsTimeoutRef.current) {
							clearTimeout(hideControlsTimeoutRef.current)
						}
						document.removeEventListener('fullscreenchange', handleFullscreenChange)
						document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
						document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
						document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
					}
				}
				
				document.addEventListener('fullscreenchange', handleFullscreenChange)
				document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
				document.addEventListener('mozfullscreenchange', handleFullscreenChange)
				document.addEventListener('MSFullscreenChange', handleFullscreenChange)
			}
		}
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
										className="w-full relative aspect-video mb-4 overflow-hidden cursor-pointer"
										onMouseEnter={() => handleMouseEnter(index)}
										onMouseLeave={() => handleMouseLeave(index)}
										onMouseMove={() => handleMouseMove(index)}
										onClick={(e) => handleVideoClick(index, e)}
									>
										<MuxPlayer
											ref={(el) => {
												playerRefs.current[index] = el
											}}
											playbackId={video.id}
											loop
											muted
											className={hoveredIndex === index ? 'show-controls' : ''}
											style={{
												width: '100%',
												height: '100%'
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