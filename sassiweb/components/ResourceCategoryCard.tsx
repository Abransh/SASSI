import Link from "next/link";
import Image from "next/image";
import { FileText } from "lucide-react";

type ResourceCategoryCardProps = {
  category: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    _count: {
      resources: number;
    };
  };
};

export default function ResourceCategoryCard({ category }: ResourceCategoryCardProps) {
  return (
    <Link
      href={`/resources/${category.slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
    >
      {/* Category Image */}
      <div className="h-40 relative bg-gray-100">
        {category.imageUrl ? (
          <Image
            src={category.imageUrl}
            alt={category.name}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText size={48} className="text-gray-400" />
          </div>
        )}
      </div>
      
      {/* Category Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">{category.name}</h3>
          <span className="text-sm text-gray-500">
            {category._count.resources} {category._count.resources === 1 ? "resource" : "resources"}
          </span>
        </div>
        
        {category.description && (
          <p className="text-gray-600 line-clamp-2">{category.description}</p>
        )}
      </div>
    </Link>
  );
}