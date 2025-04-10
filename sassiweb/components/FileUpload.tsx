"use client";

import { useEffect, useRef } from 'react'
import { toast } from 'react-hot-toast'
import Script from 'next/script'

interface FileUploadProps {
  onChange: (url: string) => void
  value?: string
  accept?: string
  label?: string
}

interface UploadcareFile {
  cdnUrl: string
  name: string
  size: number
  isImage: boolean
  mimeType: string
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
    uploadcare: UploadcareWidget
  }
}

export default function FileUpload({ onChange, value, accept, label = 'Upload File' }: FileUploadProps) {
  const widgetRef = useRef<UploadcareWidget | null>(null)

  useEffect(() => {
    const initializeWidget = () => {
      if (typeof window !== 'undefined' && window.uploadcare) {
        window.uploadcare.start({
          publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || ''
        })
        widgetRef.current = window.uploadcare
      }
    }

    if (typeof window !== 'undefined') {
      initializeWidget()
    }

    return () => {
      if (widgetRef.current) {
        widgetRef.current.openDialog(null, {}).always(() => {
          // Cleanup
        })
      }
    }
  }, [])

  const handleUpload = () => {
    if (!widgetRef.current) {
      toast.error('Uploadcare widget is not loaded yet')
      return
    }

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
      if (file && file.cdnUrl) {
        onChange(file.cdnUrl)
        toast.success('File uploaded successfully')
      } else {
        toast.error('Failed to upload file')
      }
    }).fail(() => {
      toast.error('Failed to upload file')
    })
  }

  return (
    <div className="w-full">
      <Script
        src="https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== 'undefined') {
            window.uploadcare.start({
              publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || ''
            })
            widgetRef.current = window.uploadcare
          }
        }}
      />
      <button
        type="button"
        onClick={handleUpload}
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {label}
      </button>
      {value && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">Current file: {value}</p>
        </div>
      )}
    </div>
  )
} 