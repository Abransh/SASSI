"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, LayoutDashboard, Users, Calendar, FileText, MessageCircle, UserPlus, Shield } from "lucide-react";

export default function AdminNavigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState({
    users: false,
    events: false,
    resources: false,
  });
  
  const isActive = (path: string) => pathname === path;
  const isGroupActive = (prefix: string) => pathname.startsWith(prefix);
  
  const toggleMenu = (menu: keyof typeof menuOpen) => {
    setMenuOpen(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  
  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen w-64 flex-shrink-0 hidden md:block">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Shield size={20} className="mr-2" />
          Admin Panel
        </h2>
      </div>
      
      <div className="p-4">
        <nav className="space-y-1">
          {/* Dashboard */}
          <Link 
            href="/admin/dashboard" 
            className={`flex items-center px-4 py-2.5 rounded-md ${
              isActive("/admin/dashboard") 
                ? "bg-gray-800 text-white" 
                : "hover:bg-gray-800 hover:text-white"
            }`}
          >
            <LayoutDashboard size={18} className="mr-3" />
            <span>Dashboard</span>
          </Link>
          
          {/* Membership Requests */}
          <Link 
            href="/admin/membership-requests" 
            className={`flex items-center px-4 py-2.5 rounded-md ${
              isActive("/admin/membership-requests") 
                ? "bg-gray-800 text-white" 
                : "hover:bg-gray-800 hover:text-white"
            }`}
          >
            <UserPlus size={18} className="mr-3" />
            <span>Membership Requests</span>
          </Link>
          
          {/* Team Applications */}
          <Link 
            href="/admin/team-applications" 
            className={`flex items-center px-4 py-2.5 rounded-md ${
              isActive("/admin/team-applications") 
                ? "bg-gray-800 text-white" 
                : "hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Users size={18} className="mr-3" />
            <span>Team Applications</span>
          </Link>
          
          {/* Events Menu */}
          <div>
            <button
              onClick={() => toggleMenu("events")}
              className={`flex items-center w-full px-4 py-2.5 rounded-md ${
                isGroupActive("/admin/events") 
                  ? "bg-gray-800 text-white" 
                  : "hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Calendar size={18} className="mr-3" />
              <span>Events</span>
              {menuOpen.events ? (
                <ChevronDown size={16} className="ml-auto" />
              ) : (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </button>
            
            {menuOpen.events && (
              <div className="ml-7 mt-1 space-y-1">
                <Link 
                  href="/admin/events" 
                  className={`flex items-center px-4 py-2 rounded-md ${
                    isActive("/admin/events") 
                      ? "bg-gray-700 text-white" 
                      : "hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span>All Events</span>
                </Link>
                <Link 
                  href="/admin/events/new" 
                  className={`flex items-center px-4 py-2 rounded-md ${
                    isActive("/admin/events/new") 
                      ? "bg-gray-700 text-white" 
                      : "hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span>Create Event</span>
                </Link>
              </div>
            )}
          </div>
          
          {/* Resources Menu */}
          <div>
            <button
              onClick={() => toggleMenu("resources")}
              className={`flex items-center w-full px-4 py-2.5 rounded-md ${
                isGroupActive("/admin/resources") 
                  ? "bg-gray-800 text-white" 
                  : "hover:bg-gray-800 hover:text-white"
              }`}
            >
              <FileText size={18} className="mr-3" />
              <span>Resources</span>
              {menuOpen.resources ? (
                <ChevronDown size={16} className="ml-auto" />
              ) : (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </button>
            
            {menuOpen.resources && (
              <div className="ml-7 mt-1 space-y-1">
                <Link 
                  href="/admin/resources" 
                  className={`flex items-center px-4 py-2 rounded-md ${
                    isActive("/admin/resources") 
                      ? "bg-gray-700 text-white" 
                      : "hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span>All Resources</span>
                </Link>
                <Link 
                  href="/admin/resources/categories" 
                  className={`flex items-center px-4 py-2 rounded-md ${
                    isActive("/admin/resources/categories") 
                      ? "bg-gray-700 text-white" 
                      : "hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span>Categories</span>
                </Link>
                <Link 
                  href="/admin/resources/new" 
                  className={`flex items-center px-4 py-2 rounded-md ${
                    isActive("/admin/resources/new") 
                      ? "bg-gray-700 text-white" 
                      : "hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span>Upload Resource</span>
                </Link>
              </div>
            )}
          </div>
          
          {/* Users Menu */}
          <div>
            <button
              onClick={() => toggleMenu("users")}
              className={`flex items-center w-full px-4 py-2.5 rounded-md ${
                isGroupActive("/admin/users") 
                  ? "bg-gray-800 text-white" 
                  : "hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Users size={18} className="mr-3" />
              <span>Users</span>
              {menuOpen.users ? (
                <ChevronDown size={16} className="ml-auto" />
              ) : (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </button>
            
            {menuOpen.users && (
              <div className="ml-7 mt-1 space-y-1">
                <Link 
                  href="/admin/users" 
                  className={`flex items-center px-4 py-2 rounded-md ${
                    isActive("/admin/users") 
                      ? "bg-gray-700 text-white" 
                      : "hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span>All Users</span>
                </Link>
                <Link 
                  href="/admin/users/roles" 
                  className={`flex items-center px-4 py-2 rounded-md ${
                    isActive("/admin/users/roles") 
                      ? "bg-gray-700 text-white" 
                      : "hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span>Manage Roles</span>
                </Link>
              </div>
            )}
          </div>
          
          {/* Contact Submissions */}
          <Link 
            href="/admin/contact" 
            className={`flex items-center px-4 py-2.5 rounded-md ${
              isActive("/admin/contact") 
                ? "bg-gray-800 text-white" 
                : "hover:bg-gray-800 hover:text-white"
            }`}
          >
            <MessageCircle size={18} className="mr-3" />
            <span>Contact Submissions</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}