'use client';

import gsap from "gsap";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import victor from '../../public/videos/PREVIEWS/MARTINEZ_PREVIEW.png'
import azote from '../../public/videos/PREVIEWS/AZOTE_PREVIEW.png'
import corto from '../../public/videos/PREVIEWS/CORTO_PREVIEW.png'
import george from '../../public/videos/PREVIEWS/GEORGE_PREVIEW.png'
import wallace from '../../public/videos/PREVIEWS/WALLACE_PREVIEW.png'
import morceau from '../../public/videos/PREVIEWS/MORCEAU_PREVIEW.png'
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Project {
	title1: string;
	title2: string;
	src: string | StaticImport;
}

const projects = [
	{
		title1: "VICTOR MARTINEZ",
		title2: "MARECHAL",
		src: victor
	},
	{
		title1: "AZOTE",
		title2: "WALLACE BOI",
		src: azote
	},
	{
		title1: "CITIZENK",
		title2: "CORTO MALTESE",
		src: corto
	},
	{
		title1: "GEORGE",
		title2: "YUNG",
		src: george
	},
	{
		title1: "WALLACE &",
		title2: "RYUK",
		src: wallace
	},
	{
		title1: "MORCEAU",
		title2: "D'AMOUR",
		src: morceau
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
				width: '8%',
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
				<div className="flex items-center justify-center w-full h-[10vh] gap-4">
					<p>{title1}</p>
					<div className="w-0 h-full relative" ref={preview}>
						<Image
							src={src}
							alt={title1}
							fill
							sizes="(max-width: 768px) 100vw, 500px"
							style={{ objectFit: 'cover' }}
						/>
					</div>
					<p>{title2}</p>
				</div>
			</div>
	)
}