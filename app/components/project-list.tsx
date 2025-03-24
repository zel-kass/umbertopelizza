'use client';

import gsap from "gsap";
import { useRef, useEffect, useState } from "react";

interface Project {
	title1: string;
	title2: string;
	src: string;
}

const projects = [
	{
		title1: "VICTOR MARTINEZ",
		title2: "MARECHAL",
		src: "/videos/PREVIEWS/MARTINEZ_PREVIEW.png"
	},
	{
		title1: "AZOTE",
		title2: "WALLACE BOI",
		src: "/videos/PREVIEWS/AZOTE_PREVIEW.png"
	},
	{
		title1: "CITIZENK",
		title2: "CORTO MALTESE",
		src: "/videos/PREVIEWS/CORTO_PREVIEW.png"
	},
	{
		title1: "GEORGE",
		title2: "YUNG",
		src: "/videos/PREVIEWS/GEORGE_PREVIEW.png"
	},
	{
		title1: "WALLACE &",
		title2: "RYUK",
		src: "/videos/PREVIEWS/WALLACE_PREVIEW.png"
	},
	{
		title1: "MORCEAU",
		title2: "D'AMOUR",
		src: "/videos/PREVIEWS/MORCEAU_PREVIEW.png"
	},
]

export default function ProjectList () {
	return (
		<div className="flex flex-col w-full">
			<h3 className="mb-6 pl-[1vw]">PROJETS PHARES</h3>
			{projects.map((project) => (
				<Project key={project.title1} project={project} />
			))}
		</div>
	)
}

function Project({project} : {project: Project}) {
	const { title1, title2, src } = project;
	const preview = useRef<HTMLDivElement>(null);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (isActive) {
			gsap.to(preview.current, {
				transformOrigin: "center",
				width: 'auto',
				duration: 0.5,
				ease: "power4.out",
			})
		} else {
			gsap.to(preview.current, {
				width: '0',
				duration: 0.5,
				ease: "power4.out",
			})
		}
	}, [isActive])
	

	return (
			<div className="w-full flex items-center justify-between text-2xl lg:text-4xl 2xl:text-[3vw] border-t cursor-pointer px-[1vw]" onMouseEnter={() => {setIsActive(true)}} onMouseLeave={() => {setIsActive(false)}}>
				<div className="flex items-center justify-center">
					<p>{title1}</p>
					<div className="overflow-hidden flex justify-center h-[10vh] w-0 px-2" ref={preview}>
						<img
							src={src}
							alt={title1}
							className="object-contain"
						/>
					</div>
					<p>{title2}</p>
				</div>
				<div className="flex items-center justify-center gap-2 text-4xl">
					<div className="w-[2vh] h-[2vh] rounded-full bg-red-600"/>
					<p>REC</p>
				</div>
			</div>
	)
}