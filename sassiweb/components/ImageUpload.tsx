"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import Script from "next/script";
import Image from "next/image";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string | null) => void;
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

declare global {
  interface Window {
    uploadcare: {
      start: (options: { publicKey: string }) => void;
      openDialog: (files: null, options: any) => {
        done: (callback: (file: UploadcareFile) => void) => any;
        fail: (callback: (error: Error) => void) => any;
        always: (callback: () => void) => any;
      };
    };
  }
}

export default function ImageUpload({
  value,
  onChange,
  maxSize = 5 * 1024 * 1024, // 5MB default
  label = "Upload Image",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (isScriptLoaded && typeof window !== 'undefined') {
      window.uploadcare.start({
        publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!
      });
    }
  }, [isScriptLoaded]);

  const handleUpload = () => {
    if (!isScriptLoaded) {
      toast.error("Uploadcare widget is not loaded yet. Please try again.");
      return;
    }

    setIsUploading(true);
    
    const dialog = window.uploadcare.openDialog(null, {
      publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!,
      multiple: false,
      accept: "image/*",
      maxSize,
      previewStep: true,
      crop: "1:1",
      imagesOnly: true,
    });

    dialog.done((file: UploadcareFile) => {
      if (file) {
        const imageUrl = file.cdnUrl;
        console.log("Uploadcare success - Image URL:", imageUrl);
        
        // Some Uploadcare configs return URLs without the protocol
        // Make sure we have a complete URL
        const formattedUrl = imageUrl.startsWith('//') 
          ? `https:${imageUrl}` 
          : imageUrl;
        
        console.log("Formatted URL being passed to parent:", formattedUrl);
        onChange(formattedUrl);
        toast.success("Image uploaded successfully");
      } else {
        console.error("Uploadcare returned no file");
        toast.error("Failed to upload image: No file returned");
      }
    }).fail((error: Error) => {
      console.error("Uploadcare upload failed:", error);
      toast.error("Failed to upload image: " + error.message);
    }).always(() => {
      setIsUploading(false);
    });
  }

  return (
    <>
      <Script
        src="/uploadcare-widget.js"
        onLoad={() => setIsScriptLoaded(true)}
        strategy="lazyOnload"
      />
      <div className="space-y-2">
        <button
          type="button"
          onClick={handleUpload}
          disabled={isUploading || !isScriptLoaded}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? "Uploading..." : label}
        </button>

        {value && (
          <div className="mt-2">
            <div className="relative aspect-square w-full overflow-hidden rounded-md border">
              <Image
                src={value}
                alt="Uploaded image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}