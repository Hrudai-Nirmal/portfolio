"use client";

/**
 * The desktop header collapses into the animated menu control after the visitor
 * leaves the hero's opening position. Mobile keeps the compact controls visible.
 */

import { useEffect, useState } from "react";
import StaggeredMenu from "@/components/StaggeredMenu";
import {
  headerCollapseScrollY,
  menuButtonColors,
  menuItems,
  socialItems,
  workMotionConfig,
} from "@/content/portfolio-experience";

interface NavbarProps {
  chatOpen: boolean;
  onToggleChat: () => void;
}

/** Renders the full header, its collapsed hamburger state, and chatbot control. */
export default function Navbar({ chatOpen, onToggleChat }: NavbarProps) {
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeaderState = () => {
      setIsHeaderCollapsed(window.scrollY > headerCollapseScrollY);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  return (
    <nav aria-label="Primary navigation">
      <div
        className={`fixed left-1/2 top-[clamp(1.25rem,1.5vw,2.5rem)] z-50 hidden max-w-[min(92vw,100rem)] -translate-x-1/2 overflow-hidden text-white [mask-image:linear-gradient(to_right,transparent_0,black_5%,black_88%,transparent_100%)] md:block ${
          isHeaderCollapsed || isMenuOpen
            ? "pointer-events-none"
            : "pointer-events-auto"
        }`}
        aria-hidden={isHeaderCollapsed || isMenuOpen}
      >
        <div className="flex items-center justify-center gap-[clamp(1.4rem,2.2vw,3.75rem)] whitespace-nowrap px-[clamp(2rem,4vw,6rem)]">
          <a
            href="#home"
            className="text-[clamp(0.8rem,0.72vw,1.05rem)] font-semibold tracking-[-0.02em] text-white transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            tabIndex={isHeaderCollapsed || isMenuOpen ? -1 : undefined}
            style={{
              opacity: isHeaderCollapsed || isMenuOpen ? 0 : 1,
              transform: `translateX(${isHeaderCollapsed || isMenuOpen ? workMotionConfig.headerExitStepPx : 0}px)`,
            }}
          >
            Hrudai Nirmal
          </a>
          <button
            type="button"
            onClick={onToggleChat}
            aria-expanded={chatOpen}
            aria-controls="shadow-chat-panel"
            tabIndex={isHeaderCollapsed || isMenuOpen ? -1 : undefined}
            className="text-[clamp(0.8rem,0.72vw,1.05rem)] text-white/65 transition-[transform,opacity,color] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-white"
            style={{
              opacity: isHeaderCollapsed || isMenuOpen ? 0 : 1,
              transform: `translateX(${isHeaderCollapsed || isMenuOpen ? workMotionConfig.headerExitStepPx * 2 : 0}px)`,
              transitionDelay: "45ms",
            }}
          >
            {chatOpen ? "Close Shadow" : "Ask Shadow"}
          </button>
          {menuItems.map((menuItem, menuItemIndex) => (
            <a
              key={menuItem.link}
              href={menuItem.link}
              aria-label={menuItem.ariaLabel}
              tabIndex={isHeaderCollapsed || isMenuOpen ? -1 : undefined}
              className="text-[clamp(0.8rem,0.72vw,1.05rem)] text-white/65 transition-[transform,opacity,color] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-white"
              style={{
                opacity: isHeaderCollapsed || isMenuOpen ? 0 : 1,
                transform: `translateX(${isHeaderCollapsed || isMenuOpen ? workMotionConfig.headerExitStepPx * (menuItemIndex + 3) : 0}px)`,
                transitionDelay: `${(menuItemIndex + 2) * 45}ms`,
              }}
            >
              {menuItem.label}
            </a>
          ))}
        </div>
      </div>

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
        isHeaderCollapsed={isHeaderCollapsed}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

      <button
        type="button"
        onClick={onToggleChat}
        aria-expanded={chatOpen}
        aria-controls="shadow-chat-panel"
        className={`fixed left-[5rem] top-6 z-50 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:hidden ${
          isMenuOpen ? "pointer-events-none -translate-y-2 opacity-0" : "opacity-100"
        }`}
      >
        {chatOpen ? "Close Shadow" : "Ask Shadow"}
      </button>
    </nav>
  );
}
