"use client";

import Link from "next/link";
import ScrambleHover from "@/app/components/ScrambleHover";

interface AnimatedLinkProps {
	link: string;
	text: string;
	fontSize?: string | number;
	onClick?: () => void;
}

export default function AnimatedLink({ link, text, fontSize, onClick }: AnimatedLinkProps) {
	return (
		<Link
			href={link}
			transitionTypes={["page"]}
			onClick={() => {
				onClick?.();
			}}
			className="cursor-pointer"
		>
			<ScrambleHover
				text={text}
				scrambleSpeed={50}
				maxIterations={8}
				useOriginalCharsOnly={false}
				className="cursor-pointer"
				characters="PELIZZA"
				fontSize={fontSize}
			/>
		</Link>
	);
}
