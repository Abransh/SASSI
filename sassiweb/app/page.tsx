import EventsSection from "@/components/Events";
import GetInvolvedSection from "@/components/GetInvolved";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/vision";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <GetInvolvedSection />
      <VisionSection />
      <EventsSection />
    </main>
  );
}