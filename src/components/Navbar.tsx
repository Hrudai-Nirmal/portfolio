"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
    >
      {theme === "dark" ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
      <span className="text-sm">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = () => setDropdownOpen(false);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [dropdownOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* ===== Full Header (visible at top, desktop only) ===== */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          scrolled
            ? "opacity-0 -translate-y-full pointer-events-none"
            : "opacity-100 translate-y-0"
        } hidden md:block`}
      >
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <a
            href="#home"
            className="text-xl font-bold tracking-tight text-accent"
          >
            Hrudai Nirmal
          </a>
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </div>      {/* ===== Dropdown Button (always on mobile, on scroll for desktop) ===== */}
      <div
        className={`fixed top-4 right-4 md:top-6 md:right-8 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "opacity-100 translate-y-0"
            : "md:opacity-0 md:-translate-y-4 md:pointer-events-none"
        }`}
      >
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen(!dropdownOpen);
            }}
            aria-label="Navigation menu"
            className="w-12 h-12 rounded-xl bg-surface border border-border-color backdrop-blur-md flex items-center justify-center hover:bg-surface-hover transition-all duration-300 shadow-lg"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${
                  dropdownOpen ? "rotate-45 translate-y-[4px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${
                  dropdownOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-text-primary transition-all duration-300 ${
                  dropdownOpen ? "-rotate-45 -translate-y-[4px]" : ""
                }`}
              />
            </div>
          </button>

          {/* Dropdown panel */}
          <div
            className={`absolute top-14 right-0 w-56 rounded-xl bg-surface border border-border-color backdrop-blur-md shadow-2xl overflow-hidden transition-all duration-300 origin-top-right ${
              dropdownOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-border-color my-2" />
              <div className="px-4 py-3">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
