"use client"; 

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQItem {
    question: string
    answer: string
  }
  
  interface SubCategory {
    title: string
    faqs: FAQItem[]
  }
  
  interface FAQSectionProps {
    title?: string
    faqs?: FAQItem[]
    subCategories?: SubCategory[]
  }
  

  export default function FAQSection({ title, faqs, subCategories }: 
    FAQSectionProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
  
        {faqs && (
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
  
        {subCategories && (
          <div className="space-y-6">
            {subCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="font-semibold text-lg mb-3">{category.title}</h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`${categoryIndex}-item-${faqIndex}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </div>

        
    )

}