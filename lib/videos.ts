import { createClient } from "@/prismicio";

export interface Video {
	uid: string;
	title: string;
	playbackId: string;
}

export async function getVideos(): Promise<Video[]> {
	const documents = await createClient().getAllByType("video", {
		orderings: { field: "document.first_publication_date", direction: "desc" },
	});

	return documents.flatMap(({ uid, data }) =>
		data.playback_id
			? [{ uid, title: data.title || "Untitled video", playbackId: data.playback_id.trim() }]
			: [],
	);
}
