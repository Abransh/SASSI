"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  FileCode,
  BookOpen,
  Video,
  Link as LinkIcon,
  Upload,
  Loader2,
  Image as ImageIcon,
  File,
  ExternalLink,
  Trash,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Resource schema for validation
const resourceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  fileUrl: z.string().min(1, "File URL or link is required"),
  thumbnailUrl: z.string().optional().nullable(),
  categoryId: z.string().min(1, "Category is required"),
  resourceType: z.enum(["DOCUMENT", "TEMPLATE", "GUIDE", "VIDEO", "LINK"]),
  featured: z.boolean().optional().default(false),
});

type ResourceFormData = z.infer<typeof resourceSchema>;

// Props type
interface ResourceFormProps {
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
  resource?: {
    id: string;
    title: string;
    description: string;
    fileUrl: string;
    thumbnailUrl: string | null;
    categoryId: string;
    resourceType: string;
    featured: boolean;
  };
}

export default function ResourceForm({ categories, resource }: ResourceFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize form state
  const [formData, setFormData] = useState<ResourceFormData>({
    title: resource?.title || "",
    description: resource?.description || "",
    fileUrl: resource?.fileUrl || "",
    thumbnailUrl: resource?.thumbnailUrl || "",
    categoryId: resource?.categoryId || (categories[0]?.id || ""),
    resourceType: (resource?.resourceType as any) || "DOCUMENT",
    featured: resource?.featured || false,
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ResourceFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState<"file" | "thumbnail" | null>(null);
  const isEditMode = !!resource;
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Get icon for resource type
  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case "DOCUMENT":
        return <FileText size={18} />;
      case "TEMPLATE":
        return <FileCode size={18} />;
      case "GUIDE":
        return <BookOpen size={18} />;
      case "VIDEO":
        return <Video size={18} />;
      case "LINK":
        return <LinkIcon size={18} />;
      default:
        return <FileText size={18} />;
    }
  };
  
  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof ResourceFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  
  // Handle select input changes
  const handleSelectChange = (name: keyof ResourceFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  
  // Handle switch input changes
  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, featured: checked }));
  };
  
  // Trigger file input click
  const handleUploadClick = (type: "file" | "thumbnail") => {
    if (type === "file" && fileInputRef.current) {
      fileInputRef.current.click();
    } else if (type === "thumbnail" && thumbnailInputRef.current) {
      thumbnailInputRef.current.click();
    }
  };
  
  // Handle file upload
