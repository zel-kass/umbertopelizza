'use client'

import AnimatedLink from "@/app/components/AnimatedLink";

export default function Footer() {
	return (
		<footer className="mb-[5vh] flex flex-col lg:flex-row justify-between gap-8">
			<div>
				<ul className="flex flex-col gap-y-3 font-bold">
					<li>
						<AnimatedLink link="/home" text="HOME" />
					</li>
					<li>
						<AnimatedLink link="/gallery" text="GALLERY" />
					</li>
					<li>
						<AnimatedLink link="/videos" text="VIDEOS" />
					</li>
					<li>
						<AnimatedLink link="/about" text="ABOUT" />
					</li>
					<li>
						<AnimatedLink link="/contact" text="CONTACT" />
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