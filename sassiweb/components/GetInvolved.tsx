import Link from "next/link"
import Image from "next/image"

export default function GetInvolvedSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Image container - replace with actual image later */}
          <div className="w-full h-[500px] bg-gray-200 rounded-lg overflow-hidden">
            <Image
                 src="/assests/groupimg.jpg"
                 alt="Group Diwali Image"
                 layout="fill"
                 objectFit="cover"
                 className="rounded-lg"
                 />
                 
          </div>

          {/* Get Involved Button */}
          <div className="absolute right-0 bottom-10 md:right-0 md:bottom-20">
            <Link
              href="/join-us"
              className="group relative inline-flex items-center justify-center px-0 py-0 text-4xl font-medium transition-all duration-300 ease-in-out"
            >
              
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
