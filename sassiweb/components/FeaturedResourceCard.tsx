import Link from "next/link";
import Image from "next/image";
import { getResourceTypeIcon } from "@/lib/resource-utils";

type FeaturedResourceCardProps = {
  resource: {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string | null;
    resourceType: string;
    viewCount: number;
    downloadCount: number;
  };
};

export default function FeaturedResourceCard({ resource }: FeaturedResourceCardProps) {
  const ResourceIcon = getResourceTypeIcon(resource.resourceType);
  
  return (
    <Link
      href={`/resources/view/${resource.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all flex flex-col h-full"
    >
      {/* Resource Thumbnail */}
      <div className="h-36 relative bg-gray-50">
        {resource.thumbnailUrl ? (
          <Image
            src={resource.thumbnailUrl}
            alt={resource.title}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ResourceIcon size={40} className="text-orange-400" />
          </div>
        )}
        
        {/* Resource Type Badge */}
        <div className="absolute bottom-3 right-3 bg-orange-600 text-white text-xs px-2 py-1 rounded-full uppercase">
          {resource.resourceType.toLowerCase()}
        </div>
      </div>
      
      {/* Resource Info */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
          {resource.description}
        </p>
        
        {/* Stats */}
        <div className="flex text-xs text-gray-500 justify-between mt-auto pt-3 border-t">
          <span>{resource.viewCount} views</span>
          <span>{resource.downloadCount} downloads</span>
        </div>
      </div>
    </Link>
  );
}