"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import WhyWorkWithMe from "@/components/WhyWorkWithMe";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
        onToggleChat={() => setChatOpen((current) => !current)}
      />
      <div
        className={`grid min-h-screen transition-[grid-template-columns] duration-500 ease-in-out ${
          chatOpen ? "grid-cols-[5fr_2fr]" : "grid-cols-1"
        }`}
      >
        <div className="min-w-0">
          <main>
            <Hero />
            <About />
            <Projects />
            <WhyWorkWithMe />
            <Contact />
          </main>
          <Footer />
        </div>

        {chatOpen && (
          <aside className="min-w-0 border-l border-border-color bg-surface transition-all duration-500 ease-in-out opacity-100 translate-x-0 pointer-events-auto">
            <div className="sticky top-0 h-screen pt-20">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-border-color px-4 py-3">
                  <h2 className="text-sm font-semibold text-text-primary">Ask Shadow</h2>
                  <button
                    onClick={() => setChatOpen(false)}
                    aria-label="Close chatbot"
                    className="rounded-md px-3 py-1 text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
                <div className="h-full w-full min-h-[700px] bg-background">
                  <iframe
                    src="https://udify.app/chatbot/RplHpzybhni9hA6p"
                    title="Portfolio AI chatbot"
                    className="h-full w-full min-h-[700px]"
                    frameBorder="0"
                    allow="microphone"
                  />
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </>
  );
}
