"use client";

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const faqs :{title: string; content: string}[] = [
    {
      title: "How do I obtain a Tessera Sanitaria?r",
      content:
        "This is the space to describe the service and explain how customers or clients can benefit from it. It's an opportunity to add a short description that includes relevant details, like pricing, duration, location and how to book the service.",
    },
    {
      title: "Plan your itinerary",
      content:
        "Create a personalized itinerary that matches your interests and travel style. Our local experts will help you plan the perfect route.",
    },
    {
      title: "Book your accommodation",
      content:
        "Find and book verified accommodations that suit your preferences and budget. We ensure you get the best deals.",
    },
    {
      title: "Dive into local experiences",
      content: "Discover authentic local experiences and activities that make your trip unique and memorable.",
    },
  ]

  export default function FaqsSection() {

    const [openSection, setOpenSection] = useState<number | null>(0)

    return (
        <div className="min-h-screen bg-gray-50">
             <div className="mx-auto max-w-7xl px-4 py-24">
                 <section className="mb-24">
                     <div className="grid gap-8 md:grid-cols-2">
                        <div className="flex flex-col">
                                             {/* Heading */}
                            <div className="mb-6 rounded-2xl  bg-white p-4 shadow-sm">
                              <h2 className="text-center text-3xl font-bold  text-navy-blue">FAQs</h2>
                            </div>

                            <div className="flex-1 rounded-3xl bg-white p-6 shadow-sm">
                               <div className="space-y-4">
                                     {faqs.map((item, index) => (
                                         <div key={index}>
                                           <button
                                              onClick={() => setOpenSection(openSection === index ? null : index)}
                                              className="flex w-full items-center justify-between py-3 text-left"
                                            >
                                              <span className="text-xl font-medium">{item.title}</span>
                                              <ChevronDown
                                                 className={`h-5 w-5 transition-transform duration-300 ${
                                                 openSection === index ? "rotate-180" : ""
                                                 }`}
                                               />
                                         </button>

                                        <AnimatePresence>
                                         {openSection === index && (
                                             <motion.div
                                             initial={{ height: 0, opacity: 0 }}
                                             animate={{ height: "auto", opacity: 1 }}
                                             exit={{ height: 0, opacity: 0 }}
                                             transition={{ duration: 0.3 }}
                                             className="overflow-hidden"
                                          >
                                              <p className="py-3 text-gray-700">{item.content}</p>
                                            </motion.div>
                                         )}
                                        </AnimatePresence>

                                            {/* Dashed line separator (except for last item) */}
                                         {index < faqs.length - 1 && <div className="border-t border-dashed border-gray-300" />}
                                        </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>    
                </section>
            </div>
        </div>
       


    )


  }