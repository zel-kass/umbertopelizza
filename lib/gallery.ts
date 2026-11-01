import { isFilled, type Content, type FilledImageFieldImage } from "@prismicio/client";
import { createClient } from "@/prismicio";

export type GalleryPhoto = Pick<FilledImageFieldImage, "url" | "alt" | "dimensions">;

export interface GalleryProject {
	uid: string;
	title: string;
	photos: GalleryPhoto[];
}

export async function getGalleryProjects(): Promise<GalleryProject[]> {
	const documents = await createClient().getAllByType("gallery_project", {
		orderings: { field: "document.first_publication_date", direction: "desc" },
	});

	return documents.map(toGalleryProject);
}

export async function getGalleryProject(uid: string): Promise<GalleryProject | null> {
	const document = await createClient()
		.getByUID("gallery_project", uid)
		.catch(() => null);
	return document && toGalleryProject(document);
}

function toGalleryProject(document: Content.GalleryProjectDocument): GalleryProject {
	return {
		uid: document.uid,
		title: document.data.title || "Untitled project",
		photos: document.data.slices
			.map((slice) => slice.primary.photo)
			.filter((photo) => isFilled.image(photo))
			.map(({ url, alt, dimensions }) => ({ url, alt, dimensions })),
	};
}
