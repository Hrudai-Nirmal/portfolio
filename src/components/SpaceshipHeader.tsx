"use client";

/**
 * Interactive overlay for the selected Mission Control Rail artwork. The
 * generated concept remains the visual source while semantic controls preserve
 * the portfolio's navigation and Shadow chatbot behavior.
 */

import type { CSSProperties } from "react";
import Image from "next/image";
import { menuItems, spaceshipHeaderConfig } from "@/content/portfolio-experience";

interface SpaceshipHeaderProps {
  chatOpen: boolean;
  onToggleChat: () => void;
}

const navigationHotspots = [
  { left: "36.4%", width: "7.3%" },
  { left: "44.1%", width: "7.3%" },
  { left: "51.8%", width: "7.3%" },
  { left: "59.5%", width: "7.3%" },
] as const;

/** Renders the persistent, image-faithful spaceship control-board header. */
export default function SpaceshipHeader({
  chatOpen,
  onToggleChat,
}: SpaceshipHeaderProps) {
  return (
    <div className="pointer-events-none fixed left-1/2 top-0 z-30 hidden w-[min(96vw,130.5rem)] -translate-x-1/2 xl:block">
      <Image
        src={spaceshipHeaderConfig.assetPath}
        alt=""
        width={2088}
        height={500}
        priority
        sizes="96vw"
        className="h-auto w-full select-none"
      />

      {menuItems.map((menuItem, menuItemIndex) => (
        <a
          key={menuItem.link}
          href={menuItem.link}
          aria-label={menuItem.ariaLabel}
          title={menuItem.label}
          className="pointer-events-auto absolute top-[29%] h-[39%] rounded-xl focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#f4efe5]"
          style={navigationHotspots[menuItemIndex] as CSSProperties}
        />
      ))}

      <button
        type="button"
        onClick={onToggleChat}
        aria-label={chatOpen ? "Close Shadow" : "Ask Shadow"}
        aria-expanded={chatOpen}
        aria-controls="shadow-chat-panel"
        title={chatOpen ? "Close Shadow" : "Ask Shadow"}
        className="pointer-events-auto absolute left-[73.3%] top-[27%] h-[43%] w-[11.3%] rounded-xl focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#d8b4fe]"
      />
    </div>
  );
}
