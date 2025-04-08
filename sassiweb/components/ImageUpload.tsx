"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import uploadcare from "uploadcare-widget";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
  accept?: string;
  maxSize?: number;
  label?: string;
}

interface UploadcareFile {
  cdnUrl: string;
  name: string;
  size: number;
  isImage: boolean;
  mimeType: string;
}

export default function ImageUpload({
  value,
  onChange,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  label = "Upload Image",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Initialize Uploadcare widget
    if (typeof window !== 'undefined') {
      uploadcare.start({
        publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!
      });
    }
  }, []);

  const handleUpload = () => {
    setIsUploading(true);
    
    const dialog = uploadcare.openDialog(null, {
      publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!,
      multiple: false,
      accept,
      maxSize,
      previewStep: true,
      crop: true, // Changed from "1:1" to true
      imagesOnly: true,
    });

    dialog.done((file: UploadcareFile) => {
      if (file) {
        const fileUrl = file.cdnUrl;
        onChange(fileUrl);
        toast.success("Image uploaded successfully");
      }
    }).fail((error: Error) => {
      console.error("Upload error:", error);
      toast.error("Failed to upload image. Please try again.");
    }).always(() => {
      setIsUploading(false);
    });
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleUpload}
        disabled={isUploading}
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? "Uploading..." : label}
      </button>

      {value && (
        <div className="mt-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-md">
            <img
              src={value}
              alt="Uploaded image"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
} 