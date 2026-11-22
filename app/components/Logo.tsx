"use client";

import Image from "next/image";
import Link from "next/link";
import type { PointerEvent } from "react";

const STEP = 10;

function trackPointer(e: PointerEvent<HTMLElement>) {
	const rect = e.currentTarget.getBoundingClientRect();
	const x = Math.round((e.clientX - rect.left) / STEP) * STEP;
	const y = Math.round((e.clientY - rect.top) / STEP) * STEP;
	e.currentTarget.style.setProperty("--x", `${x}px`);
	e.currentTarget.style.setProperty("--y", `${y}px`);
	e.currentTarget.style.setProperty("--r", `${(x * 7 + y * 13) % 360}deg`);
}

interface LogoProps {
	className?: string;
	onClick?: () => void;
}

export default function Logo({ className, onClick }: LogoProps) {
	return (
		<Link
			href="/"
			transitionTypes={["page"]}
			onClick={onClick}
			onPointerMove={trackPointer}
			className="group relative block"
		>
			<Image
				src="/logo.svg"
				alt="Picturzz"
				width={612}
				height={130}
				priority
				className={className}
			/>
			<svg aria-hidden className="absolute size-0">
				<filter id="logo-rough">
					<feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="3" />
					<feDisplacementMap in="SourceGraphic" scale="18" />
				</filter>
			</svg>
			<span
				aria-hidden
				className="pointer-events-none absolute top-(--y) left-(--x) size-28	 -translate-x-1/2 -translate-y-1/2 scale-50 rotate-(--r) rounded-full bg-white opacity-0 mix-blend-difference filter-[url(#logo-rough)] group-hover:opacity-100 group-hover:ease-[steps(3)]"
			/>
		</Link>
	);
}
