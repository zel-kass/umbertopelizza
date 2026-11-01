"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import Photo, { preloadPhoto } from "@/app/components/Photo";
import type { GalleryPhoto } from "@/lib/gallery";

const DIALOG_SIZES = "92vw";

interface PhotoDialogProps {
	photos: GalleryPhoto[];
	gridSizes: string;
	title: string;
	index: number | null;
	onIndexChange: (index: number | null) => void;
}

export default function PhotoDialog({
	photos,
	gridSizes,
	title,
	index,
	onIndexChange,
}: PhotoDialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const lenis = useLenis();
	const open = index !== null;
	const photo = open ? photos[index] : undefined;

	const position = (index ?? 0) + 1;

	const step = (delta: number) => {
		if (index !== null) onIndexChange((index + delta + photos.length) % photos.length);
	};

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

	useEffect(() => {
		if (index === null || photos.length < 2) return;
		preloadPhoto(photos[(index + 1) % photos.length], DIALOG_SIZES);
		preloadPhoto(photos[(index - 1 + photos.length) % photos.length], DIALOG_SIZES);
	}, [index, photos]);

	return (
		<dialog
			ref={dialogRef}
			onClose={() => onIndexChange(null)}
			onKeyDown={(event) => {
				if (event.key === "ArrowLeft") step(-1);
				if (event.key === "ArrowRight") step(1);
			}}
			aria-label={title}
			className="m-auto overflow-visible bg-transparent p-0 backdrop:bg-black/90 motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-out motion-safe:starting:open:opacity-0 motion-safe:backdrop:transition-opacity motion-safe:backdrop:duration-300 motion-safe:backdrop:ease-out motion-safe:starting:open:backdrop:opacity-0"
		>
			{photo && (
				<>
					<div className="absolute -top-10 inset-x-0 flex justify-between text-white">
						<span>
							{position} / {photos.length}
						</span>
						<button
							type="button"
							onClick={() => dialogRef.current?.close()}
							className="cursor-pointer"
						>
							CLOSE
						</button>
					</div>
					<div
						className="relative"
						style={{
							aspectRatio: `${photo.dimensions.width} / ${photo.dimensions.height}`,
							width: `min(92vw, ${(80 * photo.dimensions.width) / photo.dimensions.height}vh)`,
						}}
					>
						{/* The grid's cached copy shows instantly while the sharp version loads on top */}
						<Photo
							key={`grid-${photo.url}`}
							photo={photo}
							fallbackAlt=""
							aria-hidden
							className="h-full w-full"
							sizes={gridSizes}
							loading="eager"
						/>
						<Photo
							key={photo.url}
							photo={photo}
							fallbackAlt={`${title} image ${position}`}
							className="absolute inset-0 bg-transparent"
							sizes={DIALOG_SIZES}
							loading="eager"
						/>
					</div>
					{photos.length > 1 && (
						<div className="absolute -bottom-10 inset-x-0 flex justify-between text-white">
							<button type="button" onClick={() => step(-1)} className="cursor-pointer">
								← PREV
							</button>
							<button type="button" onClick={() => step(1)} className="cursor-pointer">
								NEXT →
							</button>
						</div>
					)}
				</>
			)}
		</dialog>
	);
}
