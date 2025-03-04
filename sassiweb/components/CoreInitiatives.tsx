use client"
import { useEffect, useRef } from "react"

export default function CoreInitiativesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const container1Ref = useRef<HTMLDivElement>(null)
  const container2Ref = useRef<HTMLDivElement>(null)
  const container3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !titleRef.current) return

      const sectionRect = sectionRef.current.getBoundingClientRect()
      const sectionTop = sectionRect.top
      const sectionHeight = sectionRect.height
      const windowHeight = window.innerHeight

      // Make the title sticky when the section is in view
      if (sectionTop <= 100 && sectionTop > -sectionHeight + 200) {
        titleRef.current.style.position = "sticky"
        titleRef.current.style.top = "100px"
      } else {
        titleRef.current.style.position = "relative"
        titleRef.current.style.top = "0"
      }
      // Calculate scroll progress within the section
      const scrollProgress = Math.max(0, Math.min(1, (100 - sectionTop) / (sectionHeight - 300)))

      // Animate containers based on scroll progress
      if (container1Ref.current && container2Ref.current && container3Ref.current) {
        // First container is always visible
        container1Ref.current.style.opacity = "1"
        container1Ref.current.style.transform = "translateY(0)"

        // Second container appears after 30% scroll
        if (scrollProgress > 0.3) {
          container2Ref.current.style.opacity = "1"
          container2Ref.current.style.transform = "translateY(0)"
        } else {
          container2Ref.current.style.opacity = "0"
          container2Ref.current.style.transform = "translateY(50px)"
        }

        // Third container appears after 60% scroll
        if (scrollProgress > 0.6) {
          container3Ref.current.style.opacity = "1"
          container3Ref.current.style.transform = "translateY(0)"
        } else {
          container3Ref.current.style.opacity = "0"
          container3Ref.current.style.transform = "translateY(50px)"
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call to set positions

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])