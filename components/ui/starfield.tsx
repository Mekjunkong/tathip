"use client";

/**
 * Animated starfield background — creates a subtle twinkling star effect.
 * Uses CSS animations (no canvas/JS animation loop) for performance.
 */

import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

function generateStars(count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    });
  }
  return stars;
}

export function Starfield({ count = 80 }: { count?: number }) {
  const stars = useMemo(() => generateStars(count), [count]);

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
      {/* Subtle nebula glow effects */}
      <div
        className="absolute rounded-full animate-glow-pulse"
        style={{
          width: "300px",
          height: "300px",
          top: "20%",
          left: "10%",
          background: "radial-gradient(circle, oklch(0.4 0.15 280 / 0.15), transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full animate-glow-pulse delay-1000"
        style={{
          width: "250px",
          height: "250px",
          bottom: "15%",
          right: "15%",
          background: "radial-gradient(circle, oklch(0.4 0.12 310 / 0.1), transparent 70%)",
        }}
      />
    </div>
  );
}
