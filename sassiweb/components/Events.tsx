export default function EventsSection() {
    return (
      <section id="events" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Events</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Event Card 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-orange-100"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">XXXXXX</h3>
                <p className="text-gray-600 mb-4">
                  XXXXXX
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                         <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                XXXXXX
              </div>
            </div>
          </div>

          {/* Event Card 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-blue-100"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">XXXXXXX</h3>
              <p className="text-gray-600 mb-4">
                XXXXXXX
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                XXXXXXXX
              </div>
            </div>
          </div>

          {/* Event Card 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-green-100"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">XXXXXXXXX</h3>
              <p className="text-gray-600 mb-4">
                XXXXXXXXX
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                XXXXXXXXXXX
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

