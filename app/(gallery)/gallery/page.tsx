import Footer from "@/app/components/Footer";
import { getGalleryProjects } from "@/lib/gallery";
import GalleryList from "./GalleryList";

export default async function GalleryPage() {
	const projects = await getGalleryProjects();

	return (
		<main className="flex h-svh flex-col">
			<div className="h-[min(25em,40svh)] w-full shrink-0 flex items-end p-4">
				<h1>GALLERY</h1>
			</div>
			<div
				data-lenis-prevent
				className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain"
			>
				<GalleryList projects={projects} />
				<div className="px-4 pt-16 lg:px-8">
					<Footer />
				</div>
			</div>
		</main>
	);
}
