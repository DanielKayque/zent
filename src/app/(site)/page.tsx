import { Navbar } from "@/components/Navbar/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { ValueProposition } from "@/components/ValueProposition/ValueProposition";
import { HowItWorks } from "@/components/HowItWorks/HowItWorks";
import { Pricing } from "@/components/Pricing/Pricing";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ValueProposition />
        <HowItWorks />
        <Pricing />
      </main>
    </>
  );
}
