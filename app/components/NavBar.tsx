'use client';

import { useTransitionRouter } from "next-view-transitions"
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import slideInOut from "@/lib/utils";
import { gsap } from "gsap";
import Link from "next/link";

export default function NavBar () {
	const router = useTransitionRouter();
	const pathname = usePathname();
	const contactRef = useRef<HTMLDivElement>(null);
	const contactTextRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const tl = gsap.timeline({paused: true});
		timelineRef.current = tl;

		if (contactRef.current) {
			timelineRef.current.fromTo(contactRef.current, {opacity: 0, height: "0px"}, {opacity: 1, height: "50vh", duration: 1.5, ease: "power4.inOut"})
		}

		return () => {
			tl.kill();
		};
	}, [])


	const handleContactClick = () => {
    if (timelineRef.current) {
      if (isOpen) {
        timelineRef.current.reverse()
      } else {
        timelineRef.current.play()
      }
      setIsOpen(!isOpen)
    }
  }

	return(
		<header>
			<nav className="w-screen text-zinc-800 px-4 lg:px-8 py-2 flex flex-col sm:flex-row justify-between lg:items-end text-2xl 2xl:text-4xl" aria-label="Main navigation">
				<Link href="/">	
					<h1 className="hover:bg-zinc-900 hover:text-white px-2 cursor-pointer">PELIZZA</h1>
				</Link>
				<a onClick={(e) => {
					e.preventDefault();
					if (pathname !== '/photos') {
						router.push('/photos', {
							onTransitionReady: slideInOut,
						});
					}
				}} href="/photos">
					<h1 className="hover:bg-zinc-900 hover:text-white px-2 cursor-pointer">PHOTOS</h1>
				</a>
				<a onClick={(e) => {
					e.preventDefault();
					if (pathname !== '/photos') {
						router.push('/photos', {
							onTransitionReady: slideInOut,
						});
					}
				}} href="/photos">
					<h1 className="hover:bg-zinc-900 hover:text-white px-2 cursor-pointer">VIDEOS</h1>
				</a>
				<a onClick={(e) => {
					e.preventDefault();
					if (pathname !== '/contact') {
						router.push('/contact', {
							onTransitionReady: slideInOut,
						});
					}
				}} href="/contact">
					<h1 className="hover:bg-zinc-900 hover:text-white px-2 cursor-pointer">CONTACT</h1>
				</a>
			</nav>
		</header>
	)
}

{/* <span>umbertomariapelizza@gmail.com</span>
<span>06 44 27 89 92</span>
<span>_umbertoz</span> */}