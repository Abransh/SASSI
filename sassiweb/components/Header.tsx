import Link from "next/link"
import { Instagram, Mail, Twitter } from "lucide-react"
import Image from "next/image"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo placeholder - replace with your actual logo later */}
            <Link href="/#home" className="font-bold text-2xl">
               <Image
                 src="/assests/SASSI.png"
                 alt="Group Diwali Image"
                 height={200}
                 width={200}
                 objectFit="cover"
                 className="rounded-lg"
                 />
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#home" className="text-gray-800 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-gray-800 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#life-in-milan" className="text-gray-800 hover:text-primary transition-colors">
              Life in Milan
            </Link>
            <Link href="#uni-networks" className="text-gray-800 hover:text-primary transition-colors">
              Uni Networks
            </Link>
            <Link href="#events" className="text-gray-800 hover:text-primary transition-colors">
              Events
            </Link>
            <Link href="#join-us" className="text-gray-800 hover:text-primary transition-colors">
              Join Us
            </Link>
            <Link href="#support-us" className="text-gray-800 hover:text-primary transition-colors">
              Support Us
            </Link>
            <Link href="#contact-us" className="text-gray-800 hover:text-primary transition-colors">
              Contact Us
            </Link>
            <Link href="/faqs" className="text-gray-800 hover:text-primary transition-colors">
              FAQs
            </Link>
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

