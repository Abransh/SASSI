"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Instagram, Mail, Twitter, X, Menu, LogOut } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
    closeMenu()
  }

  // Function to handle smooth scrolling to anchors
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault()
    closeMenu()
    
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
    <div className="md:hidden">
      {/* Menu Button - positioned in the header */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2 text-gray-800 focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full pt-16">
          <nav className="flex flex-col items-center space-y-6 text-xl">
            <Link href="/" onClick={closeMenu} className="text-gray-800 hover:text-orange-600 transition-colors">
              Home
            </Link>
            <a
              href="/#life-in-milan"
              onClick={(e) => handleAnchorClick(e, "life-in-milan")}
              className="text-gray-800 hover:text-orange-600 transition-colors"
            >
              Life in Milan
            </a>
            <a
              href="/#uni-networks"
              onClick={(e) => handleAnchorClick(e, "uni-networks")}
              className="text-gray-800 hover:text-orange-600 transition-colors"
            >
              Uni Networks
            </a>
            <a
              href="/#events"
              onClick={(e) => handleAnchorClick(e, "events")}
              className="text-gray-800 hover:text-orange-600 transition-colors"
            >
              Events
            </a>
            <a
              href="/#join-us"
              onClick={(e) => handleAnchorClick(e, "join-us")}
              className="text-gray-800 hover:text-orange-600 transition-colors"
            >
              Join Us
            </a>
            <a
              href="/#contact-us"
              onClick={(e) => handleAnchorClick(e, "contact-us")}
              className="text-gray-800 hover:text-orange-600 transition-colors"
            >
              Contact Us
            </a>
            <Link href="/faqs" onClick={closeMenu} className="text-gray-800 hover:text-orange-600 transition-colors">
              FAQs
            </Link>

            {!session ? (
              <Link 
                href="/auth/signin" 
                onClick={closeMenu}
                className="px-5 py-2 bg-yellow-400 text-black font-medium rounded-md hover:bg-yellow-500 transition-colors"
              >
                Login / Register
              </Link>
            ) : (
              <>
                <Link 
                  href="/dashboard" 
                  onClick={closeMenu}
                  className="text-gray-800 hover:text-orange-600 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <LogOut size={18} className="mr-2" />
                  <span>Logout</span>
                </button>
              </>
            )}

            {/* Social Media Icons */}
            <div className="flex items-center space-x-6 mt-8">
              <Link
                href="https://www.instagram.com/sassi.milan/"
                target="_blank"
                className="text-gray-800 hover:text-pink-600 transition-colors"
                onClick={closeMenu}
              >
                <Instagram size={24} />
              </Link>
              <Link
                href="mailto:support@sassimilan.com"
                className="text-gray-800 hover:text-blue-600 transition-colors"
                onClick={closeMenu}
              >
                <Mail size={24} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-gray-800 hover:text-blue-400 transition-colors"
                onClick={closeMenu}
              >
                <Twitter size={24} />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}