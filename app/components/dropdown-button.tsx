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
			tlRef.current.to(worksContent.current, {
				autoAlpha: 1,
				height: "auto",
				duration: 0.5,
				ease: "power2.out",
			},)

			tlRef.current.play()
		} else {
			const hasBeenOpened = worksContent.current.style.opacity !== "" && worksContent.current.style.opacity !== "0"
			if (hasBeenOpened) {
				tlRef.current
					.to(worksContent.current, {
						autoAlpha: 0,
						height: 0,
						duration: 0.5,
						ease: "power2.in",
					})
					.play()
			}
		}
  }, [isOpened])

  return (
    <div>
      <div
        className='flex items-center gap-2 px-8 relative cursor-pointer hover:text-white hover:bg-zinc-900'
        onClick={() => setIsOpened(!isOpened)}
      >
        <h1>WORKS</h1>
      </div>
      <div className="invisible h-0 absolute flex flex-col gap-4 px-4 py-2 mt-4 bg-zinc-900 text-white" ref={worksContent}>
        <AnimatedLink link='/gallery' text="GALLERY" />
        <AnimatedLink link='/videos' text="VIDEOS" />
      </div>
    </div>
  )
}