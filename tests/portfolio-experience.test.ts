/**
 * Locks the hero, menu, and work-story requirements for the animated portfolio
 * experience before visual components are wired to them.
 */
import assert from "node:assert/strict";
import { test } from "node:test";

import {
  heroTypingPhrases,
  heroSubheading,
  getWorkTitleRemainingScrollDistance,
  headerCollapseScrollY,
  lightfallProps,
  menuButtonColors,
  menuItems,
  orderedWorkTitles,
  workMotionConfig,
} from "../src/content/portfolio-experience.ts";
import {
  getLightfallRenderDpr,
  shouldRenderLightfallFrame,
} from "../src/lib/lightfall-performance.ts";

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

test("header collapse and hamburger colors match the restored interaction", () => {
  assert.equal(headerCollapseScrollY, 64);
  assert.deepEqual(menuButtonColors, {
    closed: "#ffffff",
    open: "#111111",
  });
});

test("work motion holds horizontal travel until the title phase completes", () => {
  assert.deepEqual(workMotionConfig, {
    strokeDrawDuration: 3.2,
    strokeScrollDistanceVh: 104,
    strokeTriggerStartViewportRatio: 0.86,
    desktopScrub: true,
    cardRevealViewportRatio: 0.36,
    headerExitStepPx: 52,
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
