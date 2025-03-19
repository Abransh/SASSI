"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import MemberNav from "./MemberNav";
import { Instagram, Mail, Twitter } from "lucide-react";
import Image from "next/image";

export default function MemberHeader() {
  const { data: session, status } = useSession();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Logo placeholder - replace with your actual logo later */}
            <Link href="/#home" className="font-bold text-2xl">
               <Image
                 src="/assests/SASSI.png"
                 alt="SASSI Logo"
                 height={160}
                 width={160}
                 objectFit="cover"
                 className="rounded-lg"
                 />
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-800 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/#about" className="text-gray-800 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/events" className="text-gray-800 hover:text-primary transition-colors">
              Events
            </Link>
            {!session && (
              <Link href="/auth/signin" className="text-gray-800 hover:text-primary transition-colors">
                Sign In
              </Link>
            )}
          </nav>

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
      
      {/* Member navigation for logged in users */}
      {session && <MemberNav />}
    </header>
  );
}