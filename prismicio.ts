import { createClient as baseCreateClient, type ClientConfig, type Route } from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import config from "./prismic.config.json";

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

export const createClient = (clientConfig: ClientConfig = {}) => {
	const client = baseCreateClient(repositoryName, {
		routes: config.routes as Route[],
		fetchOptions:
			process.env.NODE_ENV === "production"
				? { next: { tags: ["prismic"] }, cache: "force-cache" }
				: { next: { revalidate: 5 } },
		...clientConfig,
	});

	enableAutoPreviews({ client });

	return client;
};
