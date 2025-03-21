'use client'

import slideInOut from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";

interface AnimatedLinkProps {
	link: string;
	text: string;
	className?: string;
}

export default function AnimatedLink ({ link, text, className }: AnimatedLinkProps) {
	const router = useTransitionRouter();
	const pathname = usePathname();

	return (
		<a onClick={(e) => {
			e.preventDefault();
			if (pathname !== link) {
				router.push(link, {
					onTransitionReady: slideInOut,
				});
			}
		}} href={link} className="z-10 hover:bg-zinc-900 hover:text-white px-2">
			<h1 className={className}>{text}</h1>
		</a>
	)
}