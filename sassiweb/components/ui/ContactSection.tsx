import Link from "next/link";
import Image from "next/image";
import { Mail, MessageSquare, ArrowRight, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact-us" className="py-20 relative overflow-hidden bg-gray-50">
      {/* Background decorative elements */}
      <div className="absolute left-0 top-1/3 w-64 h-64 bg-orange-100 rounded-full opacity-70 blur-3xl"></div>
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-yellow-100 rounded-full opacity-70 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-3">
            Reach Out
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or want to connect with SASSI? We're here to help you navigate your journey in Milan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Card 1 */}
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Email Us</h3>
            <p className="text-gray-600 mb-4">
              For general inquiries and information, reach out via email.
            </p>
            <a 
              href="mailto:support@sassimilan.com" 
              className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center"
            >
              support@sassimilan.com
              <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          
          {/* Contact Card 2 */}
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Send a Message</h3>
            <p className="text-gray-600 mb-4">
              Fill out our contact form and we'll respond as soon as possible.
            </p>
            <Link
              href="#contact-form"
              className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
            >
              Contact Form
              <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          {/* Contact Card 3 */}
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Visit Us</h3>
            <p className="text-gray-600 mb-4">
              Find us at various university campuses across Milan.
            </p>
            <Link
              href="/events"
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
            >
              Check Events
              <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        
        {/* Contact Form Teaser */}
        <div className="bg-gradient-to-r from-orange-600 to-yellow-500 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-6 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Have Questions?</h3>
              <p className="text-white/90 max-w-xl">
                Our team is ready to answer your questions and help you connect with the Indian student community in Milan.
              </p>
            </div>
            
            <Link 
              href="/contact"
              className="px-8 py-4 bg-white text-orange-600 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-md"
            >
              Contact Us Now
            </Link>
          </div>
        </div>
        
        {/* Hidden anchor for scroll */}
        <div id="contact-form" className="-mt-32 pt-32"></div>
      </div>
    </section>
  );
}