# MetaMeal

### "See what your food will do before you eat it."

MetaMeal is a futuristic AI-powered food analysis web app. Upload a meal photo, and instantly visualize how it will affect your energy, focus, hydration, and body — powered by Google Gemini AI.

Think **Minority Report for food** — not a nutrition tracker.

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **Future Timeline Simulation** | Animated timeline showing what happens to your body at +15min, +45min, +90min, and beyond |
| **Body Scan Visualization** | SVG human silhouette with glowing organs that react to meal quality |
| **Energy & Focus Curves** | Neon-glowing area charts predicting your energy and focus over 6 hours |
| **Food DNA Visualizer** | Sci-fi particle visualization breaking food into its molecular components |
| **AI Analysis & Mood Prediction** | Typewriter-animated insights about focus impact, mood changes, and cognitive effects |
| **Smart Swap Suggestion** | One small improvement that instantly boosts your meal score |
| **"What If Daily?" Simulation** | Long-term behavioral impact prediction for repeated consumption |
| **Nearby Healthier Alternatives** | Google Maps integration showing better food options near you |
| **Dual Meal Battle Mode** | Compare two meals side-by-side with animated competitive bar charts |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Motion (Framer Motion) |
| Charts | Recharts |
| AI | Google Gemini API (`@google/genai`) |
| Maps | Google Maps Places API |
| Icons | Lucide React |

---

## 🏗 Architecture

```
User uploads meal photo
       ↓
Next.js API Route (server-side)
       ↓
Google Gemini 2.5 Flash (multimodal)
       ↓
Structured JSON analysis
       ↓
Frontend renders 8 interactive visualizations
```

All API keys are kept server-side — never exposed to the client.

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/metameal.git
cd metameal

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | No* | Google Gemini API key for food analysis |
| `GOOGLE_MAPS_API_KEY` | No* | Google Maps API key for nearby alternatives |

*The app ships with high-quality mock data and works fully without API keys for demo purposes.

---

## 🎯 How It Works

1. **Upload**: Drop or capture a meal photo (no login required)
2. **AI Analysis**: Gemini 2.5 Flash identifies foods, estimates macros, and simulates effects
3. **Visualization**: 8 interactive panels render the analysis with smooth animations
4. **Compare**: Battle Mode lets you pit two meals against each other
5. **Discover**: Nearby healthier alternatives appear via Google Maps

### The Smart Technical Approach

The app uses:
- **Gemini multimodal AI** for food detection and reasoning
- **Estimated macro heuristics** for timeline simulation
- **Structured JSON output** for reliable data extraction
- **CSS + Motion animations** for the futuristic HUD aesthetic

---

## 🎨 Design Philosophy

- **Dark futuristic HUD** — not a hospital dashboard
- **Neon cyan + amber accents** — not generic primary colors
- **Glassmorphic cards** — translucent with backdrop-blur
- **Micro-animations everywhere** — stagger reveals, glow pulses, typewriter text
- **Apple-style polish** — smooth transitions, clean typography (Inter)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts    # Gemini food analysis endpoint
│   │   ├── compare/route.ts    # Dual meal comparison endpoint
│   │   └── nearby/route.ts     # Google Maps nearby search
│   ├── compare/page.tsx        # Battle Mode page
│   ├── globals.css             # Design system + animations
│   ├── layout.tsx              # Root layout with Inter font
│   └── page.tsx                # Main analysis page
├── components/
│   ├── hero/upload-zone.tsx    # Drag-and-drop upload with camera
│   ├── layout/navbar.tsx       # Floating glassmorphic navbar
│   ├── maps/nearby-alternatives.tsx
│   └── simulation/
│       ├── ai-insight.tsx      # AI analysis + mood + swap + daily
│       ├── body-scan.tsx       # SVG body silhouette with organ glows
│       ├── detected-foods.tsx  # Food item list
│       ├── energy-chart.tsx    # Recharts area chart with glow
│       ├── food-dna.tsx        # Particle macro visualizer
│       ├── future-timeline.tsx # Animated event timeline
│       └── meal-score.tsx      # Circular score gauge
└── lib/
    ├── gemini.ts               # Gemini client + prompt engineering
    ├── mock-data.ts            # Demo fallback data
    └── types.ts                # TypeScript interfaces
```

---

## 🔑 Google Services Integration

| Service | Usage |
|---------|-------|
| **Google Gemini API** | Multimodal food detection, macro estimation, effect simulation, natural language insights |
| **Google Maps Places API** | Nearby restaurant search for healthier alternatives |

---

## 🧪 Assumptions

- Nutritional analysis is AI-estimated, not medically precise
- Energy/focus curves are behavioral predictions, not clinical data
- The app prioritizes **perceived sophistication** and **visual impact** over scientific accuracy
- Mock data provides a complete demo experience without API keys

---

## 📝 License

MIT
