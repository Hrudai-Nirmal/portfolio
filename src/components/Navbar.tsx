"use client";

/**
 * Coordinates the reversible desktop handoff from the mission-control rail
 * to the compact menu while preserving the mobile edge controls.
 */

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpaceshipHeader from "@/components/SpaceshipHeader";
import StaggeredMenu from "@/components/StaggeredMenu";
import {
  menuButtonColors,
  menuItems,
  socialItems,
  spaceshipHeaderConfig,
} from "@/content/portfolio-experience";

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  chatOpen: boolean;
  onToggleChat: () => void;
}

/** Renders the scroll-linked header handoff, navigation menu, and chatbot control. */
export default function Navbar({ chatOpen, onToggleChat }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigationRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const navigationElement = navigationRef.current;
    if (!navigationElement) return;

    const mediaContext = gsap.matchMedia();

    mediaContext.add("(min-width: 1280px)", () => {
      const spaceshipHeader = navigationElement.querySelector<HTMLElement>(
        ".spaceship-header",
      );
      const compactMenuHeader = navigationElement.querySelector<HTMLElement>(
        ".staggered-menu-header",
      );

      if (!spaceshipHeader || !compactMenuHeader) return;

      const handoffTimeline = gsap.timeline({ paused: true });

      handoffTimeline
        .to(spaceshipHeader, {
          y: spaceshipHeaderConfig.bounceDistancePx,
          duration: 0.22,
          ease: "power2.out",
        })
        .to(
          spaceshipHeader,
          {
            y: -220,
            autoAlpha: 0,
            duration: 0.78,
            ease: "power4.in",
          },
          0.22,
        )
        .fromTo(
          compactMenuHeader,
          { y: -112, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.68,
            ease: "back.out(1.4)",
          },
          0.32,
        );

      const handoffTrigger = ScrollTrigger.create({
        trigger: document.documentElement,
        start: 0,
        end: spaceshipHeaderConfig.scrollHandoffDistancePx,
        animation: handoffTimeline,
        scrub: true,
        invalidateOnRefresh: true,
      });

      return () => {
        handoffTrigger.kill();
        handoffTimeline.kill();
      };
    });

    return () => mediaContext.revert();
  }, []);

  return (
    <nav ref={navigationRef} aria-label="Primary navigation">
      <SpaceshipHeader
        chatOpen={chatOpen}
        onToggleChat={onToggleChat}
      />

      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={true}
        menuButtonColor={menuButtonColors.closed}
        openMenuButtonColor={menuButtonColors.open}
        changeMenuColorOnOpen={true}
        colors={["#B497CF", "#5227FF"]}
        logoUrl="/asdSDFs.jpeg"
        accentColor="#5227FF"
        isFixed
        controlBoardMode
        revealOnDesktopScroll
        menuLabel={spaceshipHeaderConfig.menuLabel}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

      <button
        type="button"
        onClick={onToggleChat}
        aria-expanded={chatOpen}
        aria-controls="shadow-chat-panel"
        className={`fixed left-5 top-5 z-50 rounded-xl border-[3px] border-black bg-[#241238] px-4 py-2.5 font-mono text-xs font-black tracking-[0.06em] text-[#d8b4fe] shadow-[4px_4px_0_#08080b] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#a78bfa] xl:hidden ${
          isMenuOpen ? "pointer-events-none -translate-y-2 opacity-0" : "opacity-100"
        }`}
      >
        {chatOpen ? "Close Shadow" : "Ask Shadow"}
      </button>
    </nav>
  );
}
