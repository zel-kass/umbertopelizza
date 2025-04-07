import NavBar from "@/app/components/nav-bar"
import ListedGallery from "@/app/components/listed-gallery";

export default function Photos() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="fixed w-full top-0 left-0 z-10">
				<NavBar />
			</div>
			<ListedGallery />
		</div>
	)
}