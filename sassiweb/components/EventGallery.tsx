"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { EventImage } from '@/types/event';
import { cn } from '@/lib/utils';

type EventGalleryProps = {
  eventId: string;
  className?: string;
};

export default function EventGallery({ eventId, className }: EventGalleryProps) {
  const [images, setImages] = useState<EventImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<EventImage | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);
        const response = await fetch(`/api/events/${eventId}/gallery`);
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        }
      } catch (error) {
        console.error('Error fetching event images:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [eventId]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Loading event photos...</p>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No photos available for this event.</p>
      </div>
    );
  }

  return (
    <div className={cn("", className)}>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div 
            key={image.id || index} 
            className="aspect-square relative overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.imageUrl}
              alt={image.caption || `Event photo ${index + 1}`}
              fill
              className="object-cover transition-transform group-hover:scale-110 duration-300"
            />
            
            {/* Optional Caption Overlay */}
            {image.caption && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-end transition-all duration-300">
                <div className="text-white p-3 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium truncate">{image.caption}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X size={24} />
          </button>

          <div 
            className="relative max-w-4xl max-h-[90vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.caption || 'Event photo'}
                width={1200}
                height={800}
                className="max-h-[80vh] rounded"
              />
            </div>
            
            {/* Caption */}
            {selectedImage.caption && (
              <div className="text-white text-center mt-4 p-2 bg-black bg-opacity-50 rounded">
                <p>{selectedImage.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 