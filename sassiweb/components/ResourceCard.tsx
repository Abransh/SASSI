import Link from "next/link";
import Image from "next/image";
import { getResourceTypeIcon, getResourceTypeColor } from "@/lib/resource-utils";
import { Download, Eye } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  resourceType: string;
  viewCount: number;
  downloadCount: number;
  slug: string;
}

type ResourceCardProps = {
  resource: Resource;
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  const ResourceIcon = getResourceTypeIcon(resource.resourceType);
  const typeColor = getResourceTypeColor(resource.resourceType);
  
  // Get color classes based on resource type
  const getColorClasses = () => {
    switch (typeColor) {
      case "blue":
        return "bg-blue-50 text-blue-700";
      case "purple":
        return "bg-purple-50 text-purple-700";
      case "orange":
        return "bg-orange-50 text-orange-700";
      case "red":
        return "bg-red-50 text-red-700";
      case "green":
        return "bg-green-50 text-green-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };
  
  return (
    <Link
      href={`/resources/${resource.slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all flex flex-col h-full"
    >
      {/* Resource Header */}
      <div className="p-4 flex items-center gap-3 border-b">
        <div className={`p-2 rounded-lg ${getColorClasses()}`}>
          <ResourceIcon size={20} />
        </div>
        <span className="text-sm font-medium uppercase">
          {resource.resourceType.toLowerCase()}
        </span>
      </div>
      
      {/* Resource Thumbnail */}
      <div className="h-32 relative bg-gray-50">
        {resource.thumbnailUrl ? (
          <Image
            src={resource.thumbnailUrl}
            alt={resource.title}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ResourceIcon size={32} className="text-gray-300" />
          </div>
        )}
      </div>
      
      {/* Resource Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {resource.description}
        </p>
        
        {/* Stats */}
        <div className="flex justify-between items-center mt-auto text-xs text-gray-500">
          <div className="flex gap-4">
            <span className="flex items-center">
              <Eye size={14} className="mr-1" />
              {resource.viewCount}
            </span>
            <span className="flex items-center">
              <Download size={14} className="mr-1" />
              {resource.downloadCount}
            </span>
          </div>
          
          <span className="text-orange-600 font-medium">View Resource →</span>
        </div>
      </div>
    </Link>
  );
}