const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "file" | "thumbnail") => {
  const files = e.target.files;
  if (!files || files.length === 0) return;
  
  const file = files[0];
  setIsUploading(type);
  
  try {
    // Create form data for Cloudinary upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sassi_resources"); // Required for unsigned uploads
    
    // Add folder based on type
    if (type === "thumbnail") {
      formData.append("folder", "sassi/resource_thumbnails");
    } else {
      formData.append("folder", "sassi/resources");
      formData.append("resource_type", "auto"); // Auto-detect file type
      // REMOVED: formData.append("access_mode", "public"); - This was causing the error
    }
    
    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    
    if (!response.ok) {
      const data = await response.json();
      console.error("Cloudinary error:", data);
      throw new Error(data.error?.message || "Failed to upload file");
    }
    
    const data = await response.json();
    
    // Update form data with the new URL
    setFormData((prev) => ({
      ...prev,
      [type === "file" ? "fileUrl" : "thumbnailUrl"]: data.secure_url,
    }));
    
    // Clear any existing error
    if (errors[type === "file" ? "fileUrl" : "thumbnailUrl" as keyof ResourceFormData]) {
      setErrors((prev) => ({
        ...prev,
        [type === "file" ? "fileUrl" : "thumbnailUrl"]: undefined,
      }));
    }
    
    toast.success(`${type === "file" ? "Resource" : "Thumbnail"} uploaded successfully`);
  } catch (error) {
    console.error(`Error uploading ${type}:`, error);
    toast.error(`Failed to upload ${type === "file" ? "resource" : "thumbnail"}`);
  } finally {
    setIsUploading(null);
    
    // Clear the file input
    if (type === "file" && fileInputRef.current) {
      fileInputRef.current.value = "";
    } else if (type === "thumbnail" && thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  }
};
  
  // Clear file URL
  const handleClearFileUrl = (type: "file" | "thumbnail") => {
    setFormData((prev) => ({
      ...prev,
      [type === "file" ? "fileUrl" : "thumbnailUrl"]: "",
    }));
  };
  
  // Validate form
  const validateForm = (): boolean => {
    try {
      resourceSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };
  
  // Handle form submission
  // Update this in your ResourceForm.tsx component

// Updated handleSubmit function for ResourceForm.tsx

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) {
    toast.error("Please fix the errors in the form");
    return;
  }
  
  setIsSubmitting(true);
  
  try {
    // Make sure URLs don't have any special parameters that might interfere with viewing/downloading
    let cleanFileUrl = formData.fileUrl;
    let cleanThumbnailUrl = formData.thumbnailUrl;
    
    // For Cloudinary URLs, make sure they are clean secure URLs without extra parameters
    if (cleanFileUrl && cleanFileUrl.includes('cloudinary.com')) {
      // Just keep the base URL without additional parameters
      const parts = cleanFileUrl.split('/upload/');
      if (parts.length === 2) {
        const filename = parts[1].split('/').pop();
        if (filename) {
          cleanFileUrl = `${parts[0]}/upload/${filename}`;
        }
      }
    }
    
    if (cleanThumbnailUrl && cleanThumbnailUrl.includes('cloudinary.com')) {
      const parts = cleanThumbnailUrl.split('/upload/');
      if (parts.length === 2) {
        const filename = parts[1].split('/').pop();
        if (filename) {
          cleanThumbnailUrl = `${parts[0]}/upload/${filename}`;
        }
      }
    }
    
    // Prepare form data for submission
    const resourceData = {
      ...formData,
      fileUrl: cleanFileUrl,
      thumbnailUrl: cleanThumbnailUrl === "" ? null : cleanThumbnailUrl,
    };
    
    // Submit to API
    const response = await fetch(
      isEditMode ? `/api/resources/${resource?.id}` : "/api/resources", 
      {
        method: isEditMode ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resourceData),
      }
    );
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to save resource");
    }
    
    toast.success(isEditMode ? "Resource updated successfully" : "Resource created successfully");
    router.push("/admin/resources");
    router.refresh();
  } catch (error) {
    console.error("Error saving resource:", error);
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to save resource"
    );
  } finally {
    setIsSubmitting(false);
  }
};

  // Handle resource deletion
  const handleDelete = async () => {
    if (!resource) return;
    
    try {
      setIsDeleting(true);
      
      const response = await fetch(`/api/resources/${resource.id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete resource");
      }
      
      toast.success("Resource deleted successfully");
      router.push("/admin/resources");
      router.refresh();
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error("Failed to delete resource");
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Resource Title
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Student Visa Guide"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of this resource"
              rows={4}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="categoryId" className="text-sm font-medium">
              Category
            </label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) => handleSelectChange("categoryId", value)}
            >
              <SelectTrigger className={errors.categoryId ? "border-red-500" : ""}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-red-500 text-xs mt-1">{errors.categoryId}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="resourceType" className="text-sm font-medium">
              Resource Type
            </label>
            <Select
              value={formData.resourceType}
              onValueChange={(value) => handleSelectChange("resourceType", value as any)}
            >
              <SelectTrigger className={errors.resourceType ? "border-red-500" : ""}>
                <SelectValue placeholder="Select a resource type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DOCUMENT">
                  <div className="flex items-center">
                    <FileText size={16} className="mr-2" />
                    Document
                  </div>
                </SelectItem>
                <SelectItem value="TEMPLATE">
                  <div className="flex items-center">
                    <FileCode size={16} className="mr-2" />
                    Template
                  </div>
                </SelectItem>
                <SelectItem value="GUIDE">
                  <div className="flex items-center">
                    <BookOpen size={16} className="mr-2" />
                    Guide
                  </div>
                </SelectItem>
                <SelectItem value="VIDEO">
                  <div className="flex items-center">
                    <Video size={16} className="mr-2" />
                    Video
                  </div>
                </SelectItem>
                <SelectItem value="LINK">
                  <div className="flex items-center">
                    <LinkIcon size={16} className="mr-2" />
                    External Link
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.resourceType && (
              <p className="text-red-500 text-xs mt-1">{errors.resourceType}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="featured">Featured Resource</Label>
            </div>
            <p className="text-xs text-gray-500">
              Featured resources appear on the resources homepage.
            </p>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Main File Upload/URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Resource File</label>
            
            {formData.resourceType === "LINK" ? (
              <>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input
                      id="fileUrl"
                      name="fileUrl"
                      value={formData.fileUrl}
                      onChange={handleChange}
                      placeholder="Enter external URL"
                      className={`pl-10 ${errors.fileUrl ? "border-red-500" : ""}`}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(formData.fileUrl, "_blank")}
                    disabled={!formData.fileUrl}
                    className="shrink-0"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Test
                  </Button>
                </div>
                {errors.fileUrl && <p className="text-red-500 text-xs mt-1">{errors.fileUrl}</p>}
              </>
            ) : (
              <>
                <div className="flex space-x-3">
                  <div className="flex-1">
                    {!formData.fileUrl ? (
                      <div className="border border-dashed rounded-md p-6 text-center">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => handleFileUpload(e, "file")}
                          className="hidden"
                        />
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <File className="h-8 w-8 text-gray-400" />
                          <div className="text-sm text-gray-500">
                            <button
                              type="button"
                              onClick={() => handleUploadClick("file")}
                              className="text-blue-600 hover:text-blue-800"
                              disabled={isUploading === "file"}
                            >
                              {isUploading === "file" ? (
                                <span className="flex items-center">
                                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                                  Uploading...
                                </span>
                              ) : (
                                "Click to upload"
                              )}
                            </button>{" "}
                            or drag and drop
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, DOC, PPT, XLS, etc. (max. 10MB)
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="border rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getResourceTypeIcon(formData.resourceType)}
                            <div className="text-sm font-medium truncate max-w-xs">
                              {formData.fileUrl.split("/").pop() || formData.fileUrl}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(formData.fileUrl, "_blank")}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <ExternalLink size={16} className="mr-1" />
                              View
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleClearFileUrl("file")}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash size={16} className="mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-none">
                    <div className="flex flex-col items-center">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleUploadClick("file")}
                        disabled={isUploading === "file"}
                        className="h-full w-full flex flex-col items-center py-3"
                      >
                        {isUploading === "file" ? (
                          <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                          <Upload className="h-6 w-6 mb-1" />
                        )}
                        <span className="text-xs">Upload</span>
                      </Button>
                    </div>
                  </div>
                </div>
                {errors.fileUrl && <p className="text-red-500 text-xs mt-1">{errors.fileUrl}</p>}
                
                <div className="text-sm text-gray-500 mt-2">
                  <div className="flex items-center">
                    <Input
                      id="fileUrl"
                      name="fileUrl"
                      value={formData.fileUrl}
                      onChange={handleChange}
                      placeholder="Or enter file URL directly"
                      className={errors.fileUrl ? "border-red-500" : ""}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Thumbnail Image Upload/URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Thumbnail Image (Optional)</label>
            <div className="flex space-x-3">
              <div className="flex-1">
                {!formData.thumbnailUrl ? (
                  <div className="border border-dashed rounded-md p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      ref={thumbnailInputRef}
                      onChange={(e) => handleFileUpload(e, "thumbnail")}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                      <div className="text-sm text-gray-500">
                        <button
                          type="button"
                          onClick={() => handleUploadClick("thumbnail")}
                          className="text-blue-600 hover:text-blue-800"
                          disabled={isUploading === "thumbnail"}
                        >
                          {isUploading === "thumbnail" ? (
                            <span className="flex items-center">
                              <Loader2 className="h-4 w-4 animate-spin mr-1" />
                              Uploading...
                            </span>
                          ) : (
                            "Click to upload"
                          )}
                        </button>{" "}
                        or drag and drop
                      </div>
                      <p className="text-xs text-gray-500">
                        JPG, PNG, GIF (max. 2MB)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded bg-gray-100 relative overflow-hidden">
                          <Image
                            src={formData.thumbnailUrl}
                            alt="Thumbnail"
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <div className="text-sm font-medium truncate max-w-xs">
                          {formData.thumbnailUrl.split("/").pop() || formData.thumbnailUrl}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => typeof formData.thumbnailUrl === 'string' && window.open(formData.thumbnailUrl, "_blank")}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink size={16} className="mr-1" />
                          View
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleClearFileUrl("thumbnail")}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash size={16} className="mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex-none">
                <div className="flex flex-col items-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleUploadClick("thumbnail")}
                    disabled={isUploading === "thumbnail"}
                    className="h-full w-full flex flex-col items-center py-3"
                  >
                    {isUploading === "thumbnail" ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <Upload className="h-6 w-6 mb-1" />
                    )}
                    <span className="text-xs">Upload</span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 mt-2">
              <div className="flex items-center">
                <Input
                  id="thumbnailUrl"
                  name="thumbnailUrl"
                  value={formData.thumbnailUrl || ""}
                  onChange={handleChange}
                  placeholder="Or enter thumbnail URL directly"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-between items-center pt-6">
        <div className="flex items-center space-x-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : (
              isEditMode ? "Update Resource" : "Create Resource"
            )}
          </Button>
          
          {isEditMode && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Resource
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the resource
                    and remove it from the database.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </form>
  );
}