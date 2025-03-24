'use client';

import gsap from "gsap";
import Image from "next/image";
import { useRef, MouseEvent } from "react"

import {
	floating1,
	floating2,
	floating3,
	floating4,
	floating5,
	floating6,
	floating7,
	floating8
} from '@/lib/data'

export default function FloatingGallery () {
	const plane1 = useRef<HTMLDivElement>(null);
	const plane2 = useRef<HTMLDivElement>(null);
	const plane3 = useRef<HTMLDivElement>(null);

	let requestAnimationFrameId: number | null = null;
	let xForce: number = 0;
	let yForce: number = 0;
	const easing: number = 0.08;
	const speed: number = 0.01;

	const manageMouseMove = (e: MouseEvent): void => {
		const { movementX, movementY } = e;
		xForce += movementX * speed;
		yForce += movementY * speed;
		if (requestAnimationFrameId === null) {
			requestAnimationFrameId = requestAnimationFrame(animate);
		}
	};

	const lerp = (start: number, target: number, amount: number): number => 
		start * (1 - amount) + target * amount;

	const animate = (): void => {
		xForce = lerp(xForce, 0, easing);
		yForce = lerp(yForce, 0, easing);
		
		gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
		gsap.set(plane2.current, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` });
		gsap.set(plane3.current, { x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}` });

		if (Math.abs(xForce) < 0.01) xForce = 0;
		if (Math.abs(yForce) < 0.01) yForce = 0;
		
		if (xForce !== 0 || yForce !== 0) {
			requestAnimationFrame(animate);
		} else {
			if (requestAnimationFrameId !== null) {
				cancelAnimationFrame(requestAnimationFrameId);
				requestAnimationFrameId = null;
			}
		}
	};

	return (
		<main onMouseMove={manageMouseMove} className="relative w-full h-full">
		  <h1 className="absolute top-[45%] left-[50%] text-4xl cursor-pointer translate-x-[-50%] translate-y-[-50%] z-40">
			GALLERY
		  </h1>
		  <div ref={plane1} className="absolute w-full h-full">
  			<div className="absolute top-[65%] left-[85%] w-[2vw] max-w-[300px] min-w-[150px]">
  			  <Image
  				src={floating1 || "/placeholder.svg"}
  				alt="image"
  				placeholder="blur"
  				priority
  				sizes="(max-width: 768px) 30vw, 25vw"
  				style={{
  				  width: "100%",
  				  height: "auto",
  				}}
  			  />
  			</div>
  			<div className="absolute top-[65%] left-[5%] w-[2vw] max-w-[300px] min-w-[150px]">
  			  <Image
  				src={floating2 || "/placeholder.svg"}
  				alt="image"
  				placeholder="blur"
  				priority
  				sizes="(max-width: 768px) 30vw, 25vw"
  				style={{
  				  width: "100%",
  				  height: "auto",
  				}}
  			  />
  			</div>
  			<div className="absolute top-[0%] left-[35%] w-[2vw] max-w-[225px] min-w-[120px]">
  			  <Image
  				src={floating7 || "/placeholder.svg"}
  				alt="image"
  				placeholder="blur"
  				priority
  				sizes="(max-width: 768px) 25vw, 20vw"
  				style={{
  				  width: "100%",
  				  height: "auto",
  				}}
  			  />
  			</div>
		  </div>
		  <div ref={plane2} className="absolute w-full h-full">
  			<div className="absolute top-[10%] left-[5%] w-[2vw] max-w-[300px] min-w-[150px]">
  			  <Image
  				src={floating4 || "/placeholder.svg"}
  				alt="image"
  				placeholder="blur"
  				priority
  				sizes="(max-width: 768px) 30vw, 25vw"
  				style={{
  				  width: "100%",
  				  height: "auto",
  				}}
  			  />
  			</div>
  			<div className="absolute top-[10%] left-[85%] w-[2vw] max-w-[250px] min-w-[130px]">
  			  <Image
  				src={floating6 || "/placeholder.svg"}
  				alt="image"
  				placeholder="blur"
  				priority
  				sizes="(max-width: 768px) 28vw, 22vw"
  				style={{
  				  width: "100%",
  				  height: "auto",
  				}}
  			  />
  			</div>
  			<div className="absolute top-[60%] left-[60%] w-[2vw] max-w-[225px] min-w-[120px]">
  			  <Image
  				src={floating8 || "/placeholder.svg"}
  				alt="image"
  				placeholder="blur"
  				priority
  				sizes="(max-width: 768px) 25vw, 20vw"
  				style={{
  				  width: "100%",
  				  height: "auto",
  				}}
  			  />
  			</div>
		  </div>
		  <div ref={plane3} className="absolute w-full h-full">
  			<div className="absolute top-[2.5%] left-[65%] w-[3vw] max-w-[300px] min-w-[150px]">
  			  <Image
  				src={floating3 || "/placeholder.svg"}
  				alt="image"
  				placeholder="blur"
  				priority
  				sizes="(max-width: 768px) 30vw, 25vw"
  				style={{
  				  width: "100%",
  				  height: "auto",
  				}}
  			  />
  			</div>
  			<div className="absolute top-[70%] left-[40%] w-[2vw] max-w-[300px] min-w-[150px]">
  			  <Image
  				src={floating5 || "/placeholder.svg"}
  				alt="image"
  				placeholder="blur"
  				priority
  				sizes="(max-width: 768px) 30vw, 25vw"
  				style={{
  				  width: "100%",
  				  height: "auto",
  				}}
  			  />
  			</div>
		  </div>
		</main>
	  )
}