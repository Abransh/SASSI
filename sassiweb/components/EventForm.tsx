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

// Form validation schema
const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  startDate: z.date(),
  endDate: z.date(),
  imageUrl: z.string().optional().nullable(),
  maxAttendees: z.number().optional().nullable(),
  price: z.number().optional().nullable(),
  requiresPayment: z.boolean().default(false),
  published: z.boolean().default(false),
});

type EventFormData = z.infer<typeof eventFormSchema>;

type EventFormProps = {
  event?: Event;
  isEdit?: boolean;
};

export default function EventForm({ event, isEdit = false }: EventFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
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
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    imageUrl: event?.imageUrl || "",
    maxAttendees: event?.maxAttendees || null,
    price: event?.price || null,
    requiresPayment: event?.requiresPayment || false,
    published: event?.published || false,
  });
  
  const [startTime, setStartTime] = useState(
    event ? format(new Date(event.startDate), "HH:mm") : "18:00"
  );
  
  const [endTime, setEndTime] = useState(
    event ? format(new Date(event.endDate), "HH:mm") : "20:00"
  );
  
  // Error handling
  const [errors, setErrors] = useState<Partial<Record<keyof EventFormData, string>>>({});
  
  const validateForm = (): boolean => {
    try {
      // Combine date and time
      const updatedFormData = {
        ...formData,
        startDate: combineDateTime(formData.startDate, startTime),
        endDate: combineDateTime(formData.endDate, endTime),
      };
      
      // Check if end date is after start date
      if (updatedFormData.endDate <= updatedFormData.startDate) {
        setErrors({
          endDate: "End date must be after start date",
        });
        return false;
      }
      
      eventFormSchema.parse(updatedFormData);
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
      setFormData((prev) => ({ ...prev, [field]: date }));
      
      // Clear error when field is edited
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    }
  };
  
  const handleTimeChange = (
    field: "startTime" | "endTime",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (field === "startTime") {
      setStartTime(value);
    } else {
      setEndTime(value);
    }
    
    // Clear related date errors
    if (errors.startDate || errors.endDate) {
      setErrors((prev) => ({ 
        ...prev, 
        startDate: undefined,
        endDate: undefined 
      }));
    }
  };
  
  const handlePublishedChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, published: checked }));
  };
  
  const handleRequiresPaymentChange = (checked: boolean) => {
    setFormData({
      ...formData,
      requiresPayment: checked,
      price: checked ? (formData.price || 0) : null,
    });
  };
  
  // Helper to combine date and time values
  const combineDateTime = (date: Date, timeString: string): Date => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const result = new Date(date);
    result.setHours(hours);
    result.setMinutes(minutes);
    return result;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Combine date and time for start and end dates
      const eventData = {
        ...formData,
        startDate: combineDateTime(formData.startDate, startTime),
        endDate: combineDateTime(formData.endDate, endTime),
      };
      
      if (isEdit && event) {
        // Update existing event
        await updateEvent(event.id, eventData);
        toast.success("Event updated successfully");
      } else {
        // Create new event
        await createEvent(eventData);
        toast.success("Event created successfully");
      }
      
      // Redirect to events list
      router.push("/admin/events");
      router.refresh();
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Failed to save event. Please try again."
      );
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
            A brief summary of the event (shown in event listings)
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
        </div>
      </div>
      
      {/* Date, Time and Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Calendar size={16} className="mr-2" />
            Start Date
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    errors.startDate ? "border-red-500" : ""
                  }`}
                >
                  {format(formData.startDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarUI
                  mode="single"
                  selected={formData.startDate}
                  onSelect={(date) => handleDateChange("startDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <div className="relative flex items-center">
              <Clock size={16} className="absolute left-3 text-gray-500" />
              <Input
                type="time"
                value={startTime}
                onChange={(e) => handleTimeChange("startTime", e)}
                className="pl-10"
              />
            </div>
          </div>
          {errors.startDate && (
            <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <Calendar size={16} className="mr-2" />
            End Date
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${
                    errors.endDate ? "border-red-500" : ""
                  }`}
                >
                  {format(formData.endDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarUI
                  mode="single"
                  selected={formData.endDate}
                  onSelect={(date) => handleDateChange("endDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <div className="relative flex items-center">
              <Clock size={16} className="absolute left-3 text-gray-500" />
              <Input
                type="time"
                value={endTime}
                onChange={(e) => handleTimeChange("endTime", e)}
                className="pl-10"
              />
            </div>
          </div>
          {errors.endDate && (
            <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="location" className="text-sm font-medium flex items-center">
          <MapPin size={16} className="mr-2" />
          Location
        </label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={errors.location ? "border-red-500" : ""}
        />
        {errors.location && (
          <p className="text-red-500 text-xs mt-1">{errors.location}</p>
        )}
      </div>
      
      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="imageUrl" className="text-sm font-medium flex items-center">
            <Image size={16} className="mr-2" />
            Image URL (Optional)
          </label>
          <Input
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl || ""}
            onChange={handleChange}
            className={errors.imageUrl ? "border-red-500" : ""}
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>
          )}
          <p className="text-xs text-gray-500">
            Add a URL to an image for this event
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
      
      {/* Payment Options */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="text-md font-medium">Payment Options</h3>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="requiresPayment"
            checked={formData.requiresPayment}
            onCheckedChange={handleRequiresPaymentChange}
          />
          <label htmlFor="requiresPayment" className="text-sm font-medium">
            {formData.requiresPayment ? "Payment Required" : "Free Event"}
          </label>
          <p className="text-xs text-gray-500 ml-2">
            {formData.requiresPayment
              ? "Attendees will need to pay to register"
              : "Attendees can register for free"}
          </p>
        </div>
        
        {formData.requiresPayment && (
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium flex items-center">
              Price (€)
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price || ""}
              onChange={handleChange}
              className={errors.price ? "border-red-500" : ""}
              placeholder="e.g. 5.00"
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
            <p className="text-xs text-gray-500">
              Amount in Euro that attendees will be charged
            </p>
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
    </form>
  );
}