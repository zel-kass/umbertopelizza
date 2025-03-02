import NavBar from "./components/NavBar";
import OptimizedVideo from "./components/OptimizedVideo"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex justify-center px-4">
        <div className="w-full max-h-[90vh] aspect-video rounded-2xl overflow-hidden relative">
					<div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-md z-10" />
					<OptimizedVideo
            hlsSrc="/videos/BANDEDEMOFINAL.m3u8"
            mp4Src="/videos/BANDEDEMOFINAL_compressed.mp4"
            poster="/videos/BANDEDEMOFINAL-poster.jpg"
            autoPlay={true}
            loop={true}
            muted={true}
          />
        </div>
      </main>
    </div>
  )
}