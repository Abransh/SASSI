"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Mail, Twitter, LogOut, Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to handle smooth scrolling to anchors
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    
    // Close mobile menu if open
    setMobileMenuOpen(false);
    
    // Find the element to scroll to
    const element = document.getElementById(anchor);
    if (element) {
      // If we're already on the home page, scroll to the element
      if (pathname === "/") {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        // If we're on another page, navigate to home page with the anchor
        router.push(`/#${anchor}`);
      }
    } else {
      // If element not found, just navigate to the anchor
      router.push(`/#${anchor}`);
    }
  };

  // Handle scroll detection for background change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Nav Items with their paths and IDs
  const navItems = [
    { name: "Home", path: "/#home", id: "home" },
    { name: "Life in Milan", path: "/#life-in-milan", id: "life-in-milan" },
    { name: "Uni Networks", path: "/#uni-networks", id: "uni-networks" },
    { name: "Events", path: "/#events", id: "events" },
    { name: "Join Us", path: "/#join-us", id: "join-us" },
    { name: "Contact Us", path: "/#contact-us", id: "contact-us" },
    { name: "FAQs", path: "/faqs", id: null }
  ];

  // Social links
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/sassi.milan/", label: "Instagram", hoverColor: "hover:text-pink-600" },
    { icon: Mail, href: "mailto:support@sassimilan.com", label: "Email", hoverColor: "hover:text-blue-600" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", hoverColor: "hover:text-blue-400" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="relative">
              <Image
                src="/assests/SASSI.png"
                alt="SASSI Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              {/* Animated underline on hover */}
              <motion.div 
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-400"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1, delayChildren: 0.2 }}
              className="flex items-center"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative px-1"
                >
                  {item.id ? (
                    <a
                      href={item.path}
                      onClick={(e) => handleAnchorClick(e, item.id!)}
                      className="px-3 py-2 text-gray-800 rounded-md relative font-medium flex items-center"
                    >
                      {item.name}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
                        initial={{ width: 0, left: "50%", right: "50%" }}
                        animate={{ 
                          width: hoveredItem === item.name ? "100%" : "0%",
                          left: hoveredItem === item.name ? "0%" : "50%",
                          right: hoveredItem === item.name ? "0%" : "50%",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                  ) : (
                    <Link 
                      href={item.path}
                      className="px-3 py-2 text-gray-800 rounded-md relative font-medium flex items-center"
                    >
                      {item.name}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
                        initial={{ width: 0, left: "50%", right: "50%" }}
                        animate={{ 
                          width: hoveredItem === item.name ? "100%" : "0%",
                          left: hoveredItem === item.name ? "0%" : "50%",
                          right: hoveredItem === item.name ? "0%" : "50%",
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Auth Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="ml-2"
            >
              {!session ? (
                <Link 
                  href="/auth/signin" 
                  className="relative overflow-hidden group px-4 py-2 bg-yellow-400 text-black font-medium rounded-md hover:bg-yellow-500 transition-colors"
                >
                  <span className="relative z-10">Login / Register</span>
                  <motion.div 
                    className="absolute inset-0 "
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <motion.span 
                    className="absolute inset-0 flex items-center justify-center text-yellow-400 font-medium"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    Login / Register
                  </motion.span>
                </Link>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link 
                    href="/dashboard" 
                    className="text-gray-800 font-medium hover:text-orange-600 transition-colors"
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
            </motion.div>
          </nav>

          {/* Social Media Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              >
                <Link
                  href={link.href}
                  target={link.href.startsWith('http') ? "_blank" : undefined}
                  className={`text-gray-800 transition-all duration-300 ${link.hoverColor}`}
                  aria-label={link.label}
                >
                  <link.icon size={20} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-800 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.id ? (
                      <a
                        href={item.path}
                        onClick={(e) => handleAnchorClick(e, item.id!)}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-50 rounded-md font-medium"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link 
                        href={item.path}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-50 rounded-md font-medium"
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}

                {!session ? (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Link 
                      href="/auth/signin" 
                      className="block w-full px-4 py-2 bg-yellow-400 text-black text-center font-medium rounded-md hover:bg-yellow-500 transition-colors"
                    >
                      Login / Register
                    </Link>
                  </motion.div>
                ) : (
                  <>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <Link 
                        href="/dashboard" 
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-50 rounded-md font-medium"
                      >
                        Dashboard
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        <LogOut size={18} className="mr-2" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  </>
                )}

                {/* Social links in mobile menu */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="flex justify-center pt-4 space-x-6 border-t border-gray-100 mt-4"
                >
                  {socialLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('http') ? "_blank" : undefined}
                      className={`text-gray-800 transition-colors ${link.hoverColor}`}
                      aria-label={link.label}
                    >
                      <link.icon size={22} />
                    </Link>
                  ))}
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}