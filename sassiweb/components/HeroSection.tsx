"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (section) {
      section.style.opacity = "0"
      section.style.transform = "translateY(-50px)"

      setTimeout(() => {
        section.style.transition = "opacity 1s ease, transform 1s ease"
        section.style.opacity = "1"
        section.style.transform = "translateY(0)"
      }, 100)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center py-20 px-4" ref={sectionRef}>
      {/* Background image - will be added later */}
      <div className="absolute inset-0 bg-gray-900/50 z-0">
        {/* Replace with actual background image later */}
        <div className="absolute inset-0 bg-white "></div>
        <Image
                 src="/assests/banner.png"
                 alt="Group Diwali Image"
                 layout="fill"
                 objectFit="cover"
                 className="rounded-lg"
                 />
      </div>

      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">Students&apos; Association of Indians</h1>
        <p className="text-xl md:text-2xl text-black/90 mb-6">A community by the students, for the students.</p>
        <p className="max-w-3xl mx-auto text-lg text-black/80">
          Bringing Indian students in Italy together, celebrating our culture, supporting each other, and making every
          step of this journey feel like home
        </p>
      </div>
    </section>
  )
}

