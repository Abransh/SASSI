"use client";

import { useState, useEffect, useRef } from "react";
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
  maxSize = 5 * 1024 * 1024,
  label = "Upload Image",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const initAttemptedRef = useRef(false);

  // Add this function to explicitly initialize uploadcare
  const initializeWidget = () => {
    if (typeof window !== 'undefined' && window.uploadcare) {
      window.uploadcare.start({
        publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || ''
      });
      setIsScriptLoaded(true);
    }
  };

  useEffect(() => {
    // Try to initialize immediately if script is already in the page
    if (!isScriptLoaded && !initAttemptedRef.current) {
      initAttemptedRef.current = true;
      initializeWidget();
      
      // Set a backup timeout to check again after a short delay
      const timer = setTimeout(() => {
        initializeWidget();
        
        // If still not loaded, force enable the button
        if (!isScriptLoaded && typeof window !== 'undefined' && window.uploadcare) {
          setIsScriptLoaded(true);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isScriptLoaded]);


  const handleUpload = () => {
    // REPLACE THE EXISTING handleUpload WITH THIS ENHANCED VERSION
    if (!isScriptLoaded) {
      console.error("Uploadcare widget not loaded yet. Trying to initialize...");

      // This is the new fallback code to add
      if (typeof window !== 'undefined' && window.uploadcare) {
        window.uploadcare.start({
          publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!
        });
        setIsScriptLoaded(true);
        toast.info("Uploadcare initialized. Please try again.");
      } else {
        toast.error("Uploadcare widget is not available. Please refresh the page.");
      }
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
        onChange(imageUrl);
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
    <>
      <Script
        src="https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js"
        onLoad={() => setIsScriptLoaded(true)}
        strategy="beforeInteractive"
      />
      <div className="space-y-2">
      {!isScriptLoaded && (
        <div className="text-xs text-gray-500 mb-2">
          Upload widget is loading... 
          <button 
            type="button"
            onClick={initializeWidget}
            className="text-blue-500 underline ml-1"
          >
            Click here if button remains disabled
          </button>
        </div>
      )}
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