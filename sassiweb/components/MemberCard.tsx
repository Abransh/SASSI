import { User, GraduationCap, MapPin, Mail, Phone, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type MemberCardProps = {
  user: any; // User with profile
};

export default function MemberCard({ user }: MemberCardProps) {
  // Format the arrival year if it exists
  const arrivalYear = user.profile?.yearOfArrival
    ? `Since ${user.profile.yearOfArrival}`
    : "";
  
  // Calculate graduation string
  const graduationString = user.graduationYear
    ? `Class of ${user.graduationYear}`
    : "";
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Profile Image */}
          <div className="rounded-full bg-gray-200 w-16 h-16 flex items-center justify-center flex-shrink-0">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={64}
                height={64}
                className="rounded-full"
              />
            ) : (
              <User size={32} className="text-gray-400" />
            )}
          </div>
          
          {/* User Info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">{user.name}</h3>
            
            {user.university && (
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <GraduationCap size={16} className="mr-2 flex-shrink-0" />
                <span>{user.university}</span>
              </div>
            )}
            
            {user.course && (
              <div className="flex items-start text-sm text-gray-600 mb-1">
                <span className="inline-block w-5 mr-2 flex-shrink-0"></span>
                <span>{user.course}</span>
              </div>
            )}
            
            {(user.city || user.profile?.residenceArea) && (
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <MapPin size={16} className="mr-2 flex-shrink-0" />
                <span>
                  {user.profile?.residenceArea && `${user.profile.residenceArea}, Milan`}
                  {user.profile?.residenceArea && user.city && " • "}
                  {user.city && `From ${user.city}, India`}
                </span>
              </div>
            )}
            
            {/* Badges/Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {arrivalYear && (
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                  {arrivalYear}
                </span>
              )}
              
              {graduationString && (
                <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                  {graduationString}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Bio Section */}
        {user.bio && (
          <div className="mt-4">
            <p className="text-sm text-gray-700 line-clamp-3">{user.bio}</p>
          </div>
        )}
        
        {/* Contact Options */}
        <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
          <Link
            href={`/members/${user.id}`}
            className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-sm flex-1 text-center"
          >
            View Profile
          </Link>
          
          {user.profile?.showEmail && (
            <a
              href={`mailto:${user.email}`}
              className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
              title="Send Email"
            >
              <Mail size={18} />
            </a>
          )}
          
          {user.profile?.showPhone && user.phoneNumber && (
            <a
              href={`tel:${user.phoneNumber}`}
              className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
              title="Call"
            >
              <Phone size={18} />
            </a>
          )}
          
          {user.linkedinUrl && (
            <a
              href={user.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}