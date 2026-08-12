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
        className={`fixed inset-x-0 top-0 z-50 hidden items-center justify-between px-8 py-6 text-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:flex lg:px-12 ${
          isHeaderCollapsed || isMenuOpen
            ? "pointer-events-none -translate-y-4 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
        aria-hidden={isHeaderCollapsed || isMenuOpen}
      >
        <a
          href="#home"
          className="text-sm font-semibold tracking-[-0.02em] text-white"
          tabIndex={isHeaderCollapsed || isMenuOpen ? -1 : undefined}
        >
          Hrudai Nirmal
        </a>
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={onToggleChat}
            aria-expanded={chatOpen}
            aria-controls="shadow-chat-panel"
            tabIndex={isHeaderCollapsed || isMenuOpen ? -1 : undefined}
            className="text-sm text-white/65 transition-colors duration-200 hover:text-white"
          >
            {chatOpen ? "Close Shadow" : "Ask Shadow"}
          </button>
          {menuItems.map((menuItem, menuItemIndex) => (
            <a
              key={menuItem.link}
              href={menuItem.link}
              aria-label={menuItem.ariaLabel}
              tabIndex={isHeaderCollapsed || isMenuOpen ? -1 : undefined}
              className={`text-sm text-white/65 transition-all duration-500 hover:text-white ${
                isHeaderCollapsed ? "translate-x-10 opacity-0" : "translate-x-0 opacity-100"
              }`}
              style={{ transitionDelay: `${menuItemIndex * 45}ms` }}
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
