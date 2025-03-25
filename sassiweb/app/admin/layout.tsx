"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { Menu, X, LogOut, Bell, User as UserIcon } from "lucide-react";
import Link from "next/link";
import AdminNavigation from "@/components/admin/AdminNavigation";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Toaster } from "sonner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Check if user is authenticated and is an admin
  if (status === "unauthenticated") {
    redirect("/auth/signin?callbackUrl=/admin/dashboard");
  }
  
  if (status === "authenticated" && session?.user?.role !== "ADMIN") {
    redirect("/");
  }
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-900 border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 md:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform overflow-y-auto bg-gray-900 transition-transform duration-300 md:static md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <AdminNavigation />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar}
                className="text-gray-500 focus:outline-none md:hidden"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-800 md:ml-0">
                Admin Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <Bell size={20} />
              </button>
              
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-700">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon size={18} className="text-gray-600" />
                  </div>
                  <span className="hidden md:inline-block font-medium">
                    {session?.user?.name || "Admin User"}
                  </span>
                </button>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-gray-700"
              >
                <LogOut size={18} className="mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {children}
        </main>
      </div>
      
      <Toaster position="top-right" />
    </div>
  );
}