import Link from "next/link"

export default function GetInvolvedSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Image container - replace with actual image later */}
          <div className="w-full h-[500px] bg-gray-200 rounded-lg overflow-hidden">
            {/* Placeholder for image */}
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Image will be placed here
            </div>
          </div>

          {/* Get Involved Button */}
          <div className="absolute left-10 bottom-10 md:left-20 md:bottom-20">
            <Link
              href="/join-us"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium transition-all duration-300 ease-in-out"
            >
              <span className="absolute inset-0 w-full h-full border-2 border-white rounded-lg"></span>
              <span className="absolute inset-0 w-full h-full rounded-lg bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative text-white group-hover:text-gray-900 transition-colors duration-300">
                Get Involved
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
