import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import Footer from "@/app/components/Footer";
import { getGalleryProject, getGalleryProjects } from "@/lib/gallery";
import ProjectPhotos from "./ProjectPhotos";

interface ProjectPageProps {
	params: Promise<{ uid: string }>;
}

export async function generateStaticParams() {
	const projects = await getGalleryProjects();
	return projects.map(({ uid }) => ({ uid }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
	const project = await getGalleryProject((await params).uid);
	return { title: project ? `${project.title} | Pelizza Pictures` : "Pelizza Pictures" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const project = await getGalleryProject((await params).uid);
	if (!project) notFound();

	return (
		<ViewTransition
			enter={{ "nav-forward": "gallery-photos-enter", default: "none" }}
			default="none"
		>
			<main className="pt-[6em]">
				<div className="px-4 pb-4">
					<Link href="/gallery" transitionTypes={["nav-back"]} className="font-bold">
						← GALLERY
					</Link>
				</div>
				<ViewTransition name={`project-${project.uid}`} share="auto" default="none">
					<div className="h-[7em] px-5 flex items-center border-y-2 border-black bg-white">
						<h1 className="text-[min(5em,10vw)]">{project.title}</h1>
					</div>
				</ViewTransition>
				<ProjectPhotos project={project} />
				<div className="px-4 pt-16 lg:px-8">
					<Footer />
				</div>
			</main>
		</ViewTransition>
	);
}
