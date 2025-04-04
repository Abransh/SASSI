"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import { z } from "zod";

// Validation schema
const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  // Verify token on page load
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError("Password reset token is missing");
        setIsCheckingToken(false);
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify-reset-token?token=${token}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Invalid or expired token");
        }

        setIsValidToken(true);
      } catch (error) {
        console.error("Token verification error:", error);
        setError(error instanceof Error ? error.message : "Invalid or expired token");
      } finally {
        setIsCheckingToken(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate passwords
    try {
      resetPasswordSchema.parse({ password, confirmPassword });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password");
      }

      setIsSuccess(true);
      toast.success("Your password has been reset successfully");
    } catch (error) {
      console.error("Password reset error:", error);
      setError(error instanceof Error ? error.message : "Failed to reset password");
      toast.error(error instanceof Error ? error.message : "Failed to reset password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isCheckingToken ? (
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Verifying reset token...</p>
        </div>
      ) : !isValidToken ? (
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Invalid Reset Link</h1>
          <p className="text-gray-600 mb-6">
            {error || "The password reset link is invalid or has expired."}
          </p>
          <Button
            onClick={() => router.push("/auth/forgot-password")}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Request New Reset Link
          </Button>
        </div>
      ) : !isSuccess ? (
        <>
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold">Set New Password</h1>
            <p className="text-gray-600 mt-2">
              Create a new password for your SASSI account.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                New Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <p className="text-xs text-gray-500">
                Must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
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
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Password Reset Complete</h1>
          <p className="text-gray-600 mb-6">
            Your password has been reset successfully. You can now sign in with your new password.
          </p>
          <Button
            onClick={() => router.push("/auth/signin")}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Sign In
          </Button>
        </div>
      )}
    </>
  );
}

// Main component that wraps the form with Suspense
export default function ResetPassword() {
  return (
    <>
      <Header />
      <MobileMenu />
      <div className="min-h-screen pt-32 pb-20 bg-gray-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <Suspense fallback={
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                <p className="mt-4 text-gray-600">Loading...</p>
              </div>
            }>
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}