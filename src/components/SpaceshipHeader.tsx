"use client";

/**
 * Neo-brutalist mission-control rail used as the portfolio's expanded desktop
 * navigation. Its controls retain the existing section and chatbot behavior.
 */

import {
  BriefcaseIcon,
  EnvelopeIcon,
  HomeIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import {
  menuItems,
  spaceshipHeaderConfig,
  workMotionConfig,
} from "@/content/portfolio-experience";

interface SpaceshipHeaderProps {
  chatOpen: boolean;
  isHidden: boolean;
  onToggleChat: () => void;
}

const navigationIcons = [HomeIcon, BriefcaseIcon, UserIcon, EnvelopeIcon];

/** Renders the selected modular spaceship control-board header. */
export default function SpaceshipHeader({
  chatOpen,
  isHidden,
  onToggleChat,
}: SpaceshipHeaderProps) {
  return (
    <div
      className={`spaceship-header fixed left-1/2 top-5 z-30 hidden w-[min(91vw,74rem)] -translate-x-1/2 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] xl:block ${
        isHidden
          ? "pointer-events-none translate-x-[calc(-50%+5rem)] opacity-0"
          : "pointer-events-auto opacity-100"
      }`}
      aria-hidden={isHidden}
    >
      <div className="relative flex h-[7.5rem] items-stretch">
        <div className="absolute inset-x-4 top-1/2 -z-10 h-8 -translate-y-1/2 rounded-md border-[4px] border-black bg-[#25242b] shadow-[0_7px_0_#08080b]" />

        <a
          href="#home"
          tabIndex={isHidden ? -1 : undefined}
          className="group relative z-10 flex w-[30%] min-w-[17rem] flex-col justify-center rounded-[1.15rem] border-[5px] border-[#08080b] bg-[#f4efe5] px-7 text-[#101014] shadow-[7px_8px_0_#08080b] transition-transform hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#8b5cf6]"
        >
          <span className="font-mono text-[0.62rem] font-bold tracking-[0.18em] text-[#5227ff]">
            {spaceshipHeaderConfig.systemLabel}
          </span>
          <span className="mt-1.5 text-[clamp(1.35rem,1.8vw,1.9rem)] font-black leading-none tracking-[-0.045em]">
            Hrudai Nirmal
          </span>
          <span className="mt-2 font-mono text-[0.58rem] font-bold tracking-[0.12em] text-[#2563eb]">
            {spaceshipHeaderConfig.roleLabel}
          </span>
          <span className="absolute -top-3 right-6 h-5 w-12 rounded-full border-[3px] border-[#08080b] bg-[#19191f] p-1">
            <span className="block h-full w-full rounded-full bg-[#60a5fa] shadow-[0_0_12px_#60a5fa]" />
          </span>
        </a>

        <div className="relative z-0 ml-3 flex min-w-0 flex-1 items-center rounded-[1.15rem] border-[5px] border-[#08080b] bg-[#17171c] px-3 shadow-[7px_8px_0_#08080b]">
          <div className="grid w-full grid-cols-4 gap-2">
            {menuItems.map((menuItem, menuItemIndex) => {
              const NavigationIcon = navigationIcons[menuItemIndex];
              return (
                <a
                  key={menuItem.link}
                  href={menuItem.link}
                  aria-label={menuItem.ariaLabel}
                  tabIndex={isHidden ? -1 : undefined}
                  className="group flex min-w-0 flex-col items-center justify-center rounded-xl border-[3px] border-black bg-[#25242b] px-2 py-3 text-white shadow-[0_4px_0_#08080b] transition-[transform,background,color,opacity] duration-300 hover:-translate-y-1 hover:bg-[#f4efe5] hover:text-[#111116] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#a78bfa]"
                  style={{
                    transitionDelay: `${menuItemIndex * 45}ms`,
                    transform: isHidden
                      ? `translateX(${workMotionConfig.headerExitStepPx * (menuItemIndex + 1)}px)`
                      : undefined,
                  }}
                >
                  <NavigationIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="mt-1.5 truncate font-mono text-[0.64rem] font-bold uppercase tracking-[0.08em]">
                    {menuItem.label}
                  </span>
                  <span className="mt-2 h-1 w-7 rounded-full bg-[#5227ff] transition-[width,background] group-hover:w-10 group-hover:bg-[#f0c419]" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 ml-3 flex w-[calc(18%+6.4rem)] min-w-[17rem] rounded-[1.15rem] border-[5px] border-[#08080b] bg-[#f4efe5] py-2.5 pl-3 pr-[6.35rem] shadow-[7px_8px_0_#08080b]">
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <span className="mb-1.5 pl-1 font-mono text-[0.55rem] font-bold tracking-[0.15em] text-[#5227ff]">
              AI CO-PILOT
            </span>
            <button
              type="button"
              onClick={onToggleChat}
              aria-expanded={chatOpen}
              aria-controls="shadow-chat-panel"
              tabIndex={isHidden ? -1 : undefined}
              className="group flex min-h-16 items-center justify-between rounded-xl border-[4px] border-[#08080b] bg-[#241238] px-4 text-left text-[#d8b4fe] shadow-[0_5px_0_#08080b] transition-transform hover:-translate-y-1 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#5227ff]"
            >
              <span className="font-mono text-[0.78rem] font-black leading-tight tracking-[0.05em]">
                {chatOpen ? "CLOSE" : "ASK"}
                <br />
                SHADOW
              </span>
              <SparklesIcon
                className="h-6 w-6 transition-transform group-hover:rotate-12 group-hover:scale-110"
                aria-hidden="true"
              />
            </button>
            <span className="mt-1.5 flex items-center gap-1.5 pl-1 font-mono text-[0.48rem] font-bold tracking-[0.12em] text-[#111116]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635]" />
              {spaceshipHeaderConfig.statusLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
