"use client";

import Particles from "./Particles";

type ParticlesBackgroundProps = {
  enabled: boolean;
};

export default function ParticlesBackground({ enabled }: ParticlesBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none transition-opacity duration-300 ${
        enabled ? "opacity-100" : "opacity-0"
      }`}
      style={{ zIndex: 0 }}
    >
      <Particles
        particleColors={["#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
      />
    </div>
  );
}

