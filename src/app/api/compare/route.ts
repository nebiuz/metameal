import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient, GEMINI_MODEL } from "@/lib/gemini";
import { mockPizzaCokeAnalysis, mockHealthyMealAnalysis } from "@/lib/mock-data";

const COMPARE_PROMPT = `You are MetaMeal AI. Analyze BOTH food images and return a JSON comparison. Return ONLY valid JSON (no markdown fences) with this structure:

{
  "meal1": { /* full MealAnalysis for first image */ },
  "meal2": { /* full MealAnalysis for second image */ },
  "comparison": [
    {"category": "Energy Stability", "meal1Value": 35, "meal2Value": 80, "winner": 2},
    {"category": "Satiety Duration", "meal1Value": 40, "meal2Value": 75, "winner": 2},
    {"category": "Focus Impact", "meal1Value": 30, "meal2Value": 85, "winner": 2},
    {"category": "Hydration", "meal1Value": 25, "meal2Value": 70, "winner": 2}
  ],
  "verdict": "A concise verdict on which meal is better and why"
}

Each MealAnalysis must include: foods, timeline (8 events), bodyEffects (5 organs), energyCurve (16 points), hydrationImpact, satietyDuration, overallScore, aiInsight, moodPrediction, swapSuggestion, longTermEffect, foodDna, totalCalories. Return ONLY JSON.`;

export async function POST(request: NextRequest) {
  try {
    const { image1, image2, mimeType1, mimeType2 } = await request.json();

    if (!image1 || !image2) {
      return NextResponse.json({ error: "Two images required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      await new Promise((r) => setTimeout(r, 2500));
      return NextResponse.json({
        meal1: mockPizzaCokeAnalysis,
        meal2: mockHealthyMealAnalysis,
        comparison: [
          { category: "Energy Stability", meal1Value: 32, meal2Value: 87, winner: 2 },
          { category: "Satiety Duration", meal1Value: 40, meal2Value: 78, winner: 2 },
          { category: "Focus Impact", meal1Value: 28, meal2Value: 85, winner: 2 },
          { category: "Hydration", meal1Value: 20, meal2Value: 72, winner: 2 },
        ],
        verdict: "The grilled chicken salad with green tea significantly outperforms pizza with cola in every category. It provides 3x more sustained energy, better focus, and won't cause the dramatic crash you'd experience 90 minutes after the pizza combo.",
      });
    }

    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        {
          role: "user",
          parts: [
            { text: COMPARE_PROMPT },
            {
              inlineData: {
                mimeType: mimeType1 || "image/jpeg",
                data: image1,
              },
            },
            { text: "This is the FIRST meal image." },
            {
              inlineData: {
                mimeType: mimeType2 || "image/jpeg",
                data: image2,
              },
            },
            { text: "This is the SECOND meal image." },
          ],
        },
      ],
    });

    const text = response.text || "";
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const result = JSON.parse(cleaned);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Compare error:", error);
    return NextResponse.json({ error: "Comparison failed" }, { status: 500 });
  }
}
