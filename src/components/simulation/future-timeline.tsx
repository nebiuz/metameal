"use client";

import { motion } from "motion/react";
import { TimelineEvent } from "@/lib/types";

interface FutureTimelineProps {
  events: TimelineEvent[];
}

const typeColors = {
  positive: { bg: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/30", glow: "shadow-emerald-500/20" },
  neutral: { bg: "bg-amber-500", text: "text-amber-400", border: "border-amber-500/30", glow: "shadow-amber-500/20" },
  negative: { bg: "bg-red-500", text: "text-red-400", border: "border-red-500/30", glow: "shadow-red-500/20" },
};

export default function FutureTimeline({ events }: FutureTimelineProps) {
  return (
    <div className="glass-card-static p-6 sm:p-8">
      <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
        <span className="text-xl">⏱</span>
        Future Timeline
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-6">What happens to your body after eating this meal</p>

      {/* Timeline */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-[18px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-emerald-500/40 via-amber-500/40 to-red-500/40" />

        <div className="space-y-1">
          {events.map((event, i) => {
            const colors = typeColors[event.type];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="relative flex items-start gap-4 group py-3"
              >
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0 mt-0.5">
                  <div className={`w-[10px] h-[10px] rounded-full ${colors.bg} ring-4 ring-[var(--bg-primary)] shadow-lg ${colors.glow}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono font-semibold text-[var(--text-primary)] bg-white/5 px-2 py-0.5 rounded">
                      {event.time}
                    </span>
                    {/* Intensity bar */}
                    <div className="flex-1 h-1 bg-white/5 rounded-full max-w-[100px]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${event.intensity * 100}%` }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                        className={`h-full rounded-full ${colors.bg}`}
                      />
                    </div>
                  </div>
                  <p className={`text-sm ${colors.text} leading-relaxed`}>
                    {event.effect}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
