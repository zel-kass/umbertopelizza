import Image from "next/image";
import Link from "next/link";

interface LogoProps {
	className?: string;
	onClick?: () => void;
}

export default function Logo({ className, onClick }: LogoProps) {
	return (
		<Link href="/" transitionTypes={["page"]} onClick={onClick}>
			<Image
				src="/logo.svg"
				alt="Picturzz"
				width={612}
				height={130}
				priority
				className={className}
			/>
		</Link>
	);
}
