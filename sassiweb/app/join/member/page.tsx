"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { z } from "zod";

const memberSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  isStudent: z.boolean(),
  university: z.string().min(1, "University selection is required"),
  codiceFiscale: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type MemberFormData = z.infer<typeof memberSchema>;

const UNIVERSITIES = [
  "Politecnico Di Milano",
  "Università degli Studi di Milano",
  "NABA Nuova Accademia di Belle Arti",
  "Domus Academy",
  "Bocconi University/SDA Bocconi School of Management",
  "Humanitas University",
  "IED Istituto Europeo di Design",
  "Istituto Marangoni",
  "POLIMI GSOMI"
];

export default function MemberRegistrationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<MemberFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isStudent: true,
    university: "",
    codiceFiscale: "",
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof MemberFormData, string>>>({});

  const validateStep = (step: number): boolean => {
    try {
      if (step === 1) {
        const { firstName, lastName, email, isStudent } = formData;
        z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Invalid email address"),
          isStudent: z.boolean(),
        }).parse({ firstName, lastName, email, isStudent });
      } else if (step === 2) {
        const { password, confirmPassword } = formData;
        z.object({
          password: z.string().min(8, "Password must be at least 8 characters"),
          confirmPassword: z.string(),
        })
        .refine(data => data.password === data.confirmPassword, {
          message: "Passwords do not match",
          path: ["confirmPassword"],
        })
        .parse({ password, confirmPassword });
      } else if (step === 3) {
        const { university } = formData;
        z.object({
          university: z.string().min(1, "University selection is required"),
        }).parse({ university });
      }
      
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    let updatedValue: any = value;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      updatedValue = target.checked;
    }
    
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
    
    // Clear error when field is edited
    if (errors[name as keyof MemberFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Send the registration data to the API
      const response = await fetch("/api/join/member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to register");
      }
      
      const data = await response.json();
      
      // Show success message
      toast.success("Registration submitted successfully!");
      
      // Redirect to payment page
      window.location.href = data.redirectUrl || "https://revolut.me/harshnj";
      
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Different content based on the current step
  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Step 1: Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name*
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name*
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Student Status*</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isStudent"
                    checked={formData.isStudent}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4"
                  />
                  <span>I am currently a student</span>
                </label>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Step 2: Create Password</h2>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password*
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password*
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
              <p>Your password must be at least 8 characters long and should include a mix of letters, numbers, and special characters for security.</p>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Step 3: University Information</h2>
            
            <div className="space-y-2">
              <label htmlFor="university" className="text-sm font-medium">
                University/Institution*
              </label>
              <select
                id="university"
                name="university"
                value={formData.university}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.university ? "border-red-500" : "border-gray-300"}`}
                required
              >
                <option value="">Select your university</option>
                {UNIVERSITIES.map((uni) => (
                  <option key={uni} value={uni}>
                    {uni}
                  </option>
                ))}
              </select>
              {errors.university && (
                <p className="text-red-500 text-xs mt-1">{errors.university}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="codiceFiscale" className="text-sm font-medium">
                Codice Fiscale / PAN Card (Optional)
              </label>
              <input
                id="codiceFiscale"
                name="codiceFiscale"
                type="text"
                value={formData.codiceFiscale}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <p className="text-xs text-gray-500">
                This information helps us verify your identity. It&apos;s optional but recommended.
              </p>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Step 4: Membership Fee</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-lg mb-2">SASSI Membership Benefits:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Access to all SASSI events and activities</li>
                <li>Exclusive resources for living and studying in Milan</li>
                <li>Community support network for Indian students</li>
                <li>Networking opportunities with fellow students and professionals</li>
                <li>Discounts with our partner businesses and services</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-medium text-lg mb-2">Annual Membership Fee:</h3>
              <p className="text-gray-700">
                The annual membership fee is <span className="font-bold">€5.00</span>. After clicking &quot;Proceed to Payment&quot;, you&apos;ll be redirected to our secure payment page.
              </p>
            </div>
            
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
              <p>
                <strong>Note:</strong> Upon completing payment, your membership will be activated and you&apos;ll gain immediate access to all member benefits.
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h1 className="text-2xl font-bold mb-1">Join SASSI as a Member</h1>
                <p className="text-gray-600">
                  Complete the registration to become part of our community.
                </p>
              </div>
              
              {/* Progress steps */}
              <div className="px-6 py-4 bg-gray-50">
                <div className="flex justify-between">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
                        ${currentStep >= step 
                          ? "bg-orange-600 text-white" 
                          : "bg-gray-200 text-gray-600"}`}
                      >
                        {step}
                      </div>
                      <div className="text-xs text-gray-500">
                        {step === 1 && "Basic Info"}
                        {step === 2 && "Password"}
                        {step === 3 && "Details"}
                        {step === 4 && "Payment"}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 h-1 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-orange-600 rounded-full transition-all"
                    style={{ width: `${(currentStep - 1) * 33.33}%` }}
                  ></div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                {renderStepContent()}
                
                <div className="flex justify-between mt-8">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                      disabled={isSubmitting}
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Proceed to Payment"
                      )}
                    </button>
                  )}
                </div>
              </form>
              
              <div className="p-6 border-t bg-gray-50 text-center">
                <p className="text-sm text-gray-600">
                  Already a member?{" "}
                  <Link href="/auth/signin" className="text-orange-600 hover:text-orange-800 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}