"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function PlaneAnimation() {
  const planeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updatePlanePosition = () => {
      if (!planeRef.current) return

      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) * 400    //change this value to adjust the speed of the plane
      const translateX = (scrollPercent * window.innerWidth) / 100

      planeRef.current.style.transform = `translateX(${translateX}px)`
    }

    window.addEventListener("scroll", updatePlanePosition)  
    return () =>
      window.removeEventListener("scroll", updatePlanePosition)   
  }, [])

  return (
    <div className="relative h-[42px] w-full overflow-hidden">
      {/* Dashed line with custom styling */}
      <div
        className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2"  //height of dashed line
        style={{
          background:
            "repeating-linear-gradient(to right, rgba(0, 0, 0, 0.3) 0, rgba(0, 0, 0, 0.3) 5px, transparent 5px, transparent 10px)", // Adjust this value to change the dash length
        }}
      />
      {/* Plane container */}
      <div
        ref={planeRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 transition-transform duration-75" // Adjust duration to fine-tune animation speed
      >
        <Image
          src="/assests/image.png"
          alt="Plane"
          width={38}   //width of plane
          height={38}  //height of plane
          className="-translate-y-[17px]" // Adjust this value to fine-tune vertical position
        />
      </div>
    </div>
  )
}
