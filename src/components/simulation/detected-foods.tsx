"use client";

import { motion } from "motion/react";
import { FoodItem } from "@/lib/types";

interface DetectedFoodsProps {
  foods: FoodItem[];
}

export default function DetectedFoods({ foods }: DetectedFoodsProps) {
  return (
    <div className="glass-card-static p-6 sm:p-8">
      <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
        <span className="text-xl">🍽</span>
        Detected Foods
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-5">Items identified by AI vision</p>

      <div className="space-y-3">
        {foods.map((food, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
          >
            <span className="text-2xl">{food.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                {food.name}
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs text-[var(--text-muted)]">
                <span>{food.calories} cal</span>
                <span className="text-[var(--accent-cyan)]">P: {food.protein}g</span>
                <span className="text-[var(--accent-amber)]">C: {food.carbs}g</span>
                <span className="text-[var(--accent-red)]">F: {food.fat}g</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
