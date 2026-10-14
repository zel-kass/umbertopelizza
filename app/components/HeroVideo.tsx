import { preload } from "react-dom";
import { muxMp4, muxPoster } from "@/lib/mux";

export default function HeroVideo({ playbackId }: { playbackId: string }) {
	const poster = muxPoster(playbackId);
	preload(poster, { as: "image", fetchPriority: "high" });

	return (
		<video
			className="h-full w-full object-cover"
			poster={poster}
			autoPlay
			muted
			loop
			playsInline
			preload="auto"
			aria-hidden="true"
		>
			<source src={muxMp4(playbackId)} type="video/mp4" />
		</video>
	);
}
