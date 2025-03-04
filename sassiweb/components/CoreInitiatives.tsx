"use client"; 

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

  return (
    <section ref={sectionRef} className="py-32 min-h-screen" id="initiatives">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - sticky title */}
          <div className="relative">
            <div ref={titleRef} className="transition-all duration-300">
              <h2 className="text-3xl md:text-4xl font-bold">Our Core Initiatives</h2>
            </div>
          </div>

          {/* Right side - scrolling containers */}
          <div className="space-y-12">
            {/* Container 1 */}
            <div
              ref={container1Ref}
              className="p-8 rounded-lg transition-all duration-500"
              style={{ backgroundColor: "#ABE69E" }}
            >
              <h3 className="text-2xl font-bold mb-4">Community Outreach</h3>
              <p className="text-gray-800">
                We strive to build a vibrant and inclusive community that connects Indian students in Milan with local
                and global networks. Through cultural events, social initiatives, and collaborative projects, we aim to
                foster a sense of belonging and mutual support while promoting cross-cultural understanding.
              </p>
            </div>

            {/* Container 2 */}
            <div
              ref={container2Ref}
              className="p-8 rounded-lg transition-all duration-500 opacity-0 transform translate-y-12"
              style={{ backgroundColor: "#FCFB71" }}
            >
              <h3 className="text-2xl font-bold mb-4">Academic Excellence</h3>
              <p className="text-gray-800">
                We are committed to supporting the academic journey of Indian students in Milan through mentorship
                programs, study groups, and resource sharing. Our goal is to help students navigate the Italian
                education system successfully and achieve their full academic potential.
              </p>
            </div>

            {/* Container 3 */}
            <div
              ref={container3Ref}
              className="p-8 rounded-lg transition-all duration-500 opacity-0 transform translate-y-12"
              style={{ backgroundColor: "#EBD1FE" }}
            >
              <h3 className="text-2xl font-bold mb-4">Cultural Integration</h3>
              <p className="text-gray-800">
                We believe in celebrating our Indian heritage while embracing Italian culture. Through language
                exchanges, cultural workshops, and collaborative events with local communities, we help students
                integrate into Italian society while maintaining their cultural identity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

