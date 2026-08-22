import React from "react";
import Hero from "./Hero";
import Section from "./Section";
import { Story } from "./Story";
import ResSection from "./ResSection";

const Divider = () => (
  <div className="relative w-full h-[1px] bg-[#050505] overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
  </div>
);

const Home = () => {
  return (
    <main className="bg-[#050505] min-h-screen">
      <Hero />

      <Divider />

      <Section />

      <Divider />

      <Story />

      <Divider />

      <ResSection />

      <div className="py-10 text-center">
        <p className="text-[#D4AF37]/20 text-[10px] tracking-[1em] uppercase font-black">
          L'Étoile d'Or — L'Excellence Sans Compromis
        </p>
      </div>
    </main>
  );
};

export default Home;
