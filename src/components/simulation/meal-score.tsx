"use client";

import { motion } from "motion/react";

interface MealScoreProps {
  score: number;
  totalCalories: number;
  satietyDuration: number;
  hydrationImpact: number;
}

function getScoreColor(score: number): string {
  if (score >= 70) return "var(--accent-cyan)";
  if (score >= 45) return "var(--accent-amber)";
  return "var(--accent-red)";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 65) return "Good";
  if (score >= 45) return "Moderate";
  if (score >= 25) return "Poor";
  return "Critical";
}

export default function MealScore({ score, totalCalories, satietyDuration, hydrationImpact }: MealScoreProps) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-card-static p-6 sm:p-8">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <span className="text-xl">🎯</span>
        Meal Score
      </h3>

      <div className="flex flex-col items-center">
        {/* Score Ring */}
        <div className="score-ring mb-6">
          <svg width="140" height="140">
            {/* Background ring */}
            <circle
              cx="70"
              cy="70"
              r="54"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="8"
            />
            {/* Score ring */}
            <motion.circle
              cx="70"
              cy="70"
              r="54"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <motion.span
              className="text-3xl font-bold"
              style={{ color }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {score}
            </motion.span>
            <span className="text-xs text-[var(--text-muted)]">/100</span>
          </div>
        </div>

        <motion.span
          className="text-sm font-medium mb-6 px-3 py-1 rounded-full"
          style={{ color, backgroundColor: `${color}15` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {label}
        </motion.span>

        {/* Stats */}
        <div className="w-full grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-xl bg-white/[0.02]">
            <p className="text-lg font-semibold text-[var(--text-primary)]">{totalCalories}</p>
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-0.5">Calories</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/[0.02]">
            <p className="text-lg font-semibold text-[var(--text-primary)]">{Math.round(satietyDuration / 60)}h</p>
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-0.5">Full for</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/[0.02]">
            <p className={`text-lg font-semibold ${hydrationImpact >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {hydrationImpact > 0 ? "+" : ""}{hydrationImpact}%
            </p>
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mt-0.5">Hydration</p>
          </div>
        </div>
      </div>
    </div>
  );
}
