"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { EnergyPoint } from "@/lib/types";

interface EnergyChartProps {
  data: EnergyPoint[];
}

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hrs}h${mins}m` : `${hrs}h`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card-static px-4 py-3 text-xs border border-white/10">
      <p className="text-[var(--text-primary)] font-medium mb-1">{formatTime(label)}</p>
      <div className="space-y-1">
        <p className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
          <span className="text-[var(--text-secondary)]">Energy:</span>
          <span className="text-[var(--accent-cyan)] font-medium">{payload[0]?.value}%</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-amber)]" />
          <span className="text-[var(--text-secondary)]">Focus:</span>
          <span className="text-[var(--accent-amber)] font-medium">{payload[1]?.value}%</span>
        </p>
      </div>
    </div>
  );
}

export default function EnergyChart({ data }: EnergyChartProps) {
  const crashPoint = useMemo(() => {
    let minEnergy = 100;
    let crashMinute = 0;
    data.forEach((p) => {
      if (p.energy < minEnergy) {
        minEnergy = p.energy;
        crashMinute = p.minute;
      }
    });
    return { minute: crashMinute, energy: minEnergy };
  }, [data]);

  return (
    <div className="glass-card-static p-6 sm:p-8">
      <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
        <span className="text-xl">⚡</span>
        Energy & Focus Curve
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-6">Predicted energy and focus levels over the next 6 hours</p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-amber)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="var(--accent-amber)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="minute"
              tickFormatter={formatTime}
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              x={crashPoint.minute}
              stroke="var(--accent-red)"
              strokeDasharray="4 4"
              strokeOpacity={0.5}
              label={{
                value: "crash",
                position: "top",
                fill: "var(--accent-red)",
                fontSize: 10,
              }}
            />
            <Area
              type="monotone"
              dataKey="energy"
              stroke="var(--accent-cyan)"
              strokeWidth={2}
              fill="url(#energyGrad)"
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="focus"
              stroke="var(--accent-amber)"
              strokeWidth={2}
              fill="url(#focusGrad)"
              animationDuration={1500}
              animationBegin={300}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
          <span className="text-xs text-[var(--text-secondary)]">Energy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1.5 rounded-full bg-[var(--accent-amber)]" />
          <span className="text-xs text-[var(--text-secondary)]">Focus</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 border-t border-dashed border-[var(--accent-red)]" />
          <span className="text-xs text-[var(--text-secondary)]">Crash Point</span>
        </div>
      </div>
    </div>
  );
}
