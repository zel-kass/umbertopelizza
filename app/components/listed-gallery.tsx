'use client';

import Image from 'next/image';
import { asapes } from '@/lib/exports/asapes-export';
import { authroz } from '@/lib/exports/authroz-export';
import { outsoul } from '@/lib/exports/outsoul-export'
import { jap_meta } from '@/lib/exports/jap_meta-export'
import type { StaticImageData } from 'next/image';

import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { useEffect } from 'react';
// import { useState, useEffect, useRef } from 'react';

gsap.registerPlugin(Observer);

// const projects = {
//   1: {
//     name: "JAP META",
//     photos: jap_meta,
//   },
//   2: {
//     name: "OUTSOUL",
//     photos: outsoul,
//   },
// }

const projects = [
	{
		name: "JAP META",
		photos: jap_meta,
	},
	{
		name: "OUTSOUL",
		photos: outsoul,
	},
	{
		name: "ASAPES",
		photos: asapes,
	},
	{
		name: "AUTHROZ",
		photos: authroz,
	},
]

interface PhotoGalleryProps {
	title: string;
	photos: StaticImageData[];
}

export default function ListedGallery() {
	// const [counter, setCounter] = useState(1);
	// const observerRef = useRef<Observer | null>(null);
  // const [isAnimating, setIsAnimating] = useState(false)
	// const [currentProject, setCurrentProject] = useState(projects[counter as keyof typeof projects])

	// useEffect(() => {
	// 	observerRef.current = Observer.create({
	// 		target: window,
	// 		type: "wheel, touch, scroll",
	// 		onUp: () => {
  //       if (counter === 1)
  //         setCounter(Object.keys(projects).length)
	// 			else
  //         setCounter(counter - 1)
  //     },
  //     onDown: () => {
  //       if (counter === Object.keys(projects).length)
  //         setCounter(1)
  //       else
  //         setCounter(counter + 1)
  //     },
	// 	})
	// }, [counter])
  
  // useEffect(() => {
  //   if (currentProject) {
  //     setIsAnimating(true)

  //     const tl = gsap.timeline({
  //       onComplete: () => {
  //         setIsAnimating(false)
  //       }
  //     })
      
  //     tl.to('#placeholder', {
  //       height: '0',
  //       duration: 0.5,
  //       stagger: 0.1,
	// 			onComplete: () => {
	// 				setCurrentProject(projects[counter as keyof typeof projects]);
	// 			}
  //     })

  //     tl.to('#placeholder', {
  //       height: '100%',
  //       duration: 0.5,
  //       stagger: 0.1
  //     })
      
  //   }
  // }, [counter])
	useEffect(() => {
		gsap.to("#placeholder", {
			height: '100%',
			duration: 1.5,
			ease: "power2.out",
			stagger: 0.05,
			delay: 0.1,
		})
	})

	return (
		<main className='flex h-full w-full flex-col gap-10 items-center justify-center relative'>
			{projects.map((project, key) => (
				<PhotoGallery title={project.name} photos={project.photos} key={key} />
			))}
		</main>
	);
}

function PhotoGallery({ title, photos }: PhotoGalleryProps) {
  useEffect(() => {

    gsap.set("#placeholder", {
      height: '0',
    })
  }, [])

  return (
    <div className='flex flex-col gap-4 px-8 w-full'>
      <h3>{title}</h3>
      <div className='flex flex-col md:flex-row gap-2 h-[20vh] w-full'>
        {photos.map((photo, key) => (
          <div key={key} className='relative w-60' id='placeholder'>
            <Image
              src={photo.src}
              alt={`"jap_meta${key}"`}
              fill
              sizes='30vh'
              className='object-cover'
              quality={100}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  )
}