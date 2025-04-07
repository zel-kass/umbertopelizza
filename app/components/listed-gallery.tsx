'use client';

import Image from 'next/image';
import { jap_meta } from '@/lib/jap_meta-export'
import { outsoul } from '@/lib/outsoul-export'
import type { StaticImageData } from 'next/image';

import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { useState, useEffect, useRef } from 'react';

gsap.registerPlugin(Observer);

const projects = {
  1: {
    name: "JAP META",
    photos: jap_meta,
  },
  2: {
    name: "OUTSOUL",
    photos: outsoul,
  },
}

export default function ListedGallery() {
	const [counter, setCounter] = useState(1)
	const observerRef = useRef<Observer | null>(null)

	useEffect(() => {
		observerRef.current = Observer.create({
			target: window,
			type: "wheel, touch, scroll",
			onUp: () => {
        if (counter === 1)
          setCounter(Object.keys(projects).length)
				else
          setCounter(counter - 1)
      },
      onDown: () => {
				if (counter === Object.keys(projects).length)
					setCounter(1)
				else
					setCounter(counter + 1)
      },
		})
	}, [counter])

	const currentProject = projects[counter]

	return (
		<main className='flex h-full items-center justify-center'>
			<PhotoGallery title={currentProject.name} photos={currentProject.photos} />
		</main>
	);
}

interface PhotoGalleryProps {
	title: string;
	photos: StaticImageData[];
}

function PhotoGallery({ title, photos }: PhotoGalleryProps) {
	return (
		<div className='flex flex-col gap-4 px-4'>
			<h3>{title}</h3>
			<div className='flex flex-col md:flex-row gap-2'>
				{photos.map((photo, key) => (
					<div key={key} className='relative'>
						<Image
							src={photo.src}
							alt={`"jap_meta${key}"`}
							width={photo.width}
							height={photo.height}
						/>
					</div>
				))}
			</div>
		</div>
	)
}