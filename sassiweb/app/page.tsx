import GetInvolvedSection from "@/components/GetInvolved";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <GetInvolvedSection />
    </main>
  );
}