import { createClient } from "@prismicio/client";

const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME;

if (!repositoryName) {
  throw new Error("NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME is not defined");
}

export const client = createClient(repositoryName);

export async function getAllGalleryProjects() {
  try {
    return await client.getAllByType("gallery_project", {
      orderings: {
        field: "document.first_publication_date",
        direction: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching gallery projects:", error);
    return [];
  }
}

export async function getGalleryProject(uid: string) {
  try {
    return await client.getByUID("gallery_project", uid);
  } catch (error) {
    console.error("Error fetching gallery project:", error);
    return null;
  }
}