"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { muxMp4, muxPoster } from "@/lib/mux";
import { usePreviewPlayback } from "./usePreviewPlayback";
import VideoDialog, { loadPlayer, type VideoSource } from "./VideoDialog";

const POSTER_TIME = 1;

export default function VideoCard({ playbackId, title }: { playbackId: string; title: string }) {
	const [source, setSource] = useState<VideoSource>();
	const [previewPlaying, setPreviewPlaying] = useState(false);
	const { videoRef, play, stop } = usePreviewPlayback();
	const posterRef = useRef<HTMLImageElement>(null);

	return (
		<>
			<button
				type="button"
				aria-label={`Play ${title}`}
				onClick={() => {
					setSource({
						poster: posterRef.current?.currentSrc,
						startTime: videoRef.current?.currentTime ?? 0,
					});
					stop();
				}}
				onMouseEnter={() => {
					play();
					loadPlayer();
				}}
				onMouseLeave={stop}
				className="relative mb-4 block aspect-video w-full cursor-pointer overflow-hidden bg-neutral-200"
			>
				<Image
					ref={posterRef}
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
					onPlaying={() => {
						setPreviewPlaying(true);
						loadPlayer();
					}}
					onPause={() => setPreviewPlaying(false)}
					className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${previewPlaying ? "opacity-100" : "opacity-0"}`}
				/>
			</button>
			<VideoDialog
				playbackId={playbackId}
				title={title}
				source={source}
				onClose={() => setSource(undefined)}
			/>
		</>
	);
}
