import NavBar from "@/app/components/nav-bar"
import ListedGallery from "@/app/components/listed-gallery";
import ReactLenis from "lenis/react";
import Footer from "@/app/components/footer";

export default function Photos() {
	return (
    <ReactLenis root>
			<div className="min-h-screen">
				<div className="mt-[10vh]">
					<ListedGallery />
				</div>
				<div className="mt-[10vh] mb-[5vh]">
					<Footer />
				</div>
			</div>
    </ReactLenis>
	)
}