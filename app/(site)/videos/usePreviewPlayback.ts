import { useEffect, useRef } from "react";

// Desktop: the preview plays while hovered. Touch screens have no hover, so it plays while the
// card is mostly on screen instead (unless the visitor asked for reduced motion).
export function usePreviewPlayback() {
	const videoRef = useRef<HTMLVideoElement>(null);

	const play = () => videoRef.current?.play().catch(() => {});
	const pause = () => videoRef.current?.pause();

	useEffect(() => {
		const video = videoRef.current;
		const canHover = matchMedia("(hover: hover)").matches;
		const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!video || canHover || reducedMotion) return;

		const observer = new IntersectionObserver(
			([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
			{ threshold: 0.6 },
		);
		observer.observe(video);
		return () => observer.disconnect();
	}, []);

	return { videoRef, play, pause };
}
