declare module "uploadcare-widget" {
  export interface UploadcareFile {
    cdnUrl: string;
    name: string;
    size: number;
    isImage: boolean;
    mimeType: string;
  }

  export interface UploadcareOptions {
    publicKey: string;
    multiple?: boolean;
    accept?: string;
    maxSize?: number;
    previewStep?: boolean;
    crop?: boolean;
    imagesOnly?: boolean;
  }

  export interface UploadcareDialog {
    done: (callback: (file: UploadcareFile) => void) => UploadcareDialog;
    fail: (callback: (error: Error) => void) => UploadcareDialog;
    always: (callback: () => void) => UploadcareDialog;
  }

  export interface Uploadcare {
    start: (options: UploadcareOptions) => void;
    openDialog: (files: null, options: UploadcareOptions) => UploadcareDialog;
  }

  const uploadcare: Uploadcare;
  export default uploadcare;
} 