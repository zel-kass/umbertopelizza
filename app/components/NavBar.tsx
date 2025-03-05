'use client';

import { useTransitionRouter } from "next-view-transitions"
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavBar () {
	const router = useTransitionRouter();
	const pathname = usePathname();

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

	return(
		<header>
			<nav className="w-screen text-zinc-800 px-4 lg:px-8 py-2 flex flex-col sm:flex-row justify-between lg:items-end text-2xl 2xl:text-4xl transition-all" aria-label="Main navigation">
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
				<h1 className="hover:bg-zinc-900 hover:text-white px-2 cursor-pointer">CONTACT</h1>
			</nav>
		</header>
	)
}

{/* <span>umbertomariapelizza@gmail.com</span>
<span>06 44 27 89 92</span>
<span>_umbertoz</span> */}