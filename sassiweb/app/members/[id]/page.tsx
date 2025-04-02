export const dynamic = 'force-dynamic';

import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Heart,
  ChevronLeft,
  Linkedin,
} from "lucide-react";

type Props = {
  params: { id: string };
};

export default async function MemberPage(props: any) {
  const { params, searchParams } = props; // using any bypasses error
  // Check if user is logged in
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect(`/auth/signin?callbackUrl=/members/${params.id}`);
  }
  
  // Get the member
  const member = await prisma.user.findUnique({
    where: {
      id: params.id,
      isProfilePublic: true,
    },
    include: {
      profile: true,
    },
  });
  
  if (!member) {
    notFound();
  }
  
  // Check if this is the current user viewing their own profile
  const isOwnProfile = session.user.id === member.id;
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/members"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
              <ChevronLeft size={20} />
              <span>Back to Members</span>
            </Link>
            
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-orange-600 to-orange-400 h-32"></div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Profile Image */}
                  <div className="relative -mt-16 md:-mt-20 mb-4 md:mb-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full p-1 shadow-md">
                      <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name || "Member"}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                          />
                        ) : (
                          <User
                            size={48}
                            className="text-gray-400"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Basic Info */}
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                      {member.name}
                      {isOwnProfile && (
                        <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          This is you
                        </span>
                      )}
                    </h1>
                    
                    <div className="flex flex-wrap gap-y-2 gap-x-6 text-gray-700 mb-4">
                      {member.university && (
                        <div className="flex items-center">
                          <GraduationCap size={18} className="mr-2 text-gray-500" />
                          <span>{member.university}</span>
                        </div>
                      )}
                      
                      {member.course && (
                        <div className="flex items-center">
                          <Briefcase size={18} className="mr-2 text-gray-500" />
                          <span>{member.course}</span>
                        </div>
                      )}
                      
                      {member.city && (
                        <div className="flex items-center">
                          <MapPin size={18} className="mr-2 text-gray-500" />
                          <span>From {member.city}, India</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Contact Options */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {member.profile?.showEmail && (
                        <a
                          href={`mailto:${member.email}`}
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md flex items-center text-sm"
                        >
                          <Mail size={16} className="mr-2" />
                          Email
                        </a>
                      )}
                      
                      {member.profile?.showPhone && member.phoneNumber && (
                        <a
                          href={`tel:${member.phoneNumber}`}
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md flex items-center text-sm"
                        >
                          <Phone size={16} className="mr-2" />
                          Call
                        </a>
                      )}
                      
                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md flex items-center text-sm"
                        >
                          <Linkedin size={16} className="mr-2" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Profile Information */}
              <div className="md:col-span-2 space-y-6">
                {/* About Section */}
                {member.bio && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">About</h2>
                    <p className="text-gray-700 whitespace-pre-line">{member.bio}</p>
                  </div>
                )}
                
                {/* Academic Background */}
                {(member.profile?.universityInIndia || member.profile?.degreeInIndia) && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Academic Background</h2>
                    <div className="space-y-4">
                      {member.profile?.universityInIndia && (
                        <div>
                          <h3 className="font-medium text-gray-900">
                            University in India
                          </h3>
                          <p className="text-gray-700">
                            {member.profile.universityInIndia}
                          </p>
                        </div>
                      )}
                      
                      {member.profile?.degreeInIndia && (
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Degree in India
                          </h3>
                          <p className="text-gray-700">
                            {member.profile.degreeInIndia}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Interests & Skills */}
                {(member.profile?.interests || member.profile?.skills) && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Interests & Skills</h2>
                    <div className="space-y-4">
                      {member.profile?.interests && (
                        <div>
                          <h3 className="font-medium text-gray-900 flex items-center">
                            <Heart size={16} className="mr-2 text-red-500" />
                            Interests
                          </h3>
                          <p className="text-gray-700 mt-1">
                            {member.profile.interests}
                          </p>
                        </div>
                      )}
                      
                      {member.profile?.skills && (
                        <div>
                          <h3 className="font-medium text-gray-900 flex items-center">
                            <Briefcase size={16} className="mr-2 text-blue-500" />
                            Skills
                          </h3>
                          <p className="text-gray-700 mt-1">
                            {member.profile.skills}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Sidebar Information */}
              <div className="space-y-6">
                {/* Milan Experience */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-bold mb-4">Milan Experience</h2>
                  <div className="space-y-3">
                    {member.profile?.yearOfArrival && (
                      <div>
                        <div className="flex items-center text-gray-700">
                          <Calendar size={16} className="mr-2 text-gray-500" />
                          <span>In Milan since {member.profile.yearOfArrival}</span>
                        </div>
                      </div>
                    )}
                    
                    {member.profile?.residenceArea && (
                      <div>
                        <div className="flex items-center text-gray-700">
                          <MapPin size={16} className="mr-2 text-gray-500" />
                          <span>Living in {member.profile.residenceArea}</span>
                        </div>
                      </div>
                    )}
                    
                    {member.graduationYear && (
                      <div>
                        <div className="flex items-center text-gray-700">
                          <GraduationCap size={16} className="mr-2 text-gray-500" />
                          <span>
                            Expected graduation: {member.graduationYear}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Edit Profile Button (only for own profile) */}
                {isOwnProfile && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-bold mb-4">Profile Settings</h2>
                    <Link
                      href="/profile"
                      className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-center block"
                    >
                      Edit Profile
                    </Link>
                    
                    <div className="mt-4 text-sm text-gray-500">
                      <p>
                        {member.isProfilePublic
                          ? "Your profile is visible to other members"
                          : "Your profile is hidden from other members"}
                      </p>
                      <p className="mt-1">
                        You can change visibility settings in your profile page.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}