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
      {isLoading && <div className="absolute inset-0 flex items-center justify-center bg-gray-200">Loading...</div>}
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