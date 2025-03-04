"use client"
import { useEffect, useRef } from "react"

export default function CoreInitiativesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

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
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call to set positions

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-32 min-h-screen bg-[#FDF8F4]" id="initiatives">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - sticky title */}
          <div className="relative">
            <div ref={titleRef} className="transition-all duration-300">
              <h2 className="text-5xl md:text-6xl font-serif text-[#4A332F]">Our Core Initiatives</h2>
            </div>
          </div>

          {/* Right side - fixed containers */}
          <div className="space-y-8">
            {/* Container 1 */}
            <div className="p-12 rounded-[2rem] bg-[#ABE69E]">
              <h3 className="text-4xl font-serif mb-6 text-[#4A332F]">Community Outreach</h3>
              <p className="text-lg text-gray-800 leading-relaxed">
                We strive to build a vibrant and inclusive community that connects Indian students in Milan with local
                and global networks. Through cultural events, social initiatives, and collaborative projects, we aim to
                foster a sense of belonging and mutual support while promoting cross-cultural understanding.
              </p>
            </div>

            {/* Container 2 */}
            <div className="p-12 rounded-[2rem] bg-[#FCFB71]">
              <h3 className="text-4xl font-serif mb-6 text-[#4A332F]">Academic Excellence</h3>
              <p className="text-lg text-gray-800 leading-relaxed">
                We are committed to supporting the academic journey of Indian students in Milan through mentorship
                programs, study groups, and resource sharing. Our goal is to help students navigate the Italian
                education system successfully and achieve their full academic potential.
              </p>
            </div>

            {/* Container 3 */}
            <div className="p-12 rounded-[2rem] bg-[#EBD1FE]">
              <h3 className="text-4xl font-serif mb-6 text-[#4A332F]">Cultural Integration</h3>
              <p className="text-lg text-gray-800 leading-relaxed">
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

