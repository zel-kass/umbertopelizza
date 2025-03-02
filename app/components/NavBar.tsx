'use client'

import Link from "next/link"
import { useState } from 'react'

export default function NavBar () {
	const [isOpen, setIsOpen] = useState(false)
	
	return(
		<header>
			<nav className="w-screen text-zinc-800 px-4 lg:px-8 py-4 flex flex-col sm:flex-row justify-between lg:items-end text-2xl lg:text-6xl transition-all" aria-label="Main navigation">
				<Link
					href="/"
				>	
					<h1>PELIZZA</h1>
				</Link>
				<h1 className="hover:bg-zinc-900 hover:text-white px-2 cursor-pointer">WORK</h1>
				<h1 className="hover:bg-zinc-900 hover:text-white px-2 cursor-pointer">CONTACT</h1>
			</nav>
		</header>
	)
}

{/* <span>umbertomariapelizza@gmail.com</span>
<span>06 44 27 89 92</span>
<span>_umbertoz</span> */}