"use client";

import { useState } from "react";
import { Loader2, CheckCircle, Users, Mail, Phone, GraduationCap, Heart } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { z } from "zod";

const UNIVERSITIES = [
  "Politecnico Di Milano",
  "Università degli Studi di Milano",
  "NABA Nuova Accademia di Belle Arti",
  "Domus Academy",
  "Bocconi University/SDA Bocconi School of Management",
  "Humanitas University",
  "IED Istituto Europeo di Design",
  "Istituto Marangoni",
  "POLIMI GSOMI", 
  "Other University"
];

const INTEREST_AREAS = [
  { id: "events", label: "Events & Social Activities", icon: "🎉" },
  { id: "support", label: "Student Support & Mentoring", icon: "🤝" },
  { id: "social-media", label: "Social Media & Content", icon: "📱" },
  { id: "tech", label: "Tech & Website", icon: "💻" },
  { id: "partnerships", label: "Partnerships & Sponsorship", icon: "🤝" },
  { id: "other", label: "Other, Please tell us about it below", icon: "✨" }
];

const recruitSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  whatsappNumber: z.string().min(10, "Valid WhatsApp number is required"),
  university: z.string().min(1, "University selection is required"),
  interests: z.array(z.string()).min(1, "Select at least one area of interest"),
  message: z.string().optional(),
});

type RecruitFormData = z.infer<typeof recruitSchema>;

export default function RecruitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState<RecruitFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    whatsappNumber: "",
    university: "",
    interests: [],
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RecruitFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof RecruitFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleInterestToggle = (interestId: string) => {
    setFormData((prev) => {
      const interests = prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId];
      return { ...prev, interests };
    });

    if (errors.interests) {
      setErrors((prev) => ({ ...prev, interests: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      recruitSchema.parse(formData);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/join/recruit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit application");
      }

      setIsSuccess(true);
      toast.success("Application submitted successfully!");

    } catch (error) {
      console.error("Recruitment error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <MobileMenu />

        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>

                  <h1 className="text-2xl font-bold mb-4">Application Submitted!</h1>

                  <p className="text-gray-600 mb-6">
                    Thank you for your interest in joining SASSI! We've received your application and will review it shortly.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-medium text-blue-800 mb-2">What happens next?</h3>
                    <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                      <li>A confirmation email has been sent to your registered email address.</li>
                      <li>Our team will review your application within 3-5 days.</li>
                      <li>We'll contact you via email or phone with the next steps.</li>
                      <li>If selected, you'll be invited to join our team channels.</li>
                    </ol>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Link
                      href="/"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Return to Home
                    </Link>

                    <Link
                      href="/events"
                      className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                    >
                      Browse Events
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-3">
                Join Our Team
              </div>
              <h1 className="text-4xl font-bold mb-4">Become a SASSI Member</h1>
              <p className="text-lg text-gray-600">
                Help build and support the Indian student community in Milan. Join our team of passionate volunteers!
              </p>
              
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b bg-gradient-to-br from-orange-50 to-yellow-50">
                <h2 className="text-xl font-semibold mb-4">Why Join SASSI?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3 shrink-0">
                      <Users className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">Build Community</h3>
                      <p className="text-xs text-gray-600">Connect with fellow Indian students</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3 shrink-0">
                      <GraduationCap className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">Gain Experience</h3>
                      <p className="text-xs text-gray-600">Develop leadership skills</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3 shrink-0">
                      <Heart className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">Make Impact</h3>
                      <p className="text-xs text-gray-600">Help new students settle in Milan</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      Full Name <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Your full name"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        Email <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phoneNumber" className="text-sm font-medium flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        Phone Number <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-md ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`}
                        placeholder="+39 123 456 7890"
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="whatsappNumber" className="text-sm font-medium flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      WhatsApp Number <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id="whatsappNumber"
                      name="whatsappNumber"
                      type="tel"
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md ${errors.whatsappNumber ? "border-red-500" : "border-gray-300"}`}
                      placeholder="+39 123 456 7890"
                    />
                    {errors.whatsappNumber && (
                      <p className="text-red-500 text-xs mt-1">{errors.whatsappNumber}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="university" className="text-sm font-medium flex items-center">
                      <GraduationCap className="h-4 w-4 mr-2 text-gray-500" />
                      University/Institution <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md ${errors.university ? "border-red-500" : "border-gray-300"}`}
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
                    <label className="text-sm font-medium block mb-3">
                      What areas interest you? <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {INTEREST_AREAS.map((area) => (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => handleInterestToggle(area.id)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            formData.interests.includes(area.id)
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-200 hover:border-orange-300"
                          }`}
                        >
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{area.icon}</span>
                            <span className="text-sm font-medium">{area.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    {errors.interests && (
                      <p className="text-red-500 text-xs mt-1">{errors.interests}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium block">
                      Tell us why you want to join (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Share your motivation, skills, or any relevant experience..."
                      rows={4}
                    />
                    <p className="text-xs text-gray-500">
                      This helps us understand your interests better
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center justify-center font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </form>

              <div className="p-6 border-t bg-gray-50 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
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
