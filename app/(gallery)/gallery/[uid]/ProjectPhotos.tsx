"use client";

import { useState } from "react";
import Photo from "@/app/components/Photo";
import type { GalleryProject } from "@/lib/gallery";
import PhotoDialog from "./PhotoDialog";

export const GRID_SIZES = "(max-width: 768px) 50vw, 33vw";
export const EAGER_PHOTOS = 6;

export default function ProjectPhotos({ project }: { project: GalleryProject }) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<>
			<div className="columns-2 md:columns-3 gap-4 p-5">
				{project.photos.map((photo, index) => (
					<button
						key={photo.url}
						type="button"
						onClick={() => setOpenIndex(index)}
						className="block w-full mb-4 break-inside-avoid cursor-zoom-in"
					>
						<Photo
							photo={photo}
							fallbackAlt={`${project.title} image ${index + 1}`}
							sizes={GRID_SIZES}
							loading={index < EAGER_PHOTOS ? "eager" : "lazy"}
						/>
					</button>
				))}
			</div>
			<PhotoDialog
				photos={project.photos}
				gridSizes={GRID_SIZES}
				title={project.title}
				index={openIndex}
				onIndexChange={setOpenIndex}
			/>
		</>
	);
}
