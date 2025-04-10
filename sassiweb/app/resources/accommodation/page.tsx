import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home } from 'lucide-react'

export const metadata: Metadata = {
  title: "Accommodation Guide - Students' Association of Indians in Milan",
  description: "Comprehensive guide to finding accommodation in Milan",
}

export default function AccommodationGuide() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Home className="w-6 h-6 text-orange-500" />
            <CardTitle>Accommodation Guide</CardTitle>
          </div>
          <CardDescription>
            Comprehensive guide to finding accommodation in Milan, including tips on different neighborhoods, 
            rental procedures, and important considerations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose max-w-none">
            <p>
              This guide provides detailed information about finding accommodation in Milan, including:
            </p>
            <ul>
              <li>Popular neighborhoods for students</li>
              <li>Types of accommodation available</li>
              <li>Rental procedures and documentation</li>
              <li>Important considerations and tips</li>
              <li>Average rental prices</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild>
              <a 
                href="/assests/FAQs Accomodation.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                View PDF
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a 
                href="/assests/FAQs Accomodation.pdf" 
                download
                className="w-full sm:w-auto"
              >
                Download PDF
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 