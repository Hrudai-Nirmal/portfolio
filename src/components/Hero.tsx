"use client";

/**
 * Full-viewport introduction that pairs the exact Lightfall configuration with
 * a looping professional-role headline and direct paths into the portfolio.
 */

import Lightfall from "@/components/Lightfall";
import TypingHeadline from "@/components/TypingHeadline";
import {
  heroSubheading,
  heroTypingPhrases,
  lightfallProps,
} from "@/content/portfolio-experience";
import { getHeroThrustEffects } from "@/lib/hero-thrust";

interface HeroProps {
  thrustLevel: number;
}

/** Renders the animated portfolio hero. */
export default function Hero({ thrustLevel }: HeroProps) {
  const thrustEffects = getHeroThrustEffects(thrustLevel);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-black px-6 py-28 text-white md:px-12 lg:px-20"
    >
      <div className="absolute inset-0">
        <Lightfall
          {...lightfallProps}
          speed={thrustEffects.speed}
          streakLength={thrustEffects.streakLength}
          glow={thrustEffects.glow}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.5)_52%,rgba(0,0,0,0.16)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[min(90vw,112rem)]">
        <p className="mb-[clamp(1.5rem,2vw,2.75rem)] font-mono text-[clamp(0.72rem,0.65vw,1rem)] font-medium uppercase tracking-[0.28em] text-[#A6C8FF]">
          Software engineer · Bangalore
        </p>
        <h1 className="max-w-[15ch] text-[clamp(3.25rem,7.6vw,11rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-white">
          <TypingHeadline phrases={heroTypingPhrases} />
        </h1>
        <p className="mt-[clamp(2rem,2.5vw,3.5rem)] max-w-[48rem] text-[clamp(1rem,1.15vw,1.6rem)] leading-[1.6] text-white/72">
          {heroSubheading}
        </p>

        <div className="mt-10 flex flex-wrap gap-4 md:mt-12">
          <a
            href="#work"
            className="pointer-events-auto inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Explore my work
          </a>
          <a
            href="#contact"
            className="pointer-events-auto inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Start a conversation
          </a>
        </div>
      </div>

      <p className="absolute bottom-8 right-6 z-10 hidden font-mono text-[0.68rem] uppercase tracking-[0.22em] text-white/45 md:block md:right-12 lg:right-20">
        Scroll to explore
      </p>
    </section>
  );
}
