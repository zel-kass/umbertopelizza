"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { GalleryPhoto } from "@/lib/gallery";

const imgixLoader: ImageLoader = ({ src, width, quality }) => {
	const url = new URL(src);
	url.searchParams.set("w", String(width));
	if (quality) url.searchParams.set("q", String(quality));
	return url.toString();
};

type PhotoProps = Omit<
	ImageProps,
	"src" | "alt" | "width" | "height" | "loader" | "fill" | "className"
> & {
	photo: GalleryPhoto;
	fallbackAlt: string;
	className?: string;
};

export default function Photo({ photo, fallbackAlt, className, ...props }: PhotoProps) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className={cn("bg-neutral-200", className)}>
			<Image
				{...props}
				src={photo.url}
				alt={photo.alt || fallbackAlt}
				width={photo.dimensions.width}
				height={photo.dimensions.height}
				loader={imgixLoader}
				ref={(img) => {
					if (img?.complete && img.naturalWidth > 0) setLoaded(true);
				}}
				onLoad={() => setLoaded(true)}
				className={cn(
					"h-full w-full object-cover transition-opacity duration-500",
					loaded ? "opacity-100" : "opacity-0",
				)}
			/>
		</div>
	);
}
