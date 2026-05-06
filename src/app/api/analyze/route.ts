import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient, GEMINI_MODEL, FOOD_ANALYSIS_PROMPT } from "@/lib/gemini";
import { MealAnalysis } from "@/lib/types";
import { mockPizzaCokeAnalysis } from "@/lib/mock-data";

export async function POST(request: NextRequest) {
  try {
    const { image, mimeType } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // If no API key, return mock data for demo
    if (!process.env.GEMINI_API_KEY) {
      console.log("No GEMINI_API_KEY set — returning mock data");
      // Simulate a realistic delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return NextResponse.json(mockPizzaCokeAnalysis);
    }

    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        {
          role: "user",
          parts: [
            { text: FOOD_ANALYSIS_PROMPT },
            {
              inlineData: {
                mimeType: mimeType || "image/jpeg",
                data: image,
              },
            },
          ],
        },
      ],
    });

    const text = response.text || "";
    
    // Try to parse the JSON response
    let analysis: MealAnalysis;
    try {
      // Clean potential markdown fences
      const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      analysis = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse Gemini response:", text);
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
