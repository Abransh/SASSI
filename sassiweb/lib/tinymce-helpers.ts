// Example implementation of a Cloudinary image handler for TinyMCE
// You can place this in a separate file like lib/tinymce-helpers.ts

export const cloudinaryImageUploadHandler = (blobInfo: any, progress: (percent: number) => void) => {
    return new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', 'https://api.cloudinary.com/v1_1/sassi/image/upload');
      
      xhr.upload.onprogress = (e) => {
        progress(e.loaded / e.total * 100);
      };
      
      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
          return;
        }
        
        if (xhr.status < 200 || xhr.status >= 300) {
          reject('HTTP Error: ' + xhr.status);
          return;
        }
        
        const json = JSON.parse(xhr.responseText);
        
        if (!json || typeof json.secure_url != 'string') {
          reject('Invalid JSON: ' + xhr.responseText);
          return;
        }
        
        resolve(json.secure_url);
      };
      
      xhr.onerror = () => {
        reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
      };
      
      const formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());
      formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Unsigned upload preset
      
      xhr.send(formData);
    });
  };