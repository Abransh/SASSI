"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { z } from "zod"
import { Loader2, Send, Mail, User, MessageSquare, CheckCircle } from "lucide-react"

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [formTouched, setFormTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Mark field as touched
    setFormTouched(prev => ({ ...prev, [name]: true }))
    
    // Clear error when field is edited
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    try {
      contactFormSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    // Validate only the current field
    try {
      const fieldSchema = contactFormSchema.shape[name as keyof ContactFormData]
      fieldSchema.parse(formData[name as keyof ContactFormData])
      setErrors(prev => ({ ...prev, [name]: undefined }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ 
          ...prev, 
          [name]: error.errors[0]?.message || `Invalid ${name}` 
        }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key as keyof ContactFormData] = true
      return acc
    }, {} as Record<keyof ContactFormData, boolean>)
    setFormTouched(allTouched)
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }
    
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Something went wrong. Please try again.")
      }

      // Show success state
      setIsSuccess(true)
      toast.success("Message sent! We'll get back to you as soon as possible.")
      
      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        setFormTouched({})
        setIsSuccess(false)
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error(error instanceof Error ? error.message : "Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-us" className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute left-0 top-1/3 w-64 h-64 bg-orange-100 rounded-full opacity-70 blur-3xl"></div>
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-yellow-100 rounded-full opacity-70 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Form Info */}
            <div className="space-y-8">
              <div>
                <div className="inline-block px-4 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-3">
                  Get In Touch
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h2>
                <p className="text-lg text-gray-600">
                  Have questions about SASSI or want to get involved? We'd love to hear from you! 
                  Fill out the form and our team will get back to you as soon as possible.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4 shrink-0">
                    <Mail className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                    <p className="text-gray-600 mb-1">For general inquiries:</p>
                    <a href="mailto:support@sassimilan.com" className="text-orange-600 hover:underline">
                      support@sassimilan.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4 shrink-0">
                    <User className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Follow Us</h3>
                    <p className="text-gray-600 mb-1">Stay connected:</p>
                    <a 
                      href="https://www.instagram.com/sassi.milan/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:underline"
                    >
                      @sassi.milan
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4 shrink-0">
                    <MessageSquare className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Response Time</h3>
                    <p className="text-gray-600">
                      We aim to respond to all inquiries within 24-48 hours during weekdays.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative z-10 transition-all duration-300 hover:shadow-xl">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. We've received your message and will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 font-medium transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        Name <span className="text-red-500 ml-1">*</span>
                      </label>
                      <Input 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Your name" 
                        className={`w-full transition-all duration-300 ${
                          errors.name && formTouched.name ? "border-red-500 bg-red-50" : 
                          formTouched.name ? "border-green-500" : ""
                        }`}
                      />
                      {errors.name && formTouched.name && (
                        <p className="text-red-500 text-xs mt-1 animate-in fade-in-50">{errors.name}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        Email <span className="text-red-500 ml-1">*</span>
                      </label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Your email" 
                        className={`w-full transition-all duration-300 ${
                          errors.email && formTouched.email ? "border-red-500 bg-red-50" : 
                          formTouched.email ? "border-green-500" : ""
                        }`}
                      />
                      {errors.email && formTouched.email && (
                        <p className="text-red-500 text-xs mt-1 animate-in fade-in-50">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                      Subject <span className="text-red-500 ml-1">*</span>
                    </label>
                    <Input 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="What is this regarding?" 
                      className={`w-full transition-all duration-300 ${
                        errors.subject && formTouched.subject ? "border-red-500 bg-red-50" : 
                        formTouched.subject ? "border-green-500" : ""
                      }`}
                    />
                    {errors.subject && formTouched.subject && (
                      <p className="text-red-500 text-xs mt-1 animate-in fade-in-50">{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                      Message <span className="text-red-500 ml-1">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your message"
                      className={`min-h-[150px] w-full transition-all duration-300 ${
                        errors.message && formTouched.message ? "border-red-500 bg-red-50" : 
                        formTouched.message ? "border-green-500" : ""
                      }`}
                    />
                    {errors.message && formTouched.message && (
                      <p className="text-red-500 text-xs mt-1 animate-in fade-in-50">{errors.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-orange-600 hover:bg-orange-700 transition-colors group relative overflow-hidden" 
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          Send Message
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-orange-700 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}