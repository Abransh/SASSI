"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Calendar, Clock, MapPin, Image, Users, Save, Trash } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Event } from "@/types/event";
import { createEvent, updateEvent, deleteEvent } from "@/lib/event-service";
import ImageUpload from "./ImageUpload";

// Form validation schema
const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endDate: z.string().optional(),
  endTime: z.string().optional(),
  maxAttendees: z.number().min(1, "Must be at least 1").optional(),
  price: z.number().min(0, "Price cannot be negative").optional(),
  imageUrl: z.string().optional(),
  published: z.boolean().default(false),
  requiresPayment: z.boolean().default(false),
});

type EventFormData = z.infer<typeof eventSchema>;

type EventFormProps = {
  event?: Event;
  isEdit?: boolean;
};

export default function EventForm({ event, isEdit = false }: EventFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Default form values
  const defaultStartDate = event ? new Date(event.startDate) : new Date();
  defaultStartDate.setMinutes(0);
  defaultStartDate.setSeconds(0);
  defaultStartDate.setMilliseconds(0);
  
  const defaultEndDate = event ? new Date(event.endDate) : new Date();
  defaultEndDate.setHours(defaultStartDate.getHours() + 2);
  defaultEndDate.setMinutes(0);
  defaultEndDate.setSeconds(0);
  defaultEndDate.setMilliseconds(0);
  
  const [formData, setFormData] = useState<EventFormData>({
    title: event?.title || "",
    description: event?.description || "",
    content: event?.content || "",
    location: event?.location || "",
    startDate: format(defaultStartDate, "yyyy-MM-dd"),
    startTime: format(defaultStartDate, "HH:mm"),
    endDate: event?.endDate ? format(new Date(event.endDate), "yyyy-MM-dd") : undefined,
    endTime: event?.endDate ? format(new Date(event.endDate), "HH:mm") : undefined,
    maxAttendees: event?.maxAttendees || undefined,
    price: event?.price || undefined,
    imageUrl: event?.imageUrl || undefined,
    published: event?.published || false,
    requiresPayment: event?.price ? event.price > 0 : false,
  });
  
  // Error handling
  const [errors, setErrors] = useState<Partial<Record<keyof EventFormData, string>>>({});
  
  const validateForm = (): boolean => {
    try {
      eventSchema.parse(formData);
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
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let parsedValue: any = value;
    
    // Parse number fields
    if (name === "maxAttendees") {
      parsedValue = value ? parseInt(value, 10) : null;
    }
    
    // Parse price field
    if (name === "price") {
      parsedValue = value ? parseFloat(value) : null;
    }
    
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
    
    // Clear error when field is edited
    if (errors[name as keyof EventFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleDateChange = (field: "startDate" | "endDate", date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, [field]: format(date, "yyyy-MM-dd") }));
    } else if (field === "endDate") {
      setFormData((prev) => ({ ...prev, endDate: undefined, endTime: undefined }));
    }
  };
  
  const handleTimeChange = (field: "startTime" | "endTime", e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handlePublishedChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, published: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create a UTC date from the form inputs
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      // Set the timezone offset to 0 (UTC)
      const utcStartDate = new Date(
        startDateTime.getUTCFullYear(),
        startDateTime.getUTCMonth(),
        startDateTime.getUTCDate(), 
        startDateTime.getUTCHours(),
        startDateTime.getUTCMinutes()
      ).toISOString();

      // Handle end date similarly if present
      let utcEndDate;
      if (formData.endDate && formData.endTime) {
        const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
        utcEndDate = new Date(
          endDateTime.getUTCFullYear(),
          endDateTime.getUTCMonth(),
          endDateTime.getUTCDate(),
          endDateTime.getUTCHours(),
          endDateTime.getUTCMinutes()
        ).toISOString();
      }

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          content: formData.content,
          location: formData.location,
          startDate: utcStartDate, // Send ISO string with timezone info
          endDate: utcEndDate, // Send ISO string with timezone info
          imageUrl: formData.imageUrl,
          maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees.toString()) : null,
          price: formData.price ? parseFloat(formData.price.toString()) : null,
          requiresPayment: formData.requiresPayment,
          published: formData.published,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save event");
      }

      const event = await response.json();
      router.push(`/admin/events/${event.id}`);
    } catch (err) {
      console.error("Error saving event:", err);
      setError(err instanceof Error ? err.message : "Failed to save event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async () => {
    if (!event || !confirm("Are you sure you want to delete this event?")) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      await deleteEvent(event.id);
      toast.success("Event deleted successfully");
      router.push("/admin/events");
      router.refresh();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Failed to delete event. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title and Description */}
      <div className="grid gap-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Event Title
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Short Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
          <p className="text-xs text-gray-500">
            You can use <strong>HTML</strong> tags (e.g., <code>&lt;b&gt;</code> for bold text) in the description.
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            Full Description (Optional)
          </label>
          <Textarea
            id="content"
            name="content"
            value={formData.content || ""}
            onChange={handleChange}
            rows={6}
            className={errors.content ? "border-red-500" : ""}
          />
          {errors.content && (
            <p className="text-red-500 text-xs mt-1">{errors.content}</p>
          )}
          <p className="text-xs text-gray-500">
            Detailed information about the event (shown on the event detail page)
          </p>
          <p className="text-xs text-gray-500">
            You can use <strong>HTML</strong> tags (e.g., <code>&lt;b&gt;</code> for bold text) in the full description.
          </p>
        </div>
      </div>
      
      {/* Date, Time and Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={formData.startDate}
            onChange={(e) => handleDateChange("startDate", new Date(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            value={formData.startTime}
            onChange={(e) => handleTimeChange("startTime", e)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.startTime && (
            <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>
          )}
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date (Optional)
          </label>
          <input
            type="date"
            id="endDate"
            value={formData.endDate || ""}
            onChange={(e) => handleDateChange("endDate", e.target.value ? new Date(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
            End Time (Optional)
          </label>
          <input
            type="time"
            id="endTime"
            value={formData.endTime || ""}
            onChange={(e) => handleTimeChange("endTime", e)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={!formData.endDate}
          />
          {errors.endTime && (
            <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="location" className="text-sm font-medium flex items-center">
          <MapPin size={16} className="mr-2" />
          Location
        </label>
        <div className="flex gap-2">
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={errors.location ? "border-red-600" : ""}
            placeholder="Enter event location"
          />
          {formData.location && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.location)}`;
                window.open(mapsUrl, '_blank');
              }}
            >
              View on Maps
            </Button>
          )}
        </div>
        {errors.location && (
          <p className="text-red-500 text-xs mt-1">{errors.location}</p>
        )}
        <p className="text-xs text-gray-500">
          Enter the event location. Click "View on Maps" to open in Google Maps.
        </p>
      </div>
      
      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="imageUrl" className="text-sm font-medium flex items-center">
            <Image size={16} className="mr-2" />
            Event Image (Optional)
          </label>
          <ImageUpload
            value={formData.imageUrl}
            onChange={(url) => setFormData((prev) => ({ ...prev, imageUrl: url || undefined }))}
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>
          )}
          <p className="text-xs text-gray-500">
            Upload an image for this event (max 5MB)
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="maxAttendees" className="text-sm font-medium flex items-center">
            <Users size={16} className="mr-2" />
            Maximum Attendees (Optional)
          </label>
          <Input
            id="maxAttendees"
            name="maxAttendees"
            type="number"
            min="1"
            value={formData.maxAttendees || ""}
            onChange={handleChange}
            className={errors.maxAttendees ? "border-red-500" : ""}
          />
          {errors.maxAttendees && (
            <p className="text-red-500 text-xs mt-1">{errors.maxAttendees}</p>
          )}
          <p className="text-xs text-gray-500">
            Leave empty for unlimited attendees
          </p>
        </div>
      </div>
      
      {/* Payment Settings */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="requiresPayment"
            checked={formData.requiresPayment}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                requiresPayment: e.target.checked,
                price: e.target.checked ? prev.price || 0 : undefined,
              }));
            }}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="requiresPayment" className="text-sm font-medium text-gray-700">
            This event requires payment
          </label>
        </div>

        {formData.requiresPayment && (
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (€)
            </label>
            <input
              type="number"
              id="price"
              min="0"
              step="0.01"
              value={formData.price || ""}
              onChange={(e) => {
                const value = e.target.value ? parseFloat(e.target.value) : undefined;
                setFormData((prev) => ({ ...prev, price: value }));
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>
        )}
      </div>
      
      {/* Publishing Controls */}
      <div className="flex items-center space-x-2">
        <Switch
          id="published"
          checked={formData.published}
          onCheckedChange={handlePublishedChange}
        />
        <label htmlFor="published" className="text-sm font-medium">
          {formData.published ? "Published" : "Draft"}
        </label>
        <p className="text-xs text-gray-500 ml-2">
          {formData.published
            ? "Event is visible to all users"
            : "Event is only visible to admins until published"}
        </p>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between">
        <div>
          {isEdit && (
            <Button
              type="button"
              variant="outline"
              onClick={handleDelete}
              className="text-red-500 border-red-500 hover:bg-red-50"
              disabled={isSubmitting || isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Event
                </>
              )}
            </Button>
          )}
        </div>
        
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/events")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {isEdit ? "Update Event" : "Create Event"}
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}
    </form>
  );
}