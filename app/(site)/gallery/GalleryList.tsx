"use client";

import { useState } from "react";
import Photo from "@/app/components/Photo";
import type { GalleryProject } from "@/lib/gallery";
import { useProjectRowAnimation } from "./useProjectRowAnimation";

interface ProjectRowProps {
	project: GalleryProject;
	isActive: boolean;
}

interface ProjectDetailsProps {
	project: GalleryProject;
	show: boolean;
	warm: boolean;
}

function ProjectRow({ project, isActive }: ProjectRowProps) {
	const teaser = project.photos[0];
	const { boxRef, overlayRef, hiddenOverlayRef, teaserRef, onMouseEnter, onMouseLeave } =
		useProjectRowAnimation(isActive);

	return (
		<>
			{teaser && (
				<div
					ref={teaserRef}
					className="fixed pointer-events-none z-50"
					style={{
						right: "4rem",
						opacity: 0,
					}}
				>
					<Photo
						photo={teaser}
						fallbackAlt={`${project.title} teaser`}
						className="w-64 h-96 overflow-hidden"
						sizes="256px"
						loading="eager"
					/>
				</div>
			)}

			<div
				ref={boxRef}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				className="h-[7em] overflow-hidden relative z-10 cursor-pointer"
			>
				<div ref={overlayRef} className="w-full h-full px-5 flex items-center justify-between">
					<h2 className="text-black font-800">{project.title}</h2>
				</div>
				<div
					ref={hiddenOverlayRef}
					className="w-full h-full px-5 flex items-center justify-between bg-black"
				>
					<h2 className="text-white">{project.title}</h2>
				</div>
			</div>
		</>
	);
}

function ProjectDetails({ project, show, warm }: ProjectDetailsProps) {
	const [rendered, setRendered] = useState(false);
	if ((show || warm) && !rendered) setRendered(true);

	return (
		<div
			className={`grid transition-all duration-500 overflow-hidden px-5 backdrop-blur-lg 
        ${show ? "grid-rows-[1fr] py-5" : "grid-rows-[0fr]"}`}
		>
			<div className="overflow-hidden">
				{rendered && (
					<div className="columns-2 md:columns-3 gap-4">
						{project.photos.map((photo, index) => (
							<Photo
								key={photo.url}
								photo={photo}
								fallbackAlt={`${project.title} image ${index + 1}`}
								className="break-inside-avoid mb-4"
								sizes="(max-width: 768px) 50vw, 33vw"
								loading="eager"
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default function GalleryList({ projects }: { projects: GalleryProject[] }) {
	const [activeUid, setActiveUid] = useState<string | null>(null);
	const [warmUid, setWarmUid] = useState<string | null>(null);

	return (
		<div className="min-h-[50vh] w-full mb-16">
			<div className="grid grid-row-auto">
				{projects.map((project, index) => (
					<div
						onClick={() => setActiveUid(activeUid === project.uid ? null : project.uid)}
						onPointerEnter={() => setWarmUid(project.uid)}
						key={project.uid}
					>
						{index === 0 && <div className="h-[2px] bg-black" />}
						<ProjectRow project={project} isActive={activeUid === project.uid} />
						<ProjectDetails
							project={project}
							show={activeUid === project.uid}
							warm={warmUid === project.uid}
						/>
						<div className="h-[2px] bg-black" />
					</div>
				))}
			</div>
		</div>
	);
}
