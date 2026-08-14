"use client";

/**
 * The desktop header collapses into the animated menu control after the visitor
 * leaves the hero's opening position. Mobile keeps the compact controls visible.
 */

import { useEffect, useState } from "react";
import SpaceshipHeader from "@/components/SpaceshipHeader";
import StaggeredMenu from "@/components/StaggeredMenu";
import {
  headerCollapseScrollY,
  menuButtonColors,
  menuItems,
  socialItems,
  spaceshipHeaderConfig,
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
      <SpaceshipHeader
        chatOpen={chatOpen}
        isHidden={isHeaderCollapsed || isMenuOpen}
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
        isHeaderCollapsed={isHeaderCollapsed}
        controlBoardMode
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
