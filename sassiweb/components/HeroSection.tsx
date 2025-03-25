"use client"; 
import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import JoinButton from "../components/JoinButton"

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

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

    const handleScroll = () => {
      if(backgroundRef.current)
      {
        const scrollPosition = window.scrollY
        backgroundRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
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

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link
            href="https://instagram.com"
            target="_blank"
            className="px-6 py-3 bg-white text-black border-2 border-black rounded-md font-medium transition-all hover:text-yellow-400 hover:border-yellow-400"
          >
            Our Instagram
          </Link>
          <JoinButton />
        </div>
      </div>
    </section>
  )
}