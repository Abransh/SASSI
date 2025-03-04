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
