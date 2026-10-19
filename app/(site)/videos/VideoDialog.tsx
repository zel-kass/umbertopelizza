"use client";

import dynamic from "next/dynamic";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

export const loadPlayer = () => import("@mux/mux-player-react");
const MuxPlayer = dynamic(loadPlayer, { ssr: false });

export interface VideoSource {
	poster?: string;
	startTime: number;
}

interface VideoDialogProps {
	playbackId: string;
	title: string;
	source: VideoSource | undefined;
	onClose: () => void;
}

export default function VideoDialog({ playbackId, title, source, onClose }: VideoDialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const lenis = useLenis();
	const open = source !== undefined;

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog || !open) return;

		dialog.showModal();
		lenis?.stop();
		const closeOnBackdrop = (event: MouseEvent) => event.target === dialog && dialog.close();
		dialog.addEventListener("click", closeOnBackdrop);

		return () => {
			dialog.removeEventListener("click", closeOnBackdrop);
			dialog.close();
			lenis?.start();
		};
	}, [open, lenis]);

	return (
		<dialog
			ref={dialogRef}
			onClose={onClose}
			aria-label={title}
			className="video-dialog m-auto w-[min(92vw,150vh)] overflow-visible p-0 backdrop:bg-black/90"
		>
			{source && (
				<>
					<button
						type="button"
						onClick={() => dialogRef.current?.close()}
						className="absolute -top-10 right-0 text-white"
					>
						CLOSE
					</button>
					<div
						className="relative aspect-video w-full bg-black bg-cover bg-center"
						style={source.poster ? { backgroundImage: `url(${source.poster})` } : undefined}
					>
						<MuxPlayer
							playbackId={playbackId}
							title={title}
							poster={source.poster}
							startTime={source.startTime}
							autoPlay="any"
							noMutedPref
							capRenditionToPlayerSize
							primaryColor="#fff"
							accentColor="#333"
							className="absolute inset-0 h-full w-full"
						/>
					</div>
				</>
			)}
		</dialog>
	);
}
