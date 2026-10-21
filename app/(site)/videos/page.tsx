import { preconnect } from "react-dom";
import VideoCard from "./VideoCard";
import { getVideos } from "@/lib/videos";

export default async function Videos() {
	const videos = await getVideos();
	preconnect("https://stream.mux.com", { crossOrigin: "anonymous" });
	preconnect("https://image.mux.com");

	return (
		<main className="p-4">
			<div className="h-[25em] w-full flex items-end relative">
				<h1>SELECTED WORKS</h1>
			</div>
			<div className="h-content">
				<div className="grid lg:grid-cols-2 grid-rows-auto mb-16">
					{videos.map((video) => (
						<div className="relative lg:p-4 flex flex-col items-center" key={video.uid}>
							<VideoCard playbackId={video.playbackId} title={video.title} />
							<div className="w-full flex flex-row">
								<h2>{video.title}</h2>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
