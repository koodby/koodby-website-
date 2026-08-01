import { Nav } from "@/components/Nav";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { Growth } from "@/components/Growth";
import { AITraining } from "@/components/AITraining";
import { GlobalRemote } from "@/components/GlobalRemote";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Work } from "@/components/Work";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { TeamCoverflow } from "@/components/TeamCoverflow";
import { CTA } from "@/components/CTA";
import { RopeTag } from "@/components/RopeTag";

export default function Home() {
  return (
    <>
      <Nav logo={<AnimatedLogo />} />
      <RopeTag />
      <main id="content">
        <Hero />
        <Marquee />
        <Services />
        <Growth />
        <Work />
        <ArchitectureDiagram />
        <AITraining />
        <GlobalRemote />
        <Faq />
        <TeamCoverflow />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
