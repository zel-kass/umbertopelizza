'use client';

import { useTransitionRouter } from "next-view-transitions"
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function NavBar () {
	const router = useTransitionRouter();
	const pathname = usePathname();
	const contactRef = useRef<HTMLDivElement>(null);
	const contactTextRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);
	const [isOpen, setIsOpen] = useState(false)

	function slideInOut() {
		document.documentElement.animate(
			[
				{
					opacity: 1,
					transform: 'translateY(0)',
				},
				{
					opacity: 0,
					transform: 'translateY(-35%)',
				}
			], {
				duration: 1500,
				easing: "cubic-bezier(0.87, 0, 0.13, 1)",
				fill: 'forwards',
				pseudoElement: "::view-transition-old(root)",
			}
		);

		document.documentElement.animate(
			[
				{
					clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
				},
				{
					clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
				}
			], {
				duration: 1500,
				easing: "cubic-bezier(0.87, 0, 0.13, 1)",
				fill: 'forwards',
				pseudoElement: "::view-transition-new(root)",
			}
		)
	}

	useEffect(() => {
		const tl = gsap.timeline({paused: true});
		timelineRef.current = tl;

		tl.to(contactRef.current, {
			scaleY: 12,
			scaleX: 2,
			display: "block",
			duration: 1,
			ease: "power4.inOut",
			transformOrigin: "top right"
		}).to(contactTextRef.current, {
			x: -50,
			duration: 1,
			ease: "power4.inOut"
		}, "-=1");

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
					<h1 className="hover:bg-zinc-900 hover:text-white px-2 cursor-pointer">WORK</h1>
				</a>
				<div className="relative hover:text-white px-2 hover:bg-zinc-900" onClick={handleContactClick}>
					<div className="absolute right-0 top-0 w-full h-full hidden bg-zinc-900/60 backdrop-blur-sm z-[-5]" ref={contactRef} />
					<h1 className="cursor-pointer" ref={contactTextRef}>CONTACT</h1>
				</div>
			</nav>
		</header>
	)
}

{/* <span>umbertomariapelizza@gmail.com</span>
<span>06 44 27 89 92</span>
<span>_umbertoz</span> */}