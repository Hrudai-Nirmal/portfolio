"use client";

/**
 * Persistent mission-control navigation drawn as an interactive SVG. Every
 * navigation key and command screen is a semantic link or button target.
 */

import { useRef } from "react";
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { menuItems, spaceshipHeaderConfig } from "@/content/portfolio-experience";
import { normalizeThrustLevel } from "@/lib/hero-thrust";

interface SpaceshipHeaderProps {
  chatOpen: boolean;
  thrustLevel: number;
  onToggleChat: () => void;
  onThrustChange: (nextThrustLevel: number) => void;
}

const keyPositions = [480, 625, 770, 915] as const;
const HEADER_SUSPENSION_BAR_X_POSITIONS = [590, 962] as const;
const HEADER_SUSPENSION_TOP_Y = -120;
const HEADER_SUSPENSION_BOTTOM_Y = 166;
const THRUST_TRACK_START_X = 1438;
const THRUST_TRACK_END_X = 1513;
const THRUST_KEYBOARD_STEP = 0.05;

function NavigationGlyph({ index, x }: { index: number; x: number }) {
  const glyphCenterX = x + 63.5;
  const glyphCenterY = 110;

  if (index === 0) {
    return (
      <g fill="currentColor">
        <path d={`M ${glyphCenterX - 21} ${glyphCenterY - 5} L ${glyphCenterX} ${glyphCenterY - 24} L ${glyphCenterX + 21} ${glyphCenterY - 5} L ${glyphCenterX + 16} ${glyphCenterY - 5} V ${glyphCenterY + 22} H ${glyphCenterX + 5} V ${glyphCenterY + 5} H ${glyphCenterX - 5} V ${glyphCenterY + 22} H ${glyphCenterX - 16} V ${glyphCenterY - 5} Z`} />
      </g>
    );
  }

  if (index === 1) {
    return (
      <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round">
        <rect x={glyphCenterX - 23} y={glyphCenterY - 12} width="46" height="31" rx="3" />
        <path d={`M ${glyphCenterX - 9} ${glyphCenterY - 12} V ${glyphCenterY - 20} H ${glyphCenterX + 9} V ${glyphCenterY - 12} M ${glyphCenterX - 23} ${glyphCenterY - 1} H ${glyphCenterX + 23}`} />
      </g>
    );
  }

  if (index === 2) {
    return (
      <g fill="currentColor">
        <circle cx={glyphCenterX} cy={glyphCenterY - 17} r="10" />
        <path d={`M ${glyphCenterX - 20} ${glyphCenterY + 21} C ${glyphCenterX - 19} ${glyphCenterY + 6} ${glyphCenterX + 19} ${glyphCenterY + 6} ${glyphCenterX + 20} ${glyphCenterY + 21} Z`} />
      </g>
    );
  }

  return (
    <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round">
      <rect x={glyphCenterX - 25} y={glyphCenterY - 16} width="50" height="34" rx="3" />
      <path d={`M ${glyphCenterX - 23} ${glyphCenterY - 12} L ${glyphCenterX} ${glyphCenterY + 4} L ${glyphCenterX + 23} ${glyphCenterY - 12}`} />
    </g>
  );
}

function PanelScrew({ x, y }: { x: number; y: number }) {
  return (
    <g stroke="#08080b" strokeWidth="3" strokeLinecap="round">
      <circle cx={x} cy={y} r="8" fill="#8f908f" />
      <path d={`M ${x - 3} ${y - 3} L ${x + 3} ${y + 3} M ${x + 3} ${y - 3} L ${x - 3} ${y + 3}`} />
    </g>
  );
}

