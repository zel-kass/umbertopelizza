import { useEffect, useRef } from "react";

export function usePreviewPlayback() {
	const videoRef = useRef<HTMLVideoElement>(null);

	const play = () => videoRef.current?.play().catch(() => {});
	const stop = () => {
		const video = videoRef.current;
		if (!video) return;
		video.pause();
		video.currentTime = 0;
	};

	useEffect(() => {
		const video = videoRef.current;
		const canHover = matchMedia("(hover: hover)").matches;
		const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!video || canHover || reducedMotion) return;

		const observer = new IntersectionObserver(
			([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : stop()),
			{ rootMargin: "-40% 0px -40% 0px" },
		);
		observer.observe(video);
		return () => observer.disconnect();
	}, []);

	return { videoRef, play, stop };
}
