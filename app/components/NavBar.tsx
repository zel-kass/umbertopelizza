'use client';

import { useTransitionRouter } from "next-view-transitions"
import { usePathname } from "next/navigation";
import slideInOut from "@/lib/utils";
import Link from "next/link";

export default function NavBar () {
	const router = useTransitionRouter();
	const pathname = usePathname();

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