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
              className="font-serif text-5xl md:text-6xl text-yellow-300 hover:text-yellow-200 transition-colors flex items-center"
            >
               Get Involved
               <span className="ml-2 text-4xl md:text-5xl">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
