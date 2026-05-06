// ─── Core Data Types for MetaMeal ───────────────────────────────────────────

export interface FoodItem {
  name: string;
  emoji: string;
  calories: number;
  protein: number;    // grams
  carbs: number;      // grams
  fat: number;        // grams
  fiber: number;      // grams
  sugar: number;      // grams
  sodium: number;     // mg
}

export interface TimelineEvent {
  time: string;       // e.g. "+15 min"
  minutes: number;    // numeric minutes from now
  effect: string;     // short description
  intensity: number;  // 0 to 1
  type: "positive" | "neutral" | "negative";
}

export interface BodyEffect {
  organ: "brain" | "stomach" | "muscles" | "heart" | "hydration";
  label: string;
  status: "excellent" | "good" | "moderate" | "poor" | "critical";
  color: string;      // hex
  description: string;
  intensity: number;  // 0 to 1
}

export interface EnergyPoint {
  minute: number;
  energy: number;     // 0–100
  focus: number;      // 0–100
}

export interface MacroParticle {
  type: "protein" | "carbs" | "fat" | "fiber" | "sugar" | "sodium";
  label: string;
  percentage: number;
  grams: number;
  color: string;
}

export interface SwapSuggestion {
  remove: string;
  replaceWith: string;
  benefit: string;
  impactDelta: number; // score improvement
}

export interface NearbyAlternative {
  name: string;
  distance: string;
  rating: number;
  cuisine: string;
  reason: string;
  lat?: number;
  lng?: number;
}

export interface MealAnalysis {
  foods: FoodItem[];
  timeline: TimelineEvent[];
  bodyEffects: BodyEffect[];
  energyCurve: EnergyPoint[];
  hydrationImpact: number;      // -30 to +30
  satietyDuration: number;      // minutes
  overallScore: number;         // 0–100
  aiInsight: string;
  moodPrediction: string;
  swapSuggestion: SwapSuggestion;
  longTermEffect: string;
  foodDna: MacroParticle[];
  totalCalories: number;
}

export interface CompareResult {
  meal1: MealAnalysis;
  meal2: MealAnalysis;
  comparison: {
    category: string;
    meal1Value: number;
    meal2Value: number;
    winner: 1 | 2;
  }[];
  verdict: string;
}

export type AnalysisState = "idle" | "uploading" | "analyzing" | "complete" | "error";
