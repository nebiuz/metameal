"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import Navbar from "@/components/layout/navbar";
import UploadZone from "@/components/hero/upload-zone";
import FutureTimeline from "@/components/simulation/future-timeline";
import BodyScan from "@/components/simulation/body-scan";
import EnergyChart from "@/components/simulation/energy-chart";
import FoodDna from "@/components/simulation/food-dna";
import MealScore from "@/components/simulation/meal-score";
import AiInsight from "@/components/simulation/ai-insight";
import DetectedFoods from "@/components/simulation/detected-foods";
import NearbyAlternatives from "@/components/maps/nearby-alternatives";
import { MealAnalysis, AnalysisState } from "@/lib/types";

export default function Home() {
  const [state, setState] = useState<AnalysisState>("idle");
  const [analysis, setAnalysis] = useState<MealAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback(async (base64: string, mimeType: string) => {
    setState("analyzing");
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, mimeType }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }

      const data: MealAnalysis = await res.json();
      setAnalysis(data);
      setState("complete");

      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-16" aria-label="Main Application Dashboard">
        {/* Hero / Upload Section */}
        <UploadZone
          onImageSelect={handleImageSelect}
          isAnalyzing={state === "analyzing"}
        />

        {/* Error */}
        {state === "error" && error && (
          <div className="max-w-xl mx-auto px-4 pb-8">
            <div className="p-4 rounded-xl bg-[var(--accent-red-dim)] border border-[var(--accent-red)]/20 text-center">
              <p className="text-sm text-red-400">{error}</p>
              <button
                onClick={() => setState("idle")}
                className="mt-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Results Dashboard */}
        {state === "complete" && analysis && (
          <motion.section
            id="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
          >
            {/* Section header */}
            <div className="text-center mb-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-3xl font-bold"
              >
                Your Meal{" "}
                <span className="text-[var(--accent-cyan)]">Simulation</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-[var(--text-muted)] mt-2"
              >
                Here&apos;s what this meal will do to your body
              </motion.p>
            </div>

            {/* Top row: Score + Detected Foods */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <MealScore
                  score={analysis.overallScore}
                  totalCalories={analysis.totalCalories}
                  satietyDuration={analysis.satietyDuration}
                  hydrationImpact={analysis.hydrationImpact}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <EnergyChart data={analysis.energyCurve} />
              </motion.div>
            </div>

            {/* Middle row: Timeline + Body Scan */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FutureTimeline events={analysis.timeline} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <BodyScan effects={analysis.bodyEffects} />
              </motion.div>
            </div>

            {/* Bottom row: Food DNA + AI Insight */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <FoodDna particles={analysis.foodDna} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <AiInsight
                  insight={analysis.aiInsight}
                  moodPrediction={analysis.moodPrediction}
                  longTermEffect={analysis.longTermEffect}
                  swapSuggestion={analysis.swapSuggestion}
                />
              </motion.div>
            </div>

            {/* Last row: Detected Foods + Nearby */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <DetectedFoods foods={analysis.foods} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <NearbyAlternatives />
              </motion.div>
            </div>
          </motion.section>
        )}
      </main>
    </>
  );
}
