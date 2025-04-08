"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import Script from "next/script";

interface FileUploadProps {
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

interface UploadcareDialog {
  done: (callback: (file: UploadcareFile) => void) => any;
  fail: (callback: (error: Error) => void) => any;
  always: (callback: () => void) => any;
}

interface UploadcareWidget {
  start: (options: { publicKey: string }) => void;
  openDialog: (files: null, options: any) => UploadcareDialog;
}

declare global {
  interface Window {
    uploadcare: UploadcareWidget;
  }
}

export default function FileUpload({
  value,
  onChange,
  accept = ".pdf,.doc,.docx,.txt",
  maxSize = 10 * 1024 * 1024, // 10MB default
  label = "Upload File",
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const widgetRef = useRef<UploadcareWidget | null>(null);

  useEffect(() => {
    if (isScriptLoaded && typeof window !== 'undefined') {
      window.uploadcare.start({
        publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!
      });
      widgetRef.current = window.uploadcare;
    }
  }, [isScriptLoaded]);

  const handleUpload = () => {
    if (!isScriptLoaded) {
      toast.error("Uploadcare widget is not loaded yet. Please try again.");
      return;
    }

    if (!widgetRef.current) return;

    setIsUploading(true);
    
    const dialog = widgetRef.current.openDialog(null, {
      publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!,
      multiple: false,
      accept,
      maxSize,
      previewStep: true,
      crop: false,
      imagesOnly: false,
    });
    
    dialog.done((file: UploadcareFile) => {
      if (!file || typeof file !== 'object') {
        console.error('Invalid file object received:', file);
        toast.error('Failed to upload file. Please try again.');
        setIsUploading(false);
        return;
      }

      // Get the file URL from the file object
      const fileUrl = file.cdnUrl;
      if (!fileUrl) {
        console.error('No file URL found in file object:', file);
        toast.error('Failed to get file URL. Please try again.');
        setIsUploading(false);
        return;
      }

      onChange(fileUrl);
      toast.success('File uploaded successfully!');
      setIsUploading(false);
    }).fail((error: Error) => {
      console.error('Upload error:', error);
      toast.error('Failed to upload file. Please try again.');
      setIsUploading(false);
    }).always(() => {
      setIsUploading(false);
    });
  };

  const isPDF = value?.match(/\.pdf$/i);
  const isDoc = value?.match(/\.(doc|docx)$/i);
  const isTxt = value?.match(/\.txt$/i);

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
            <div className="flex items-center space-x-2 p-2 border rounded-md bg-gray-50">
              {isPDF ? (
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              ) : isDoc ? (
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              )}
              <span className="text-sm text-gray-600">
                {isPDF ? "PDF Document" : isDoc ? "Word Document" : isTxt ? "Text File" : "Document"}
              </span>
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-sm text-indigo-600 hover:text-indigo-500"
              >
                View File
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 