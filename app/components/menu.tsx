'use client'

import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import AnimatedLink from "./animated-link";

const navItems = [
	{ label: 'GALLERY', href: '/gallery' },
	{ label: 'VIDEOS', href: '/videos' },
	{ label: 'CONTACT', href: '/contact' }
]

interface MenuProps {
	isOpen: boolean;
}

export default function Menu ({ isOpen }: MenuProps) {
	const tlRef = useRef<gsap.core.Timeline | null>(null)
	const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current) return

    if (tlRef.current) {
      tlRef.current.kill()
    }

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
      tlRef.current
        .to(menuRef.current, {
          autoAlpha: 1,
          duration: 0.5,
          ease: "power2.out",
        })
        .play()
    } else {
      const hasBeenOpened = menuRef.current.style.opacity !== "" && menuRef.current.style.opacity !== "0"

      if (hasBeenOpened) {
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
    <div className="w-screen h-screen absolute top-0 left-0 bg-white/50 backdrop-blur-sm invisible" ref={menuRef}>
      <div className="flex flex-col items-center justify-center h-full gap-8">
        {navItems.map((item, index) => (
          <AnimatedLink link={item.href} text={item.label} key={index} className='text-2xl' />
        ))}
      </div>
    </div>
  )
}