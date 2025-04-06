"use client"

import Link from "next/link"
import { Instagram, Mail, Twitter, LogOut } from "lucide-react"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"

export default function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  // Function to handle smooth scrolling to anchors
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault()
    
    // Find the element to scroll to
    const element = document.getElementById(anchor)
    if (element) {
      // If we're already on the home page, scroll to the element
      if (pathname === "/") {
        element.scrollIntoView({ behavior: "smooth" })
      } else {
        // If we're on another page, navigate to home page with the anchor
        router.push(`/#${anchor}`)
      }
    } else {
      // If element not found, just navigate to the anchor
      router.push(`/#${anchor}`)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo placeholder - replace with your actual logo later */}
            <Link href="/" className="font-bold text-2xl">
               <Image
                 src="/assests/SASSI.png"
                 alt="SASSI Logo"
                 height={200}
                 width={200}
                 objectFit="cover"
                 className="rounded-lg"
                 />
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/#home" onClick={(e) => handleAnchorClick(e, "home")} className="text-gray-800 hover:text-primary transition-colors">
              Home
            </a>
            <a href="/#life-in-milan" onClick={(e) => handleAnchorClick(e, "life-in-milan")} className="text-gray-800 hover:text-primary transition-colors">
              Life in Milan
            </a>
            <a href="/#uni-networks" onClick={(e) => handleAnchorClick(e, "uni-networks")} className="text-gray-800 hover:text-primary transition-colors">
              Uni Networks
            </a>
            <a href="/#events" onClick={(e) => handleAnchorClick(e, "events")} className="text-gray-800 hover:text-primary transition-colors">
              Events
            </a>
            <a href="/#join-us" onClick={(e) => handleAnchorClick(e, "join-us")} className="text-gray-800 hover:text-primary transition-colors">
              Join Us
            </a>
            <a href="/#contact-us" onClick={(e) => handleAnchorClick(e, "contact-us")} className="text-gray-800 hover:text-primary transition-colors">
              Contact Us
            </a>
            <Link href="/faqs" className="text-gray-800 hover:text-primary transition-colors">
              FAQs
            </Link>
            
            {!session ? (
              <Link 
                href="/auth/signin" 
                className="px-4 py-2 bg-yellow-400 text-black font-medium rounded-md hover:bg-yellow-500 transition-colors"
              >
                Login / Register
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/dashboard" 
                  className="text-gray-800 hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center px-3 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <LogOut size={16} className="mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button will be handled by MobileMenu component */}
          <div className="md:hidden"></div>
         
          {/* Social Media Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://www.instagram.com/sassi.milan/"
              target="_blank"
              className="text-gray-800 hover:text-pink-600 transition-colors"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="mailto:support@sassimilan.com"
              className="text-gray-800 hover:text-yellow-500 transition-colors"
            >
              <Mail size={20} />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="text-gray-800 hover:text-blue-400 transition-colors"
            >
              <Twitter size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}