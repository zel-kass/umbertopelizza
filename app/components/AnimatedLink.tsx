'use client'

import slideInOut from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { Dispatch, SetStateAction } from "react";
import ScrambleHover from "@/components/fancy/text/scramble-hover"

interface AnimatedLinkProps {
	link: string;
	text: string;
	setIsOpened?: Dispatch<SetStateAction<boolean>>;
}

export default function AnimatedLink ({ link, text, setIsOpened }: AnimatedLinkProps) {
	const router = useTransitionRouter();
	const pathname = usePathname();

	return (
		<a onClick={(e) => {
			e.preventDefault();
			if (pathname !== link) {
				if (setIsOpened)
					setIsOpened(false);
				router.push(link, {
					onTransitionReady: slideInOut,
				});
			}
		}} href={link}>
			<ScrambleHover
        text={text}
        scrambleSpeed={50}
        maxIterations={8}
        useOriginalCharsOnly={false}
        className="cursor-pointer"
        characters="PELIZZA"
      />
		</a>
	)
}