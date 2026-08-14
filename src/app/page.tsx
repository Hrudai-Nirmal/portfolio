"use client";

/**
 * Portfolio composition and independently layered Ask Shadow assistant. Keeping
 * chat out of the document grid protects the pinned work-scroll experience.
 */

import { useEffect, useState } from "react";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import ShadowChat from "@/components/ShadowChat";
import WhyWorkWithMe from "@/components/WhyWorkWithMe";
import { normalizeThrustLevel } from "@/lib/hero-thrust";

/** Renders the portfolio page and its optional AI chat drawer. */
export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [heroThrustLevel, setHeroThrustLevel] = useState(0);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setChatOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <Navbar
        chatOpen={chatOpen}
        thrustLevel={heroThrustLevel}
        onToggleChat={() => setChatOpen((currentState) => !currentState)}
        onThrustChange={(nextThrustLevel) => {
          setHeroThrustLevel(normalizeThrustLevel(nextThrustLevel));
        }}
      />
      <div className="relative z-10 min-h-screen">
        <main>
          <Hero thrustLevel={heroThrustLevel} />
          <div
            className="pointer-events-none relative z-20 -mt-[clamp(8rem,16vh,14rem)] h-[clamp(8rem,16vh,14rem)] bg-gradient-to-b from-transparent via-black/50 to-black"
            aria-hidden="true"
          />
          <Projects />
          <WhyWorkWithMe />
          <About />
          <Contact />
        </main>
        <Footer />

        {chatOpen && <ShadowChat onClose={() => setChatOpen(false)} />}
      </div>
    </>
  );
}
