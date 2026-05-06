"use client";

import { motion } from "motion/react";
import { BodyEffect } from "@/lib/types";

interface BodyScanProps {
  effects: BodyEffect[];
}

const organPositions: Record<string, { cx: number; cy: number; r: number }> = {
  brain: { cx: 150, cy: 55, r: 28 },
  heart: { cx: 160, cy: 140, r: 18 },
  stomach: { cx: 150, cy: 195, r: 24 },
  muscles: { cx: 100, cy: 260, r: 20 },
  hydration: { cx: 200, cy: 260, r: 20 },
};

const statusLabels: Record<string, string> = {
  excellent: "Excellent",
  good: "Good",
  moderate: "Moderate",
  poor: "Poor",
  critical: "Critical",
};

export default function BodyScan({ effects }: BodyScanProps) {
  return (
    <div className="glass-card-static p-6 sm:p-8">
      <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
        <span className="text-xl">🧬</span>
        Body Scan
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-6">How this meal affects each body system</p>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* SVG Body Silhouette */}
        <div className="relative w-[300px] h-[380px] flex-shrink-0">
          <svg viewBox="0 0 300 380" className="w-full h-full">
            {/* Body outline */}
            <path
              d="M150 25 C170 25, 180 40, 180 55 C180 70, 170 80, 160 85 L170 95 C195 100, 210 120, 215 150 L220 200 C225 220, 240 230, 245 250 L240 270 C235 280, 220 280, 215 270 L200 240 L195 300 C192 330, 180 360, 175 370 L125 370 C120 360, 108 330, 105 300 L100 240 L85 270 C80 280, 65 280, 60 270 L55 250 C60 230, 75 220, 80 200 L85 150 C90 120, 105 100, 130 95 L140 85 C130 80, 120 70, 120 55 C120 40, 130 25, 150 25Z"
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.5"
            />

            {/* Organ glows */}
            {effects.map((effect, i) => {
              const pos = organPositions[effect.organ];
              if (!pos) return null;
              return (
                <motion.g key={effect.organ}>
                  {/* Outer glow */}
                  <motion.circle
                    cx={pos.cx}
                    cy={pos.cy}
                    r={pos.r + 10}
                    fill={effect.color}
                    opacity={0}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.15, 0.08, 0.15] }}
                    transition={{
                      delay: i * 0.2,
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    filter="url(#blur)"
                  />
                  {/* Main circle */}
                  <motion.circle
                    cx={pos.cx}
                    cy={pos.cy}
                    r={pos.r}
                    fill={effect.color}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.25, scale: 1 }}
                    transition={{ delay: i * 0.2, duration: 0.6 }}
                    style={{ transformOrigin: `${pos.cx}px ${pos.cy}px` }}
                  />
                  {/* Center dot */}
                  <motion.circle
                    cx={pos.cx}
                    cy={pos.cy}
                    r={4}
                    fill={effect.color}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: i * 0.2 + 0.3 }}
                  />
                </motion.g>
              );
            })}

            {/* Blur filter */}
            <defs>
              <filter id="blur">
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>
          </svg>
        </div>

        {/* Effect details */}
        <div className="flex-1 space-y-3 w-full">
          {effects.map((effect, i) => (
            <motion.div
              key={effect.organ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors"
            >
              <div
                className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                style={{ backgroundColor: effect.color, boxShadow: `0 0 10px ${effect.color}40` }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-medium">{effect.label}</span>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      color: effect.color,
                      backgroundColor: `${effect.color}15`,
                    }}
                  >
                    {statusLabels[effect.status]}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {effect.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
