'use client'

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import AnimatedLink from "@/app/components/AnimatedLink"

interface DropdownItem {
	label: string
	href: string
}

interface WorksDropdownProps {
	items: DropdownItem[]
}

export default function WorksDropdown({ items }: WorksDropdownProps) {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const itemsRef = useRef<(HTMLDivElement | null)[]>([])

	useEffect(() => {
		const itemElements = itemsRef.current.filter(Boolean)
		const container = containerRef.current

		if (itemElements.length === 0 || !container) return

		if (isOpen) {
			gsap.set(container, { display: 'block' })

			gsap.fromTo(
				itemElements,
				{
					opacity: 0,
					x: 20
				},
				{
					opacity: 1,
					x: 0,
					duration: 0.3,
					stagger: 0.1,
					ease: "power2.out"
				}
			)
		} else {
			gsap.to(itemElements, {
				opacity: 0,
				x: 20,
				duration: 0.2,
				stagger: 0.01,
				ease: "power2.in",
				onComplete: () => {
					gsap.set(container, { display: 'none' })
				}
			})
		}
	}, [isOpen])

	return (
		<div
			ref={dropdownRef}
			className="relative cursor-pointer"
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			<span className="text-[1.5em]">WORKS</span>

			<div
				ref={containerRef}
				className="absolute top-full left-0 pt-2 min-w-[120px]"
				style={{ display: 'none' }}
			>
				<div className="flex flex-col gap-2">
					{items.map((item, index) => (
						<div
							key={index}
							ref={el => { itemsRef.current[index] = el }}
						>
							<AnimatedLink
								link={item.href}
								text={item.label}
								fontSize="1.5em"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}