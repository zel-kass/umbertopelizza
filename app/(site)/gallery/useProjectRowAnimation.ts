import gsap from "gsap";
import { useEffect, useRef, type MouseEvent } from "react";

function isFromTop(box: HTMLElement, event: MouseEvent) {
	const rect = box.getBoundingClientRect();
	return event.clientY - rect.top < rect.height / 2;
}

export function useProjectRowAnimation(isActive: boolean) {
	const boxRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const hiddenOverlayRef = useRef<HTMLDivElement>(null);
	const teaserRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isActive) {
			gsap.fromTo(
				overlayRef.current,
				{ y: "-100%" },
				{ y: "0%", duration: 0.5, ease: "power4.out" },
			);
			gsap.fromTo(
				hiddenOverlayRef.current,
				{ y: "-100%" },
				{ y: "0%", duration: 0.5, ease: "power4.out" },
			);
		} else if (teaserRef.current) {
			gsap.to(teaserRef.current, { opacity: 0, duration: 0.3, ease: "power3.out" });
		}
	}, [isActive]);

	const onMouseEnter = (event: MouseEvent) => {
		const box = boxRef.current;
		if (isActive || !box) return;
		const fromTop = isFromTop(box, event);

		gsap.fromTo(
			overlayRef.current,
			{},
			{ y: fromTop ? "100%" : "-100%", duration: 0.5, ease: "power4.out" },
		);
		gsap.fromTo(
			hiddenOverlayRef.current,
			{ y: fromTop ? "-200%" : "0%" },
			{ y: "-100%", duration: 0.5, ease: "power4.out" },
		);

		if (teaserRef.current) {
			const rect = box.getBoundingClientRect();
			gsap.fromTo(
				teaserRef.current,
				{ opacity: 0, y: fromTop ? -20 : 20 },
				{ opacity: 1, y: 0, duration: 0.5, ease: "power4.out" },
			);
			gsap.set(teaserRef.current, {
				top: rect.top + rect.height / 2,
				transform: "translateY(-50%)",
			});
		}
	};

	const onMouseLeave = (event: MouseEvent) => {
		const box = boxRef.current;
		if (isActive || !box) return;
		const fromTop = isFromTop(box, event);

		gsap.fromTo(
			overlayRef.current,
			{ y: fromTop ? "100%" : "-100%" },
			{ y: "0%", duration: 0.5, ease: "power3.out" },
		);
		gsap.fromTo(
			hiddenOverlayRef.current,
			{},
			{ y: fromTop ? "-200%" : "0%", duration: 0.5, ease: "power3.out" },
		);

		if (teaserRef.current) {
			gsap.fromTo(
				teaserRef.current,
				{ opacity: 1, y: 0 },
				{ opacity: 0, y: fromTop ? -20 : 20, duration: 0.5, ease: "power3.out" },
			);
		}
	};

	return { boxRef, overlayRef, hiddenOverlayRef, teaserRef, onMouseEnter, onMouseLeave };
}
