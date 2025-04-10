import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Providers from "./providers"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "react-hot-toast"
import Link from "next/link"

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
          <div className="fixed bottom-0 left-0 p-2 text-[10px] text-black backdrop-blur-sm z-50">
            <Link href="/finally-you-here" className="hover:text-orange-600 transition-colors">
              Developed and Maintained by Abransh
            </Link>
          </div>
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}