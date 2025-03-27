// app/resources/layout.tsx - Base layout for all resource pages

import { Metadata } from "next";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Resources - Students' Association of Indians in Milan",
  description: "Access exclusive resources for Indian students in Milan",
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}