"use client";

import Link from "next/link";

export default function Footer() {
	return (
		<footer className="mb-[5vh] flex flex-col lg:flex-row justify-between gap-8">
			<Link href="/" className="self-end">
				HOME
			</Link>
			<div className="flex flex-col gap-y-3 mt-4 sm:mt-0">
				<h3>© {new Date().getFullYear()} PICTURZZ</h3>
				<h3>ALL RIGHTS RESERVED</h3>
			</div>
		</footer>
	);
}
