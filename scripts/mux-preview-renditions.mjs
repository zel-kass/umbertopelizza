// Adds a 480p static MP4 rendition (used for hover previews) to every published Prismic video.
// Usage: MUX_TOKEN_ID=... MUX_TOKEN_SECRET=... node scripts/mux-preview-renditions.mjs [--status]
import { createClient } from "@prismicio/client";
import config from "../prismic.config.json" with { type: "json" };

const RESOLUTION = "480p";
const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env;
if (!MUX_TOKEN_ID || !MUX_TOKEN_SECRET) {
	console.error("Set MUX_TOKEN_ID and MUX_TOKEN_SECRET.");
	process.exit(1);
}

const auth = `Basic ${Buffer.from(`${MUX_TOKEN_ID}:${MUX_TOKEN_SECRET}`).toString("base64")}`;

async function mux(path, init = {}) {
	const response = await fetch(`https://api.mux.com/video/v1${path}`, {
		...init,
		headers: { Authorization: auth, "Content-Type": "application/json" },
	});
	const body = await response.json();
	if (!response.ok) throw new Error(`${response.status} ${JSON.stringify(body.error ?? body)}`);
	return body.data;
}

const videos = (await createClient(config.repositoryName).getAllByType("video"))
	.filter((document) => document.data.playback_id)
	.map((document) => ({ id: document.data.playback_id.trim(), name: document.data.title }));
const statusOnly = process.argv.includes("--status");

for (const { id: playbackId, name } of videos) {
	try {
		const { object } = await mux(`/playback-ids/${playbackId}`);
		const asset = await mux(`/assets/${object.id}`);
		const existing = asset.static_renditions?.files?.find(
			(file) => file.resolution === RESOLUTION || file.name === `${RESOLUTION}.mp4`,
		);

		if (existing || statusOnly) {
			console.log(`${name}: ${existing ? existing.status : "no preview rendition"}`);
		} else {
			await mux(`/assets/${object.id}/static-renditions`, {
				method: "POST",
				body: JSON.stringify({ resolution: RESOLUTION }),
			});
			console.log(`${name}: requested`);
		}
	} catch (error) {
		console.log(`${name}: failed, ${error.message}`);
	}
}
