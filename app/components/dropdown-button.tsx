'use client';

import gsap from 'gsap';
import { useState, useEffect, useRef } from 'react';
import AnimatedLink from "@/app/components/animated-link";

export default function DropDownMenu () {
  const worksContent = useRef(null)
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    gsap.set(worksContent.current, {
      height: 0,
      display: 'none',
    })
    
    if (isHovered) {
      console.log("YOUHOU")
      gsap.to(worksContent.current, {
        height: 'fit-content',
        display: 'block'
      })
    }
    // else {
    //   gsap.to(worksContent.current, {
    //     display: 'none',
    //     height: 0
    //   })
    // }
  }, [isHovered])

  return (
    <div>
      <div
        className='flex flex-col px-4 relative cursor-pointer hover:text-white hover:bg-zinc-900'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1>WORKS</h1>
      </div>
      <div className="absolute" ref={worksContent}>
        <AnimatedLink link='/gallery' text="GALLERY"  />
        <AnimatedLink link='/videos' text="VIDEOS"  />
      </div>
    </div>
  )
}