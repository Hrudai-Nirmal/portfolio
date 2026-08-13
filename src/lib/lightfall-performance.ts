/**
 * Pure rendering-budget decisions for the Lightfall WebGL background.
 * Keeping these separate makes the expensive animation lifecycle testable.
 */

const MAX_LIGHTFALL_DPR = 1.5;

export interface LightfallFrameState {
  isPaused: boolean;
  isInViewport: boolean;
  isDocumentVisible: boolean;
}

/** Returns a bounded DPR so the background cannot monopolize the GPU. */
export function getLightfallRenderDpr(
  devicePixelRatio: number,
  requestedDpr?: number,
) {
  const resolvedDpr = requestedDpr ?? devicePixelRatio;
  if (!Number.isFinite(resolvedDpr) || resolvedDpr <= 0) {
    return 1;
  }

  return Math.min(resolvedDpr, MAX_LIGHTFALL_DPR);
}

/** Decides whether the current frame has any visible user-facing value. */
export function shouldRenderLightfallFrame({
  isPaused,
  isInViewport,
  isDocumentVisible,
}: LightfallFrameState) {
  return !isPaused && isInViewport && isDocumentVisible;
}
