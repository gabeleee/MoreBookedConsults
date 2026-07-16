import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Proof from "@/components/Proof";
import Levers from "@/components/Levers";
import Founder from "@/components/Founder";
import Process from "@/components/Process";
import MathCalculator from "@/components/MathCalculator";
import Audit from "@/components/Audit";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Proof />
      <Levers />
      <Founder />
      <Process />
      <MathCalculator />
      <Audit />
    </main>
  );
}
