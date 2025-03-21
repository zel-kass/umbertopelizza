'use client';

import BurgerButton from "./burger-button";
import AnimatedLink from "./animated-link";
import { useState } from "react";
import Menu from "./menu";

export default function BurgerMenu () {
	const [isOpen, setIsOpen] = useState(false);

		const toggleMenu = () => {
			setIsOpen(!isOpen);
		};

	return (
		<div className="flex md:hidden w-full justify-between items-center p-4">
			<AnimatedLink link="/home" text="PELIZZA" className="text-2xl" />
			<BurgerButton isOpen={isOpen} toggle={toggleMenu}/>
			<Menu isOpen={isOpen} />
		</div>
	)
}