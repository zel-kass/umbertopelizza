'use client'

import slideInOut from "@/lib/utils"
import { useTransitionRouter } from "next-view-transitions"

export default function Footer() {
	const router = useTransitionRouter();

	return (
		<footer className="mb-[5vh] flex flex-col lg:flex-row justify-between px-6 lg:px-12 gap-8 text-xs md:text-sm">
			<div>
				<ul className="flex flex-col gap-y-3">
					<li>
						<a
							onClick={(e) => {
								e.preventDefault()
								router.push("/home", {
									onTransitionReady: slideInOut,
								})
							}}
							href="/home"
							className="block"
						>
							<h3 className="cursor-pointer hover:text-primary transition-colors">HOME</h3>
						</a>
					</li>
					<li>
						<a
							onClick={(e) => {
								e.preventDefault()
								router.push("/photos", {
									onTransitionReady: slideInOut,
								})
							}}
							href="/photos"
							className="block"
						>
							<h3 className="cursor-pointer hover:text-primary transition-colors">GALLERY</h3>
						</a>
					</li>
					<li>
						<a
							onClick={(e) => {
								e.preventDefault()
								router.push("/photos", {
									onTransitionReady: slideInOut,
								})
							}}
							href="/photos"
							className="block"
						>
							<h3 className="cursor-pointer hover:text-primary transition-colors">VIDEOS</h3>
						</a>
					</li>
				</ul>
			</div>

			<div className="flex flex-col sm:flex-row gap-6">
				<div className="flex flex-col gap-y-3">
					<a
						target="_blank"
						href="https://www.instagram.com/vittozz_/"
						className="hover:text-primary transition-colors"
						rel="noopener noreferrer"
					>
						<h3>Vittorio E. Pelizza</h3>
					</a>
					<h3 className="hover:text-primary transition-colors">
						<a href="tel:0644278992">+1 424 626 3133</a>
					</h3>
					<h3 className="hover:text-primary transition-colors">
						<a href="mailto:umbertomariapelizza@gmail.com">vittorioemanuelepelizza@gmail.com</a>
					</h3>
					<h3>Los Angeles, CA</h3>
				</div>
				<div className="flex flex-col gap-y-3">
					<a
						target="_blank"
						href="https://www.instagram.com/umbertoz_/"
						className="hover:text-primary transition-colors"
						rel="noopener noreferrer"
					>
						<h3>Umberto M. Pelizza</h3>
					</a>
					<h3 className="hover:text-primary transition-colors">
						<a href="tel:0644278992">+33 6 44 27 89 92</a>
					</h3>
					<h3 className="hover:text-primary transition-colors">
						<a href="mailto:umbertomariapelizza@gmail.com">umbertomariapelizza@gmail.com</a>
					</h3>
					<h3>Paris, FR</h3>
				</div>
				<div className="flex flex-col gap-y-3 mt-4 sm:mt-0">
					<h3>© {new Date().getFullYear()} PELIZZA</h3>
					<h3>ALL RIGHTS RESERVED</h3>
				</div>
			</div>
		</footer>
	)
}