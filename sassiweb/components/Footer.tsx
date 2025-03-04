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