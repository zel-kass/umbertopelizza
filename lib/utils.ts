import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function slideInOut() {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: 'translateY(0)',
      },
      {
        opacity: 0,
        transform: 'translateY(-35%)',
      }
    ], {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: 'forwards',
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
      },
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
      }
    ], {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: 'forwards',
      pseudoElement: "::view-transition-new(root)",
    }
  )
}