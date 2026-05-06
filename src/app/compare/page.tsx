"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import Navbar from "@/components/layout/navbar";
import UploadZone from "@/components/hero/upload-zone";
import EnergyChart from "@/components/simulation/energy-chart";
import MealScore from "@/components/simulation/meal-score";
import { MealAnalysis, CompareResult } from "@/lib/types";
import { Swords, Trophy } from "lucide-react";

type CompareState = "idle" | "analyzing" | "complete" | "error";

export default function ComparePage() {
  const [state, setState] = useState<CompareState>("idle");
  const [result, setResult] = useState<CompareResult | null>(null);
  const [image1, setImage1] = useState<{ base64: string; mimeType: string } | null>(null);
  const [image2, setImage2] = useState<{ base64: string; mimeType: string } | null>(null);

  const handleImage1 = useCallback((base64: string, mimeType: string) => {
    setImage1({ base64, mimeType });
  }, []);

  const handleImage2 = useCallback((base64: string, mimeType: string) => {
    setImage2({ base64, mimeType });
  }, []);

  const handleCompare = useCallback(async () => {
    if (!image1 || !image2) return;

    setState("analyzing");
    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image1: image1.base64,
          image2: image2.base64,
          mimeType1: image1.mimeType,
          mimeType2: image2.mimeType,
        }),
      });

      if (!res.ok) throw new Error("Comparison failed");

      const data: CompareResult = await res.json();
      setResult(data);
      setState("complete");

      setTimeout(() => {
        document.getElementById("battle-results")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch {
      setState("error");
    }
  }, [image1, image2]);

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        {/* Header */}
        <div className="text-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-amber-dim)] border border-[var(--accent-amber)]/20 text-[var(--accent-amber)] text-xs font-medium mb-5"
          >
            <Swords className="w-3 h-3" />
            Battle Mode
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold mb-3"
          >
            Meal <span className="text-[var(--accent-amber)]">vs</span> Meal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] max-w-md mx-auto"
          >
            Upload two meals side-by-side and see which one your body would prefer.
          </motion.p>
        </div>

        {/* Upload areas */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card-static p-5"
            >
              <p className="text-sm font-medium text-[var(--text-secondary)] mb-3">Meal 1</p>
              <UploadZone onImageSelect={handleImage1} isAnalyzing={state === "analyzing"} compact />
            </motion.div>

            {/* VS badge */}
            <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="vs-badge">VS</div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card-static p-5"
            >
              <p className="text-sm font-medium text-[var(--text-secondary)] mb-3">Meal 2</p>
              <UploadZone onImageSelect={handleImage2} isAnalyzing={state === "analyzing"} compact />
            </motion.div>
          </div>

          {/* Compare button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={handleCompare}
              disabled={!image1 || !image2 || state === "analyzing"}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-amber)] to-[var(--accent-red)] text-black font-semibold text-sm hover:brightness-110 transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {state === "analyzing" ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Analyzing both meals...
                </>
              ) : (
                <>
                  <Swords className="w-4 h-4" />
                  Compare Meals
                </>
              )}
            </button>
          </motion.div>

          {state === "error" && (
            <p className="text-center text-sm text-red-400 mt-4">Comparison failed. Try again.</p>
          )}
        </div>

        {/* Battle Results */}
        {state === "complete" && result && (
          <motion.section
            id="battle-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto px-4 sm:px-6 py-16"
          >
            <h2 className="text-2xl font-bold text-center mb-2 flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-[var(--accent-amber)]" />
              Battle Results
            </h2>
            <p className="text-center text-sm text-[var(--text-muted)] mb-10">Side-by-side body impact comparison</p>

            {/* Comparison bars */}
            <div className="glass-card-static p-6 sm:p-8 mb-8">
              <div className="space-y-6">
                {result.comparison.map((cat, i) => (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[var(--text-muted)]">Meal 1</span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{cat.category}</span>
                      <span className="text-xs text-[var(--text-muted)]">Meal 2</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Meal 1 bar (right-aligned) */}
                      <div className="flex-1 flex justify-end">
                        <motion.div
                          className="h-3 rounded-l-full"
                          style={{
                            backgroundColor: cat.winner === 1 ? "var(--accent-cyan)" : "var(--accent-red)",
                            boxShadow: cat.winner === 1 ? "0 0 10px var(--accent-cyan)40" : "0 0 10px var(--accent-red)40",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${cat.meal1Value}%` }}
                          transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                        />
                      </div>
                      <span className="text-xs font-mono w-8 text-center text-[var(--text-muted)]">vs</span>
                      {/* Meal 2 bar (left-aligned) */}
                      <div className="flex-1">
                        <motion.div
                          className="h-3 rounded-r-full"
                          style={{
                            backgroundColor: cat.winner === 2 ? "var(--accent-cyan)" : "var(--accent-red)",
                            boxShadow: cat.winner === 2 ? "0 0 10px var(--accent-cyan)40" : "0 0 10px var(--accent-red)40",
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${cat.meal2Value}%` }}
                          transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-mono" style={{ color: cat.winner === 1 ? "var(--accent-cyan)" : "var(--accent-red)" }}>
                        {cat.meal1Value}
                      </span>
                      <span className="text-xs font-mono" style={{ color: cat.winner === 2 ? "var(--accent-cyan)" : "var(--accent-red)" }}>
                        {cat.meal2Value}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Verdict */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 p-4 rounded-xl bg-[var(--accent-cyan-dim)] border border-[var(--accent-cyan)]/10"
              >
                <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                  <strong className="text-[var(--accent-cyan)]">Verdict:</strong> {result.verdict}
                </p>
              </motion.div>
            </div>

            {/* Side-by-side scores */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div>
                <p className="text-sm font-medium text-[var(--text-secondary)] mb-3 text-center">Meal 1</p>
                <MealScore
                  score={result.meal1.overallScore}
                  totalCalories={result.meal1.totalCalories}
                  satietyDuration={result.meal1.satietyDuration}
                  hydrationImpact={result.meal1.hydrationImpact}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-secondary)] mb-3 text-center">Meal 2</p>
                <MealScore
                  score={result.meal2.overallScore}
                  totalCalories={result.meal2.totalCalories}
                  satietyDuration={result.meal2.satietyDuration}
                  hydrationImpact={result.meal2.hydrationImpact}
                />
              </div>
            </div>

            {/* Side-by-side energy charts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <EnergyChart data={result.meal1.energyCurve} />
              </div>
              <div>
                <EnergyChart data={result.meal2.energyCurve} />
              </div>
            </div>
          </motion.section>
        )}
      </main>
    </>
  );
}
