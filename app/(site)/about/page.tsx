import { PrismicRichText } from "@prismicio/react";
import { createClient } from "@/prismicio";

export default async function About() {
	const about = await createClient()
		.getSingle("about")
		.catch(() => null);

	return (
		<main className="relative flex flex-1 flex-col px-[2em] pt-[10em]">
			<div className="pointer-events-none flex flex-col gap-[5em] max-lg:mb-[5em] max-lg:gap-[3em]">
				<h1>ABOUT</h1>
				<div className="grid grid-cols-2 gap-[5em] px-[20em] max-lg:grid-cols-1 max-lg:gap-[2em] max-lg:px-[2em]">
					{about?.data.paragraphs.map(({ language, text }, i) => (
						<div key={i} lang={language ?? undefined} dir={language === "ar" ? "rtl" : undefined}>
							<PrismicRichText field={text} />
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
