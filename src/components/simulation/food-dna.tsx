"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { MacroParticle } from "@/lib/types";

interface FoodDnaProps {
  particles: MacroParticle[];
}

export default function FoodDna({ particles }: FoodDnaProps) {
  // Generate floating particle positions
  const floatingParticles = useMemo(() => {
    const result: { x: number; y: number; size: number; color: string; delay: number; type: string }[] = [];
    particles.forEach((p) => {
      const count = Math.max(2, Math.round(p.percentage / 8));
      for (let i = 0; i < count; i++) {
        result.push({
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 80,
          size: 8 + (p.percentage / 100) * 30 + Math.random() * 10,
          color: p.color,
          delay: Math.random() * 2,
          type: p.type,
        });
      }
    });
    return result;
  }, [particles]);

  return (
    <div className="glass-card-static p-6 sm:p-8">
      <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
        <span className="text-xl">🔬</span>
        Food DNA
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-6">Molecular breakdown of your meal</p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Particle visualization */}
        <div className="relative w-full lg:w-[280px] h-[220px] rounded-xl bg-black/30 border border-white/[0.04] overflow-hidden flex-shrink-0">
          {/* Scan line */}
          <div className="scan-line" style={{ animationDuration: "3s" }} />

          {/* Particles */}
          {floatingParticles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                opacity: 0.6,
                boxShadow: `0 0 ${p.size}px ${p.color}40`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0.8, 1.1, 0.8],
                opacity: [0.4, 0.7, 0.4],
                y: [0, -8, 0],
              }}
              transition={{
                delay: p.delay,
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Corner label */}
          <div className="absolute top-3 left-3 text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
            scan :: macro analysis
          </div>
        </div>

        {/* Macro bars */}
        <div className="flex-1 space-y-3">
          {particles.map((p, i) => (
            <motion.div
              key={p.type}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-[var(--text-primary)]">{p.label}</span>
                <span className="text-xs font-mono" style={{ color: p.color }}>
                  {p.grams}g • {p.percentage}%
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: p.color,
                    boxShadow: `0 0 8px ${p.color}40`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${p.percentage}%` }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
