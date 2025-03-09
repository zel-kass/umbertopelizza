import NavBar from "@/app/components/NavBar"
import OptimizedVideo from "@/app/components/OptimizedVideo"

export default function Home() {
	return (
		<main className="flex flex-col gap-[10vh]">
			<div className="fixed w-full top-0 left-0 z-10">
				<NavBar />
			</div>
				{/* <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-md z-10" /> */}
			<div className="w-full h-screen aspect-video relative overflow-hidden">
				<OptimizedVideo
					hlsSrc="/videos/BANDEDEMOFINAL.m3u8"
					mp4Src="/videos/BANDEDEMOFINAL_compressed.mp4"
					poster="/videos/BANDEDEMOFINAL-poster.jpg"
					autoPlay={true}
					loop={true}
					muted={true}
				/>
			</div>
			<div className="flex flex-col items-center justify-center px-8 h-screen uppercase gap-4">
				<h3 className="text-4xl">services</h3>
				<h3 className="text-2xl leading-tight text-center tracking-wide">
				nous sommes une agence créative avec un style visuel unique et une écoute attentive. Chaque projet est une collaboration : nous mêlons nos idées à vos besoins pour créer des contenus qui vous ressemblent. De la conception au tournage, jusqu&apos;à la livraison finale, nous prenons en charge chaque étape pour vous offrir des formats sur-mesure, adaptés à vos envies et à votre univers.
				</h3>
			</div>
		</main>
	)
}