"use client"

import { useState, useRef, useEffect } from "react"
import Hls from "hls.js"

interface OptimizedVideoProps {
  hlsSrc: string
  mp4Src: string
  poster?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
}

export default function OptimizedVideo({
  hlsSrc,
  mp4Src,
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
}: OptimizedVideoProps) {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls({
        maxBufferSize: 30 * 1000 * 1000,
        maxBufferLength: 60,
      })
      hls.loadSource(hlsSrc)
      hls.attachMedia(videoRef.current)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (videoRef.current && autoPlay) {
          videoRef.current.play().catch((e) => console.error("Auto-play was prevented:", e))
        }
      })
    }
    else if (videoRef.current) {
      videoRef.current.src = mp4Src
      if (autoPlay) {
        videoRef.current.play().catch((e) => console.error("Auto-play was prevented:", e))
      }
    }
  }, [hlsSrc, mp4Src, autoPlay])

  const handleLoadedData = () => {
    setIsLoading(false)
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && <div className="absolute top-0 left-0 h-full w-full bg-white flex justify-center items-center text-8xl cursor-pointer overflow-hidden"><h1>PELIZZA</h1></div>}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        onLoadedData={handleLoadedData}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
      >
        <source src={mp4Src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}