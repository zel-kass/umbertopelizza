"use client";

import BurgerButton from "./BurgerButton";
import Logo from "./Logo";
import { useState } from "react";
import Menu from "./Menu";

export default function BurgerMenu() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	const closeMenu = () => setIsOpen(false);

	return (
		<div className="flex md:hidden w-full justify-between items-center p-4">
			<div className="z-10">
				<Logo className="h-7 w-auto" onClick={closeMenu} />
			</div>
			<BurgerButton isOpen={isOpen} toggle={toggleMenu} />
			<Menu isOpen={isOpen} onLinkClick={closeMenu} />
		</div>
	);
}
