import Link from "next/link"

export default function LifeInMilanSection() {
  return (
    <section id="life-in-milan" className="py-20 relative">
      {/* Background image with Milan skyline outline */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* This will be replaced with your actual background image */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Life in Milan</h2>
          <h3 className="text-2xl mb-6">Your Guide to Life in Italy</h3>
          <p className="max-w-4xl mx-auto text-lg text-gray-700">
            Explore resources to make your journey to Milan seamless, welcoming, and enriching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Before Arrival */}
          <div className="flex flex-col items-center">
            <Link
              href="#before-arrival"
              className="mb-4 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              BEFORE ARRIVAL
            </Link>
            <p className="text-center text-gray-700">Essential tips to prepare before you arrive in Italy.</p>
          </div>

          {/* Welcome to Italy */}
          <div className="flex flex-col items-center">
            <Link
              href="#welcome-to-italy"
              className="mb-4 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              WELCOME TO ITALY
            </Link>
            <p className="text-center text-gray-700">A guide to settling in and navigating life in Milan.</p>
          </div>

          {/* After Graduation */}
          <div className="flex flex-col items-center">
            <Link
              href="#after-graduation"
              className="mb-4 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              AFTER GRADUATION
            </Link>
            <p className="text-center text-gray-700">Resources for your next steps after completing your studies.</p>
          </div>

           {/* FAQs */}
           <div className="flex flex-col items-center">
            <Link
              href="#faqs"
              className="mb-4 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              FAQS
            </Link>
            <p className="text-center text-gray-700">Our comprehensive Frequently Asked Questions.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
