import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Providers from "./providers"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Students' Association of Indians in Milan",
  description: "A community by the students, for the students in Milan, Italy",
  keywords: "Indian students, Milan, community, events, resources",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.ico', sizes: '16x16' }
    ],
    apple: [
      { url: '/favicon.ico', sizes: '180x180' }
    ],
    shortcut: '/favicon.ico'
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "Students' Association of Indians in Milan"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
        <SpeedInsights/>
        <Analytics/>
          {children}
        </Providers>
      </body>
    </html>
  )
}