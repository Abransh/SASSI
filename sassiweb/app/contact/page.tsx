import { Metadata } from "next";
import Header from "@/components/Header"
import MobileMenu from "@/components/MobileMenu"
import Footer from "@/components/Footer"
import ContactForm from "@/components/ContactForm"
import { Mail, MessageSquare, MapPin, Calendar, Instagram, Users, Clock } from "lucide-react"
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us - Students' Association of Indians in Milan",
  description: "Get in touch with SASSI. We're here to answer your questions about Indian student life in Milan.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-orange-600 to-yellow-500 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full opacity-20 -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-700 rounded-full opacity-20 translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center mb-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <MessageSquare className="mr-2 h-5 w-5" />
              <span className="text-sm font-medium">We'd love to hear from you</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Have questions about SASSI or studying in Milan? We're here to help you navigate your journey.
            </p>
          </div>
        </div>
      </section>
      
      {/* Ways to Connect */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Email */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-3">For general inquiries:</p>
              <a href="mailto:support@sassimilan.com" className="text-orange-600 hover:underline font-medium">
                support@sassimilan.com
              </a>
            </div>
            
            {/* Instagram */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <Instagram className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Follow Us</h3>
              <p className="text-gray-600 mb-3">Stay updated on Instagram:</p>
              <a 
                href="https://www.instagram.com/sassi.milan/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-600 hover:underline font-medium"
              >
                @sassi.milan
              </a>
            </div>
            
            {/* Events */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Meet Us</h3>
              <p className="text-gray-600 mb-3">Join our upcoming events:</p>
              <Link href="/events" className="text-blue-600 hover:underline font-medium">
                View Event Calendar
              </Link>
            </div>
            
            {/* Join */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Join Us</h3>
              <p className="text-gray-600 mb-3">Become part of our community:</p>
              <Link href="/join/member" className="text-green-600 hover:underline font-medium">
                Membership Registration
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Quick Links */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Looking for answers?</h3>
                <p className="text-gray-600">
                  Check our frequently asked questions before contacting us.
                </p>
              </div>
              
              <Link 
                href="/faqs"
                className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                Browse FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Office Hours & Response Time */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Office Hours */}
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-5 shrink-0">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Support Hours</h3>
                  <p className="text-gray-600 mb-4">
                    Our volunteer team is typically available during the following hours:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-medium">10:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="font-medium">11:00 AM - 3:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-medium">Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Response Time */}
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-5 shrink-0">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Response Time</h3>
                  <p className="text-gray-600 mb-4">
                    We strive to respond to all inquiries as quickly as possible.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">
                        <span className="font-medium">Email Inquiries:</span> Within 24-48 hours on weekdays
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">
                        <span className="font-medium">Social Media:</span> Within 24 hours
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">
                        <span className="font-medium">Weekend Messages:</span> Response on the next business day
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map and Form */}
      <section className="py-16">
        
            
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          
      </section>

      <Footer />
    </main>
  )
}