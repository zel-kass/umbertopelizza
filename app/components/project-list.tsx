'use client';

import gsap from "gsap";
import Image from "next/image";
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
		<div className="flex flex-col justify-center items-center w-full">
			<h3 className="text-2xl mb-6 pl-[1vw]">VIDEOS</h3>
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
				width: '10%',
				duration: 0.5,
				ease: "power4.out",
			})
		} else {
			gsap.to(preview.current, {
				width: '0%',
				duration: 0.5,
				ease: "power4.out",
			})
		}
	}, [isActive])
	

	return (
			<div className="w-full flex items-center justify-center text-lg lg:text-4xl 2xl:text-[4vw] border-t cursor-pointer" onMouseEnter={() => {setIsActive(true)}} onMouseLeave={() => {setIsActive(false)}}>
				<div className="flex items-center justify-center w-full h-[10vh]">
					<p>{title1}</p>
					<div className="relative w-60 h-full" ref={preview}>
						<Image
							src={src}
							alt={title1}
							fill
							sizes='30vh'
							className="object-cover"
              quality={100}
						/>
					</div>
					<p>{title2}</p>
				</div>
				{/* <div className="flex items-center justify-center gap-2 text-4xl">
					<div className="w-[2vh] h-[2vh] rounded-full bg-red-600"/>
					<p>REC</p>
				</div> */}
			</div>
	)
}