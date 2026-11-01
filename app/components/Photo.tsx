"use client";

import Image, { getImageProps, type ImageLoader, type ImageProps } from "next/image";
import { useState } from "react";
import { preload } from "react-dom";
import { cn } from "@/lib/utils";
import type { GalleryPhoto } from "@/lib/gallery";

const imgixLoader: ImageLoader = ({ src, width, quality }) => {
	const url = new URL(src);
	url.searchParams.set("w", String(width));
	if (quality) url.searchParams.set("q", String(quality));
	return url.toString();
};

export function preloadPhoto(photo: GalleryPhoto, sizes: string) {
	const { props } = getImageProps({
		src: photo.url,
		alt: "",
		width: photo.dimensions.width,
		height: photo.dimensions.height,
		loader: imgixLoader,
		sizes,
	});
	preload(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes });
}

type PhotoProps = Omit<
	ImageProps,
	"src" | "alt" | "width" | "height" | "loader" | "fill" | "className"
> & {
	photo: GalleryPhoto;
	fallbackAlt: string;
	className?: string;
};

export default function Photo({ photo, fallbackAlt, className, ...props }: PhotoProps) {
	const [status, setStatus] = useState<"loading" | "cached" | "loaded">("loading");

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
					if (img?.complete && img.naturalWidth > 0)
						setStatus((current) => (current === "loading" ? "cached" : current));
				}}
				onLoad={() => setStatus((current) => (current === "loading" ? "loaded" : current))}
				className={cn(
					"h-full w-full object-cover",
					status !== "cached" && "transition-opacity duration-500",
					status === "loading" ? "opacity-0" : "opacity-100",
				)}
			/>
		</div>
	);
}
