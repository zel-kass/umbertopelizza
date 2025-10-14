'use client'

import slideInOut from "@/lib/utils"
import { useTransitionRouter } from "next-view-transitions"

export default function Footer() {
	const router = useTransitionRouter();

	return (
		<footer className="mb-[5vh] flex flex-col lg:flex-row justify-between gap-8">
			<div>
				<ul className="flex flex-col gap-y-3 font-bold">
					<li>
						<a
							onClick={(e) => {
								e.preventDefault()
								router.push("/gallery", {
									onTransitionReady: slideInOut,
								})
							}}
							href="/gallery"
							className="block"
						>
							<h3 className="cursor-pointer hover:text-primary transition-colors">GALLERY</h3>
						</a>
					</li>
					<li>
						<a
							onClick={(e) => {
								e.preventDefault()
								router.push("/videos", {
									onTransitionReady: slideInOut,
								})
							}}
							href="/videos"
							className="block"
						>
							<h3 className="cursor-pointer hover:text-primary transition-colors">VIDEOS</h3>
						</a>
					</li>
				</ul>
			</div>
			<div className="flex flex-col gap-y-3 mt-4 sm:mt-0">
				<h3>© {new Date().getFullYear()} PELIZZA</h3>
				<h3>ALL RIGHTS RESERVED</h3>
			</div>
		</footer>
	)
}