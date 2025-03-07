"use client"
import { useState } from "react"
import Link from "next/link"
import { Instagram, Mail, Twitter, X, Menu } from "lucide-react"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
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
            <Link href="#about" onClick={closeMenu} className="text-gray-800 hover:text-orange-600 transition-colors">
              About
            </Link>
            <Link
              href="#life-in-milan"
              onClick={closeMenu}
              className="text-gray-800 hover:text-orange-600 transition-colors"
            >
              Life in Milan
            </Link>
            <Link
              href="#uni-networks"
              onClick={closeMenu}
              className="text-gray-800 hover:text-orange-600 transition-colors"
            >
              Uni Networks
            </Link>
            <Link href="#events" onClick={closeMenu} className="text-gray-800 hover:text-orange-600 transition-colors">
              Events
            </Link>
            <Link href="#join-us" onClick={closeMenu} className="text-gray-800 hover:text-orange-600 transition-colors">
              Join Us
            </Link>
            <Link
              href="#support-us"
              onClick={closeMenu}
              className="text-gray-800 hover:text-orange-600 transition-colors"
            >
              Support Us
            </Link>
            <Link
              href="#contact-us"
              onClick={closeMenu}
              className="text-gray-800 hover:text-orange-600 transition-colors"
            >
              Contact Us
            </Link>
            <Link href="/faqs" onClick={closeMenu} className="text-gray-800 hover:text-orange-600 transition-colors">
              FAQs
            </Link>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-6 mt-8">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="text-gray-800 hover:text-pink-600 transition-colors"
              >
                <Instagram size={24} />
              </Link>
              <Link
                href="mailto:contact@indianstudents.it"
                className="text-gray-800 hover:text-blue-600 transition-colors"
              >
                <Mail size={24} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-gray-800 hover:text-blue-400 transition-colors"
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

