'use client';

import BurgerMenu from "@/app/components/burger-menu";
import AnimatedLink from "@/app/components/animated-link";
import DropDownMenu from "@/app/components/dropdown-button";

export default function NavBar () {

	return(
		<header>
			<nav className="w-full text-zinc-800" aria-label="Main navigation">
				<BurgerMenu />
				<div className="hidden md:flex w-full px-4 lg:px-8 py-2 flex flex-col sm:flex-row justify-between items-center">
					<AnimatedLink link="/home" text="PELIZZA" className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl"/>
					<div className="flex flex-row gap-[4vw] text-lg xl:text-xl 2xl:text-2xl">
						<DropDownMenu />
						<AnimatedLink link="/contact" text="CONTACT" />
					</div>
				</div>
			</nav>
		</header>
	)
}