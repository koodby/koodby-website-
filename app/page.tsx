import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { Growth } from "@/components/Growth";
import { AITraining } from "@/components/AITraining";
import { Process } from "@/components/Process";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <main id="content">
        <Hero />
        <Marquee />
        <Services />
        <Growth />
        <Work />
        <AITraining />
        <Process />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
