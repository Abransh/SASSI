"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("UPLOADCARE_PUB_KEY", process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || "");
      formData.append("UPLOADCARE_STORE", "1");
      formData.append("file", file);

      // Upload to Uploadcare
      const response = await fetch("https://upload.uploadcare.com/base/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      const fileId = data.file;
      
      // Get the CDN URL
      const cdnUrl = `https://ucarecdn.com/${fileId}/`;
      onChange(cdnUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById("image-upload")?.click()}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Image className="mr-2 h-4 w-4" />
              Upload Image
            </>
          )}
        </Button>
        {value && (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.open(value, "_blank")}
            >
              View Image
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onChange(null)}
              className="text-red-500"
            >
              Remove Image
            </Button>
          </>
        )}
      </div>
      {value && (
        <div className="mt-2">
          <img
            src={value}
            alt="Preview"
            className="max-h-32 rounded-md object-cover"
          />
        </div>
      )}
    </div>
  );
} 