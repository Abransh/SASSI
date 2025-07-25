import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "🎉 DAMM LOOKS COOL RIGHT",
  description: "I am not writing big data so you reas on whatsapp please open it✨",
  keywords: "birthday invitation, Milan, party, celebration, interactive invitation, modern design",
  authors: [{ name: "Ab" }],
  openGraph: {
    title: "🎉 You're Invited to an Epic Birthday Celebration!",
    description: "An interactive birthday invitation with surprises! Journey through Milan: Arco della Pace → Soju in Chinatown → Epic dinner finale. Click to unlock secret features! 🎮",
    type: "website",
    url: "https://www.sassimilan.com/invitation",
    siteName: "Epic Birthday Invitation",
    images: [
      {
        url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=630&fit=crop&crop=center",
        width: 1200,
        height: 630,
        alt: "Epic Birthday Celebration Invitation - Interactive Design",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "🎉 You're Invited! Epic Birthday Celebration",
    description: "Interactive birthday invitation with hidden surprises! Join the Milan adventure 🎂✨",
    images: ["https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=630&fit=crop&crop=center"],
  },
  robots: {
    index: false,
    follow: false,
  },
  other: {
    "whatsapp:title": "🎉 You're Invited to My Birthday!",
    "whatsapp:description": "Interactive invitation with secret Easter eggs! Journey: Arco della Pace → Soju → Epic dinner. Try the Konami code! 🎮",
    "whatsapp:image": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop&crop=center",
  },
};

export default function InvitationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}