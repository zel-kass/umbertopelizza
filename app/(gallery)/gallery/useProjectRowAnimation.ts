import gsap from "gsap";
import { useRef, type MouseEvent } from "react";

function isFromTop(box: HTMLElement, event: MouseEvent) {
	const rect = box.getBoundingClientRect();
	return event.clientY - rect.top < rect.height / 2;
}

export function useProjectRowAnimation() {
	const boxRef = useRef<HTMLAnchorElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const hiddenOverlayRef = useRef<HTMLDivElement>(null);

	const onMouseEnter = (event: MouseEvent) => {
		const box = boxRef.current;
		if (!box) return;
		const fromTop = isFromTop(box, event);

		gsap.to(overlayRef.current, {
			y: fromTop ? "100%" : "-100%",
			duration: 0.5,
			ease: "power4.out",
		});
		gsap.fromTo(
			hiddenOverlayRef.current,
			{ y: fromTop ? "-200%" : "0%" },
			{ y: "-100%", duration: 0.5, ease: "power4.out" },
		);
	};

	const onMouseLeave = (event: MouseEvent) => {
		const box = boxRef.current;
		if (!box) return;
		const fromTop = isFromTop(box, event);

		gsap.fromTo(
			overlayRef.current,
			{ y: fromTop ? "100%" : "-100%" },
			{ y: "0%", duration: 0.5, ease: "power3.out" },
		);
		gsap.to(hiddenOverlayRef.current, {
			y: fromTop ? "-200%" : "0%",
			duration: 0.5,
			ease: "power3.out",
		});
	};

	return { boxRef, overlayRef, hiddenOverlayRef, onMouseEnter, onMouseLeave };
}
