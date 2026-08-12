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
import WhyWorkWithMe from "@/components/WhyWorkWithMe";

/** Renders the portfolio page and its optional AI chat drawer. */
export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

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
        onToggleChat={() => setChatOpen((currentState) => !currentState)}
      />
      <div className="relative z-10 min-h-screen">
        <main>
          <Hero />
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

        {chatOpen && (
          <aside
            id="shadow-chat-panel"
            className="glass fixed inset-y-0 right-0 z-[60] w-full border-l border-border-color bg-surface shadow-2xl sm:w-[min(92vw,430px)]"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border-color px-4 py-3">
                <h2 className="text-sm font-semibold text-text-primary">
                  Ask Shadow
                </h2>
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  aria-label="Close chatbot"
                  className="rounded-md px-3 py-1 text-sm text-text-secondary transition-colors duration-200 hover:bg-surface-hover hover:text-text-primary"
                >
                  Close
                </button>
              </div>
              <div className="min-h-0 flex-1 bg-background">
                <iframe
                  src="https://udify.app/chatbot/opOcJNW5av6XHYpt"
                  title="Portfolio AI chatbot"
                  className="h-full w-full"
                  allow="microphone"
                />
              </div>
            </div>
          </aside>
        )}
      </div>
    </>
  );
}
