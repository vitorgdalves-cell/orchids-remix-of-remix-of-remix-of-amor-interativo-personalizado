"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60, // Optimized for mobile
      interactivity: {
        events: {
          onClick: {
            enable: false, // Disabled for performance
          },
          onHover: {
            enable: false, // Disabled for performance
          },
        },
      },
      particles: {
        color: {
          value: "#FF1E1E",
        },
        links: {
          color: "#FF1E1E",
          distance: 120,
          enable: true,
          opacity: 0.15,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 0.8,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            width: 800,
            height: 800,
          },
          value: 30, // Reduced from 80 for iPhone performance
        },
        opacity: {
          value: 0.25,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 2 },
        },
      },
      detectRetina: false, // Disabled to save performance on high-DPI screens like iPhone 16
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        className="fixed inset-0 pointer-events-none z-0"
        options={options}
      />
    );
  }

  return null;
}
