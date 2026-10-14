export function muxPoster(playbackId: string, { time = 0, width = 1920 } = {}) {
	return `https://image.mux.com/${playbackId}/thumbnail.webp?time=${time}&width=${width}`;
}

export function muxMp4(playbackId: string, rendition: "highest" | "480p" = "highest") {
	return `https://stream.mux.com/${playbackId}/${rendition}.mp4`;
}
