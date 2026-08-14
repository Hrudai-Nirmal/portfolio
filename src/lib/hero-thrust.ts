/**
 * Maps the mission-control thrust input to the live Lightfall uniforms without
 * changing the original background values at the control's resting position.
 */

export interface HeroThrustEffects {
  speed: number;
}

/** Constrains an arbitrary thrust value to the supported zero-to-one range. */
export function normalizeThrustLevel(thrustLevel: number) {
  if (!Number.isFinite(thrustLevel)) return 0;
  return Math.min(1, Math.max(0, thrustLevel));
}

/** Converts thrust into the Lightfall values that create the warp-speed effect. */
export function getHeroThrustEffects(thrustLevel: number): HeroThrustEffects {
  const normalizedThrustLevel = normalizeThrustLevel(thrustLevel);

  return {
    speed: 0.5 + normalizedThrustLevel * 4,
  };
}
