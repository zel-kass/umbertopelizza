import VideoCard from "./VideoCard";
import videos from "@/lib/data/videos.json";

export default function Videos() {
	return (
		<main className="p-4">
			<div className="h-[25em] w-full flex items-end relative">
				<h1>SELECTED WORKS</h1>
			</div>
			<div className="h-content">
				<div className="grid lg:grid-cols-2 grid-rows-auto mb-16">
					{videos.map((video) => (
						<div className="relative lg:p-4 flex flex-col items-center" key={video.id}>
							<VideoCard playbackId={video.id} title={video.name} />
							<div className="w-full flex flex-row">
								<h2>{video.name}</h2>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
