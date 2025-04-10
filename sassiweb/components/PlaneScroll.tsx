"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function PlaneAnimation() {
  const planeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updatePlanePosition = () => {
      if (!planeRef.current) return

      // Calculate scroll percentage (0 to 1)
      const scrollPercent = Math.min(
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight),
        1
      )

      // Calculate horizontal position (0 to 100% of viewport width)
      const translateX = scrollPercent * (window.innerWidth - 38) // Subtract plane width to keep it in view

      // Apply smooth transform
      planeRef.current.style.transform = `translateX(${translateX}px)`
    }

    // Initial position
    updatePlanePosition()

    // Add scroll listener with throttling
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updatePlanePosition()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll)
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
        className="absolute left-0 top-1/2 -translate-y-1/2 transition-transform duration-300 ease-out will-change-transform"
      >
        <Image
          src="/assests/image.png"
          alt="Plane"
          width={38}   //width of plane
          height={38}  //height of plane
          className="-translate-y-[17px]" // Adjust this value to fine-tune vertical position
          priority
        />
      </div>
    </div>
  )
}
