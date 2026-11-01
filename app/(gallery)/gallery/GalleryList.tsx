"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { preloadPhoto } from "@/app/components/Photo";
import type { GalleryProject } from "@/lib/gallery";
import { EAGER_PHOTOS, GRID_SIZES } from "./[uid]/ProjectPhotos";
import { useProjectRowAnimation } from "./useProjectRowAnimation";

function ProjectRow({ project }: { project: GalleryProject }) {
	const { boxRef, overlayRef, hiddenOverlayRef, onMouseEnter, onMouseLeave } =
		useProjectRowAnimation();
	const preloadPhotos = () =>
		project.photos.slice(0, EAGER_PHOTOS).forEach((photo) => preloadPhoto(photo, GRID_SIZES));

	return (
		<ViewTransition name={`project-${project.uid}`} share="auto" default="none">
			<Link
				ref={boxRef}
				href={`/gallery/${project.uid}`}
				transitionTypes={["nav-forward"]}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onPointerEnter={preloadPhotos}
				onFocus={preloadPhotos}
				className="block h-[6em] overflow-hidden relative bg-white"
			>
				<div ref={overlayRef} className="w-full h-full px-5 flex items-center">
					<h2 className="text-black">{project.title}</h2>
				</div>
				<div ref={hiddenOverlayRef} className="w-full h-full px-5 flex items-center bg-black">
					<h2 className="text-white">{project.title}</h2>
				</div>
			</Link>
		</ViewTransition>
	);
}

export default function GalleryList({ projects }: { projects: GalleryProject[] }) {
	return (
		<ul className="border-t-2 border-black">
			{projects.map((project) => (
				<li key={project.uid} className="border-b-2 border-black">
					<ProjectRow project={project} />
				</li>
			))}
		</ul>
	);
}
