"use client";

import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import Script from 'next/script'

interface FileUploadProps {
  onChange: (url: string) => void
  value?: string
  accept?: string
  label?: string
}

interface UploadcareFile {
  cdnUrl: string;
  done: (callback: (fileInfo: UploadcareFileInfo) => void) => {
    fail: (callback: (error: Error) => void) => void;
  };
  fail: (callback: (error: Error) => void) => void;
}

interface UploadcareFileInfo {
  cdnUrl: string;
  originalUrl: string;
  name: string;
  size: number;
  mimeType: string;
}

interface UploadcareDialog {
  done: (callback: (file: UploadcareFile) => void) => any
  fail: (callback: (error: Error) => void) => any
  always: (callback: () => void) => any
}

interface UploadcareWidget {
  start: (options: { publicKey: string }) => void
  openDialog: (files: null, options: any) => UploadcareDialog
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

export default function FileUpload({ onChange, value, accept, label = 'Upload File' }: FileUploadProps) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const widgetRef = useRef<UploadcareWidget | null>(null)

  const initializeWidget = () => {
    if (typeof window !== 'undefined' && window.uploadcare) {
      window.uploadcare.start({
        publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || ''
      })
      widgetRef.current = window.uploadcare
      setIsScriptLoaded(true)
    }
  }

  const handleUpload = () => {
    if (!isScriptLoaded || !widgetRef.current) {
      console.error('Uploadcare widget not loaded:', { isScriptLoaded, widgetRef: !!widgetRef.current });
      toast.error('Uploadcare widget is not loaded yet. Please try again in a moment.')
      return
    }

    console.log('Initializing upload dialog with key:', process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY);

    const dialog = widgetRef.current.openDialog(null, {
      publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || '',
      multiple: false,
      previewStep: true,
      tabs: 'file url',
      inputAcceptTypes: accept || '*',
      systemDialog: true,
      validators: [
        (fileInfo: any) => {
          if (fileInfo.size > 10 * 1024 * 1024) {
            return new Error('File size should not exceed 10MB')
          }
          return null
        }
      ]
    })

    dialog.done((file: UploadcareFile) => {
      console.log('File uploaded successfully:', file);
      if (file) {
        file.done((fileInfo: UploadcareFileInfo) => {
          const url = fileInfo.cdnUrl || fileInfo.originalUrl;
          if (url) {
            onChange(url);
            toast.success('File uploaded successfully');
          } else {
            console.error('File upload failed: No URL returned');
            toast.error('Failed to upload file: No URL returned');
          }
        }).fail((error: Error) => {
          console.error('Error getting file info:', error);
          toast.error(`Failed to upload file: ${error.message || 'Unknown error'}`);
        });
      } else {
        console.error('File upload failed: No file returned');
        toast.error('Failed to upload file: No file returned');
      }
    }).fail((error: Error) => {
      console.error('File upload failed:', error);
      toast.error(`Failed to upload file: ${error.message || 'Unknown error'}`);
    });
  }

  return (
    <div className="w-full">
      <Script
        src="https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js"
        strategy="beforeInteractive"
        onLoad={initializeWidget}
      />
      <button
        type="button"
        onClick={handleUpload}
        disabled={!isScriptLoaded}
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {!isScriptLoaded ? 'Loading upload widget...' : label}
      </button>
      {value && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">Current file: {value}</p>
        </div>
      )}
    </div>
  )
} 