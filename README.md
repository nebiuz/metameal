# 🔮 MetaMeal: Future Body Simulation HUD

> **"See what your food will do to you *before* you eat it."**

## ⚠️ The Problem
We live in an era of nutritional blindness. Standard nutrition labels are boring, static, and fundamentally disconnected from human biology. When you look at a slice of pizza or a can of soda, you don't just consume "300 calories" and "35g of carbs"—you are triggering a complex cascade of physiological events. People struggle with their health because they can't visualize the **immediate future consequences** of their meals (sugar crashes, dopamine spikes, dehydration, lethargy) until it's too late.

## 💡 Our Solution
**MetaMeal** is a futuristic, AI-powered "Food-to-Body Simulation HUD" designed to make nutrition visceral, visual, and impossible to ignore. 

Instead of reading a label, you simply snap a photo of your meal. Powered by Google's cutting-edge **Gemini 3 Flash** multimodal vision AI, MetaMeal instantly reverse-engineers the food and generates a highly visual, *Minority-Report*-style dashboard that predicts your body's exact trajectory over the next 6 hours.

### ✨ Key Features
*   📸 **Instant AI Vision Analysis**: Drag-and-drop or snap a photo of any meal. Gemini 3 Flash instantly breaks down the exact macros, ingredients, and nutritional profile.
*   🧬 **Food DNA Visualizer**: A sci-fi particle breakdown showing exactly what the food is made of (Protein, Carbs, Fats, Sodium, Sugar).
*   ⚡ **6-Hour Energy & Focus Curve**: A predictive chart showing your exact energy levels and cognitive focus over the next 360 minutes. Anticipate the 3 PM sugar crash before it happens.
*   🫀 **Organ Impact Scan**: An interactive body silhouette that pulses to show the immediate stress or benefit to your heart, brain, stomach, and hydration levels.
*   ⏳ **Physiological Timeline**: A minute-by-minute breakdown of what the food is actively doing inside your bloodstream (e.g., "+15m: Glucose Spike", "+45m: Dopamine Release", "+120m: Insulin Drop").
*   ⚔️ **Battle Mode**: Compare two meals head-to-head to see which one wins the physiological battle.
*   🗺️ **Nearby Alternatives**: If the meal scores poorly, MetaMeal uses the **Google Maps Places API** to instantly find healthier, highly-rated restaurants within walking distance.

## 🛠️ Built With

*   **Framework**: Next.js 16 (App Router), React, TypeScript
*   **Styling & UI**: Tailwind CSS, Framer Motion (for high-fidelity glassmorphism & HUD animations)
*   **AI Engine**: `@google/genai` using the ultra-fast **Gemini 3 Flash Preview** model for sub-second multimodal image inference and JSON structuring.
*   **Location Services**: Google Maps API (Places)
*   **Backend & DB**: Firebase Auth & Cloud Firestore
*   **Deployment**: Google Cloud Run (Containerized via Cloud Buildpacks)

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/metameal.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (copy `.env.example` to `.env` and add your Gemini 3 API key).
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## 🏆 Hackathon Impact
MetaMeal bridges the gap between raw data and human behavior. By transforming boring nutritional stats into a predictive, interactive "cybernetic" dashboard, we make healthy eating engaging, scientifically accurate, and visually stunning.
