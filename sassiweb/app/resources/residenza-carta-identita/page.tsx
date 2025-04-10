import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: "Residenza and Carta d'Identità Guide - Students' Association of Indians in Milan",
  description: "Step-by-step guide to obtaining your residence permit and Italian ID card",
}

export default function ResidenzaGuide() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Residenza and Carta d'Identità Guide</CardTitle>
          <CardDescription>
            Step-by-step guide to obtaining your residence permit (Residenza) and Italian ID card (Carta d'Identità).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose max-w-none">
            <p>
              This guide provides detailed information about the process of obtaining your residence permit and Italian ID card, including:
            </p>
            <ul>
              <li>Required documents and forms</li>
              <li>Step-by-step application process</li>
              <li>Appointment scheduling</li>
              <li>Common issues and solutions</li>
              <li>Important deadlines and timelines</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild>
              <a 
                href="/assests/FAQ- Residenza and Carta d'identita.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                View PDF
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a 
                href="/assests/FAQ- Residenza and Carta d'identita.pdf" 
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