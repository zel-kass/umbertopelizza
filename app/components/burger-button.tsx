"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"

interface BurgerButtonProps {
  isOpen: boolean
  toggle: () => void
}

export default function BurgerButton({ isOpen, toggle }: BurgerButtonProps) {
  const topBarRef = useRef<SVGRectElement>(null)
  const bottomBarRef = useRef<SVGRectElement>(null)

  useEffect(() => {
    if (!topBarRef.current || !bottomBarRef.current) return

    const tl = gsap.timeline({ defaults: { duration: 0.3, ease: "power2.inOut" } })

    if (isOpen) {
      tl.to(
        topBarRef.current,
        {
          rotation: 45,
          y: 6,
          transformOrigin: "50% 50%",
        },
        0,
      )

      tl.to(
        bottomBarRef.current,
        {
          rotation: -45,
          y: -6,
          transformOrigin: "50% 50%",
        },
        0,
      )
    } else {
      tl.to(
        topBarRef.current,
        {
          rotation: 0,
          y: 0,
          transformOrigin: "50% 50%",
        },
        0,
      )

      tl.to(
        bottomBarRef.current,
        {
          rotation: 0,
          y: 0,
          transformOrigin: "50% 50%",
        },
        0,
      )
    }
  }, [isOpen])

  return (
    <button onClick={toggle} aria-label="Toggle menu" className="flex items-center justify-center z-10 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" className="cursor-pointer">
        <rect ref={topBarRef} width="28" height="5" x="0" y="6" fill="#27272a" />
        <rect ref={bottomBarRef} width="28" height="5" x="0" y="18" fill="#27272a" />
      </svg>
    </button>
  )
}

