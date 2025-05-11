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
    console.log("ImageUpload component mounted");
    console.log("Initial state:", {
      isScriptLoaded,
      isUploading,
      hasPublicKey: !!process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY
    });

    // Load the script manually if it's not already loaded
    if (typeof window !== 'undefined' && !window.uploadcare) {
      console.log("Manually loading Uploadcare script...");
      const script = document.createElement('script');
      script.src = '/uploadcare-widget.js';
      script.async = true;
      script.onload = () => {
        console.log("Uploadcare script loaded manually");
        // Wait a bit to ensure the script is fully initialized
        setTimeout(() => {
          setIsScriptLoaded(true);
        }, 100);
      };
      script.onerror = (error) => {
        console.error("Error loading Uploadcare script manually:", error);
        toast.error("Failed to load image upload functionality");
      };
      document.head.appendChild(script);

      // Cleanup function
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (isScriptLoaded && typeof window !== 'undefined') {
      const publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY;
      console.log("Checking Uploadcare configuration:");
      console.log("- Script loaded:", isScriptLoaded);
      console.log("- Public key available:", !!publicKey);
      console.log("- Window object available:", typeof window !== 'undefined');
      console.log("- Uploadcare object available:", typeof window !== 'undefined' && !!window.uploadcare);

      if (!publicKey) {
        console.error("Uploadcare public key is not configured");
        toast.error("Image upload is not configured properly");
        return;
      }

      try {
        if (window.uploadcare) {
          window.uploadcare.start({
            publicKey: publicKey
          });
          console.log("Uploadcare initialized successfully");
        } else {
          console.error("Uploadcare object not found in window");
          toast.error("Image upload is not available");
        }
      } catch (error) {
        console.error("Error initializing Uploadcare:", error);
        toast.error("Failed to initialize image upload");
      }
    }
  }, [isScriptLoaded]);

  const handleUpload = () => {
    console.log("Upload button clicked");
    console.log("Script loaded status:", isScriptLoaded);
    console.log("Uploadcare available:", typeof window !== 'undefined' && !!window.uploadcare);
    console.log("Public key available:", !!process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY);
    
    if (!isScriptLoaded) {
      console.error("Uploadcare script not loaded");
      toast.error("Uploadcare widget is not loaded yet. Please try again.");
      return;
    }

    if (!process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY) {
      console.error("Uploadcare public key not configured");
      toast.error("Image upload is not configured properly");
      return;
    }

    if (typeof window === 'undefined' || !window.uploadcare) {
      console.error("Uploadcare not available in window object");
      toast.error("Image upload is not available. Please refresh the page.");
      return;
    }

    setIsUploading(true);
    
    try {
      const dialog = window.uploadcare.openDialog(null, {
        publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY,
        multiple: false,
        accept: "image/*",
        maxSize,
        previewStep: true,
        crop: "1:1",
        imagesOnly: true,
      });

      console.log("Uploadcare dialog opened");

      dialog.done((file: UploadcareFile) => {
        console.log("Uploadcare upload completed");
        if (file) {
          const imageUrl = file.cdnUrl;
          console.log("Uploadcare success - Raw Image URL:", imageUrl);
          console.log("Uploadcare file object:", file);
          
          // Some Uploadcare configs return URLs without the protocol
          // Make sure we have a complete URL
          const formattedUrl = imageUrl.startsWith('//') 
            ? `https:${imageUrl}` 
            : imageUrl;
          
          console.log("Formatted URL being passed to parent:", formattedUrl);
          console.log("Calling onChange with URL:", formattedUrl);
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
        console.log("Uploadcare upload process completed");
        setIsUploading(false);
      });
    } catch (error) {
      console.error("Error opening Uploadcare dialog:", error);
      toast.error("Failed to open image upload dialog");
      setIsUploading(false);
    }
  }

  return (
    <>
      <div className="space-y-2">
        <button
          type="button"
          onClick={handleUpload}
          disabled={isUploading || !isScriptLoaded || !process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? "Uploading..." : label}
          {!isScriptLoaded && " (Loading...)"}
          {!process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY && " (No API Key)"}
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