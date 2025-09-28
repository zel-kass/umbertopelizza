'use client';

import BurgerMenu from "@/app/components/BurgerMenu";
import AnimatedLink from "@/app/components/AnimatedLink";

const routes = [
	{ label: 'GALLERY', href: '/gallery' },
	{ label: 'VIDEOS', href: '/videos' },
	{ label: 'ABOUT', href: '/about' },
	{ label: 'CONTACT', href: '/contact' }
]

export default function NavBar () {

	return(
		<nav className="w-full fixed lg:px-8 px-4 z-50 text-white mix-blend-exclusion" aria-label="Main navigation">
			<BurgerMenu />
			<div className="hidden md:flex w-full py-2 flex-col sm:flex-row justify-between items-center">
				<AnimatedLink link="/home" text="PELIZZA"/>
				<div className="flex flex-row gap-8">
					{routes.map((route, index) => (
						<AnimatedLink key={index} link={route.href} text={route.label} />
					))}
				</div>
			</div>
		</nav>
	)
}