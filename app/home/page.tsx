'use client';

import MuxPlayer from "@mux/mux-player-react"

import ReactLenis from "lenis/react"
import NavBar from "@/app/components/NavBar"

export default function Home() {
	return (
		<ReactLenis root>
			<NavBar />
			<main className="flex flex-col h-screen w-screen">
				<div className="h-full w-full relative z-0 overflow-hidden">
					<MuxPlayer
						playbackId={"pXenY200X6FHzLmpAgMyTpN3zB2dHlnHJ02J5X028TptPM"}
						loop
						muted
						autoPlay
						primaryColor="#fff"
						accentColor="#333"
						thumbnailTime={0}
						style={{
							height: '100%',
							width: '100%',
							pointerEvents: 'none',
						}}
					/>
				</div>
			</main>
		</ReactLenis>
	)
}