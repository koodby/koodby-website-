"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Monitor, Smartphone, Image as ImageIcon, Code, Cpu } from "lucide-react";
import { FadeIn } from "./anim/FadeIn";
import { WordReveal } from "./anim/WordReveal";
import { WebMock, AppMock, BrandMock, DevMock } from "./ServiceVisuals";

/**
 * Services — large sticky-stacking cards (editorial style).
 * Each service gets a full-height card with a number, title, description,
 * tags, and a representative image/mockup.
 */
type Service = {
  n: string;
  title: string;
  description: string;
  tags: string[];
  features: string[];
  icon: React.ReactNode;
  bgGradient?: string;
  cardBg?: string;
  textColor?: string;
  mutedColor?: string;
  btnClass?: string;
  dotClass?: string;
  nColor?: string;
  visual: React.ReactNode;
};

const services: Service[] = [
  {
    n: "01",
    title: "Web Engineering",
    description:
      "Building highly scalable, performant, and secure web applications — from complex dashboards to robust e-commerce systems.",
    tags: ["React", "Next.js", "Full-Stack", "Web Apps"],
    features: ["Custom Web Apps", "Enterprise Solutions", "Performance Optimization", "E-commerce Platforms"],
    icon: <Monitor size={20} />,
    bgGradient: "bg-[#FAF8F0]",
    cardBg: "bg-[#FAF8F0]",
    textColor: "text-[#253422]",
    mutedColor: "text-[#5E6D5B]",
    nColor: "text-[#253422]/15",
    dotClass: "bg-[#253422]/40",
    btnClass: "bg-[#F36A32] text-white hover:bg-[#D5531E] border-none",
    visual: (
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/helixora.png"
          alt="Web Design Helixora Mockup"
          className="w-full h-full object-cover object-top"
        />
      </div>
    ),
  },
  {
    n: "02",
    title: "Mobile Apps",
    description:
      "Developing native-feel mobile applications that perform flawlessly across iOS and Android, focusing on clean architecture.",
    tags: ["iOS", "Android", "React Native", "Cross-Platform"],
    features: ["iOS Applications", "Android Applications", "Mobile Architectures", "App Store Deployment"],
    icon: <Smartphone size={20} />,
    bgGradient: "bg-[#D6DFD5]",
    cardBg: "bg-[#253422]",
    textColor: "text-[#FAF8F0]",
    mutedColor: "text-[#A3BCA0]",
    nColor: "text-[#FAF8F0]/15",
    dotClass: "bg-[#A3BCA0]",
    btnClass: "bg-[#E2F1AF] text-[#253422] hover:bg-[#C9D994] border-none",
    visual: (
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/matcha-app.png"
          alt="App Design Matcha Mockup"
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
        />
      </div>
    ),
  },
  {
    n: "03",
    title: "Digital Products",
    description:
      "Architecting complete digital products from the ground up — building cohesive systems that deliver real value to your users.",
    tags: ["Product", "Systems", "Brand Identity", "Scaling"],
    features: ["Product Engineering", "System Architecture", "Visual Identity", "Scalable Growth"],
    icon: <ImageIcon size={20} />,
    bgGradient: "bg-[#1C2C1A]",
    cardBg: "bg-[#E2F1AF]",
    textColor: "text-[#253422]",
    mutedColor: "text-[#5E6B58]",
    nColor: "text-[#253422]/15",
    dotClass: "bg-[#253422]/40",
    btnClass: "bg-[#253422] text-[#FAF8F0] hover:bg-[#344730] border-none",
    visual: (
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/stride-branding.png"
          alt="Branding Stride Mockup"
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
        />
      </div>
    ),
  },
  {
    n: "04",
    title: "Development",
    description:
      "Full-stack engineering with partners — clean code, reliable infrastructure, and real shipped products.",
    tags: ["Front-End", "Back-End", "QA", "DevOps"],
    features: ["Front-End Development", "Back-End Architecture", "API Integration", "Cloud & DevOps"],
    icon: <Code size={20} />,
    bgGradient: "bg-[#0A0F14]",
    cardBg: "bg-[#111827]",
    textColor: "text-[#F9FAFB]",
    mutedColor: "text-[#9CA3AF]",
    nColor: "text-[#F9FAFB]/10",
    dotClass: "bg-[#60A5FA]",
    btnClass: "bg-[#3B82F6] text-white hover:bg-[#2563EB] border-none",
    visual: (
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/dev-mock.png"
          alt="Development Code Mockup"
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
        />
      </div>
    ),
  },
  {
    n: "05",
    title: "AI Model Training",
    description:
      "Training custom language models and proprietary neural networks. Specializing in Somali language AI and dedicated machine learning solutions.",
    tags: ["LLMs", "Machine Learning", "Neural Networks", "NLP"],
    features: ["Custom Model Training", "Data Pipelines", "RAG Integration", "Model Fine-Tuning"],
    icon: <Cpu size={20} />,
    bgGradient: "bg-[#1E1B4B]",
    cardBg: "bg-[#F5F3FF]",
    textColor: "text-[#2E1065]",
    mutedColor: "text-[#5B21B6]",
    nColor: "text-[#2E1065]/15",
    dotClass: "bg-[#7C3AED]",
    btnClass: "bg-[#6D28D9] text-white hover:bg-[#5B21B6] border-none",
    visual: (
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-[#1E1B4B]">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#A78BFA 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        
        {/* Abstract Neural Network Vis */}
        <div className="relative flex gap-6 items-center z-10">
          <div className="flex flex-col gap-6">
            <div className="w-4 h-4 bg-[#A78BFA] rounded-full animate-pulse" />
            <div className="w-4 h-4 bg-[#A78BFA] rounded-full animate-pulse shadow-[0_0_15px_#A78BFA]" />
            <div className="w-4 h-4 bg-[#A78BFA] rounded-full animate-pulse" />
          </div>
          <div className="flex flex-col gap-8 h-full justify-center">
            <div className="w-16 h-[2px] bg-[#A78BFA]/40" />
            <div className="w-16 h-[2px] bg-[#A78BFA]/40" />
          </div>
          <div className="w-16 h-16 border-2 border-[#A78BFA] rounded-xl flex items-center justify-center bg-black/30 backdrop-blur-sm shadow-[0_0_30px_rgba(167,139,250,0.2)]">
            <Cpu className="text-[#A78BFA]" size={32} />
          </div>
        </div>
      </div>
    ),
  },
];

function ServiceCard({
  service,
  index,
  progress,
  range,
  targetScale,
}: {
  service: Service;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center px-4">
      <motion.div
        style={{ scale, top: `calc(-6vh + ${index * 26}px)` }}
        className={`relative flex h-[82vh] lg:h-[75vh] w-full max-w-6xl flex-col lg:flex-row overflow-hidden rounded-[32px] border border-hairline p-6 shadow-sm sm:p-10 gap-6 lg:gap-12 ${service.cardBg || "bg-surface"}`}
      >
        {/* Left Side (Text & Details) */}
        <div className="flex flex-col lg:w-5/12 h-full justify-center">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span
              className={`font-display text-[40px] font-light leading-none sm:text-[60px] ${service.nColor || "text-muted/25"}`}
              aria-hidden
            >
              {service.n}
            </span>
            <div>
              <h3 className={`font-display text-[28px] font-medium leading-tight sm:text-[40px] ${service.textColor || "text-ink"}`}>
                {service.title}
              </h3>
            </div>
          </div>
          
          <div className="mt-6 sm:ml-[84px]">
            <p className={`text-[17px] leading-relaxed sm:text-[19px] ${service.mutedColor || "text-muted"}`}>
              {service.description}
            </p>
            
            {/* Detailed Sub-services list */}
            <div className="mt-6 sm:mt-8">
              <h4 className={`text-[14px] font-medium uppercase tracking-wider mb-3 sm:mb-4 ${service.textColor || "text-ink"}`}>What we do</h4>
              <ul className="space-y-2 sm:space-y-3">
                {service.features.map((feat) => (
                  <li key={feat} className={`flex items-center gap-3 text-[16px] ${service.mutedColor || "text-muted"}`}>
                    <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${service.dotClass || "bg-ink/40"}`} />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side (craft visual) */}
        <div className={`flex-1 overflow-hidden rounded-[24px] border border-hairline relative h-full min-h-[200px] sm:min-h-[250px] lg:min-h-[300px] flex items-center justify-center ${service.bgGradient || "bg-off-white"}`}>
          {service.visual}
        </div>
      </motion.div>
    </div>
  );
}

export function Services() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="services" className="scroll-mt-24 bg-transparent">
      <div className="container-koodby pt-24 sm:pt-32">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <p className="eyebrow">Our services</p>
          </FadeIn>
          <WordReveal
            lines={["What we provide"]}
            className="mt-4 text-[40px] font-display leading-[1.05] tracking-tight text-ink sm:text-[56px]"
          />
        </div>
      </div>

      <div ref={container} className="relative mt-8">
        {services.map((service, i) => {
          const targetScale = 1 - (services.length - i) * 0.04;
          return (
            <ServiceCard
              key={service.n}
              index={i}
              service={service}
              progress={scrollYProgress}
              range={[i * (1 / services.length), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
