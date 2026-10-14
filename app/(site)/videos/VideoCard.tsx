"use client";

import Image from "next/image";
import { useState } from "react";
import { muxMp4, muxPoster } from "@/lib/mux";
import { usePreviewPlayback } from "./usePreviewPlayback";
import VideoDialog, { loadPlayer } from "./VideoDialog";

const POSTER_TIME = 1;

export default function VideoCard({ playbackId, title }: { playbackId: string; title: string }) {
	const [open, setOpen] = useState(false);
	const [previewStarted, setPreviewStarted] = useState(false);
	const { videoRef, play, pause } = usePreviewPlayback();

	return (
		<>
			<button
				type="button"
				aria-label={`Play ${title}`}
				onClick={() => setOpen(true)}
				onMouseEnter={() => {
					play();
					loadPlayer();
				}}
				onMouseLeave={pause}
				className="relative mb-4 block aspect-video w-full cursor-pointer overflow-hidden bg-neutral-200"
			>
				<Image
					src={muxPoster(playbackId, { time: POSTER_TIME })}
					loader={({ width }) => muxPoster(playbackId, { time: POSTER_TIME, width })}
					alt=""
					fill
					sizes="(min-width: 1024px) 50vw, 100vw"
					className="object-cover"
				/>
				<video
					ref={videoRef}
					src={muxMp4(playbackId, "480p")}
					muted
					loop
					playsInline
					preload="none"
					aria-hidden="true"
					onPlaying={() => setPreviewStarted(true)}
					className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${previewStarted ? "opacity-100" : "opacity-0"}`}
				/>
			</button>
			<VideoDialog
				playbackId={playbackId}
				title={title}
				open={open}
				onClose={() => setOpen(false)}
			/>
		</>
	);
}
