import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: "Reduced ATM Mobility Pass Guide - Students' Association of Indians in Milan",
  description: "Information about the reduced fare ATM public transport pass for students",
}

export default function ATMMobilityPassGuide() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Reduced ATM Mobility Pass Guide</CardTitle>
          <CardDescription>
            Information about the reduced fare ATM public transport pass for students, including eligibility and application process.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose max-w-none">
            <p>
              This guide provides detailed information about obtaining the reduced fare ATM public transport pass, including:
            </p>
            <ul>
              <li>Eligibility requirements</li>
              <li>Required documents</li>
              <li>Application process</li>
              <li>Cost and validity period</li>
              <li>Where to apply</li>
              <li>How to use the pass</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild>
              <a 
                href="/assests/ATM subscription reduced rate.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                View PDF
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a 
                href="/assests/ATM subscription reduced rate.pdf" 
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