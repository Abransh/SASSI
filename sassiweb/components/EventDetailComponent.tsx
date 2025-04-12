"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, Users, CreditCard } from "lucide-react";
import { Event } from "@/types/event";

type EventDetailProps = {
  event: Event;
  isAdmin?: boolean;
  registrationStatus?: {
    isRegistered: boolean;
    status: string | null;
  } | null;
};

export default function EventDetailComponent({ 
  event, 
  isAdmin = false,
  registrationStatus
}: EventDetailProps) {
  const router = useRouter();
  
  // Format event time treating the date as UTC to prevent timezone conversion
  const formatEventTime = (dateString: string) => {
    // Parse the date string
    const date = parseISO(dateString);
    
    // Format the time in 24-hour format, treating it as UTC
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
  };
  
  // Format event date more nicely
  const formatEventDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "EEEE, MMMM d, yyyy");
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Event Image */}
      {event.imageUrl && (
        <div className="relative w-full h-64">
          <Image 
            src={event.imageUrl} 
            alt={event.title}
            fill
            style={{ objectFit: "cover" }}
            priority
            className="w-full"
          />
        </div>
      )}
      
      {/* Event Header */}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
          {isAdmin && (
            <Button
              onClick={() => router.push(`/admin/events/${event.id}/edit`)}
              size="sm"
            >
              Edit Event
            </Button>
          )}
        </div>
        
        {/* Event Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-gray-700">
            <Calendar className="mr-2 h-5 w-5 text-gray-600" />
            <span>{formatEventDate(event.startDate)}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Clock className="mr-2 h-5 w-5 text-gray-600" />
            <span>{formatEventTime(event.startDate)} hrs</span>
            {event.endDate && (
              <> - {formatEventTime(event.endDate)} hrs</>
            )}
          </div>
          
          <div className="flex items-center text-gray-700">
            <MapPin className="mr-2 h-5 w-5 text-gray-600" />
            <span>{event.location}</span>
          </div>
          
          {event.maxAttendees && (
            <div className="flex items-center text-gray-700">
              <Users className="mr-2 h-5 w-5 text-gray-600" />
              <span>Maximum {event.maxAttendees} attendees</span>
            </div>
          )}
          
          {event.price && event.price > 0 && (
            <div className="flex items-center text-gray-700">
              <CreditCard className="mr-2 h-5 w-5 text-gray-600" />
              <span>€{event.price.toFixed(2)}</span>
            </div>
          )}
        </div>
        
        {/* Event Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">About this event</h2>
          <div 
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        </div>
        
        {/* Event Full Description (if available) */}
        {event.content && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <div 
              className="text-gray-700 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: event.content }}
            />
          </div>
        )}
        
        {/* Registration Status */}
        {registrationStatus && (
          <div className="mt-6 p-4 border rounded-md">
            {registrationStatus.isRegistered ? (
              <div className="text-green-600">
  };
  
  const handlePublishedChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, published: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
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
          startDate: formData.startDate,
          startTime: formData.startTime,
          endDate: formData.endDate,
          endTime: formData.endTime,
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

  const formatEventTime = (dateString: string) => {
    // Parse the date string
    const date = parseISO(dateString);
    
    // Format the time in 24-hour format, treating it as UTC to prevent timezone conversion
    // This requires modifying how we format the date
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
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
          <p className="text-xs text-gray-500"></p>
            Upload an image for this event (max 5MB)
          </p>
        </div>
        
        <div className="space-y-2"></div>
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
          <div></div>
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
                <></>
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
              <></>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <></>
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