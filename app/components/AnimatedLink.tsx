'use client'

import slideInOut from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { Dispatch, SetStateAction } from "react";
import ScrambleHover from "@/app/components/ScrambleHover"

interface AnimatedLinkProps {
	link: string;
	text: string;
	fontSize?: string | number;
	setIsOpened?: Dispatch<SetStateAction<boolean>>;
}

export default function AnimatedLink ({
	link,
	text,
	fontSize,
	setIsOpened,
}: AnimatedLinkProps) {
	const router = useTransitionRouter();
	const pathname = usePathname();

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		if (pathname !== link) {
			if (setIsOpened)
				setIsOpened(false);
			router.push(link, {
				onTransitionReady: slideInOut,
			});
		}
	}

	return (
		<a 
			onClick={handleClick} 
			href={link}
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
		</a>
	)
}