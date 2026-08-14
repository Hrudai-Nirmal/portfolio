/**
 * Shared content and animation settings for the portfolio's primary experience.
 * Keeping these values outside the UI makes the requested order and wording testable.
 */

export const heroTypingPhrases = [
  "Hrudai Nirmal",
  "Agentic AI engineer",
  "Full stack developer",
] as const;

export const heroSubheading =
  "Bangalore based software engineer who blends design, creativity, and a little vibe-coding.";

export const lightfallProps = {
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
} as const;

export const menuItems = [
  { label: "Home", ariaLabel: "Go to the home section", link: "#home" },
  { label: "Work", ariaLabel: "Explore selected work", link: "#work" },
  { label: "About", ariaLabel: "Learn more about Hrudai", link: "#about" },
  { label: "Contact", ariaLabel: "Get in touch", link: "#contact" },
] as const;

export const socialItems = [
  { label: "GitHub", link: "https://github.com/Hrudai-Nirmal" },
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/hrudai-nirmal-0b589b1b8",
  },
  { label: "Instagram", link: "https://www.instagram.com/hrudianirmal" },
] as const;

export const menuButtonColors = {
  closed: "#ffffff",
  open: "#111111",
} as const;

export const spaceshipHeaderConfig = {
  isPersistent: false,
  scrollHandoffTriggerPx: 160,
  bounceDistancePx: 18,
  systemLabel: "NAV-COM // 01",
  roleLabel: "SOFTWARE ENGINEER · BANGALORE",
  statusLabel: "PRIMARY ACTION",
  aiLabel: "ASK SHADOW",
  menuLabel: "MENU",
} as const;

export const workMotionConfig = {
  strokeDrawDuration: 3.2,
  strokeScrollDistanceVh: 104,
  strokeTriggerStartViewportRatio: 0.86,
  desktopScrub: true,
  cardRevealViewportRatio: 0.36,
} as const;

export interface WorkTitleScrollMeasurements {
  sectionTop: number;
  titleTop: number;
  viewportHeight: number;
}

/** Calculates the title travel still outstanding when the Work section pins. */
export function getWorkTitleRemainingScrollDistance({
  sectionTop,
  titleTop,
  viewportHeight,
}: WorkTitleScrollMeasurements) {
  if (
    !Number.isFinite(sectionTop) ||
    !Number.isFinite(titleTop) ||
    !Number.isFinite(viewportHeight) ||
    viewportHeight <= 0
  ) {
    throw new RangeError(
      "Work title scroll measurements must be finite with a positive viewport",
    );
  }

  const titleScrollDistance =
    viewportHeight * (workMotionConfig.strokeScrollDistanceVh / 100);
  const titleTriggerStart =
    titleTop -
    viewportHeight * workMotionConfig.strokeTriggerStartViewportRatio;

  return Math.max(
    0,
    titleTriggerStart + titleScrollDistance - sectionTop,
  );
}

export const orderedWorkTitles = [
  "Meridian AI Workflow Control Room",
  "Cortex Enterprise RAG",
  "Cortana Personal AI Agent",
  "Surface Defect Detection Ensemble",
  "MUSES (GuitarBud)",
  "Qrypt Secure Messaging",
  "Portfolio Website + Ask Shadow AI",
] as const;
