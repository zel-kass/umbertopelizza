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

interface PhotoGalleryProps {
	title: string;
	photos: StaticImageData[];
}

export default function ListedGallery() {
	const [counter, setCounter] = useState(1);
	const observerRef = useRef<Observer | null>(null);
  const [isAnimating, setIsAnimating] = useState(false)

	useEffect(() => {
		observerRef.current = Observer.create({
			target: window,
			type: "wheel, touch, scroll",
			onUp: () => {
        if (!isAnimating) {
          if (counter === 1)
          setCounter(Object.keys(projects).length)
				else
          setCounter(counter - 1)
        } 
      },
      onDown: () => {
        if (!isAnimating) {
          if (counter === Object.keys(projects).length)
            setCounter(1)
          else
            setCounter(counter + 1)
        }
      },
		})
	}, [counter])

  const currentProject = projects[counter as keyof typeof projects]
  
  useEffect(() => {
    if (currentProject) {
      setIsAnimating(true)

      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false)
        }
      })
      
      tl.to('#placeholder', {
        height: '0',
        duration: 0.5,
        stagger: 0.1
      })

      tl.to('#placeholder', {
        height: '100%',
        duration: 0.5,
        stagger: 0.1
      })
      
    }
  }, [counter, currentProject])

	return (
		<main className='flex h-full w-full items-center justify-center relative'>
			<PhotoGallery title={currentProject.name} photos={currentProject.photos} />
		</main>
	);
}

function PhotoGallery({ title, photos }: PhotoGalleryProps) {
  useEffect(() => {
  //   gsap.set("#placeholder", {
  //     height: '0',
  //   })

    gsap.to("#placeholder", {
      height: '100%',
      duration: 1.5,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.1,
    })
  }, [])

  return (
    <div className='flex flex-col gap-4 px-8 w-full'>
      <h3>{title}</h3>
      <div className='flex flex-col md:flex-row gap-2 h-[40vh] w-full'>
        {photos.map((photo, key) => (
          <div key={key} className='relative w-80' id='placeholder'>
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