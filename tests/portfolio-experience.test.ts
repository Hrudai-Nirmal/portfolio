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
  getLightfallRenderDpr,
  shouldRenderLightfallFrame,
} from "../src/lib/lightfall-performance.ts";
import {
  getHeroThrustEffects,
  normalizeThrustLevel,
} from "../src/lib/hero-thrust.ts";

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
    scrollHandoffDistancePx: 240,
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
  assert.equal(spaceshipHeaderSource.includes('event.key === "ArrowRight"'), true);
});

test("hero thrust maps the control range to a stronger Lightfall warp", () => {
  assert.equal(normalizeThrustLevel(-1), 0);
  assert.equal(normalizeThrustLevel(2), 1);
  assert.equal(normalizeThrustLevel(Number.NaN), 0);

  assert.deepEqual(getHeroThrustEffects(0), {
    speed: 0.5,
    streakLength: 3,
    glow: 0.2,
  });
  assert.deepEqual(getHeroThrustEffects(1), {
    speed: 4.5,
    streakLength: 10,
    glow: 0.5,
  });
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
  assert.equal(lightfallSource.includes("uSpeed.value = speed"), true);
  assert.equal(lightfallSource.includes("uStreakLength.value = streakLength"), true);
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

test("navbar scrubs an exactly reversible header-to-menu scroll handoff", () => {
  const navbarSource = readFileSync(
    new URL("../src/components/Navbar.tsx", import.meta.url),
    "utf8",
  );

  assert.equal(navbarSource.includes("ScrollTrigger.create"), true);
  assert.equal(navbarSource.includes("scrub: true"), true);
  assert.equal(navbarSource.includes("bounceDistancePx"), true);
  assert.equal(navbarSource.includes("scrollHandoffDistancePx"), true);
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
