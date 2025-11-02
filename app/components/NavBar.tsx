
'use client';

import BurgerMenu from "@/app/components/BurgerMenu";
import AnimatedLink from "@/app/components/AnimatedLink";
import WorksDropdown from "@/app/components/WorksDropdown";

const routes = [
	{ 
		label: 'WORKS', 
		href: '/works',
		children: [
			{ label: 'VIDEOS', href: '/videos' },
			{ label: 'GALLERY', href: '/gallery' },
		]
	},
	{ label: 'ABOUT', href: '/about' },
	{ label: 'CONTACT', href: '/contact' }
]

export default function NavBar() {
	return(
		<nav className="w-full fixed lg:px-8 px-4 z-50 text-white mix-blend-exclusion" aria-label="Main navigation">
			<BurgerMenu />
			<div className="hidden md:flex w-full py-2 flex-col sm:flex-row justify-between items-center">
				<div className="relative">
					<AnimatedLink link="/home" text="PELIZZA" fontSize="3rem"/>
					<h4 className="absolute top-2/3 right-0 pointer-events-none">PICTURES</h4>
				</div>
				<div className="flex flex-row gap-8 items-start">
					{routes.map((route, index) => (
						route.children ? (
							<WorksDropdown key={index} items={route.children} />
						) : (
							<AnimatedLink key={index} link={route.href} text={route.label} fontSize="1.5em" />
						)
					))}
				</div>
			</div>
		</nav>
	)
}