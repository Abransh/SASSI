"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User, 
  Users, 
  FileText, 
  Bell, 
  LogOut, 
  Menu, 
  X,
  ChevronDown 
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function MemberNav() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  
  if (!session) {
    return null;
  }
  
  const isActive = (path: string) => pathname.startsWith(path);
  
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/profile"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/profile")
                  ? "bg-orange-100 text-orange-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <User size={18} className="mr-2" />
              <span>My Profile</span>
            </Link>
            
            <Link
              href="/members"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/members")
                  ? "bg-orange-100 text-orange-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <Users size={18} className="mr-2" />
              <span>Members</span>
            </Link>
            
            <div className="relative">
              <button
                onClick={() => setResourcesDropdownOpen(!resourcesDropdownOpen)}
                className={`flex items-center px-3 py-2 rounded-md ${
                  isActive("/resources")
                    ? "bg-orange-100 text-orange-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <FileText size={18} className="mr-2" />
                <span>Resources</span>
                <ChevronDown size={16} className="ml-2" />
              </button>
              
              {resourcesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg z-10 w-48 py-1">
                  <Link
                    href="/resources"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    All Resources
                  </Link>
                  <Link
                    href="/resources/before-arrival"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Before Arrival
                  </Link>
                  <Link
                    href="/resources/living-in-milan"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Living in Milan
                  </Link>
                  <Link
                    href="/resources/templates"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Templates
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/notifications"
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Bell size={20} />
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="text-sm">
                <div className="font-medium">{session.user.name}</div>
                <div className="text-gray-500">{session.user.email}</div>
              </div>
              
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                title="Sign Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-2 border-t">
          <div className="container mx-auto px-4 space-y-2">
            <Link
              href="/profile"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/profile")
                  ? "bg-orange-100 text-orange-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <User size={18} className="mr-2" />
              <span>My Profile</span>
            </Link>
            
            <Link
              href="/members"
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive("/members")
                  ? "bg-orange-100 text-orange-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <Users size={18} className="mr-2" />
              <span>Members</span>
            </Link>
            
            <div>
              <button
                onClick={() => setResourcesDropdownOpen(!resourcesDropdownOpen)}
                className={`flex items-center w-full px-3 py-2 rounded-md ${
                  isActive("/resources")
                    ? "bg-orange-100 text-orange-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <FileText size={18} className="mr-2" />
                <span>Resources</span>
                <ChevronDown size={16} className="ml-2" />
              </button>
              
              {resourcesDropdownOpen && (
                <div className="pl-8 mt-1 space-y-1">
                  <Link
                    href="/resources"
                    className="block px-3 py-2 rounded-md hover:bg-gray-100"
                  >
                    All Resources
                  </Link>
                  <Link
                    href="/resources/before-arrival"
                    className="block px-3 py-2 rounded-md hover:bg-gray-100"
                  >
                    Before Arrival
                  </Link>
                  <Link
                    href="/resources/living-in-milan"
                    className="block px-3 py-2 rounded-md hover:bg-gray-100"
                  >
                    Living in Milan
                  </Link>
                  <Link
                    href="/resources/templates"
                    className="block px-3 py-2 rounded-md hover:bg-gray-100"
                  >
                    Templates
                  </Link>
                </div>
              )}
            </div>
            
            <Link
              href="/notifications"
              className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100"
            >
              <Bell size={18} className="mr-2" />
              <span>Notifications</span>
            </Link>
            
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-100 text-red-600"
            >
              <LogOut size={18} className="mr-2" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}