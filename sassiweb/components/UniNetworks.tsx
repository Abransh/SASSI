import Link from "next/link"
//import Image from "next/image"

export default function UniNetworks() {
  return (
    <section id="uni-networks" className="py-20 relative">
      {/* Background image with Milan skyline outline */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
      {/* <Image
                 src="/assests/milan.png"
                 alt="Milan"
                 layout="fill"
                 objectFit="cover"
                 className="rounded-lg"
                 /> */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">OUR UNIVERSITY NETWORKS</h2>
          <h3 className="text-2xl mb-6">Find Tailored Support</h3>
          <p className="max-w-4xl mx-auto text-lg text-gray-700">
          We collaborate with student networks at top universities to connect you with the right guidance and support for your journey.
          </p> 
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          {/*ISA POLIMI HERE */}
          <div className="flex flex-col items-center">
            <Link
              href=" https://www.instagram.com/isa.polimi/"//add insta here
              className="mb-4 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              ISA POLIMI
            </Link>
            <p className="text-center text-gray-700">Indian Students Association</p>
            <p className="text-center text-gray-700">Politecnico di Milano</p>
          </div>

          {/* ISA DNA */}
          <div className="flex flex-col items-center">
            <Link
              href="https://www.instagram.com/isa.dna.milan/" //add insta here
              className="mb-4 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              ISA DNA
            </Link>
            <p className="text-center text-gray-700">Indian Students Association.</p>
            <p className="text-center text-gray-700">Domus Academy & NABA</p>
          </div>
        </div>
      </div>
    </section>
  )
}
