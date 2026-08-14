/**
 * Locks the hero, menu, and work-story requirements for the animated portfolio
 * experience before visual components are wired to them.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import {
  heroTypingPhrases,
  heroSubheading,
  getWorkTitleRemainingScrollDistance,
  lightfallProps,
  menuButtonColors,
  menuItems,
  orderedWorkTitles,
  spaceshipHeaderConfig,
  workMotionConfig,
} from "../src/content/portfolio-experience.ts";
import {
  advanceLightfallTime,
  getLightfallRenderDpr,
  shouldRenderLightfallFrame,
} from "../src/lib/lightfall-performance.ts";
import {
  getHeroThrustEffects,
  normalizeThrustLevel,
} from "../src/lib/hero-thrust.ts";
import {
  getLocalShadowReply,
  normalizeShadowQuery,
} from "../src/lib/shadow-chat.ts";

test("hero typing phrases follow the requested loop order", () => {
  assert.deepEqual(heroTypingPhrases, [
    "Hrudai Nirmal",
    "Agentic AI engineer",
    "Full stack developer",
  ]);
  assert.match(heroSubheading, /^Bangalore based software engineer/i);
});

test("Lightfall parameters match the supplied example exactly", () => {
  assert.deepEqual(lightfallProps, {
    colors: ["#A6C8FF", "#5227FF", "#FF9FFC"],
    backgroundColor: "#000000",
    speed: 0.5,
    streakCount: 2,
    streakWidth: 1,
    streakLength: 3,
    glow: 0.2,
    density: 0.4,
    twinkle: 1,
    zoom: 3,
    backgroundGlow: 0,
    opacity: 1,
    mouseInteraction: true,
    mouseStrength: 0.5,
    mouseRadius: 1,
    color1: "#A6C8FF",
    color2: "#5227FF",
    color3: "#FF9FFC",
  });
});

test("menu links remain section-based and work begins with the requested projects", () => {
  assert.deepEqual(
    menuItems.map((menuItem) => menuItem.link),
    ["#home", "#work", "#about", "#contact"],
  );
  assert.deepEqual(orderedWorkTitles.slice(0, 3), [
    "Meridian AI Workflow Control Room",
    "Cortex Enterprise RAG",
    "Cortana Personal AI Agent",
  ]);
});

test("hamburger colors match the restored interaction", () => {
  assert.deepEqual(menuButtonColors, {
    closed: "#ffffff",
    open: "#111111",
  });
});

test("spaceship header keeps the selected mission-control hierarchy", () => {
  assert.deepEqual(spaceshipHeaderConfig, {
    isPersistent: false,
    scrollHandoffTriggerPx: 160,
    bounceDistancePx: 18,
    systemLabel: "NAV-COM // 01",
    roleLabel: "SOFTWARE ENGINEER · BANGALORE",
    statusLabel: "PRIMARY ACTION",
    aiLabel: "ASK SHADOW",
    menuLabel: "MENU",
  });
});

test("spaceship header is composed as interactive SVG instead of a full-header image", () => {
  const spaceshipHeaderSource = readFileSync(
    new URL("../src/components/SpaceshipHeader.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(spaceshipHeaderSource.includes("next/image"), false);
  assert.equal(spaceshipHeaderSource.includes("mission-control-rail.png"), false);
  assert.equal(spaceshipHeaderSource.includes("<svg"), true);
  assert.equal(spaceshipHeaderSource.includes("menuItems.map"), true);
});

test("spaceship header applies the requested compact scale and key-light hover state", () => {
  const spaceshipHeaderSource = readFileSync(
    new URL("../src/components/SpaceshipHeader.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(spaceshipHeaderSource.includes("scale-[0.7]"), true);
  assert.equal(spaceshipHeaderSource.includes("group-hover:fill-[#f0b90b]"), true);
  assert.equal(spaceshipHeaderSource.includes('stroke="#f0b90b"'), false);
  assert.equal(spaceshipHeaderSource.includes("AUX THRUST"), true);
  assert.equal(spaceshipHeaderSource.includes('role="slider"'), true);
  assert.equal(spaceshipHeaderSource.includes("onPointerMove"), true);
  assert.equal(spaceshipHeaderSource.includes("isThrustDraggingRef.current"), true);
  assert.equal(spaceshipHeaderSource.includes("select-none"), true);
  assert.match(
    spaceshipHeaderSource,
    /onPointerDown=\{\(event\)[\s\S]*event\.preventDefault\(\)/,
  );
  assert.equal(spaceshipHeaderSource.includes('event.key === "ArrowRight"'), true);
});

test("spaceship navigation keys keep retro hardware with icons only", () => {
  const spaceshipHeaderSource = readFileSync(
    new URL("../src/components/SpaceshipHeader.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(
    spaceshipHeaderSource.includes('data-console-key="navigation"'),
    true,
  );
  assert.equal(
    spaceshipHeaderSource.includes('data-console-key-shell="true"'),
    true,
  );
  assert.equal(
    spaceshipHeaderSource.includes('data-console-key-guard="true"'),
    true,
  );
  assert.equal(
    spaceshipHeaderSource.includes('data-console-key-lamp-housing="true"'),
    true,
  );
  assert.equal(
    spaceshipHeaderSource.includes("group-active:[transform:translateY(3px)]"),
    true,
  );
  assert.equal(spaceshipHeaderSource.includes("NAV 0"), false);
  assert.equal(spaceshipHeaderSource.includes("menuItem.label.toUpperCase()"), false);
  assert.equal(spaceshipHeaderSource.includes("strokeDasharray=\"4 5\""), true);
  assert.equal(spaceshipHeaderSource.includes("const glyphCenterX = x + 63.5"), true);
  assert.equal(spaceshipHeaderSource.includes("const glyphCenterY = 110"), true);
  assert.equal(
    spaceshipHeaderSource.includes('y="68" width="91" height="18"'),
    false,
  );
  assert.match(
    spaceshipHeaderSource,
    /y="78"[\s\S]*width="81"[\s\S]*height="63"/,
  );
});

test("destination radar safely animates route progress and current position", () => {
  const spaceshipHeaderSource = readFileSync(
    new URL("../src/components/SpaceshipHeader.tsx", import.meta.url),
    "utf8",
  );
  const globalStylesSource = readFileSync(
    new URL("../src/app/globals.css", import.meta.url),
    "utf8",
  );

  assert.equal(spaceshipHeaderSource.includes("radar-route-progress"), true);
  assert.equal(spaceshipHeaderSource.includes("radar-current-beacon"), true);
  assert.equal(globalStylesSource.includes("@keyframes radarRouteFlow"), true);
  assert.equal(globalStylesSource.includes("@keyframes radarBeaconPulse"), true);
  assert.match(
    globalStylesSource,
    /prefers-reduced-motion: reduce[\s\S]*radar-route-progress[\s\S]*animation: none/,
  );
});

test("spaceship header replaces identity copy with a compact destination radar", () => {
  const spaceshipHeaderSource = readFileSync(
    new URL("../src/components/SpaceshipHeader.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(spaceshipHeaderSource.includes("Hrudai Nirmal"), false);
  assert.equal(spaceshipHeaderSource.includes("spaceshipHeaderConfig.roleLabel"), false);
  assert.equal(spaceshipHeaderSource.includes('href="/mission-radar.png"'), true);
  assert.equal(spaceshipHeaderSource.includes('aria-label="Destination radar progress"'), true);
  assert.equal(spaceshipHeaderSource.includes("DESTINATION 68%"), true);
});

test("hero thrust maps the control range to a stronger Lightfall warp", () => {
  assert.equal(normalizeThrustLevel(-1), 0);
  assert.equal(normalizeThrustLevel(2), 1);
  assert.equal(normalizeThrustLevel(Number.NaN), 0);

  assert.deepEqual(getHeroThrustEffects(0), {
    speed: 0.5,
  });
  assert.deepEqual(getHeroThrustEffects(1), {
    speed: 4.5,
  });
});

test("Lightfall speed changes advance time continuously instead of seeking", () => {
  const restingFrameTime = advanceLightfallTime(12, 1 / 60, 0.5);
  const boostedFrameTime = advanceLightfallTime(restingFrameTime, 1 / 60, 4.5);

  assert.ok(restingFrameTime > 12);
  assert.ok(boostedFrameTime > restingFrameTime);
  assert.ok(Math.abs(boostedFrameTime - restingFrameTime - 0.075) < 0.000001);
});

test("page wires the thrust control to Hero and updates Lightfall uniforms live", () => {
  const pageSource = readFileSync(
    new URL("../src/app/page.tsx", import.meta.url),
    "utf8",
  );
  const heroSource = readFileSync(
    new URL("../src/components/Hero.tsx", import.meta.url),
    "utf8",
  );
  const lightfallSource = readFileSync(
    new URL("../src/components/Lightfall.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(pageSource.includes("heroThrustLevel"), true);
  assert.equal(pageSource.includes("onThrustChange"), true);
  assert.equal(heroSource.includes("getHeroThrustEffects"), true);
  assert.equal(lightfallSource.includes("advanceLightfallTime"), true);
  assert.equal(lightfallSource.includes("speedRef.current = speed"), true);
  assert.equal(lightfallSource.includes("iTime * uSpeed"), false);
});

test("custom Shadow comms replaces the iframe with a floating two-thirds chat", () => {
  const pageSource = readFileSync(
    new URL("../src/app/page.tsx", import.meta.url),
    "utf8",
  );
  const shadowChatSource = readFileSync(
    new URL("../src/components/ShadowChat.tsx", import.meta.url),
    "utf8",
  );
  const shadowRouteSource = readFileSync(
    new URL("../src/app/api/shadow/route.ts", import.meta.url),
    "utf8",
  );

  assert.equal(pageSource.includes("<iframe"), false);
  assert.equal(pageSource.includes("<ShadowChat"), true);
  assert.equal(shadowChatSource.includes("h-[min(66.666vh,580px)]"), true);
  assert.equal(shadowChatSource.includes("right-[clamp(0.75rem,2vw,1.5rem)]"), true);
  assert.equal(shadowChatSource.includes("/shadow-pilot-avatar.png"), true);
  assert.equal(shadowChatSource.includes("/shadow-robot-avatar.png"), true);
  assert.equal(shadowChatSource.includes('aria-live="polite"'), true);
  assert.equal(shadowChatSource.includes("onSubmit={handleSubmit}"), true);
  assert.equal(shadowChatSource.includes("flex-wrap gap-2"), true);
  assert.equal(shadowChatSource.includes("overflow-x-auto"), false);
  assert.equal(shadowRouteSource.includes("DIFY_CHAT_API_KEY"), true);
  assert.equal(shadowRouteSource.includes("/chat-messages"), true);
});

test("Shadow local navigation mode validates input and answers portfolio topics", () => {
  assert.equal(normalizeShadowQuery("  Tell me about CORTEX  "), "Tell me about CORTEX");
  assert.throws(() => normalizeShadowQuery("   "), /message is required/i);
  assert.throws(() => normalizeShadowQuery("x".repeat(1001)), /1,000 characters/i);
  assert.match(getLocalShadowReply("What projects has Hrudai built?"), /Meridian/i);
  assert.match(getLocalShadowReply("Show me the top missions"), /Meridian/i);
  assert.match(getLocalShadowReply("How can I contact him?"), /contact/i);
});

test("compact menu stays right-aligned above the Shadow control", () => {
  const staggeredMenuSource = readFileSync(
    new URL("../src/components/StaggeredMenu.tsx", import.meta.url),
    "utf8",
  );

  assert.match(
    staggeredMenuSource,
    /max-width: 1279px[\s\S]*justify-content: flex-end;/,
  );
  assert.match(staggeredMenuSource, /max-width: 1279px[\s\S]*z-index: 60;/);
});

test("navbar triggers a faster nonlinear reversible handoff at one scroll point", () => {
  const navbarSource = readFileSync(
    new URL("../src/components/Navbar.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(navbarSource.includes("ScrollTrigger.create"), true);
  assert.equal(navbarSource.includes("scrub: true"), false);
  assert.equal(navbarSource.includes("onEnter"), true);
  assert.equal(navbarSource.includes("onLeaveBack"), true);
  assert.equal(navbarSource.includes("handoffTimeline.play()"), true);
  assert.equal(navbarSource.includes("handoffTimeline.reverse()"), true);
  assert.equal(navbarSource.includes("bounceDistancePx"), true);
  assert.equal(navbarSource.includes("scrollHandoffTriggerPx"), true);
  assert.equal(navbarSource.includes("duration: 0.68"), true);
  assert.equal(navbarSource.includes("duration: 0.65"), true);
  assert.equal(navbarSource.includes('ease: "sine.inOut"'), true);
  assert.equal(navbarSource.includes('ease: "expo.in"'), true);
  assert.equal(navbarSource.includes('ease: "expo.out"'), true);
  assert.equal(navbarSource.includes("revealOnDesktopScroll"), true);
});

test("desktop hamburger is detached from the control rail until the scroll handoff", () => {
  const staggeredMenuSource = readFileSync(
    new URL("../src/components/StaggeredMenu.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(staggeredMenuSource.includes("revealOnDesktopScroll?: boolean"), true);
  assert.equal(staggeredMenuSource.includes("data-scroll-reveal"), true);
  assert.match(
    staggeredMenuSource,
    /min-width: 1280px[\s\S]*data-scroll-reveal[\s\S]*visibility: hidden;/,
  );
});

test("work motion holds horizontal travel until the title phase completes", () => {
  assert.deepEqual(workMotionConfig, {
    strokeDrawDuration: 3.2,
    strokeScrollDistanceVh: 104,
    strokeTriggerStartViewportRatio: 0.86,
    desktopScrub: true,
    cardRevealViewportRatio: 0.36,
  });

  const remainingTitleDistance = getWorkTitleRemainingScrollDistance({
    sectionTop: 720,
    titleTop: 960,
    viewportHeight: 720,
  });
  assert.ok(Math.abs(remainingTitleDistance - 369.6) < 0.001);
});

test("Lightfall limits GPU cost and renders only while visible", () => {
  assert.equal(getLightfallRenderDpr(2), 1.5);
  assert.equal(getLightfallRenderDpr(1), 1);
  assert.equal(getLightfallRenderDpr(2, 1.25), 1.25);
  assert.equal(
    shouldRenderLightfallFrame({
      isPaused: false,
      isInViewport: true,
      isDocumentVisible: true,
    }),
    true,
  );
  assert.equal(
    shouldRenderLightfallFrame({
      isPaused: false,
      isInViewport: false,
      isDocumentVisible: true,
    }),
    false,
  );
});
