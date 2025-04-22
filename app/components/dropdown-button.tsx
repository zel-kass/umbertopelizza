'use client';

import gsap from 'gsap';
import { useState, useEffect, useRef } from 'react';
import AnimatedLink from "@/app/components/animated-link";

export default function DropDownMenu () {
  const worksContent = useRef<HTMLDivElement>(null)
  const [isOpened, setIsOpened] = useState(false);
	const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
		if (!worksContent.current) return

    if (tlRef.current) {
      tlRef.current.kill()
    }

    const linkElements = worksContent.current.querySelectorAll('a')

		tlRef.current = gsap.timeline({
      paused: true,
      onComplete: () => {
        if (!isOpened) {
          gsap.set(worksContent.current, { autoAlpha: 0, height: 0 })
        }
      },
    })
    
		if (isOpened) {
			gsap.set(worksContent.current, { autoAlpha: 0 })
      gsap.set(linkElements, { opacity: 0 })
			tlRef.current.to(worksContent.current, {
				autoAlpha: 1,
				height: "auto",
				duration: 0.5,
				ease: "power2.out",
			},).to(linkElements, {
        opacity: 1,
        stagger: 0.1,
      }, "-=0.3")

			tlRef.current.play()
		} else {
			const hasBeenOpened = worksContent.current.style.opacity !== "" && worksContent.current.style.opacity !== "0"
			if (hasBeenOpened) {
				tlRef.current
          .to(linkElements, {
            opacity: 0,
          })
					.to(worksContent.current, {
						autoAlpha: 0,
						height: 0,
						duration: 0.5,
						ease: "power2.in",
					}, "-=0.3")
					.play()
			}
		}
  }, [isOpened])

  return (
    <div>
      <div
        className='flex gap-2 relative cursor-pointer'
        onClick={() => setIsOpened(!isOpened)}
      >
        <h1>WORKS</h1>
      </div>
      <div className="invisible h-0 absolute flex flex-col gap-4 mt-4 text-white z-50" ref={worksContent}>
        <AnimatedLink link='/gallery' text="GALLERY" setIsOpened={setIsOpened} />
        <AnimatedLink link='/videos' text="VIDEOS" setIsOpened={setIsOpened} />
      </div>
    </div>
  )
}