'use client'

import slideInOut from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { Dispatch, SetStateAction } from "react";

interface AnimatedLinkProps {
	link: string;
	text: string;
	className?: string;
	setIsOpened?: Dispatch<SetStateAction<boolean>>;
}

export default function AnimatedLink ({ link, text, className, setIsOpened }: AnimatedLinkProps) {
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
			<h1 className={className}>{text}</h1>
		</a>
	)
}