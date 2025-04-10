import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: "Dichiarazione Sostitutiva Guide - Students' Association of Indians in Milan",
  description: "Template and instructions for the Declaration of Domicile required for residency",
}

export default function DichiarazioneGuide() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Dichiarazione Sostitutiva di Atto di Notorietà</CardTitle>
          <CardDescription>
            Template and instructions for the Declaration of Domicile (Dichiarazione Sostitutiva di Atto di Notorietà) required for residency.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose max-w-none">
            <p>
              This guide provides the template and instructions for completing the Declaration of Domicile, including:
            </p>
            <ul>
              <li>Complete template in Italian</li>
              <li>Step-by-step filling instructions</li>
              <li>Required supporting documents</li>
              <li>Where to submit the declaration</li>
              <li>Important notes and common mistakes</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild>
              <a 
                href="/assets/dichiarazione-sostitutiva-guide.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                View PDF
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a 
                href="/assets/dichiarazione-sostitutiva-guide.pdf" 
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