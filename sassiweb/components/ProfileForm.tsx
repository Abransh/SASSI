"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type ProfileFormProps = {
  initialData: any; // User data with profile
};

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    university: initialData.university || "",
    course: initialData.course || "",
    graduationYear: initialData.graduationYear || "",
    bio: initialData.bio || "",
    phoneNumber: initialData.phoneNumber || "",
    city: initialData.city || "", // City in India
    linkedinUrl: initialData.linkedinUrl || "",
    isProfilePublic: initialData.isProfilePublic || true,
    
    // Profile specific fields
    universityInIndia: initialData.profile?.universityInIndia || "",
    degreeInIndia: initialData.profile?.degreeInIndia || "",
    yearOfArrival: initialData.profile?.yearOfArrival || "",
    residenceArea: initialData.profile?.residenceArea || "",
    interests: initialData.profile?.interests || "",
    skills: initialData.profile?.skills || "",
    showEmail: initialData.profile?.showEmail || false,
    showPhone: initialData.profile?.showPhone || false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update profile");
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b pb-6">
        <h2 className="text-xl font-bold mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="university" className="text-sm font-medium">
              University in Milan
            </label>
            <Input
              id="university"
              name="university"
              value={formData.university}
              onChange={handleChange}
              placeholder="e.g., Politecnico di Milano"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="course" className="text-sm font-medium">
              Course/Program
            </label>
            <Input
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g., MSc Computer Engineering"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="graduationYear" className="text-sm font-medium">
              Expected Graduation Year
            </label>
            <Input
              id="graduationYear"
              name="graduationYear"
              type="number"
              value={formData.graduationYear}
              onChange={handleChange}
              placeholder="e.g., 2025"
              min="2020"
              max="2030"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="bio" className="text-sm font-medium">
              Bio
            </label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="A brief introduction about yourself"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="border-b pb-6">
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-medium">
              Phone Number
            </label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Your phone number with country code"
            />
            <div className="flex items-center space-x-2 pt-1">
              <Switch
                id="showPhone"
                checked={formData.showPhone}
                onCheckedChange={(checked) =>
                  handleSwitchChange("showPhone", checked)
                }
              />
              <label htmlFor="showPhone" className="text-sm text-gray-600">
                Make phone number visible to other members
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="linkedinUrl" className="text-sm font-medium">
              LinkedIn Profile (Optional)
            </label>
            <Input
              id="linkedinUrl"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/yourusername"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="city" className="text-sm font-medium">
              City in India
            </label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Your hometown in India"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email Visibility</label>
            <div className="flex items-center space-x-2 h-10">
              <Switch
                id="showEmail"
                checked={formData.showEmail}
                onCheckedChange={(checked) =>
                  handleSwitchChange("showEmail", checked)
                }
              />
              <label htmlFor="showEmail" className="text-sm text-gray-600">
                Make email visible to other members
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b pb-6">
        <h2 className="text-xl font-bold mb-4">Background Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="universityInIndia" className="text-sm font-medium">
              University in India
            </label>
            <Input
              id="universityInIndia"
              name="universityInIndia"
              value={formData.universityInIndia}
              onChange={handleChange}
              placeholder="Your previous university in India"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="degreeInIndia" className="text-sm font-medium">
              Degree in India
            </label>
            <Input
              id="degreeInIndia"
              name="degreeInIndia"
              value={formData.degreeInIndia}
              onChange={handleChange}
              placeholder="Your previous degree in India"
            />
          </div>
        </div>
      </div>

      <div className="border-b pb-6">
        <h2 className="text-xl font-bold mb-4">Milan Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="yearOfArrival" className="text-sm font-medium">
              Year of Arrival in Milan
            </label>
            <Input
              id="yearOfArrival"
              name="yearOfArrival"
              type="number"
              value={formData.yearOfArrival}
              onChange={handleChange}
              placeholder="e.g., 2023"
              min="2010"
              max={new Date().getFullYear()}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="residenceArea" className="text-sm font-medium">
              Area of Residence in Milan
            </label>
            <Input
              id="residenceArea"
              name="residenceArea"
              value={formData.residenceArea}
              onChange={handleChange}
              placeholder="e.g., Città Studi, Navigli, etc."
            />
          </div>
        </div>
      </div>

      <div className="border-b pb-6">
        <h2 className="text-xl font-bold mb-4">Interests & Skills</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="interests" className="text-sm font-medium">
              Interests & Hobbies
            </label>
            <Textarea
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="Share your interests and hobbies"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="skills" className="text-sm font-medium">
              Skills
            </label>
            <Textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="List your professional skills"
              rows={2}
            />
          </div>
        </div>
      </div>

      <div className="pb-4">
        <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>
        <div className="flex items-center space-x-2">
          <Switch
            id="isProfilePublic"
            checked={formData.isProfilePublic}
            onCheckedChange={(checked) =>
              handleSwitchChange("isProfilePublic", checked)
            }
          />
          <label htmlFor="isProfilePublic" className="text-sm font-medium">
            Make profile visible in member directory
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          When disabled, only your name will be visible to other members
        </p>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}