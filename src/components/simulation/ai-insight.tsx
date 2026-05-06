"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SwapSuggestion } from "@/lib/types";
import { ArrowRight, ChevronDown, ChevronUp, Lightbulb, Brain, Calendar, Repeat } from "lucide-react";

interface AiInsightProps {
  insight: string;
  moodPrediction: string;
  longTermEffect: string;
  swapSuggestion: SwapSuggestion;
}

export default function AiInsight({ insight, moodPrediction, longTermEffect, swapSuggestion }: AiInsightProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showLongTerm, setShowLongTerm] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= insight.length) {
        setDisplayedText(insight.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [insight]);

  return (
    <div className="glass-card-static p-6 sm:p-8 space-y-5">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <span className="text-xl">🧠</span>
        AI Analysis
      </h3>

      {/* Main insight with typewriter */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
        <p className="text-sm text-[var(--text-primary)] leading-relaxed">
          {displayedText}
          {displayedText.length < insight.length && (
            <span className="inline-block w-[2px] h-4 bg-[var(--accent-cyan)] ml-0.5 animate-pulse" />
          )}
        </p>
      </div>

      {/* Mood prediction */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-start gap-3 p-4 rounded-xl bg-[var(--accent-amber-dim)] border border-[var(--accent-amber)]/10"
      >
        <Brain className="w-4 h-4 text-[var(--accent-amber)] mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs font-medium text-[var(--accent-amber)] uppercase tracking-wider mb-1">Mood & Focus Prediction</p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{moodPrediction}</p>
        </div>
      </motion.div>

      {/* Swap suggestion */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-4 rounded-xl bg-[var(--accent-cyan-dim)] border border-[var(--accent-cyan)]/10"
      >
        <div className="flex items-center gap-2 mb-3">
          <Repeat className="w-4 h-4 text-[var(--accent-cyan)]" />
          <p className="text-xs font-medium text-[var(--accent-cyan)] uppercase tracking-wider">Smart Swap</p>
          <span className="ml-auto text-xs text-[var(--accent-cyan)] font-medium">
            +{swapSuggestion.impactDelta} pts
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-red-400 line-through">{swapSuggestion.remove}</span>
          <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
          <span className="text-emerald-400 font-medium">{swapSuggestion.replaceWith}</span>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-2 flex items-start gap-1.5">
          <Lightbulb className="w-3 h-3 mt-0.5 text-[var(--accent-amber)] flex-shrink-0" />
          {swapSuggestion.benefit}
        </p>
      </motion.div>

      {/* Long-term toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <button
          onClick={() => setShowLongTerm(!showLongTerm)}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[var(--accent-purple)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">What if I eat this daily?</span>
          </div>
          {showLongTerm ? (
            <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
          )}
        </button>
        <AnimatePresence>
          {showLongTerm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 mt-1 rounded-xl bg-[var(--accent-red-dim)] border border-[var(--accent-red)]/10">
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{longTermEffect}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
