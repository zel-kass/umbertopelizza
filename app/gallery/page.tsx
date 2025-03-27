import NavBar from "@/app/components/nav-bar"
import FloatingGallery from "@/app/components/floating-gallery";

export default function Photos() {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="fixed w-full top-0 left-0 z-10">
				<NavBar />
			</div>
			<main className="h-screen overflow-hidden">
				<FloatingGallery />
			</main>
		</div>
	)
}