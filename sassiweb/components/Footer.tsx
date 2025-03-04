/ components/Footer.tsx
import Link from 'next/link';
import SocialIcons from './SocialIcons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white">
              ISA POLIMI
            </Link>
            <p className="mt-4 text-gray-400">
              Supporting Indian students at Politecnico di Milano since 2021.
            </p>
            <div className="mt-6 flex space-x-4">
              <SocialIcons />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white transition duration-200">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-400 hover:text-white transition duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/life-in-milan" className="text-gray-400 hover:text-white transition duration-200">
                  Life in Milan
                </Link>
              </li>
              <li>
                <Link href="/networks" className="text-gray-400 hover:text-white transition duration-200">
                  Uni Networks
                </Link>
              </li>
              <li>
                <Link href="/join-us" className="text-gray-400 hover:text-white transition duration-200">
                  Join Us
                </Link>
              </li>
              <li>
                <Link href="/support-us" className="text-gray-400 hover:text-white transition duration-200">
                  Support Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="h-6 w-6 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400">
                  Politecnico di Milano, Milan, Italy
                </span>
              </li>