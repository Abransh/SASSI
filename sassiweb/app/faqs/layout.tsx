import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQs - Students' Association of Indians in Milan",
  description: "Frequently asked questions about studying and living in Milan for Indian students",
}

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