function HeaderSuspensionBar({ x }: { x: number }) {
  return (
    <g data-header-suspension="true" aria-hidden="true">
      <rect
        x={x - 16}
        y={HEADER_SUSPENSION_TOP_Y}
        width="32"
        height={HEADER_SUSPENSION_BOTTOM_Y - HEADER_SUSPENSION_TOP_Y}
        rx="9"
        fill="#292a31"
        stroke="#070709"
        strokeWidth="8"
      />
      <path
        d={`M ${x - 7} ${HEADER_SUSPENSION_TOP_Y + 6} V 23`}
        fill="none"
        stroke="#5f616b"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d={`M ${x - 14} -20 H ${x + 14} M ${x - 14} 4 H ${x + 14}`}
        fill="none"
        stroke="#0b0c0f"
        strokeWidth="6"
      />
      <path
        d={`M ${x - 10} -20 H ${x + 10} M ${x - 10} 4 H ${x + 10}`}
        fill="none"
        stroke="#4a4c55"
        strokeWidth="2"
      />
      <rect
        x={x - 27}
        y="13"
        width="54"
        height="42"
        rx="10"
        fill="#34353d"
        stroke="#070709"
        strokeWidth="7"
      />
      <circle cx={x - 14} cy="29" r="5" fill="#9a9ba0" stroke="#08080b" strokeWidth="3" />
      <circle cx={x + 14} cy="29" r="5" fill="#9a9ba0" stroke="#08080b" strokeWidth="3" />
      <path d={`M ${x - 18} 46 H ${x + 18}`} stroke="#17181d" strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

/** Renders the persistent, responsive spaceship control-board header. */
export default function SpaceshipHeader({
  chatOpen,
  thrustLevel,
  onToggleChat,
  onThrustChange,
}: SpaceshipHeaderProps) {
  const isThrustDraggingRef = useRef(false);
  const normalizedThrustLevel = normalizeThrustLevel(thrustLevel);
  const thrustPercentage = Math.round(normalizedThrustLevel * 100);
  const thrustKnobX =
    THRUST_TRACK_START_X +
    normalizedThrustLevel * (THRUST_TRACK_END_X - THRUST_TRACK_START_X);

  const handleShadowKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggleChat();
    }
  };

  const updateThrustFromPointer = (event: ReactPointerEvent<SVGGElement>) => {
    const svgElement = event.currentTarget.ownerSVGElement;
    if (!svgElement) return;

    const svgBounds = svgElement.getBoundingClientRect();
    if (svgBounds.width <= 0) return;

    const pointerX =
      ((event.clientX - svgBounds.left) / svgBounds.width) * 1600;
    const nextThrustLevel =
      (pointerX - THRUST_TRACK_START_X) /
      (THRUST_TRACK_END_X - THRUST_TRACK_START_X);
    onThrustChange(normalizeThrustLevel(nextThrustLevel));
  };

  const handleThrustKeyDown = (event: KeyboardEvent<SVGGElement>) => {
    let nextThrustLevel = normalizedThrustLevel;

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      nextThrustLevel += THRUST_KEYBOARD_STEP;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      nextThrustLevel -= THRUST_KEYBOARD_STEP;
    } else if (event.key === "Home") {
      nextThrustLevel = 0;
    } else if (event.key === "End") {
      nextThrustLevel = 1;
    } else {
      return;
    }

    event.preventDefault();
    onThrustChange(normalizeThrustLevel(nextThrustLevel));
  };

  return (
    <div className="spaceship-header pointer-events-none fixed left-1/2 top-3 z-30 hidden w-[min(94vw,100rem)] origin-top -translate-x-1/2 scale-[0.7] xl:block">
      <svg
        viewBox="0 0 1600 240"
        role="img"
        aria-labelledby="mission-control-title"
        className="h-auto w-full overflow-visible [filter:drop-shadow(8px_10px_0_#050507)]"
      >
        <title id="mission-control-title">Mission control navigation</title>
        <defs>
          <clipPath id="destination-planet-clip">
            <circle cx="365" cy="108" r="19" />
          </clipPath>
          <pattern
            id="shadow-crt-scanlines"
            patternUnits="userSpaceOnUse"
            width="4"
            height="4"
          >
            <rect width="4" height="1" fill="#e2a2ff" opacity="0.18" />
          </pattern>
        </defs>

        {HEADER_SUSPENSION_BAR_X_POSITIONS.map((suspensionBarX) => (
          <HeaderSuspensionBar key={suspensionBarX} x={suspensionBarX} />
        ))}

        <g aria-hidden="true">
          <path d="M 58 100 H 1548 Q 1575 100 1575 126 Q 1575 152 1548 152 H 58 Q 25 152 25 126 Q 25 100 58 100 Z" fill="#24252b" stroke="#070709" strokeWidth="9" />
          <path d="M 18 109 H 52 V 172 H 18 Q 5 172 5 159 V 122 Q 5 109 18 109 Z" fill="#1d1e23" stroke="#070709" strokeWidth="7" />
          <path d="M 1548 105 H 1580 Q 1595 105 1595 120 V 174 Q 1595 190 1579 190 H 1564" fill="none" stroke="#24252b" strokeWidth="18" />
          <path d="M 1548 105 H 1580 Q 1595 105 1595 120 V 174 Q 1595 190 1579 190 H 1564" fill="none" stroke="#070709" strokeWidth="7" />
        </g>

        <g aria-label="Destination radar progress">
          <rect x="34" y="36" width="405" height="164" rx="20" fill="#222329" stroke="#070709" strokeWidth="10" />
          <rect x="52" y="50" width="369" height="132" rx="13" fill="#071006" stroke="#08080b" strokeWidth="7" />
          <image
            href="/mission-radar.png"
            x="57"
            y="55"
            width="359"
            height="120"
            preserveAspectRatio="xMidYMid slice"
          />
          <g aria-hidden="true" pointerEvents="none">
            <path
              d="M 114 127 C 184 121 246 80 365 108"
              fill="none"
              stroke="#80da22"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.12"
            />
            <path
              d="M 114 127 C 184 121 246 80 365 108"
              fill="none"
              stroke="#b7ff4f"
              strokeWidth="3"
              strokeLinecap="round"
              className="radar-route-progress [filter:drop-shadow(0_0_5px_#80da22)]"
            />
            <g className="radar-current-beacon [filter:drop-shadow(0_0_7px_#b7ff4f)]">
              <circle cx="220" cy="105" r="10" fill="none" stroke="#b7ff4f" strokeWidth="2" />
              <circle cx="220" cy="105" r="4" fill="#d9ff9d" />
            </g>
          </g>
          <image
            href="/mission-radar.png"
            x="57"
            y="55"
            width="359"
            height="120"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#destination-planet-clip)"
            pointerEvents="none"
          />
          <rect x="63" y="61" width="347" height="108" rx="10" fill="none" stroke="#80da22" strokeOpacity="0.35" strokeWidth="2" />
          <rect x="196" y="26" width="98" height="24" rx="7" fill="#1f2025" stroke="#08080b" strokeWidth="7" />
          <rect x="215" y="33" width="60" height="8" rx="4" fill="#80da22" className="[filter:drop-shadow(0_0_7px_#80da22)]" />
          <path d="M 314 43 H 362 L 371 25 H 323 Z" fill="#d83420" stroke="#08080b" strokeWidth="6" />
          <path d="M 120 36 V 8" stroke="#6f7075" strokeWidth="8" />
          <circle cx="120" cy="7" r="13" fill="#b64cff" stroke="#08080b" strokeWidth="6" />
          <circle cx="115" cy="2" r="4" fill="#efb3ff" />
          <PanelScrew x={68} y={65} />
          <PanelScrew x={404} y={65} />
          <PanelScrew x={68} y={168} />
          <PanelScrew x={404} y={168} />
          <text x="77" y="77" fill="#a6ff4d" fontFamily="var(--font-geist-mono), monospace" fontSize="10" fontWeight="900" letterSpacing="1.2" className="[filter:drop-shadow(0_0_4px_#80da22)]">
            DESTINATION 68%
          </text>
        </g>

        <g aria-label="Navigation module">
          <rect x="452" y="25" width="648" height="186" rx="20" fill="#202126" stroke="#070709" strokeWidth="10" />
          <rect x="470" y="46" width="612" height="143" rx="15" fill="#111216" stroke="#070709" strokeWidth="7" />
          <PanelScrew x={470} y={42} />
          <PanelScrew x={1082} y={42} />
          <PanelScrew x={470} y={194} />
          <PanelScrew x={1082} y={194} />

          {menuItems.map((menuItem, menuItemIndex) => {
            const keyX = keyPositions[menuItemIndex];
            return (
              <a
                key={menuItem.link}
                href={menuItem.link}
                aria-label={menuItem.ariaLabel}
                data-console-key="navigation"
                className="group pointer-events-auto text-[#f2f0ea] outline-none"
              >
                <title>{menuItem.label}</title>
                <path
                  data-console-key-shell="true"
                  d={`M ${keyX + 12} 57 H ${keyX + 115} L ${keyX + 127} 69 V 164 L ${keyX + 115} 176 H ${keyX + 12} L ${keyX} 164 V 69 Z`}
                  fill="#34353d"
                  stroke="#070709"
                  strokeWidth="7"
                  className="transition-colors duration-200 group-hover:fill-[#41434c] group-focus-visible:stroke-[#60a5fa]"
                />
                <g data-console-key-guard="true" fill="#17181d" stroke="#070709" strokeWidth="4">
                  <rect x={keyX + 1} y="83" width="8" height="54" rx="4" className="transition-colors group-hover:fill-[#565963]" />
                  <rect x={keyX + 118} y="83" width="8" height="54" rx="4" className="transition-colors group-hover:fill-[#565963]" />
                </g>
                <path
                  d={`M ${keyX + 20} 154 H ${keyX + 107} L ${keyX + 98} 164 H ${keyX + 29} Z`}
                  fill="#090a0d"
                  stroke="#070709"
                  strokeWidth="3"
                />
                <g className="transition-transform duration-150 group-active:[transform:translateY(3px)]">
                  <path
                    d={`M ${keyX + 17} 75 L ${keyX + 27} 67 H ${keyX + 100} L ${keyX + 110} 75 V 141 L ${keyX + 100} 150 H ${keyX + 27} L ${keyX + 17} 141 Z`}
                    fill="#17181d"
                    stroke="#08080b"
                    strokeWidth="5"
                    className="transition-colors duration-200 group-hover:fill-[#e4ded1]"
                  />
                  <path
                    d={`M ${keyX + 28} 73 H ${keyX + 99}`}
                    fill="none"
                    stroke="#5c5f69"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="transition-colors group-hover:stroke-[#a19b90]"
                  />
                  <rect
                    x={keyX + 23}
                    y="78"
                    width="81"
                    height="63"
                    rx="7"
                    fill="none"
                    stroke="#646670"
                    strokeWidth="2"
                    strokeDasharray="4 5"
                    className="transition-colors group-hover:stroke-[#777168]"
                  />
                  <path
                    d={`M ${keyX + 27} 88 V 82 H ${keyX + 33} M ${keyX + 94} 82 H ${keyX + 100} V 88 M ${keyX + 27} 131 V 137 H ${keyX + 33} M ${keyX + 94} 137 H ${keyX + 100} V 131`}
                    fill="none"
                    stroke="#92949d"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-colors group-hover:stroke-[#403d38]"
                  />
                  <circle cx={keyX + 23} cy="73" r="3.5" fill="#aeb0b4" stroke="#08080b" strokeWidth="2" />
                  <circle cx={keyX + 104} cy="73" r="3.5" fill="#aeb0b4" stroke="#08080b" strokeWidth="2" />
                  <g className="transition-colors duration-200 group-hover:text-[#111216]">
                    <NavigationGlyph index={menuItemIndex} x={keyX} />
                  </g>
                </g>
                <rect
                  data-console-key-lamp-housing="true"
                  x={keyX + 27}
                  y="154"
                  width="73"
                  height="17"
                  rx="8.5"
                  fill="#08090c"
                  stroke="#4c4f58"
                  strokeWidth="3"
                />
                <rect x={keyX + 35} y="159" width="57" height="7" rx="3.5" fill="#238dff" className="transition-[fill,filter] duration-200 [filter:drop-shadow(0_0_5px_#238dff)] group-hover:fill-[#f0b90b] group-hover:[filter:drop-shadow(0_0_6px_#f0b90b)]" />
              </a>
            );
          })}

          <path d="M 690 211 V 220 Q 690 234 675 234 H 635 Q 620 234 620 219" fill="none" stroke="#238dff" strokeWidth="8" strokeLinecap="round" />
          <path d="M 885 211 V 220 Q 885 234 870 234 H 830 Q 815 234 815 219" fill="none" stroke="#8b35d5" strokeWidth="8" strokeLinecap="round" />
        </g>

        <g aria-label="Command module">
          <rect x="1118" y="31" width="470" height="174" rx="20" fill="#f2ecdf" stroke="#070709" strokeWidth="10" />
          <PanelScrew x={1138} y={50} />
          <PanelScrew x={1568} y={50} />
          <PanelScrew x={1138} y={187} />
          <PanelScrew x={1568} y={187} />
          <path d="M 1148 60 H 1168 M 1148 73 H 1168 M 1148 86 H 1168" stroke="#111216" strokeWidth="7" strokeLinecap="round" />

          <g
            role="button"
            tabIndex={0}
            data-shadow-crt="true"
            aria-label={chatOpen ? "Close Shadow" : "Ask Shadow"}
            aria-expanded={chatOpen}
            aria-controls="shadow-chat-panel"
            onClick={onToggleChat}
            onKeyDown={handleShadowKeyDown}
            className="group pointer-events-auto cursor-pointer outline-none"
          >
            <g data-shadow-crt-antenna="true" fill="none" stroke="#08080b" strokeWidth="6" strokeLinecap="round">
              <path d="M 1213 54 L 1188 28" />
              <path d="M 1236 54 L 1264 27" />
              <circle cx="1187" cy="27" r="6" fill="#d83420" />
              <circle cx="1265" cy="26" r="6" fill="#f0b90b" />
            </g>
            <rect
              x="1183"
              y="49"
              width="203"
              height="118"
              rx="22"
              fill="#564630"
              stroke="#08080b"
              strokeWidth="9"
              className="transition-colors group-hover:fill-[#715c3f] group-focus-visible:stroke-[#b85cff]"
            />
            <rect x="1192" y="58" width="147" height="100" rx="28" fill="#151117" stroke="#08080b" strokeWidth="5" />
            <rect x="1200" y="65" width="131" height="86" rx="24" fill="#261438" stroke="#613478" strokeWidth="3" className="transition-colors group-hover:fill-[#351848]" />
            <rect x="1203" y="68" width="125" height="80" rx="21" fill="url(#shadow-crt-scanlines)" pointerEvents="none" />
            <path d="M 1213 76 Q 1262 63 1317 77" fill="none" stroke="#e4a4ff" strokeWidth="4" strokeLinecap="round" opacity="0.18" pointerEvents="none" />
            <text x="1210" y="88" fill="#d77cff" fontFamily="var(--font-geist-mono), monospace" fontSize="15" fontWeight="900" className="[filter:drop-shadow(0_0_5px_#b85cff)]">
              &gt;_
            </text>
            <text x="1210" y="114" fill="#d77cff" fontFamily="var(--font-geist-mono), monospace" fontSize={chatOpen ? 16 : 19} fontWeight="900" className="[filter:drop-shadow(0_0_5px_#b85cff)]">
              {chatOpen ? "CLOSE" : "ASK"}
            </text>
            <text x="1210" y="137" fill="#d77cff" fontFamily="var(--font-geist-mono), monospace" fontSize="18" fontWeight="900" className="[filter:drop-shadow(0_0_5px_#b85cff)]">
              SHADOW
            </text>
            <g data-shadow-crt-controls="true">
              <rect x="1342" y="59" width="34" height="97" rx="9" fill="#252228" stroke="#08080b" strokeWidth="5" />
              <circle cx="1359" cy="81" r="9" fill="#d8c9a9" stroke="#08080b" strokeWidth="4" />
              <path d="M 1359 75 V 81" stroke="#6f5e44" strokeWidth="3" strokeLinecap="round" />
              <circle cx="1359" cy="111" r="9" fill="#d83420" stroke="#08080b" strokeWidth="4" />
              <path d="M 1359 105 V 111" stroke="#ff9c87" strokeWidth="3" strokeLinecap="round" />
              <path d="M 1350 136 H 1368 M 1350 143 H 1368 M 1350 150 H 1368" stroke="#0b0c0f" strokeWidth="4" strokeLinecap="round" />
            </g>
            <path d="M 1207 167 H 1227 V 172 H 1203 Z M 1342 167 H 1362 L 1366 172 H 1346 Z" fill="#30271d" stroke="#08080b" strokeWidth="3" />
          </g>

          <rect x="1183" y="174" width="203" height="21" rx="7" fill="#17171c" stroke="#08080b" strokeWidth="5" />
          <circle cx="1200" cy="184.5" r="5" fill="#b94cff" className="[filter:drop-shadow(0_0_5px_#b94cff)]" />
          <text x="1213" y="189" fill="#d77cff" fontFamily="var(--font-geist-mono), monospace" fontSize="12" fontWeight="900" letterSpacing="1.5">
            {spaceshipHeaderConfig.statusLabel}
          </text>

          <g
            role="slider"
            tabIndex={0}
            aria-label="Hero background thrust"
            aria-controls="home"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={thrustPercentage}
            aria-valuetext={`${thrustPercentage}% thrust`}
            onKeyDown={handleThrustKeyDown}
            onPointerDown={(event) => {
              event.currentTarget.focus();
              event.preventDefault();
              isThrustDraggingRef.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
              updateThrustFromPointer(event);
            }}
            onPointerMove={(event) => {
              if (isThrustDraggingRef.current) {
                updateThrustFromPointer(event);
              }
            }}
            onPointerUp={(event) => {
              isThrustDraggingRef.current = false;
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }
            }}
            onPointerCancel={() => {
              isThrustDraggingRef.current = false;
            }}
            onLostPointerCapture={() => {
              isThrustDraggingRef.current = false;
            }}
            className="group pointer-events-auto cursor-ew-resize select-none outline-none [touch-action:none]"
          >
            <title>Adjust the hero background speed</title>
            <rect x="1404" y="49" width="143" height="146" rx="16" fill="#202126" stroke="#08080b" strokeWidth="8" className="group-focus-visible:stroke-[#f4efe5]" />
            <rect x="1417" y="62" width="117" height="28" rx="7" fill="#f0b90b" stroke="#08080b" strokeWidth="5" />
            <text x="1475.5" y="81" textAnchor="middle" fill="#111216" fontFamily="var(--font-geist-mono), monospace" fontSize="12" fontWeight="900" letterSpacing="1.2">
              AUX THRUST
            </text>
            <rect x="1422" y="101" width="107" height="42" rx="8" fill="#101116" stroke="#08080b" strokeWidth="5" />
            <path d={`M ${THRUST_TRACK_START_X} 122 H ${THRUST_TRACK_END_X}`} stroke="#484a53" strokeWidth="8" strokeLinecap="round" />
            <path d={`M ${THRUST_TRACK_START_X} 122 H ${thrustKnobX}`} stroke="#35a8ff" strokeWidth="8" strokeLinecap="round" className="[filter:drop-shadow(0_0_5px_#35a8ff)]" />
            <circle cx={thrustKnobX} cy="122" r="13" fill={normalizedThrustLevel >= 0.7 ? "#f0b90b" : "#d83420"} stroke="#08080b" strokeWidth="5" />
            <circle cx={thrustKnobX - 4} cy="118" r="4" fill={normalizedThrustLevel >= 0.7 ? "#fff0a8" : "#ff8a72"} />
            <rect x="1420" y="153" width="111" height="27" rx="6" fill="#16171b" stroke="#08080b" strokeWidth="5" />
            <circle cx="1435" cy="166.5" r="5" fill="#35a8ff" className="[filter:drop-shadow(0_0_4px_#35a8ff)]" />
            <text x="1447" y="171" fill="#f2ecdf" fontFamily="var(--font-geist-mono), monospace" fontSize="10" fontWeight="900" letterSpacing="0.4">
              {`THRUST ${String(thrustPercentage).padStart(3, "0")}%`}
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
