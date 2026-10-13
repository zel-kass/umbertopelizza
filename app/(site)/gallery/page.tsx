import { getGalleryProjects } from "@/lib/gallery";
import GalleryList from "./GalleryList";

export default async function GalleryPage() {
	const projects = await getGalleryProjects();

	return (
		<main>
			<div className="flex flex-col space-y-10 h-content p-4">
				<div className="h-[25em] w-full flex items-end relative">
					<h1>GALLERY</h1>
				</div>
			</div>
			<GalleryList projects={projects} />
		</main>
	);
}
