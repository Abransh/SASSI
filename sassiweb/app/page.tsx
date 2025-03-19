import ContactForm from "@/components/ContactForm";
import CoreInitiativesSection from "@/components/CoreInitiatives";
import EventsSection from "@/components/Events";
import Footer from "@/components/Footer";
import GetInvolvedSection from "@/components/GetInvolved";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LifeInMilanSection from "@/components/LifeInMilan";
import MobileMenu from "@/components/MobileMenu";
import PlaneAnimation from "@/components/PlaneScroll";
import UniNetworks from "@/components/UniNetworks";
import VisionSection from "@/components/vision";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <MobileMenu />
      <HeroSection />
      <PlaneAnimation />
      <VisionSection />
      <LifeInMilanSection />
      
      <UniNetworks />
      <GetInvolvedSection />
      <EventsSection />
      <CoreInitiativesSection />
      <ContactForm />
      <Footer />
    </main>
  );
}