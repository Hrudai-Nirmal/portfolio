"use client";

import LightRays from "./LightRays";

type LightRaysBackgroundProps = {
  enabled: boolean;
  raysSpeed?: number;
  mouseInfluence?: number;
};

export default function LightRaysBackground({
  enabled,
  raysSpeed = 0.2,
  mouseInfluence = 0,
}: LightRaysBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none transition-opacity duration-300 ${
        enabled ? "opacity-100" : "opacity-0"
      }`}
      style={{ zIndex: 0 }}
    >
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={raysSpeed}
        lightSpread={0.5}
        rayLength={3}
        followMouse
        mouseInfluence={mouseInfluence}
        noiseAmount={0}
        distortion={0}
        className="custom-rays"
        pulsating={false}
        fadeDistance={1}
        saturation={1}
      />
    </div>
  );
}
