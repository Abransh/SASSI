"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import { z } from "zod";

// Validation schema
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate email
    try {
      emailSchema.parse({ email });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process request");
      }

      setIsSuccess(true);
      toast.success("Password reset instructions sent to your email");
    } catch (error) {
      console.error("Password reset request error:", error);
      setError(error instanceof Error ? error.message : "Failed to send reset instructions");
      toast.error(error instanceof Error ? error.message : "Failed to send reset instructions");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <MobileMenu />

      <div className="min-h-screen pt-32 pb-20 bg-gray-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            {!isSuccess ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-orange-600" />
                  </div>
                  <h1 className="text-2xl font-bold">Reset Your Password</h1>
                  <p className="text-gray-600 mt-2">
                    Enter your email address and we'll send you instructions to reset your password.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    <p>{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Instructions"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Remember your password?{" "}
                    <Link
                      href="/auth/signin"
                      className="text-orange-600 hover:text-orange-800 font-medium"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
                <p className="text-gray-600 mb-6">
                  We've sent password reset instructions to <strong>{email}</strong>. Please check your email and follow the instructions to reset your password.
                </p>
                <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-md mb-6">
                  <p>If you don't receive an email within a few minutes, please check your spam folder or try again.</p>
                </div>
                <Button
                  onClick={() => router.push("/auth/signin")}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Return to Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}