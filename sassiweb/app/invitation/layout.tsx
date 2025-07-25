import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "🎉 DAMM LOOKS COOL RIGHT",
  description: "I am not writing this big description please open the link✨",
  keywords: "birthday invitation, Milan, party, celebration, interactive invitation, modern design",
  authors: [{ name: "Ab" }],
  openGraph: {
    title: "🎉 You're Invited to an Epic Birthday Celebration!",
    description: "I am not writing this big description please open the link",
    type: "website",
    url: "https://www.sassimilan.com/invitation",
    siteName: "Epic Birthday Invitation",
    // images: [
    //   {
    //     url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=630&fit=crop&crop=center",
    //     width: 1200,
    //     height: 630,
    //     alt: "Epic Birthday Celebration Invitation - Interactive Design",
    //   },
    // ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "🎉 You're Invited!",
    description: "I am not writing this big description please open the link 🎂✨",

  },
  robots: {
    index: false,
    follow: false,
  },
  other: {
    "whatsapp:title": "🎉 I am not writing this big description please open the link",
    "whatsapp:description": "lmao",
   
  },
};

export default function InvitationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}