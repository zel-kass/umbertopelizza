'use client'

import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import AnimatedLink from "./AnimatedLink";

const navItems = [
	{ label: 'GALLERY', href: '/gallery' },
	{ label: 'VIDEOS', href: '/videos' },
	{ label: 'CONTACT', href: '/contact' }
]

interface MenuProps {
	isOpen: boolean;
}

export default function Menu ({ isOpen }: MenuProps) {
	const menuRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!menuRef.current) return

    if (tlRef.current) {
      tlRef.current.kill()
    }

		const linkElements = contentRef.current?.querySelectorAll('a')

    tlRef.current = gsap.timeline({
      paused: true,
      onComplete: () => {
        if (!isOpen) {
          gsap.set(menuRef.current, { autoAlpha: 0 })
        }
      },
    })

    if (isOpen) {
      document.body.style.overflow = "hidden"
      gsap.set(menuRef.current, { autoAlpha: 0 })
      tlRef.current.to(menuRef.current, {
        autoAlpha: 1,
        duration: 0.5,
        ease: "power2.out",
      })

      if (linkElements) {
				gsap.set(linkElements, { y: -20, opacity: 0 })
        tlRef.current.to(linkElements, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        })
      }

      tlRef.current.play()
    } else {
      const hasBeenOpened = menuRef.current.style.opacity !== "" && menuRef.current.style.opacity !== "0"
      document.body.style.overflow = "auto"

      if (hasBeenOpened) {
				if (linkElements) {
					tlRef.current.to(linkElements, {
						y: -20,
						opacity: 0,
						duration: 0.4,
						stagger: 0.2,
						ease: "power2.in",
					})
				}
				
        tlRef.current
          .to(menuRef.current, {
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.in",
          })
          .play()
      }
    }

    return () => {
      if (tlRef.current) {
        tlRef.current.kill()
      }
    }
  }, [isOpen])

	return (
    <div className="w-screen h-screen absolute top-0 left-0 bg-white/40 backdrop-blur-md opacity-0 invisible" ref={menuRef}>
      <div className="flex flex-col items-center justify-center h-full gap-8" ref={contentRef}>
        {navItems.map((item, index) => (
          <AnimatedLink link={item.href} text={item.label} key={index}/>
        ))}
      </div>
    </div>
  )
}