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
                <h3 className="text-xl font-bold mb-2">Diwali Celebration</h3>
                <p className="text-gray-600 mb-4">
                  Join us for a vibrant celebration of the festival of lights with music, dance, and authentic Indian
                  cuisine.
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